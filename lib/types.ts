// /**
//  * @private
//  */
declare global {
  interface Window {
    OT: Object & { RealTimeStats?: any };
  }
}

export type ssrc = number;

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

export type PublisherRtcStatsReportArr = PublisherRtcStatsReport[];

export interface RTCStatsReport {
  forEach(
    callbackfn: (value: any, key: string, parent: RTCStatsReport) => void,
    thisArg?: any
  ): void;
  type: string;
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

export namespace OT {
  /**
   * OpenTok.js Client SDK
   */
  // Publisher;

  export interface Publisher {
    stream?: Stream;
    getRtcStatsReport(
      callback?: (error?: Error, stats?: PublisherRtcStatsReportArr) => void
    ): Promise<PublisherRtcStatsReportArr> | undefined;
  }
}

export interface Stream {
  connection: Connection;
  creationTime: number;
  frameRate: number;
  hasAudio: boolean;
  hasVideo: boolean;
  name: string;
  id: string;
  streamId: string;
  videoDimensions: {
    width: number;
    height: number;
  };
  videoType: 'camera' | 'screen';
}

export interface Connection {
  connectionId: string;
  creationTime: number;
  data: string;
}
