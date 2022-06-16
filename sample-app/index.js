'use strict';

const {
  logPublisher,
  getRtcStats,
  VideoNetworkQualityStats,
} = OT.RealTimeStats;

const bootstrap = window.bootstrap;

const stats = new VideoNetworkQualityStats({
  intervalStats: 3000,
  VideoPacketLossThreshold: 5,
});

const apikey = '46264952';
const sessionId =
  '1_MX40NjI2NDk1Mn5-MTY1MzU2MzM4ODk0M35ObE1NOUx3WDl1bm9KckU5b01JVDZ1a1d-fg';
const token =
  'T1==cGFydG5lcl9pZD00NjI2NDk1MiZzaWc9ZDE0ZWM5MjFhZDZjNzk5MWU4MzI3NWNjNmZiN2FjYjMwYTFiM2NlNDpzZXNzaW9uX2lkPTFfTVg0ME5qSTJORGsxTW41LU1UWTFNelUyTXpNNE9EazBNMzVPYkUxTk9VeDNXRGwxYm05S2NrVTViMDFKVkRaMWExZC1mZyZjcmVhdGVfdGltZT0xNjUzNTYzNDAwJm5vbmNlPTAuMzM1OTQ1MTMxMzg5NzAxMDYmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY1NjE1NTQwMCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';

const openToast = (type, message, action) => {
  const toast =
    type === 'quality'
      ? document.getElementById('toast')
      : document.getElementById('toastPacketLoss');
  // const toast = document.getElementById('toast');
  if (action === 'show') {
    toast.classList.add('show');
    const toastBody =
      type === 'quality'
        ? document.getElementById('toast-body')
        : document.getElementById('toast-body-packetLoss');
    toastBody.innerText = message;
  } else {
    toast.classList.remove('show');
  }
};

async function publishToSession() {
  // Create the publisher and publish into the session
  let publisher = OT.initPublisher(
    'publisher',
    {
      //   videoSource: effectProcessor.outputStream.getVideoTracks()[0],
      width: 640,
      height: 480,
      publishAudio: false,
      publishVideo: true,
      insertMode: 'append',
    },
    (err) => {
      if (err) console.error('Error publishing:', err);
      else {
        console.log('Publisher Created');
      }
    }
  );
  const session = OT.initSession(
    apikey,
    sessionId
    //   {
    //   iceConfig: {
    //     includeServers: 'all',
    //     transportPolicy: 'relay',
    //     customServers: [
    //       {
    //         urls: [],
    //       },
    //     ],
    //   },
    // }
  );
  session.on('streamCreated', (stream) => {
    session.subscribe(stream, (err) => {
      if (err) console.error('Error while subscribing', err);
      else console.log('Subscribed to ', stream);
    });
  });

  session.connect(token, (err) => {
    if (err) {
      console.error('Error while connecting to the session falling', err);
      return;
    }
    console.log('Session Connected');

    session.publish(publisher, (errPublisher) => {
      if (errPublisher)
        console.error('Error while publishing into the session', errPublisher);
      else {
        console.log('Successfully published the stream');
        // getRtcStats(publisher).then((srtpCypher) => console.log(srtpCypher));
        stats.setPublisher(publisher);
        stats
          .startStats()
          .then(() => {
            stats.on('qualityLimitated', (event) => {
              openToast(
                'quality',
                'The quality of your video is limited',
                'show'
              );
              console.log(event);
            });
            stats.on('qualityLimitatedStopped', (event) => {
              openToast(
                'quality',
                'The quality of your video is limited',
                'hide'
              );
              console.log(event);
            });
            stats.on('highPacketLoss', (event) => {
              openToast('packetLoss', 'You may face quality issues', 'show');
              console.log(event);
            });
            stats.on('highPacketLossStopped', (event) => {
              openToast('packetLoss', 'You may face quality issues', 'hide');
              console.log(event);
            });

            stats.getCypher().then((c) => console.log(c));
            stats.getConnectionType().then((c) => console.log(c));
          })
          .catch((e) => console.log(e));
      }
    });
  });
}
publishToSession();
