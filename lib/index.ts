import log from 'loglevel';

import { logPublisher, getRtcStats } from './utils/publisher';

import { VideoNetworkQualityStats } from './utils/RealTimeStats';

window.OT = window.OT || {};

if (process.env.NODE_ENV === 'production') {
  log.setLevel('WARN');
}

window.OT.RealTimeStats = {
  logPublisher,
  getRtcStats,
  VideoNetworkQualityStats,
};

export { logPublisher, getRtcStats };
