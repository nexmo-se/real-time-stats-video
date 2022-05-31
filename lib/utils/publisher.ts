import { Publisher } from '../types';

export function logPublisher(publisher: any): void {
  console.log(publisher);
}

export async function getRtcStats(publisher: Publisher): Promise<any> {
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

export async function getSrtpCipher(stats: any): Promise<string> {
  return new Promise(async (res, rej) => {
    if (stats) {
      stats[0].rtcStatsReport.forEach((e: any) => {
        if (e.type === 'transport') {
          console.log(e.srtpCipher);
          res(e.srtpCipher);
        }
      });
    } else {
      rej(`can't get cypher`);
    }
  });
}
