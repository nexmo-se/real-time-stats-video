// /**
//  * @private
//  */
// declare global {
//   interface Window {
//     chrome: any;
//     createTFLiteSIMDModule: () => Promise<any>;
//     OT: Object & { RealTimeStats?: any };
//     OffscreenCanvas: any;
//   }
// }

/*
{10000: 1653990650001.964
10001: 1653990650001.964}
*/
export type ssrc = number;

export type timeStampObject = {
  ssrc: {};
};

export type QualityEvent = {
  streanId: string;
  reason: string;
  targetQuality: string;
};

export type PacketLossEvent = {
  streanId: string;
  type: string;
  packetLoss: number;
};

export interface Event<Type, Target> {
  type: Type;
  cancelable: boolean;
  target: Target;
  isDefaultPrevented(): boolean;
  preventDefault(): void;
}

export interface RealTimeOptions {
  VideoPacketLossThreshold: number;

  frameRateThreshold: number;

  intervalStats: number;

  triggerEvents?: boolean;
}

export interface OTEventEmitter<EventMap> {
  on<EventName extends keyof EventMap>(
    eventName: EventName,
    callback: (event: EventMap[EventName]) => void
  ): void;

  once<EventName extends keyof EventMap>(
    eventName: EventName,
    callback: (event: EventMap[EventName]) => void
  ): void;

  off<EventName extends keyof EventMap>(
    eventName?: EventName,
    callback?: (event: EventMap[EventName]) => void
  ): void;
}

export interface Publisher {
  getRtcStatsReport(
    callback?: (error?: Error, stats?: PublisherRtcStatsReportArr) => void
  ): Promise<PublisherRtcStatsReportArr> | undefined;
}

export type PublisherRtcStatsReportArr = PublisherRtcStatsReport[];

export interface RTCStatsReport {
  forEach(
    callbackfn: (value: any, key: string, parent: RTCStatsReport) => void,
    thisArg?: any
  ): void;
  type: string;
  // roundTripTime: number;
  kind: string;
  ssrc: number;
  roundTripTime: number;
  jitter: number;
  packetsLost: number;
  fractionLost: number;
  frameWidth: number;
  frameHeight: number;
  timestamp: number;
  packetsSent: number;
  bytesSent: number;
  framesPerSecond: number;
  qualityLimitationReason: string;
}

export type PublisherRtcStatsReport = {
  rtcStatsReport: RTCStatsReport;
};
