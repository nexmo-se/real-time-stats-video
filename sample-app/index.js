'use strict';

const {
  logPublisher,
  getRtcStats,
  VideoNetworkQualityStats,
} = OT.RealTimeStats;

const bootstrap = window.bootstrap;

const stats = new VideoNetworkQualityStats({ intervalStats: 3000 });

const apikey = '46264952';
const sessionId =
  '2_MX40NjI2NDk1Mn5-MTY1MjcxNDg0NjE2N350RnNHckVXalZLV0ZUbGRTTUEvWi8vcXN-fg';
const token =
  'T1==cGFydG5lcl9pZD00NjI2NDk1MiZzaWc9MTM0Nzg3NmNiZjUwMzkwN2ZlYjE2YjhmY2Y5YzhiMTZhMGYzZGI1YTpzZXNzaW9uX2lkPTJfTVg0ME5qSTJORGsxTW41LU1UWTFNamN4TkRnME5qRTJOMzUwUm5OSGNrVlhhbFpMVjBaVWJHUlRUVUV2V2k4dmNYTi1mZyZjcmVhdGVfdGltZT0xNjUyNzE0ODU2Jm5vbmNlPTAuNjc1MzY4NDQ4NDk2MzgyNyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjUyODAxMjU1JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';

const openToast = (message, action) => {
  const toast = document.getElementById('toast');
  if (action === 'show') {
    toast.classList.add('show');
    const toastBody = document.getElementById('toast-body');
    toastBody.innerText = message;
  } else {
    toast.classList.remove('show');
  }
};

async function getLocalMedia() {
  try {
    //return await OT.getUserMedia({audioSource: null, videoSource: true});
    return await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
  } catch (err) {
    console.error('OTGetUserMedia - err', err);
  }
}

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
  const session = OT.initSession(apikey, sessionId);
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

        getRtcStats(publisher).then((srtpCypher) => console.log(srtpCypher));
        stats.setPublisher(publisher);
        stats.startStats();
        stats.on('qualityLimitated', (event) => {
          openToast('You may face quality issues', 'show');
          console.log(event);
        });
        stats.on('qualityLimitatedStopped', (event) => {
          openToast('You may face quality issues', 'hide');
          console.log(event);
        });

        stats.getCypher().then((c) => console.log(c));
        stats.getConnectionType().then((c) => console.log(c));
      }
    });
  });
}
publishToSession();
