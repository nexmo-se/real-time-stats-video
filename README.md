# Vonage Video API - Real Time Stats

This library provides a wrapper built on top of [getRtcStatsReport API](https://tokbox.com/developer/sdks/js/reference/Publisher.html#getRtcStatsReport). The library exposes some methods and fires some events upon high packet loss or when the resolution is limited. For now, it only allows you to call the API on the publisher, but the subscribers may follow in the future.

## Prerequisites

- [Vonage Video API SDK](https://www.npmjs.com/package/@opentok/client)

## Installation

### NPM

### Build the library locally

You can build the library locally following these steps:

1. `npm install`
2. `npm run build-umd`
3. `cd sample-app` and `npm install`. The app server will start on port 3000
