import log from 'loglevel';

import { getRtcStats } from './utils/publisher';

import { VideoNetworkQualityStats } from './RealTimeStats';

window.OT = window.OT || {};

if (process.env.NODE_ENV === 'production') {
  log.setLevel('WARN');
}

window.OT.RealTimeStats = {
  getRtcStats,
  VideoNetworkQualityStats,
};

export { getRtcStats };
