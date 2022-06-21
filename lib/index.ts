import { getRtcStats } from './utils/publisher';

import { VideoNetworkQualityStats } from './RealTimeStats';

window.OT = window.OT || {};

window.OT.RealTimeStats = {
  VideoNetworkQualityStats,
};

export { VideoNetworkQualityStats };
