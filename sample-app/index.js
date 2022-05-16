'use strict';

const {
  logPublisher,
  getRtcStats,
  VideoNetworkQualityStats,
} = OT.RealTimeStats;
const bootstrap = window.bootstrap;

const stats = new VideoNetworkQualityStats({ intervalStats: 3000 });

const apikey = '47413651';
const sessionId =
  '2_MX40NzQxMzY1MX5-MTY1MjQzNDIxMjgyNn5BcTdJU1duZEZMWlcxVVdSSnNzVFREaUd-fg';
const token =
  'T1==cGFydG5lcl9pZD00NzQxMzY1MSZzaWc9NWRjYzg0NjZiZDFlZDQ5OTcyZWE2OGVkYjA1NDFmNjk2YjhlYWVlMTpzZXNzaW9uX2lkPTJfTVg0ME56UXhNelkxTVg1LU1UWTFNalF6TkRJeE1qZ3lObjVCY1RkSlUxZHVaRVpNV2xjeFZWZFNTbk56VkZSRWFVZC1mZyZjcmVhdGVfdGltZT0xNjUyNDM0MjI2Jm5vbmNlPTAuMDEwNjczMjE1NTM2NTUyNTM4JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2NTMwMzkwMjUmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';

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
        stats.on('udp', (event) => {
          console.log(event);
        });

        stats.getCypher().then((c) => console.log(c));
        stats.getConnectionType().then((c) => console.log(c));
      }
    });
  });
}
publishToSession();
