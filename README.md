# Vonage Video API - Real Time Stats

This library provides a wrapper built on top of [getRtcStatsReport API](https://tokbox.com/developer/sdks/js/reference/Publisher.html#getRtcStatsReport). The library exposes some methods and fires some events upon high packet loss or when the resolution is limited. For now, it only provides data on the publisher, but the subscribers may follow in the future.

## Limitations

The field `qualityLimitationReason` (https://developer.mozilla.org/en-US/docs/Web/API/RTCOutboundRtpStreamStats/qualityLimitationReason) does not exist on Firefox. This means that the `qualityLimited` event won't fire up in Firefox.

## Prerequisites

- [Vonage Video API SDK](https://www.npmjs.com/package/@opentok/client)

## Installation

### NPM

You can install directly from npm.

```
npm install @vonage/video-effects
```

Using this method, you can import `vonage-video-effects` like so:

```ts
import * as  from '';
```

### Script tag

You can also copy `vonage-real-time-stats.js` from the `dist/build` folder and include it directly in your web app using
a `<script>` tag.

```html
<script src="https://my-server-path/vonage-real-time-stats.js"></script>
```

Using this method, `vonage-real-time-stats.js` will set a browser global:

```ts
const VideoNetworkQualityStats = OT.RealTimeStats;
```

### Build the library locally

You can build the library locally following these steps:

1. `npm install`
2. `npm run build-umd`
3. `cd sample-app` and `npm install`. The app server will start on port 3000

### VideoNetworkQualityStats

The VideoNetworkQualityStats initialises the library.
The constructor has the following options:

| Option                   | Type   | Required | Description                                                                   |
| ------------------------ | ------ | -------- | ----------------------------------------------------------------------------- |
| intervalStats            | Number | Yes      | The interval at which get stats will be called in milleseconds (default 5000) |
| VideoPacketLossThreshold | Number | Yes      | The threshold value for video packet loss in percentage (default 5%)          |

Example:

```js
const stats = new VideoNetworkQualityStats({
  intervalStats: 3000,
  VideoPacketLossThreshold: 5,
});
```

### Events

#### Events in stats

**qualityLimited**: This event fires when the resolution of the publisher is limited due to bandwidth or CPU.The event contains the reason, the streamId and the current resolution of the publisher

```js
stats.on('qualityLimited', (event) => {
  //console.log(`The quality of stream ${event.streamId} is limited due to ${event.reason}. Your current resolution is ${event.currentResolution}`)
  //Update user interface letting the user know that the resolution they are sending is limited
});
```

**qualityLimitedStopped**: This event fires when the resolution of the publisher is no longer limited due to bandwidth or CPU.

```js
stats.on('qualityLimitedStopped', (event) => {
  //console.log(`The quality of stream ${event.streamId} is no longer limited due to ${event.reason}.
  //Update user interface letting the user know that the resolution they are sending is no longer limited
});
```

**highPacketLoss**: This event fires when the video packet loss reaches the threshold configured when initialising the stats object.

```js
stats.on('highPacketLoss', (event) => {
  //console.log(`Packet loss over ${event.packetLossThreshold}% detected in stream ${event.streamId}`).
  //Update user interface letting the user know that they are having packet loss
});
```

**highPacketLossStopped**: This event fires when there was packet loss and now the packet loss value does not reach the threshold

```js
stats.on('highPacketLossStopped', (event) => {
  //console.log(`Packet loss is now below ${event.packetLossThreshold}%  in stream ${event.streamId}`).
  //Update user interface letting the user know that they are no longer having packet loss
});
```

### Example

```js
const { VideoNetworkQualityStats } = OT.RealTimeStats;

const stats = new VideoNetworkQualityStats({
  intervalStats: 3000,
  VideoPacketLossThreshold: 5,
});

async function publishToSession() {
  // Create the publisher and publish into the session
  let publisher = OT.initPublisher(
    'publisher',
    {
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
        stats.setPublisher(publisher);
        stats
          .startStats()
          .then(() => {
            stats.on('qualityLimited', (event) => {
              //Update user interface
              openToast(
                'quality',
                'The quality of your video is limited',
                'show'
              );
            });
            stats.on('qualityLimitedStopped', (event) => {
              // Update user interface
              openToast(
                'quality',
                'The quality of your video is limited',
                'hide'
              );
              console.log(event);
            });
            stats.on('highPacketLoss', (event) => {
              //Update user interface
              openToast('packetLoss', 'You may face quality issues', 'show');
            });
            stats.on('highPacketLossStopped', (event) => {
              //Update user interface
              openToast('packetLoss', 'You may face quality issues', 'hide');
            });

            stats.getCipher().then((srtpCipher) => console.log(srtpCipher));
            stats
              .getConnectionType()
              .then((connectionType) => console.log(connectionType));
          })
          .catch((e) => console.log(e));
      }
    });
  });
}

publishToSession();
```
