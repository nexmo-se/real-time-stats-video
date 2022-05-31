import log, { error } from 'loglevel';
import { logPublisher, getRtcStats } from './utils/publisher';
import { EventEmitter } from 'events';
import {
  QualityEvent,
  RTCStatsReport,
  PacketLossEvent,
  Publisher,
  RealTimeOptions,
} from './types';

/**startStats
 * @private
 */

export interface VideoNetworkQualityStats {
  on(event: 'qualityLimitated', listener: (event: QualityEvent) => void): this;
  on(
    event: 'qualityLimitatedStopped',
    listener: (event: QualityEvent) => void
  ): this;
  on(event: 'highPacketLoss', listener: (event: PacketLossEvent) => void): this;
  on(
    event: 'highPacketLossStopped',
    listener: (event: PacketLossEvent) => void
  ): this;
}

export class VideoNetworkQualityStats extends EventEmitter {
  public _publisher: OT.Publisher;
  public _statsInterval: number;
  private _interval: setInterval;
  private prevTimeStamp: {};
  private prevPacketsSent: {};
  private simulcastLayers: any;
  private isQualityLimitated: boolean;
  private wasQualityLimited: boolean;
  private hasPacketLoss: boolean;
  private hadPacketLoss: boolean;
  private prevPacketsLost = {};
  private packetLossArray: any;
  private layersWithPacketLoss: any;
  public _VideoPacketLossThreshold: number;

  constructor(options: RealTimeOptions) {
    super();
    // this._useWasm =
    //   typeof options.useWasm === 'boolean' ? options.useWasm : true;
    this.prevTimeStamp = {};
    this.simulcastLayers = [];
    this.prevPacketsSent = {};
    this._publisher = null;
    this._statsInterval = options.intervalStats;
    this._VideoPacketLossThreshold = options.VideoPacketLossThreshold;
    this._interval = null;
    this.isQualityLimitated = false;
    this.wasQualityLimited = false;
    this.hasPacketLoss = false;
    this.hadPacketLoss = false;
    this.prevPacketsSent = {};
    this.prevPacketsLost = {};
    this.packetLossArray = [];
    this.layersWithPacketLoss = [];
  }

  setPublisher(publisher: Publisher) {
    this._publisher = publisher;
  }

  checkIfQualityLimited(stats: RTCStatsReport) {
    stats[0].rtcStatsReport.forEach((e: any) => {
      if (e.type === 'outbound-rtp' && e.kind === 'video') {
        if (this.prevTimeStamp[e.ssrc] && this.prevPacketsSent[e.ssrc]) {
          const timedif = e.timestamp - this.prevTimeStamp[e.ssrc];
          const bytesDif = e.bytesSent - this.prevPacketsSent[e.ssrc];
          const bitSec = (8 * bytesDif) / timedif;

          const newLayers = {
            width: e.frameWidth,
            height: e.frameHeight,
            framesPerSecond: e.framesPerSecond,
            qualityLimitationReason: e.qualityLimitationReason,
            id: e.ssrc,
            bytes: bitSec,
            packetsDiff: e.packetsSent - this.prevPacketsSent[e.ssrc],
            // rtt: result?.rtt ? result.rtt : 0,
          };
          this.simulcastLayers = [...this.simulcastLayers, newLayers];

          this.simulcastLayers.forEach((layer) => {
            if (
              layer.qualityLimitationReason !== 'none' &&
              this.isQualityLimitated === false &&
              !this.wasQualityLimited
            ) {
              this.isQualityLimitated = true;
              this.emit('qualityLimitated', {
                streamId: this._publisher.stream.id,
                reason: layer.qualityLimitationReason,
                id: layer.id,
                targetQuality: `${layer.width}X${layer.height}`,
              });
            } else if (
              this.wasQualityLimited &&
              layer.qualityLimitationReason === 'none' &&
              this.isQualityLimitated
            ) {
              this.isQualityLimitated = false;
              this.emit('qualityLimitatedStopped', {
                streamId: this._publisher.stream.id,
                reason: layer.qualityLimitationReason,
                targetQuality: `${layer.width}X${layer.height}`,
              });
            }
          });
          //   console.log(this.simulcastLayers);
        }

        this.prevPacketsSent[e.ssrc] = e.packetsSent;
        this.prevTimeStamp[e.ssrc] = e.timestamp;
        this.wasQualityLimited = this.isQualityLimitated;
        // prevBytesSent[e.ssrc] = e.bytesSent;
      }
    });
  }

  checkVideoPacketLoss(stats: any): void {
    stats[0].rtcStatsReport.forEach((e: RTCStatsReport) => {
      if (e.type === 'remote-inbound-rtp' && e.kind === 'video') {
        // const rtt = !isNaN(e.roundTripTime) ? e.roundTripTime : 0;
        const rttObject = {
          ssrc: e.ssrc,
          rtt: e.roundTripTime,
          jitter: e.jitter,
          packetLostFraction: e.fractionLost * 100,
          packetsLostDiff: e.packetsLost - this.prevPacketsLost[e.ssrc],
        };
        this.packetLossArray = [...this.packetLossArray, rttObject];

        this.prevPacketsLost[e.ssrc] = e.packetsLost;
        this.mergeArrays();
      }
    });
  }

