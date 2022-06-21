!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.RealTimeStats=e():t.RealTimeStats=e()}(self,(()=>(()=>{var t={187:t=>{"use strict";var e,i="object"==typeof Reflect?Reflect:null,s=i&&"function"==typeof i.apply?i.apply:function(t,e,i){return Function.prototype.apply.call(t,e,i)};e=i&&"function"==typeof i.ownKeys?i.ownKeys:Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.getOwnPropertyNames(t)};var n=Number.isNaN||function(t){return t!=t};function o(){o.init.call(this)}t.exports=o,t.exports.once=function(t,e){return new Promise((function(i,s){function n(i){t.removeListener(e,o),s(i)}function o(){"function"==typeof t.removeListener&&t.removeListener("error",n),i([].slice.call(arguments))}v(t,e,o,{once:!0}),"error"!==e&&function(t,e,i){"function"==typeof t.on&&v(t,"error",e,i)}(t,n,{once:!0})}))},o.EventEmitter=o,o.prototype._events=void 0,o.prototype._eventsCount=0,o.prototype._maxListeners=void 0;var r=10;function a(t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t)}function c(t){return void 0===t._maxListeners?o.defaultMaxListeners:t._maxListeners}function l(t,e,i,s){var n,o,r,l;if(a(i),void 0===(o=t._events)?(o=t._events=Object.create(null),t._eventsCount=0):(void 0!==o.newListener&&(t.emit("newListener",e,i.listener?i.listener:i),o=t._events),r=o[e]),void 0===r)r=o[e]=i,++t._eventsCount;else if("function"==typeof r?r=o[e]=s?[i,r]:[r,i]:s?r.unshift(i):r.push(i),(n=c(t))>0&&r.length>n&&!r.warned){r.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+r.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=t,u.type=e,u.count=r.length,l=u,console&&console.warn&&console.warn(l)}return t}function u(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function h(t,e,i){var s={fired:!1,wrapFn:void 0,target:t,type:e,listener:i},n=u.bind(s);return n.listener=i,s.wrapFn=n,n}function p(t,e,i){var s=t._events;if(void 0===s)return[];var n=s[e];return void 0===n?[]:"function"==typeof n?i?[n.listener||n]:[n]:i?function(t){for(var e=new Array(t.length),i=0;i<e.length;++i)e[i]=t[i].listener||t[i];return e}(n):d(n,n.length)}function f(t){var e=this._events;if(void 0!==e){var i=e[t];if("function"==typeof i)return 1;if(void 0!==i)return i.length}return 0}function d(t,e){for(var i=new Array(e),s=0;s<e;++s)i[s]=t[s];return i}function v(t,e,i,s){if("function"==typeof t.on)s.once?t.once(e,i):t.on(e,i);else{if("function"!=typeof t.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof t);t.addEventListener(e,(function n(o){s.once&&t.removeEventListener(e,n),i(o)}))}}Object.defineProperty(o,"defaultMaxListeners",{enumerable:!0,get:function(){return r},set:function(t){if("number"!=typeof t||t<0||n(t))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");r=t}}),o.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},o.prototype.setMaxListeners=function(t){if("number"!=typeof t||t<0||n(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this},o.prototype.getMaxListeners=function(){return c(this)},o.prototype.emit=function(t){for(var e=[],i=1;i<arguments.length;i++)e.push(arguments[i]);var n="error"===t,o=this._events;if(void 0!==o)n=n&&void 0===o.error;else if(!n)return!1;if(n){var r;if(e.length>0&&(r=e[0]),r instanceof Error)throw r;var a=new Error("Unhandled error."+(r?" ("+r.message+")":""));throw a.context=r,a}var c=o[t];if(void 0===c)return!1;if("function"==typeof c)s(c,this,e);else{var l=c.length,u=d(c,l);for(i=0;i<l;++i)s(u[i],this,e)}return!0},o.prototype.addListener=function(t,e){return l(this,t,e,!1)},o.prototype.on=o.prototype.addListener,o.prototype.prependListener=function(t,e){return l(this,t,e,!0)},o.prototype.once=function(t,e){return a(e),this.on(t,h(this,t,e)),this},o.prototype.prependOnceListener=function(t,e){return a(e),this.prependListener(t,h(this,t,e)),this},o.prototype.removeListener=function(t,e){var i,s,n,o,r;if(a(e),void 0===(s=this._events))return this;if(void 0===(i=s[t]))return this;if(i===e||i.listener===e)0==--this._eventsCount?this._events=Object.create(null):(delete s[t],s.removeListener&&this.emit("removeListener",t,i.listener||e));else if("function"!=typeof i){for(n=-1,o=i.length-1;o>=0;o--)if(i[o]===e||i[o].listener===e){r=i[o].listener,n=o;break}if(n<0)return this;0===n?i.shift():function(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}(i,n),1===i.length&&(s[t]=i[0]),void 0!==s.removeListener&&this.emit("removeListener",t,r||e)}return this},o.prototype.off=o.prototype.removeListener,o.prototype.removeAllListeners=function(t){var e,i,s;if(void 0===(i=this._events))return this;if(void 0===i.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==i[t]&&(0==--this._eventsCount?this._events=Object.create(null):delete i[t]),this;if(0===arguments.length){var n,o=Object.keys(i);for(s=0;s<o.length;++s)"removeListener"!==(n=o[s])&&this.removeAllListeners(n);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(e=i[t]))this.removeListener(t,e);else if(void 0!==e)for(s=e.length-1;s>=0;s--)this.removeListener(t,e[s]);return this},o.prototype.listeners=function(t){return p(this,t,!0)},o.prototype.rawListeners=function(t){return p(this,t,!1)},o.listenerCount=function(t,e){return"function"==typeof t.listenerCount?t.listenerCount(e):f.call(t,e)},o.prototype.listenerCount=f,o.prototype.eventNames=function(){return this._eventsCount>0?e(this._events):[]}},43:function(t,e,i){var s,n;!function(o,r){"use strict";s=function(){var t=function(){},e="undefined",i=typeof window!==e&&typeof window.navigator!==e&&/Trident\/|MSIE /.test(window.navigator.userAgent),s=["trace","debug","info","warn","error"];function n(t,e){var i=t[e];if("function"==typeof i.bind)return i.bind(t);try{return Function.prototype.bind.call(i,t)}catch(e){return function(){return Function.prototype.apply.apply(i,[t,arguments])}}}function o(){console.log&&(console.log.apply?console.log.apply(console,arguments):Function.prototype.apply.apply(console.log,[console,arguments])),console.trace&&console.trace()}function r(s){return"debug"===s&&(s="log"),typeof console!==e&&("trace"===s&&i?o:void 0!==console[s]?n(console,s):void 0!==console.log?n(console,"log"):t)}function a(e,i){for(var n=0;n<s.length;n++){var o=s[n];this[o]=n<e?t:this.methodFactory(o,e,i)}this.log=this.debug}function c(t,i,s){return function(){typeof console!==e&&(a.call(this,i,s),this[t].apply(this,arguments))}}function l(t,e,i){return r(t)||c.apply(this,arguments)}function u(t,i,n){var o,r=this;i=null==i?"WARN":i;var c="loglevel";function u(t){var i=(s[t]||"silent").toUpperCase();if(typeof window!==e&&c){try{return void(window.localStorage[c]=i)}catch(t){}try{window.document.cookie=encodeURIComponent(c)+"="+i+";"}catch(t){}}}function h(){var t;if(typeof window!==e&&c){try{t=window.localStorage[c]}catch(t){}if(typeof t===e)try{var i=window.document.cookie,s=i.indexOf(encodeURIComponent(c)+"=");-1!==s&&(t=/^([^;]+)/.exec(i.slice(s))[1])}catch(t){}return void 0===r.levels[t]&&(t=void 0),t}}function p(){if(typeof window!==e&&c){try{return void window.localStorage.removeItem(c)}catch(t){}try{window.document.cookie=encodeURIComponent(c)+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"}catch(t){}}}"string"==typeof t?c+=":"+t:"symbol"==typeof t&&(c=void 0),r.name=t,r.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},r.methodFactory=n||l,r.getLevel=function(){return o},r.setLevel=function(i,s){if("string"==typeof i&&void 0!==r.levels[i.toUpperCase()]&&(i=r.levels[i.toUpperCase()]),!("number"==typeof i&&i>=0&&i<=r.levels.SILENT))throw"log.setLevel() called with invalid level: "+i;if(o=i,!1!==s&&u(i),a.call(r,i,t),typeof console===e&&i<r.levels.SILENT)return"No console available for logging"},r.setDefaultLevel=function(t){i=t,h()||r.setLevel(t,!1)},r.resetLevel=function(){r.setLevel(i,!1),p()},r.enableAll=function(t){r.setLevel(r.levels.TRACE,t)},r.disableAll=function(t){r.setLevel(r.levels.SILENT,t)};var f=h();null==f&&(f=i),r.setLevel(f,!1)}var h=new u,p={};h.getLogger=function(t){if("symbol"!=typeof t&&"string"!=typeof t||""===t)throw new TypeError("You must supply a name when creating a logger.");var e=p[t];return e||(e=p[t]=new u(t,h.getLevel(),h.methodFactory)),e};var f=typeof window!==e?window.log:void 0;return h.noConflict=function(){return typeof window!==e&&window.log===h&&(window.log=f),h},h.getLoggers=function(){return p},h.default=h,h},void 0===(n="function"==typeof s?s.call(e,i,e,t):s)||(t.exports=n)}()},239:(t,e,i)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VideoNetworkQualityStats=void 0;const s=i(436),n=i(187);class o extends n.EventEmitter{constructor(t){super(),this.prevTimeStamp={},this.simulcastLayers=[],this.prevPacketsSent={},this._publisher,this._statsInterval=t.intervalStats||5e3,this._VideoPacketLossThreshold=5|t.VideoPacketLossThreshold,this._interval=null,this.isQualityLimited=!1,this.wasQualityLimited=!1,this.hasPacketLoss=!1,this.hadPacketLoss=!1,this.prevPacketsSent={},this.prevPacketsLost={},this.packetLossArray=[],this.layersWithPacketLoss=[]}setPublisher(t){this._publisher=t}getSimulcastLayers(){return this.simulcastLayers.length?this.simulcastLayers:new Error("no simulcast layers found")}checkIfQualityLimited(t){t[0].rtcStatsReport.forEach((t=>{if("outbound-rtp"===t.type&&"video"===t.kind){if(this.prevTimeStamp[t.ssrc]&&this.prevPacketsSent[t.ssrc]){const e=t.timestamp-this.prevTimeStamp[t.ssrc],i=8*(t.bytesSent-this.prevPacketsSent[t.ssrc])/e;if(t.framesPerSecond){const e={width:t.frameWidth,height:t.frameHeight,framesPerSecond:t.framesPerSecond,qualityLimitationReason:t.qualityLimitationReason,id:t.ssrc,bytes:i,packetsDiff:t.packetsSent-this.prevPacketsSent[t.ssrc]};this.simulcastLayers=[...this.simulcastLayers,e],this.simulcastLayers.forEach((t=>{var e,i,s,n;"none"===t.qualityLimitationReason||!1!==this.isQualityLimited||this.wasQualityLimited?this.wasQualityLimited&&"none"===t.qualityLimitationReason&&this.isQualityLimited&&(this.isQualityLimited=!1,this.emit("qualityLimitedStopped",{streamId:null===(n=null===(s=this._publisher)||void 0===s?void 0:s.stream)||void 0===n?void 0:n.id,reason:t.qualityLimitationReason})):(this.isQualityLimited=!0,this.emit("qualityLimited",{streamId:null===(i=null===(e=this._publisher)||void 0===e?void 0:e.stream)||void 0===i?void 0:i.id,reason:t.qualityLimitationReason,id:t.id,currentResolution:`${t.width}X${t.height}`}))}))}}this.prevPacketsSent[t.ssrc]=t.packetsSent,this.prevTimeStamp[t.ssrc]=t.timestamp,this.wasQualityLimited=this.isQualityLimited}}))}checkVideoPacketLoss(t){t[0].rtcStatsReport.forEach((t=>{if("remote-inbound-rtp"===t.type&&"video"===t.kind){const e={ssrc:t.ssrc,rtt:t.roundTripTime,jitter:t.jitter,packetLostFraction:100*t.fractionLost,packetsLostDiff:t.packetsLost-this.prevPacketsLost[t.ssrc]};this.packetLossArray=[...this.packetLossArray,e],this.prevPacketsLost[t.ssrc]=t.packetsLost,this.mergeArrays()}}))}mergeArrays(){var t,e,i,s;if(this.packetLossArray&&this.simulcastLayers.length){this.layersWithPacketLoss=[];for(let n of this.simulcastLayers)for(let o of this.packetLossArray)if(n.id===o.ssrc&&n.framesPerSecond){const r=n.packetsDiff+o.packetsLostDiff,a=o.packetsLostDiff/r,c=Object.assign({rtt:o.rtt,jitter:o.jitter,packetLost:100*a},n);this.layersWithPacketLoss=[...this.layersWithPacketLoss,c];const l=Math.max.apply(Math,this.layersWithPacketLoss.map((function(t){return t.id}))),u=this.layersWithPacketLoss.find((function(t){return t.id==l}));u.packetLost>=this._VideoPacketLossThreshold&&!this.hadPacketLoss&&!this.hasPacketLoss?(this.hasPacketLoss=!0,this.emit("highPacketLoss",{streamId:null===(e=null===(t=this._publisher)||void 0===t?void 0:t.stream)||void 0===e?void 0:e.id,type:"video",action:"highPacketLossDetected",packetLossThreshold:this._VideoPacketLossThreshold})):this.hadPacketLoss&&this.hasPacketLoss&&u.packetLost<this._VideoPacketLossThreshold&&(this.hasPacketLoss=!1,this.emit("highPacketLossStopped",{streamId:null===(s=null===(i=this._publisher)||void 0===i?void 0:i.stream)||void 0===s?void 0:s.id,type:"video",action:"highPacketLossStopped",packetLossThreshold:this._VideoPacketLossThreshold}))}this.hadPacketLoss=this.hasPacketLoss}}async startStats(){return new Promise(((t,e)=>{setInterval((async()=>{this.simulcastLayers=[],this.packetLossArray=[];try{"function"==typeof this._publisher.getRtcStatsReport&&this._publisher||e("Invalid publisher");const i=await(0,s.getRtcStats)(this._publisher);i&&i.length?(/chrome/i.test(navigator.userAgent)&&this.checkIfQualityLimited(i),this.checkVideoPacketLoss(i),t()):e("can not start rtcStats")}catch(t){e(t)}}),this._statsInterval)}))}stopStats(){clearInterval(this._interval),this._interval=null}async getCipher(){return new Promise((async(t,e)=>{try{const i=await(0,s.getRtcStats)(this._publisher);i||e("Can not get cypher"),i[0].rtcStatsReport.forEach((e=>{"transport"===e.type&&t(e.srtpCipher)}))}catch(t){e(t)}}))}async getConnectionType(){return new Promise((async(t,e)=>{try{const i=await(0,s.getRtcStats)(this._publisher);i||e("Can not get connection type"),i[0].rtcStatsReport.forEach((e=>{"local-candidate"===e.type&&("relay"===e.candidateType?t(`TURN ${e.relayProtocol}`):t(e.protocol))}))}catch(t){e(t)}}))}}e.VideoNetworkQualityStats=o},436:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getRtcStats=void 0,e.getRtcStats=async function(t){return new Promise((async(e,i)=>{try{"function"!=typeof t.getRtcStatsReport&&i("Invalid publisher");e(await t.getRtcStatsReport())}catch(t){i(t)}}))}}},e={};function i(s){var n=e[s];if(void 0!==n)return n.exports;var o=e[s]={exports:{}};return t[s].call(o.exports,o,o.exports,i),o.exports}var s={};return(()=>{"use strict";var t=s;Object.defineProperty(t,"__esModule",{value:!0}),t.VideoNetworkQualityStats=void 0;const e=i(43),n=i(239);Object.defineProperty(t,"VideoNetworkQualityStats",{enumerable:!0,get:function(){return n.VideoNetworkQualityStats}}),window.OT=window.OT||{},e.default.setLevel("WARN"),window.OT.RealTimeStats={VideoNetworkQualityStats:n.VideoNetworkQualityStats}})(),s})()));
//# sourceMappingURL=vonage-real-time-stats.js.map