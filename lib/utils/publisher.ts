import { OT, PublisherRtcStatsReport } from '../types';

export async function getRtcStats(publisher: OT.Publisher): Promise<any> {
  return new Promise(async (res, rej) => {
    try {
      if (typeof publisher.getRtcStatsReport !== 'function') {
        rej('Invalid publisher');
      }
      const stats = await publisher.getRtcStatsReport();
      res(stats);
    } catch (e) {
      rej(e);
    }
  });
}