  mergeArrays(): void {
    if (this.packetLossArray && this.simulcastLayers.length) {
      this.layersWithPacketLoss = [];
      // console.log(simulcastDef);
      for (let layer of this.simulcastLayers) {
        for (let rttLayer of this.packetLossArray) {
          if (layer.id === rttLayer.ssrc && layer.framesPerSecond) {
            const packetsTotal = layer.packetsDiff + rttLayer.packetsLostDiff;
            const packetLostValue = rttLayer.packetsLostDiff / packetsTotal;

            const obj = {
              rtt: rttLayer.rtt,
              jitter: rttLayer.jitter,
              // packetLostFraction: rttLayer.packetLostFraction,
              packetLost: packetLostValue * 100,
              ...layer,
            };
            this.layersWithPacketLoss = [...this.layersWithPacketLoss, obj];

            const maxSsrc = Math.max.apply(
              Math,
              this.layersWithPacketLoss.map(function(layer) {
                return layer.id;
              })
            );
            const upperLayer = this.layersWithPacketLoss.find(function(layer) {
              return layer.id == maxSsrc;
            });
            if (
              upperLayer.packetLost >= this._VideoPacketLossThreshold &&
              !this.hadPacketLoss &&
              !this.hasPacketLoss
            ) {
              this.hasPacketLoss = true;
              this.emit('highPacketLoss', {
                streamId: this._publisher.stream.id,
                type: 'video',
                action: 'highPacketLossDetected',
                packetLossThreshold: this._VideoPacketLossThreshold,
              });
            } else if (
              this.hadPacketLoss &&
              this.hasPacketLoss &&
              upperLayer.packetLost < this._VideoPacketLossThreshold
            ) {
              this.hasPacketLoss = false;
              this.emit('highPacketLossStopped', {
                streamId: this._publisher.stream.id,
                type: 'video',
                action: 'highPacketLossStopped',
                packetLossThreshold: this._VideoPacketLossThreshold,
              });
            }
          }
        }
      }
      this.hadPacketLoss = this.hasPacketLoss;
    }
  }

  async startStats(): Promise<void> {
    return new Promise((res, rej) => {
      setInterval(async () => {
        this.simulcastLayers = [];
        this.packetLossArray = [];
        try {
          if (
            typeof this._publisher.getRtcStatsReport !== 'function' ||
            !this._publisher
          ) {
            rej('Invalid publisher');
          }
          const stats = await getRtcStats(this._publisher);
          if (stats && stats.length) {
            this.checkIfQualityLimited(stats);
            this.checkVideoPacketLoss(stats);
            res();
          } else rej('can not start rtcStats');
        } catch (e) {
          rej(e);
        }
      }, this._statsInterval);
    });
  }

  stopStats() {
    clearInterval(this._interval);
    this._interval = null;
  }

  async getCypher(): Promise<string> {
    return new Promise(async (res, rej) => {
      try {
        const stats = await getRtcStats(this._publisher);
        if (!stats) rej('Can not get cypher');
        stats[0].rtcStatsReport.forEach((e: any) => {
          if (e.type === 'transport') {
            res(e.srtpCipher);
          }
        });
      } catch (e) {
        rej(e);
      }
    });
  }

  async getConnectionType(): Promise<string> {
    return new Promise(async (res, rej) => {
      try {
        const stats = await getRtcStats(this._publisher);
        if (!stats) rej('Can not get connection type');
        stats[0].rtcStatsReport.forEach((e: any) => {
          if (e.type === 'local-candidate') {
            if (e.candidateType === 'relay') {
              res(`TURN ${e.relayProtocol}`);
            } else {
              res(e.protocol);
            }
          }
        });
      } catch (e) {
        rej(e);
      }
    });
  }

  /**
   * Pauses all ongoing video stream processing. This should be used when video isn't published to not use the CPU without any need for it.
   */
  pauseStreamProcessing(pause: boolean) {
    console.log('ss');
  }

  /**
   * If the effect is currently applied to the stream returned by the startEffect method.
   */
  //   get effectEnabled(): boolean {}

  /**
   * Enables or disables the effect on the stream returned by the startEffect method. If set to false, the input video track will simply be forwarded to the output.
   * @param enable defines if the effect should be applied to the returned stream
   */
  //   enableEffect(enable: boolean) {
  //     if (this.effectEnabled === enable) return;

  //     this._effectEnabled = enable;
  //     log.debug('effectEnabled changed to', enable);
  //     if (this._outputState !== OutputState.PAUSED)
  //       this.setOutputState(
  //         enable ? OutputState.EFFECT_APPLIED : OutputState.INPUT_FORWARDING
  //       );
  //   }

  private setOutputState(state: OutputState) {
    // this.applyOutputState();
  }

  /**
   * Returns the previously set media stream
   */
  //   public get inputStream(): MediaStream {
  //     return this._inputStream;
  //   }

  /**
   * Sets / changes the input stream to the given stream. The effect will be applied to this stream and then forwarded to the ouput.
   * @param stream the stream to use for the video input
   */

  /**
   * Returns the output stream with the effect applied to it
   */

  public destroy() {
    log.debug('destroy');
  }
}
