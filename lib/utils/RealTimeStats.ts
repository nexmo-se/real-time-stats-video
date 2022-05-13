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

export class VideoNetworkQualityStats {
  private readonly _assetsPath: string;
  private readonly _useWasm: boolean;
  public _publisher: OT.Publisher;
  public _statsInterval: number;
  private _interval: setInterval;

  private readonly _inputVideoElement: HTMLVideoElement;
  private readonly _outputCanvasElement: HTMLCanvasElement;
  private readonly _outputCanvasCtx: CanvasRenderingContext2D;

  private readonly _outputFramesPerSecond: number;
  private readonly _maskFrameTimerWorker: any;

  private _inputStream: MediaStream;
  private _inputVideoTrack: MediaStreamTrack;

  constructor(options: RealTimeOptions) {
    // this._useWasm =
    //   typeof options.useWasm === 'boolean' ? options.useWasm : true;
    this._publisher = null;
    this._statsInterval = options.intervalStats;

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

  startStats() {
    setInterval(async () => {
      //   this._publisher.getStats((err: any, resp: any) => {
      //     console.log(resp);
      //   });
      const stats = await getRtcStats(this._publisher);
      console.log(stats);
      return stats;
    }, this._statsInterval);
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
