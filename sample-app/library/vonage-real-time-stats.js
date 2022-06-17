!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.RealTimeStats=e():t.RealTimeStats=e()}(self,(()=>(()=>{var t={187:t=>{"use strict";var e,i="object"==typeof Reflect?Reflect:null,s=i&&"function"==typeof i.apply?i.apply:function(t,e,i){return Function.prototype.apply.call(t,e,i)};e=i&&"function"==typeof i.ownKeys?i.ownKeys:Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.getOwnPropertyNames(t)};var n=Number.isNaN||function(t){return t!=t};function r(){r.init.call(this)}t.exports=r,t.exports.once=function(t,e){return new Promise((function(i,s){function n(i){t.removeListener(e,r),s(i)}function r(){"function"==typeof t.removeListener&&t.removeListener("error",n),i([].slice.call(arguments))}v(t,e,r,{once:!0}),"error"!==e&&function(t,e,i){"function"==typeof t.on&&v(t,"error",e,i)}(t,n,{once:!0})}))},r.EventEmitter=r,r.prototype._events=void 0,r.prototype._eventsCount=0,r.prototype._maxListeners=void 0;var o=10;function a(t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t)}function c(t){return void 0===t._maxListeners?r.defaultMaxListeners:t._maxListeners}function l(t,e,i,s){var n,r,o,l;if(a(i),void 0===(r=t._events)?(r=t._events=Object.create(null),t._eventsCount=0):(void 0!==r.newListener&&(t.emit("newListener",e,i.listener?i.listener:i),r=t._events),o=r[e]),void 0===o)o=r[e]=i,++t._eventsCount;else if("function"==typeof o?o=r[e]=s?[i,o]:[o,i]:s?o.unshift(i):o.push(i),(n=c(t))>0&&o.length>n&&!o.warned){o.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+o.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=t,u.type=e,u.count=o.length,l=u,console&&console.warn&&console.warn(l)}return t}function u(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function h(t,e,i){var s={fired:!1,wrapFn:void 0,target:t,type:e,listener:i},n=u.bind(s);return n.listener=i,s.wrapFn=n,n}function p(t,e,i){var s=t._events;if(void 0===s)return[];var n=s[e];return void 0===n?[]:"function"==typeof n?i?[n.listener||n]:[n]:i?function(t){for(var e=new Array(t.length),i=0;i<e.length;++i)e[i]=t[i].listener||t[i];return e}(n):d(n,n.length)}function f(t){var e=this._events;if(void 0!==e){var i=e[t];if("function"==typeof i)return 1;if(void 0!==i)return i.length}return 0}function d(t,e){for(var i=new Array(e),s=0;s<e;++s)i[s]=t[s];return i}function v(t,e,i,s){if("function"==typeof t.on)s.once?t.once(e,i):t.on(e,i);else{if("function"!=typeof t.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof t);t.addEventListener(e,(function n(r){s.once&&t.removeEventListener(e,n),i(r)}))}}Object.defineProperty(r,"defaultMaxListeners",{enumerable:!0,get:function(){return o},set:function(t){if("number"!=typeof t||t<0||n(t))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");o=t}}),r.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},r.prototype.setMaxListeners=function(t){if("number"!=typeof t||t<0||n(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this},r.prototype.getMaxListeners=function(){return c(this)},r.prototype.emit=function(t){for(var e=[],i=1;i<arguments.length;i++)e.push(arguments[i]);var n="error"===t,r=this._events;if(void 0!==r)n=n&&void 0===r.error;else if(!n)return!1;if(n){var o;if(e.length>0&&(o=e[0]),o instanceof Error)throw o;var a=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw a.context=o,a}var c=r[t];if(void 0===c)return!1;if("function"==typeof c)s(c,this,e);else{var l=c.length,u=d(c,l);for(i=0;i<l;++i)s(u[i],this,e)}return!0},r.prototype.addListener=function(t,e){return l(this,t,e,!1)},r.prototype.on=r.prototype.addListener,r.prototype.prependListener=function(t,e){return l(this,t,e,!0)},r.prototype.once=function(t,e){return a(e),this.on(t,h(this,t,e)),this},r.prototype.prependOnceListener=function(t,e){return a(e),this.prependListener(t,h(this,t,e)),this},r.prototype.removeListener=function(t,e){var i,s,n,r,o;if(a(e),void 0===(s=this._events))return this;if(void 0===(i=s[t]))return this;if(i===e||i.listener===e)0==--this._eventsCount?this._events=Object.create(null):(delete s[t],s.removeListener&&this.emit("removeListener",t,i.listener||e));else if("function"!=typeof i){for(n=-1,r=i.length-1;r>=0;r--)if(i[r]===e||i[r].listener===e){o=i[r].listener,n=r;break}if(n<0)return this;0===n?i.shift():function(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}(i,n),1===i.length&&(s[t]=i[0]),void 0!==s.removeListener&&this.emit("removeListener",t,o||e)}return this},r.prototype.off=r.prototype.removeListener,r.prototype.removeAllListeners=function(t){var e,i,s;if(void 0===(i=this._events))return this;if(void 0===i.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==i[t]&&(0==--this._eventsCount?this._events=Object.create(null):delete i[t]),this;if(0===arguments.length){var n,r=Object.keys(i);for(s=0;s<r.length;++s)"removeListener"!==(n=r[s])&&this.removeAllListeners(n);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(e=i[t]))this.removeListener(t,e);else if(void 0!==e)for(s=e.length-1;s>=0;s--)this.removeListener(t,e[s]);return this},r.prototype.listeners=function(t){return p(this,t,!0)},r.prototype.rawListeners=function(t){return p(this,t,!1)},r.listenerCount=function(t,e){return"function"==typeof t.listenerCount?t.listenerCount(e):f.call(t,e)},r.prototype.listenerCount=f,r.prototype.eventNames=function(){return this._eventsCount>0?e(this._events):[]}},43:function(t,e,i){var s,n;!function(r,o){"use strict";s=function(){var t=function(){},e="undefined",i=typeof window!==e&&typeof window.navigator!==e&&/Trident\/|MSIE /.test(window.navigator.userAgent),s=["trace","debug","info","warn","error"];function n(t,e){var i=t[e];if("function"==typeof i.bind)return i.bind(t);try{return Function.prototype.bind.call(i,t)}catch(e){return function(){return Function.prototype.apply.apply(i,[t,arguments])}}}function r(){console.log&&(console.log.apply?console.log.apply(console,arguments):Function.prototype.apply.apply(console.log,[console,arguments])),console.trace&&console.trace()}function o(s){return"debug"===s&&(s="log"),typeof console!==e&&("trace"===s&&i?r:void 0!==console[s]?n(console,s):void 0!==console.log?n(console,"log"):t)}function a(e,i){for(var n=0;n<s.length;n++){var r=s[n];this[r]=n<e?t:this.methodFactory(r,e,i)}this.log=this.debug}function c(t,i,s){return function(){typeof console!==e&&(a.call(this,i,s),this[t].apply(this,arguments))}}function l(t,e,i){return o(t)||c.apply(this,arguments)}function u(t,i,n){var r,o=this;i=null==i?"WARN":i;var c="loglevel";function u(t){var i=(s[t]||"silent").toUpperCase();if(typeof window!==e&&c){try{return void(window.localStorage[c]=i)}catch(t){}try{window.document.cookie=encodeURIComponent(c)+"="+i+";"}catch(t){}}}function h(){var t;if(typeof window!==e&&c){try{t=window.localStorage[c]}catch(t){}if(typeof t===e)try{var i=window.document.cookie,s=i.indexOf(encodeURIComponent(c)+"=");-1!==s&&(t=/^([^;]+)/.exec(i.slice(s))[1])}catch(t){}return void 0===o.levels[t]&&(t=void 0),t}}function p(){if(typeof window!==e&&c){try{return void window.localStorage.removeItem(c)}catch(t){}try{window.document.cookie=encodeURIComponent(c)+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"}catch(t){}}}"string"==typeof t?c+=":"+t:"symbol"==typeof t&&(c=void 0),o.name=t,o.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},o.methodFactory=n||l,o.getLevel=function(){return r},o.setLevel=function(i,s){if("string"==typeof i&&void 0!==o.levels[i.toUpperCase()]&&(i=o.levels[i.toUpperCase()]),!("number"==typeof i&&i>=0&&i<=o.levels.SILENT))throw"log.setLevel() called with invalid level: "+i;if(r=i,!1!==s&&u(i),a.call(o,i,t),typeof console===e&&i<o.levels.SILENT)return"No console available for logging"},o.setDefaultLevel=function(t){i=t,h()||o.setLevel(t,!1)},o.resetLevel=function(){o.setLevel(i,!1),p()},o.enableAll=function(t){o.setLevel(o.levels.TRACE,t)},o.disableAll=function(t){o.setLevel(o.levels.SILENT,t)};var f=h();null==f&&(f=i),o.setLevel(f,!1)}var h=new u,p={};h.getLogger=function(t){if("symbol"!=typeof t&&"string"!=typeof t||""===t)throw new TypeError("You must supply a name when creating a logger.");var e=p[t];return e||(e=p[t]=new u(t,h.getLevel(),h.methodFactory)),e};var f=typeof window!==e?window.log:void 0;return h.noConflict=function(){return typeof window!==e&&window.log===h&&(window.log=f),h},h.getLoggers=function(){return p},h.default=h,h},void 0===(n="function"==typeof s?s.call(e,i,e,t):s)||(t.exports=n)}()},239:(t,e,i)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VideoNetworkQualityStats=void 0;const s=i(43),n=i(436),r=i(187);class o extends r.EventEmitter{constructor(t){super(),this.prevTimeStamp={},this.prevPacketsSent={},this.prevPacketsLost={},this.prevTimeStamp={},this.simulcastLayers=[],this.prevPacketsSent={},this._publisher=null,this._statsInterval=t.intervalStats||5e3,this._VideoPacketLossThreshold=5|t.VideoPacketLossThreshold,this._interval=null,this.isQualityLimited=!1,this.wasQualityLimited=!1,this.hasPacketLoss=!1,this.hadPacketLoss=!1,this.prevPacketsSent={},this.prevPacketsLost={},this.packetLossArray=[],this.layersWithPacketLoss=[]}setPublisher(t){this._publisher=t}checkIfQualityLimited(t){t[0].rtcStatsReport.forEach((t=>{if("outbound-rtp"===t.type&&"video"===t.kind){if(this.prevTimeStamp[t.ssrc]&&this.prevPacketsSent[t.ssrc]){const e=t.timestamp-this.prevTimeStamp[t.ssrc],i=8*(t.bytesSent-this.prevPacketsSent[t.ssrc])/e,s={width:t.frameWidth,height:t.frameHeight,framesPerSecond:t.framesPerSecond,qualityLimitationReason:t.qualityLimitationReason,id:t.ssrc,bytes:i,packetsDiff:t.packetsSent-this.prevPacketsSent[t.ssrc]};this.simulcastLayers=[...this.simulcastLayers,s],this.simulcastLayers.forEach((t=>{"none"===t.qualityLimitationReason||!1!==this.isQualityLimited||this.wasQualityLimited?this.wasQualityLimited&&"none"===t.qualityLimitationReason&&this.isQualityLimited&&(this.isQualityLimited=!1,this.emit("qualityLimitedStopped",{streamId:this._publisher.stream.id,reason:t.qualityLimitationReason})):(this.isQualityLimited=!0,this.emit("qualityLimited",{streamId:this._publisher.stream.id,reason:t.qualityLimitationReason,id:t.id,currentResolution:`${t.width}X${t.height}`}))}))}this.prevPacketsSent[t.ssrc]=t.packetsSent,this.prevTimeStamp[t.ssrc]=t.timestamp,this.wasQualityLimited=this.isQualityLimited}}))}checkVideoPacketLoss(t){t[0].rtcStatsReport.forEach((t=>{if("remote-inbound-rtp"===t.type&&"video"===t.kind){const e={ssrc:t.ssrc,rtt:t.roundTripTime,jitter:t.jitter,packetLostFraction:100*t.fractionLost,packetsLostDiff:t.packetsLost-this.prevPacketsLost[t.ssrc]};this.packetLossArray=[...this.packetLossArray,e],this.prevPacketsLost[t.ssrc]=t.packetsLost,this.mergeArrays()}}))}mergeArrays(){if(this.packetLossArray&&this.simulcastLayers.length){this.layersWithPacketLoss=[];for(let t of this.simulcastLayers)for(let e of this.packetLossArray)if(t.id===e.ssrc&&t.framesPerSecond){const i=t.packetsDiff+e.packetsLostDiff,s=e.packetsLostDiff/i,n=Object.assign({rtt:e.rtt,jitter:e.jitter,packetLost:100*s},t);this.layersWithPacketLoss=[...this.layersWithPacketLoss,n];const r=Math.max.apply(Math,this.layersWithPacketLoss.map((function(t){return t.id}))),o=this.layersWithPacketLoss.find((function(t){return t.id==r}));o.packetLost>=this._VideoPacketLossThreshold&&!this.hadPacketLoss&&!this.hasPacketLoss?(this.hasPacketLoss=!0,this.emit("highPacketLoss",{streamId:this._publisher.stream.id,type:"video",action:"highPacketLossDetected",packetLossThreshold:this._VideoPacketLossThreshold})):this.hadPacketLoss&&this.hasPacketLoss&&o.packetLost<this._VideoPacketLossThreshold&&(this.hasPacketLoss=!1,this.emit("highPacketLossStopped",{streamId:this._publisher.stream.id,type:"video",action:"highPacketLossStopped",packetLossThreshold:this._VideoPacketLossThreshold}))}this.hadPacketLoss=this.hasPacketLoss}}async startStats(){return new Promise(((t,e)=>{setInterval((async()=>{this.simulcastLayers=[],this.packetLossArray=[];try{"function"==typeof this._publisher.getRtcStatsReport&&this._publisher||e("Invalid publisher");const i=await(0,n.getRtcStats)(this._publisher);i&&i.length?(/chrome/i.test(navigator.userAgent)&&this.checkIfQualityLimited(i),this.checkVideoPacketLoss(i),t()):e("can not start rtcStats")}catch(t){e(t)}}),this._statsInterval)}))}stopStats(){clearInterval(this._interval),this._interval=null}async getCipher(){return new Promise((async(t,e)=>{try{const i=await(0,n.getRtcStats)(this._publisher);i||e("Can not get cypher"),i[0].rtcStatsReport.forEach((e=>{"transport"===e.type&&t(e.srtpCipher)}))}catch(t){e(t)}}))}async getConnectionType(){return new Promise((async(t,e)=>{try{const i=await(0,n.getRtcStats)(this._publisher);i||e("Can not get connection type"),i[0].rtcStatsReport.forEach((e=>{"local-candidate"===e.type&&("relay"===e.candidateType?t(`TURN ${e.relayProtocol}`):t(e.protocol))}))}catch(t){e(t)}}))}setOutputState(t){}destroy(){s.default.debug("destroy")}}e.VideoNetworkQualityStats=o},436:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getRtcStats=void 0,e.getRtcStats=async function(t){return new Promise((async(e,i)=>{try{"function"!=typeof t.getRtcStatsReport&&i("Invalid publisher");e(await t.getRtcStatsReport())}catch(t){i(t)}}))}}},e={};function i(s){var n=e[s];if(void 0!==n)return n.exports;var r=e[s]={exports:{}};return t[s].call(r.exports,r,r.exports,i),r.exports}var s={};return(()=>{"use strict";var t=s;Object.defineProperty(t,"__esModule",{value:!0}),t.getRtcStats=t.logPublisher=void 0;const e=i(43),n=i(436);Object.defineProperty(t,"logPublisher",{enumerable:!0,get:function(){return n.logPublisher}}),Object.defineProperty(t,"getRtcStats",{enumerable:!0,get:function(){return n.getRtcStats}});const r=i(239);window.OT=window.OT||{},e.default.setLevel("WARN"),window.OT.RealTimeStats={logPublisher:n.logPublisher,getRtcStats:n.getRtcStats,VideoNetworkQualityStats:r.VideoNetworkQualityStats}})(),s})()));
//# sourceMappingURL=vonage-real-time-stats.js.map