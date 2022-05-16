import log, { error } from 'loglevel';
import { logPublisher, getRtcStats } from './publisher';
import { EventEmitter } from 'events';

// import {loadTFLite} from './TFLiteLoader';
// import {BackgroundEffect} from './background/backgroundEffect';
// import {supportsDirectForwarding, VideoTrackToCanvas} from './VideoTrackToCanvas';
// import {Dimensions} from '../types';

/**
 * @private
 */
export interface RealTimeOptions {
  /**
   * The assets path where the models and tflite are loaded.
   * These assets can be copied from the `dist/build` folder.
   */
  frameRateThreshold: number;

  /**
   * The output video stream's frame rate in fps
   * @default
   * ```html
   * 30
   * ```
   */
  intervalStats: number;

  /**
   * @private
   */
  triggerEvents?: boolean;
}

enum OutputState {
  /**
   * No output actively being sent
   */
  PAUSED,
  /**
   * The effect is applied to the output
   */
  EFFECT_APPLIED,
  /**
   * The input video is simply forwarded to the output
   */
  INPUT_FORWARDING,
}

export interface VideoNetworkQualityStats {
  on(event: 'qualityLimitated', listener: (reason: string) => void): this; // session connected event
}

export class VideoNetworkQualityStats extends EventEmitter {
  public _publisher: OT.Publisher;
  public _statsInterval: number;
  private _interval: setInterval;
  private prevTimeStamp;
  private prevPacketsSent;
  private simulcastLayers: any;

  constructor(options: RealTimeOptions) {
    super();
    // this._useWasm =
    //   typeof options.useWasm === 'boolean' ? options.useWasm : true;
    this.prevTimeStamp = {};
    this.simulcastLayers = [];
    this.prevPacketsSent = {};
    this._publisher = null;
    this._statsInterval = options.intervalStats;
    this._interval = null;

    // this._maskFrameTimerWorker.onmessage = (e: MessageEvent) => {
    //   if (e.data.id !== TIMEOUT_TICK) return;
    //   this.renderFrame();
    // };
  }

  /**
   * Returns true if the video stream processing is paused
   */
  //   get paused(): boolean {
  //     return this._outputState === OutputState.PAUSED;
  //   }

  setPublisher(publisher: OT.publisher) {
    this._publisher = publisher;
  }

  checkIfQualityLimited(stats: any) {
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
          // this.simulcastLayers.push()
          this.simulcastLayers.forEach((layer) => {
            console.log(layer.qualityLimitationReason != 'none');
            if (layer.qualityLimitationReason !== 'none') {
              this.emit('qualityLimitated', 'test');
            }
          });
          //   console.log(this.simulcastLayers);
        }

        this.prevPacketsSent[e.ssrc] = e.packetsSent;
        this.prevTimeStamp[e.ssrc] = e.timestamp;
        // prevBytesSent[e.ssrc] = e.bytesSent;
      }
    });
  }

  async attachEvents(): Promise<void> {
    // const stats = new EventEmitter();
    // this.on('udp', (reason: string) => console.log(reason));
  }

  startStats() {
    // stats.on('')

    // const stats = new EventEmitter();
    // this.on('udp', (reason: string) => console.log(reason));

    // this.attachEvents().then(() => {
    //   this.emit('udp', 'test');
    // });
    //
    setInterval(async () => {
      this.simulcastLayers = [];
      //   this._publisher.getStats((err: any, resp: any) => {
      //     console.log(resp);
      //   });
      const stats = await getRtcStats(this._publisher);
      this.checkIfQualityLimited(stats);

      //   stats[0].rtcStatsReport.forEach((e: any) => {
      //     if (e.type === 'transport') {
      //       console.log(e.srtpCipher);
      //       this.emit('udp', e.srtpCipher);
      //     }
      //   });
      //   console.log(stats);
      return stats;
    }, this._statsInterval);
  }

  stopStats() {
    clearInterval(this._interval);
    this._interval = null;
  }

  async getCypher(): Promise<string> {
    return new Promise(async (res, rej) => {
      const stats = await getRtcStats(this._publisher);
      stats[0].rtcStatsReport.forEach((e: any) => {
        if (e.type === 'transport') {
          console.log(e.srtpCipher);
          res(e.srtpCipher);
        }
      });
    });
  }

  async getConnectionType(): Promise<string> {
    return new Promise(async (res, rej) => {
      const stats = await getRtcStats(this._publisher);
      stats[0].rtcStatsReport.forEach((e: any) => {
        if (e.type === 'local-candidate') {
          if (e.candidateType === 'relay') {
            res(`TURN ${e.relayProtocol}`);
          } else {
            res(e.protocol);
          }
        }
      });
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
