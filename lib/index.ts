import log from 'loglevel';

import { logPublisher } from './utils/publisher';

window.OT = window.OT || {};

if (process.env.NODE_ENV === 'production') {
  log.setLevel('WARN');
}

window.OT.RealTimeStats = {
  logPublisher,
};

export { logPublisher };
