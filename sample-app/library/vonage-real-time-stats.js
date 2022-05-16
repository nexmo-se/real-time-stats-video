!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.RealTimeStats=t():e.RealTimeStats=t()}(self,(()=>(()=>{var e={187:e=>{"use strict";var t,n="object"==typeof Reflect?Reflect:null,o=n&&"function"==typeof n.apply?n.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};t=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var r=Number.isNaN||function(e){return e!=e};function i(){i.init.call(this)}e.exports=i,e.exports.once=function(e,t){return new Promise((function(n,o){function r(n){e.removeListener(t,i),o(n)}function i(){"function"==typeof e.removeListener&&e.removeListener("error",r),n([].slice.call(arguments))}d(e,t,i,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&d(e,"error",t,n)}(e,r,{once:!0})}))},i.EventEmitter=i,i.prototype._events=void 0,i.prototype._eventsCount=0,i.prototype._maxListeners=void 0;var s=10;function l(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function c(e){return void 0===e._maxListeners?i.defaultMaxListeners:e._maxListeners}function a(e,t,n,o){var r,i,s,a;if(l(n),void 0===(i=e._events)?(i=e._events=Object.create(null),e._eventsCount=0):(void 0!==i.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),i=e._events),s=i[t]),void 0===s)s=i[t]=n,++e._eventsCount;else if("function"==typeof s?s=i[t]=o?[n,s]:[s,n]:o?s.unshift(n):s.push(n),(r=c(e))>0&&s.length>r&&!s.warned){s.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=e,u.type=t,u.count=s.length,a=u,console&&console.warn&&console.warn(a)}return e}function u(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function f(e,t,n){var o={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=u.bind(o);return r.listener=n,o.wrapFn=r,r}function p(e,t,n){var o=e._events;if(void 0===o)return[];var r=o[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(r):h(r,r.length)}function v(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function h(e,t){for(var n=new Array(t),o=0;o<t;++o)n[o]=e[o];return n}function d(e,t,n,o){if("function"==typeof e.on)o.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function r(i){o.once&&e.removeEventListener(t,r),n(i)}))}}Object.defineProperty(i,"defaultMaxListeners",{enumerable:!0,get:function(){return s},set:function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");s=e}}),i.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},i.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},i.prototype.getMaxListeners=function(){return c(this)},i.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,i=this._events;if(void 0!==i)r=r&&void 0===i.error;else if(!r)return!1;if(r){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var l=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw l.context=s,l}var c=i[e];if(void 0===c)return!1;if("function"==typeof c)o(c,this,t);else{var a=c.length,u=h(c,a);for(n=0;n<a;++n)o(u[n],this,t)}return!0},i.prototype.addListener=function(e,t){return a(this,e,t,!1)},i.prototype.on=i.prototype.addListener,i.prototype.prependListener=function(e,t){return a(this,e,t,!0)},i.prototype.once=function(e,t){return l(t),this.on(e,f(this,e,t)),this},i.prototype.prependOnceListener=function(e,t){return l(t),this.prependListener(e,f(this,e,t)),this},i.prototype.removeListener=function(e,t){var n,o,r,i,s;if(l(t),void 0===(o=this._events))return this;if(void 0===(n=o[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete o[e],o.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,i=n.length-1;i>=0;i--)if(n[i]===t||n[i].listener===t){s=n[i].listener,r=i;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,r),1===n.length&&(o[e]=n[0]),void 0!==o.removeListener&&this.emit("removeListener",e,s||t)}return this},i.prototype.off=i.prototype.removeListener,i.prototype.removeAllListeners=function(e){var t,n,o;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,i=Object.keys(n);for(o=0;o<i.length;++o)"removeListener"!==(r=i[o])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(o=t.length-1;o>=0;o--)this.removeListener(e,t[o]);return this},i.prototype.listeners=function(e){return p(this,e,!0)},i.prototype.rawListeners=function(e){return p(this,e,!1)},i.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):v.call(e,t)},i.prototype.listenerCount=v,i.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}},43:function(e,t,n){var o,r;!function(i,s){"use strict";o=function(){var e=function(){},t="undefined",n=typeof window!==t&&typeof window.navigator!==t&&/Trident\/|MSIE /.test(window.navigator.userAgent),o=["trace","debug","info","warn","error"];function r(e,t){var n=e[t];if("function"==typeof n.bind)return n.bind(e);try{return Function.prototype.bind.call(n,e)}catch(t){return function(){return Function.prototype.apply.apply(n,[e,arguments])}}}function i(){console.log&&(console.log.apply?console.log.apply(console,arguments):Function.prototype.apply.apply(console.log,[console,arguments])),console.trace&&console.trace()}function s(o){return"debug"===o&&(o="log"),typeof console!==t&&("trace"===o&&n?i:void 0!==console[o]?r(console,o):void 0!==console.log?r(console,"log"):e)}function l(t,n){for(var r=0;r<o.length;r++){var i=o[r];this[i]=r<t?e:this.methodFactory(i,t,n)}this.log=this.debug}function c(e,n,o){return function(){typeof console!==t&&(l.call(this,n,o),this[e].apply(this,arguments))}}function a(e,t,n){return s(e)||c.apply(this,arguments)}function u(e,n,r){var i,s=this;n=null==n?"WARN":n;var c="loglevel";function u(e){var n=(o[e]||"silent").toUpperCase();if(typeof window!==t&&c){try{return void(window.localStorage[c]=n)}catch(e){}try{window.document.cookie=encodeURIComponent(c)+"="+n+";"}catch(e){}}}function f(){var e;if(typeof window!==t&&c){try{e=window.localStorage[c]}catch(e){}if(typeof e===t)try{var n=window.document.cookie,o=n.indexOf(encodeURIComponent(c)+"=");-1!==o&&(e=/^([^;]+)/.exec(n.slice(o))[1])}catch(e){}return void 0===s.levels[e]&&(e=void 0),e}}function p(){if(typeof window!==t&&c){try{return void window.localStorage.removeItem(c)}catch(e){}try{window.document.cookie=encodeURIComponent(c)+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"}catch(e){}}}"string"==typeof e?c+=":"+e:"symbol"==typeof e&&(c=void 0),s.name=e,s.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},s.methodFactory=r||a,s.getLevel=function(){return i},s.setLevel=function(n,o){if("string"==typeof n&&void 0!==s.levels[n.toUpperCase()]&&(n=s.levels[n.toUpperCase()]),!("number"==typeof n&&n>=0&&n<=s.levels.SILENT))throw"log.setLevel() called with invalid level: "+n;if(i=n,!1!==o&&u(n),l.call(s,n,e),typeof console===t&&n<s.levels.SILENT)return"No console available for logging"},s.setDefaultLevel=function(e){n=e,f()||s.setLevel(e,!1)},s.resetLevel=function(){s.setLevel(n,!1),p()},s.enableAll=function(e){s.setLevel(s.levels.TRACE,e)},s.disableAll=function(e){s.setLevel(s.levels.SILENT,e)};var v=f();null==v&&(v=n),s.setLevel(v,!1)}var f=new u,p={};f.getLogger=function(e){if("symbol"!=typeof e&&"string"!=typeof e||""===e)throw new TypeError("You must supply a name when creating a logger.");var t=p[e];return t||(t=p[e]=new u(e,f.getLevel(),f.methodFactory)),t};var v=typeof window!==t?window.log:void 0;return f.noConflict=function(){return typeof window!==t&&window.log===f&&(window.log=v),f},f.getLoggers=function(){return p},f.default=f,f},void 0===(r="function"==typeof o?o.call(t,n,t,e):o)||(e.exports=r)}()},361:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.VideoNetworkQualityStats=void 0;const o=n(43),r=n(436),i=n(187);var s;!function(e){e[e.PAUSED=0]="PAUSED",e[e.EFFECT_APPLIED=1]="EFFECT_APPLIED",e[e.INPUT_FORWARDING=2]="INPUT_FORWARDING"}(s||(s={}));class l extends i.EventEmitter{constructor(e){super(),this._publisher=null,this._statsInterval=e.intervalStats,this._interval=null}setPublisher(e){this._publisher=e}async attachEvents(){this.on("udp",(e=>console.log(e)))}startStats(){this.attachEvents().then((()=>{})),setInterval((async()=>{console.log("interval called");const e=await(0,r.getRtcStats)(this._publisher);return e[0].rtcStatsReport.forEach((e=>{"transport"===e.type&&(console.log(e.srtpCipher),this.emit("udp",e.srtpCipher))})),console.log(e),e}),this._statsInterval)}stopStats(){clearInterval(this._interval),this._interval=null}async getCypher(){return new Promise((async(e,t)=>{(await(0,r.getRtcStats)(this._publisher))[0].rtcStatsReport.forEach((t=>{"transport"===t.type&&(console.log(t.srtpCipher),e(t.srtpCipher))}))}))}async getConnectionType(){return new Promise((async(e,t)=>{(await(0,r.getRtcStats)(this._publisher))[0].rtcStatsReport.forEach((t=>{"local-candidate"===t.type&&("relay"===t.candidateType?e(`TURN ${t.relayProtocol}`):e(t.protocol))}))}))}pauseStreamProcessing(e){console.log("ss")}setOutputState(e){}destroy(){o.default.debug("destroy")}}t.VideoNetworkQualityStats=l},436:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getSrtpCipher=t.getRtcStats=t.logPublisher=void 0,t.logPublisher=function(e){console.log(e)},t.getRtcStats=async function(e){return new Promise((async(t,n)=>{try{t(await e.getRtcStatsReport())}catch(e){n(e)}}))},t.getSrtpCipher=async function(e){return new Promise((async(t,n)=>{e[0].rtcStatsReport.forEach((e=>{"transport"===e.type&&(console.log(e.srtpCipher),t(e.srtpCipher))}))}))}}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}var o={};return(()=>{"use strict";var e=o;Object.defineProperty(e,"__esModule",{value:!0}),e.getRtcStats=e.logPublisher=void 0;const t=n(43),r=n(436);Object.defineProperty(e,"logPublisher",{enumerable:!0,get:function(){return r.logPublisher}}),Object.defineProperty(e,"getRtcStats",{enumerable:!0,get:function(){return r.getRtcStats}});const i=n(361);window.OT=window.OT||{},t.default.setLevel("WARN"),window.OT.RealTimeStats={logPublisher:r.logPublisher,getRtcStats:r.getRtcStats,VideoNetworkQualityStats:i.VideoNetworkQualityStats}})(),o})()));
//# sourceMappingURL=vonage-real-time-stats.js.map