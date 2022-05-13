export function logPublisher(publisher: any): void {
  console.log(publisher);
}

export async function getRtcStats(publisher: OT.Publisher): Promise<any> {
  return new Promise(async (res, rej) => {
    try {
      const stats = await publisher.getRtcStatsReport();
      res(stats);
      // stats[0].rtcStatsReport.forEach((e: any) => {
      //   if (e.type === 'transport') {
      //     console.log(e.srtpCipher);
      //     res(e.srtpCipher);
      //   }
      // });
    } catch (e) {
      rej(e);
    }
  });
}

export async function getSrtpCipher(stats: any): Promise<string> {
  return new Promise(async (res, rej) => {
    stats[0].rtcStatsReport.forEach((e: any) => {
      if (e.type === 'transport') {
        console.log(e.srtpCipher);
        res(e.srtpCipher);
      }
    });
  });
}
