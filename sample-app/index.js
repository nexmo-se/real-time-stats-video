'use strict';

const { VideoNetworkQualityStats } = OT.RealTimeStats;

const bootstrap = window.bootstrap;

const stats = new VideoNetworkQualityStats({
  intervalStats: 3000,
  VideoPacketLossThreshold: 2,
});

const apikey = '46469012';
const sessionId = '2_MX40NjQ2OTAxMn5-MTY5NTE5ODQyNTQzMX5NKzkweVhUdzVTNUZkYkErTm5DTXdQS3Z-fn4';
const token =
  'T1==cGFydG5lcl9pZD00NjQ2OTAxMiZzaWc9NTY4MzdkMGEzYzIwYTQzYjEwM2FlMjhkMzAwMTc4MmRhNTRjMGRkYzpzZXNzaW9uX2lkPTJfTVg0ME5qUTJPVEF4TW41LU1UWTVOVEU1T0RReU5UUXpNWDVOS3prd2VWaFVkelZUTlVaa1lrRXJUbTVEVFhkUVMzWi1mbjQmY3JlYXRlX3RpbWU9MTY5NTE5ODQ0NiZub25jZT0wLjQ5NjAxMzMwMDA1MjI1NTMmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY5NTgwMzI0NSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';

const connectionType = document.getElementById('connection__type');
const srtpCipher = document.getElementById('srtp__cipher');
const openToast = (type, message, action) => {
  const toast = type === 'quality' ? document.getElementById('toast') : document.getElementById('toastPacketLoss');
  // const toast = document.getElementById('toast');
  if (action === 'show') {
    toast.classList.add('show');
    const toastBody = type === 'quality' ? document.getElementById('toast-body') : document.getElementById('toast-body-packetLoss');
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
      // resolution: '1280x720',
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
      if (errPublisher) console.error('Error while publishing into the session', errPublisher);
      else {
        console.log('Successfully published the stream');
        // getRtcStats(publisher).then((srtpCypher) => console.log(srtpCypher));
        stats.setPublisher(publisher);
        stats
          .startStats()
          .then(() => {
            stats.on('qualityLimited', (event) => {
              openToast('quality', 'The quality of your video is limited', 'show');
              console.log(event);
            });
            stats.on('qualityLimitedStopped', (event) => {
              openToast('quality', 'The quality of your video is limited', 'hide');
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

            stats.getCipher().then((c) => {
              srtpCipher.innerText = `Srtp cipher : ${c}`;
            });
            stats.getConnectionType().then((c) => {
              connectionType.innerText = `Connection type : ${c}`;
            });
            setInterval(() => {
              const table = document.querySelector('table');
              table.style.display = 'block';
              const bodyTable = document.getElementById('body__table');
              bodyTable.innerHTML = '';
              const layers = stats.getSimulcastLayers();

              if (layers.length) {
                layers.forEach((layer) => {
                  const rowTable = `
                    <tr>
                    <th scope="row">${layer.id}</th>
                    <td>${layer.width}</td>
                    <td>${layer.height}</td>
                    <td>${layer.qualityLimitationReason}</td>
                    <td>${layer.framesPerSecond}</td>
                   `;

                  bodyTable.insertAdjacentHTML('afterbegin', rowTable);
                });
              }
            }, 5000);
          })
          .catch((e) => console.log(e));
      }
    });
  });
}
publishToSession();
