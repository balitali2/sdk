(this.webpackJsonpexample=this.webpackJsonpexample||[]).push([[4],{3419:function(e,t,n){"use strict";n.r(t),n.d(t,"WalletConnectModal",(function(){return r}));var o=n(3584);class r{constructor(e){this.openModal=o.e.open,this.closeModal=o.e.close,this.subscribeModal=o.e.subscribe,this.setTheme=o.h.setThemeConfig,o.h.setThemeConfig(e),o.a.setConfig(e),this.initUi()}async initUi(){if(typeof window<"u"){await n.e(3).then(n.bind(null,3613));const e=document.createElement("wcm-modal");document.body.insertAdjacentElement("beforeend",e),o.f.setIsUiLoaded(!0)}}}},3584:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return l})),n.d(t,"d",(function(){return D})),n.d(t,"e",(function(){return U})),n.d(t,"f",(function(){return d})),n.d(t,"g",(function(){return s})),n.d(t,"h",(function(){return K})),n.d(t,"i",(function(){return B}));var o=n(3589);const r=Object(o.proxy)({history:["ConnectWallet"],view:"ConnectWallet",data:void 0}),s={state:r,subscribe:e=>Object(o.subscribe)(r,(()=>e(r))),push(e,t){e!==r.view&&(r.view=e,t&&(r.data=t),r.history.push(e))},reset(e){r.view=e,r.history=[e]},replace(e){r.history.length>1&&(r.history[r.history.length-1]=e,r.view=e)},goBack(){if(r.history.length>1){r.history.pop();const[e]=r.history.slice(-1);r.view=e}},setData(e){r.data=e}},a={WALLETCONNECT_DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",WCM_VERSION:"WCM_VERSION",RECOMMENDED_WALLET_AMOUNT:9,isMobile:()=>typeof window<"u"&&Boolean(window.matchMedia("(pointer:coarse)").matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)),isAndroid:()=>a.isMobile()&&navigator.userAgent.toLowerCase().includes("android"),isIos(){const e=navigator.userAgent.toLowerCase();return a.isMobile()&&(e.includes("iphone")||e.includes("ipad"))},isHttpUrl:e=>e.startsWith("http://")||e.startsWith("https://"),isArray:e=>Array.isArray(e)&&e.length>0,formatNativeUrl(e,t,n){if(a.isHttpUrl(e))return this.formatUniversalUrl(e,t,n);let o=e;o.includes("://")||(o=e.replaceAll("/","").replaceAll(":",""),o="".concat(o,"://")),o.endsWith("/")||(o="".concat(o,"/")),this.setWalletConnectDeepLink(o,n);const r=encodeURIComponent(t);return"".concat(o,"wc?uri=").concat(r)},formatUniversalUrl(e,t,n){if(!a.isHttpUrl(e))return this.formatNativeUrl(e,t,n);let o=e;o.endsWith("/")||(o="".concat(o,"/")),this.setWalletConnectDeepLink(o,n);const r=encodeURIComponent(t);return"".concat(o,"wc?uri=").concat(r)},wait:async e=>new Promise((t=>{setTimeout(t,e)})),openHref(e,t){window.open(e,t,"noreferrer noopener")},setWalletConnectDeepLink(e,t){try{localStorage.setItem(a.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:e,name:t}))}catch{console.info("Unable to set WalletConnect deep link")}},setWalletConnectAndroidDeepLink(e){try{const[t]=e.split("?");localStorage.setItem(a.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:t,name:"Android"}))}catch{console.info("Unable to set WalletConnect android deep link")}},removeWalletConnectDeepLink(){try{localStorage.removeItem(a.WALLETCONNECT_DEEPLINK_CHOICE)}catch{console.info("Unable to remove WalletConnect deep link")}},setModalVersionInStorage(){try{typeof localStorage<"u"&&localStorage.setItem(a.WCM_VERSION,"2.6.2")}catch{console.info("Unable to set Web3Modal version in storage")}},getWalletRouterData(){var e;const t=null==(e=s.state.data)?void 0:e.Wallet;if(!t)throw new Error('Missing "Wallet" view data');return t}},i=typeof location<"u"&&(location.hostname.includes("localhost")||location.protocol.includes("https")),c=Object(o.proxy)({enabled:i,userSessionId:"",events:[],connectedWalletId:void 0}),l={state:c,subscribe:e=>Object(o.subscribe)(c.events,(()=>e(Object(o.snapshot)(c.events[c.events.length-1])))),initialize(){c.enabled&&typeof(null==crypto?void 0:crypto.randomUUID)<"u"&&(c.userSessionId=crypto.randomUUID())},setConnectedWalletId(e){c.connectedWalletId=e},click(e){if(c.enabled){const t={type:"CLICK",name:e.name,userSessionId:c.userSessionId,timestamp:Date.now(),data:e};c.events.push(t)}},track(e){if(c.enabled){const t={type:"TRACK",name:e.name,userSessionId:c.userSessionId,timestamp:Date.now(),data:e};c.events.push(t)}},view(e){if(c.enabled){const t={type:"VIEW",name:e.name,userSessionId:c.userSessionId,timestamp:Date.now(),data:e};c.events.push(t)}}},u=Object(o.proxy)({chains:void 0,walletConnectUri:void 0,isAuth:!1,isCustomDesktop:!1,isCustomMobile:!1,isDataLoaded:!1,isUiLoaded:!1}),d={state:u,subscribe:e=>Object(o.subscribe)(u,(()=>e(u))),setChains(e){u.chains=e},setWalletConnectUri(e){u.walletConnectUri=e},setIsCustomDesktop(e){u.isCustomDesktop=e},setIsCustomMobile(e){u.isCustomMobile=e},setIsDataLoaded(e){u.isDataLoaded=e},setIsUiLoaded(e){u.isUiLoaded=e},setIsAuth(e){u.isAuth=e}},f=Object(o.proxy)({projectId:"",mobileWallets:void 0,desktopWallets:void 0,walletImages:void 0,chains:void 0,enableAuthMode:!1,enableExplorer:!0,explorerExcludedWalletIds:void 0,explorerRecommendedWalletIds:void 0,termsOfServiceUrl:void 0,privacyPolicyUrl:void 0}),p={state:f,subscribe:e=>Object(o.subscribe)(f,(()=>e(f))),setConfig(e){var t,n;l.initialize(),d.setChains(e.chains),d.setIsAuth(Boolean(e.enableAuthMode)),d.setIsCustomMobile(Boolean(null==(t=e.mobileWallets)?void 0:t.length)),d.setIsCustomDesktop(Boolean(null==(n=e.desktopWallets)?void 0:n.length)),a.setModalVersionInStorage(),Object.assign(f,e)}};var g=Object.defineProperty,h=Object.getOwnPropertySymbols,b=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable,y=(e,t,n)=>t in e?g(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;const m="https://explorer-api.walletconnect.com",w="wcm",O="js-2.6.2";async function I(e,t){const n=((e,t)=>{for(var n in t||(t={}))b.call(t,n)&&y(e,n,t[n]);if(h)for(var n of h(t))v.call(t,n)&&y(e,n,t[n]);return e})({sdkType:w,sdkVersion:O},t),o=new URL(e,m);return o.searchParams.append("projectId",p.state.projectId),Object.entries(n).forEach((e=>{let[t,n]=e;n&&o.searchParams.append(t,String(n))})),(await fetch(o)).json()}const j={getDesktopListings:async e=>I("/w3m/v1/getDesktopListings",e),getMobileListings:async e=>I("/w3m/v1/getMobileListings",e),getInjectedListings:async e=>I("/w3m/v1/getInjectedListings",e),getAllListings:async e=>I("/w3m/v1/getAllListings",e),getWalletImageUrl:e=>"".concat(m,"/w3m/v1/getWalletImage/").concat(e,"?projectId=").concat(p.state.projectId,"&sdkType=").concat(w,"&sdkVersion=").concat(O),getAssetImageUrl:e=>"".concat(m,"/w3m/v1/getAssetImage/").concat(e,"?projectId=").concat(p.state.projectId,"&sdkType=").concat(w,"&sdkVersion=").concat(O)};var C=Object.defineProperty,W=Object.getOwnPropertySymbols,E=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable,k=(e,t,n)=>t in e?C(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;const A=a.isMobile(),P=Object(o.proxy)({wallets:{listings:[],total:0,page:1},search:{listings:[],total:0,page:1},recomendedWallets:[]}),D={state:P,async getRecomendedWallets(){const{explorerRecommendedWalletIds:e,explorerExcludedWalletIds:t}=p.state;if("NONE"===e||"ALL"===t&&!e)return P.recomendedWallets;if(a.isArray(e)){const t={recommendedIds:e.join(",")},{listings:n}=await j.getAllListings(t),o=Object.values(n);o.sort(((t,n)=>e.indexOf(t.id)-e.indexOf(n.id))),P.recomendedWallets=o}else{const{chains:e,isAuth:n}=d.state,o=null===e||void 0===e?void 0:e.join(","),r=a.isArray(t),s={page:1,sdks:n?"auth_v1":void 0,entries:a.RECOMMENDED_WALLET_AMOUNT,chains:o,version:2,excludedIds:r?t.join(","):void 0},{listings:i}=A?await j.getMobileListings(s):await j.getDesktopListings(s);P.recomendedWallets=Object.values(i)}return P.recomendedWallets},async getWallets(e){const t=((e,t)=>{for(var n in t||(t={}))E.call(t,n)&&k(e,n,t[n]);if(W)for(var n of W(t))L.call(t,n)&&k(e,n,t[n]);return e})({},e),{explorerRecommendedWalletIds:n,explorerExcludedWalletIds:o}=p.state,{recomendedWallets:r}=P;if("ALL"===o)return P.wallets;r.length?t.excludedIds=r.map((e=>e.id)).join(","):a.isArray(n)&&(t.excludedIds=n.join(",")),a.isArray(o)&&(t.excludedIds=[t.excludedIds,o].filter(Boolean).join(",")),d.state.isAuth&&(t.sdks="auth_v1");const{page:s,search:i}=e,{listings:c,total:l}=A?await j.getMobileListings(t):await j.getDesktopListings(t),u=Object.values(c),f=i?"search":"wallets";return P[f]={listings:[...P[f].listings,...u],total:l,page:null!==s&&void 0!==s?s:1},{listings:u,total:l}},getWalletImageUrl:e=>j.getWalletImageUrl(e),getAssetImageUrl:e=>j.getAssetImageUrl(e),resetSearch(){P.search={listings:[],total:0,page:1}}},M=Object(o.proxy)({open:!1}),U={state:M,subscribe:e=>Object(o.subscribe)(M,(()=>e(M))),open:async e=>new Promise((t=>{const{isUiLoaded:n,isDataLoaded:o}=d.state;if(a.removeWalletConnectDeepLink(),d.setWalletConnectUri(null===e||void 0===e?void 0:e.uri),d.setChains(null===e||void 0===e?void 0:e.chains),s.reset("ConnectWallet"),n&&o)M.open=!0,t();else{const e=setInterval((()=>{const n=d.state;n.isUiLoaded&&n.isDataLoaded&&(clearInterval(e),M.open=!0,t())}),200)}})),close(){M.open=!1}};var S=Object.defineProperty,x=Object.getOwnPropertySymbols,R=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable,N=(e,t,n)=>t in e?S(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;const _=Object(o.proxy)({themeMode:typeof matchMedia<"u"&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}),K={state:_,subscribe:e=>Object(o.subscribe)(_,(()=>e(_))),setThemeConfig(e){const{themeMode:t,themeVariables:n}=e;t&&(_.themeMode=t),n&&(_.themeVariables=((e,t)=>{for(var n in t||(t={}))R.call(t,n)&&N(e,n,t[n]);if(x)for(var n of x(t))T.call(t,n)&&N(e,n,t[n]);return e})({},n))}},V=Object(o.proxy)({open:!1,message:"",variant:"success"}),B={state:V,subscribe:e=>Object(o.subscribe)(V,(()=>e(V))),openToast(e,t){V.open=!0,V.message=e,V.variant=t},closeToast(){V.open=!1}}},3589:function(e,t,n){"use strict";var o=n(3590),r=function(e){return"object"===typeof e&&null!==e},s=new WeakMap,a=new WeakSet,i=function(e,t,n,i,c,l,u,d,f){return void 0===e&&(e=Object.is),void 0===t&&(t=function(e,t){return new Proxy(e,t)}),void 0===n&&(n=function(e){return r(e)&&!a.has(e)&&(Array.isArray(e)||!(Symbol.iterator in e))&&!(e instanceof WeakMap)&&!(e instanceof WeakSet)&&!(e instanceof Error)&&!(e instanceof Number)&&!(e instanceof Date)&&!(e instanceof String)&&!(e instanceof RegExp)&&!(e instanceof ArrayBuffer)}),void 0===i&&(i=function(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:throw e}}),void 0===c&&(c=new WeakMap),void 0===l&&(l=function(e){function t(t,n,o){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e,t,n){void 0===n&&(n=i);var r=c.get(e);if((null==r?void 0:r[0])===t)return r[1];var u=Array.isArray(e)?[]:Object.create(Object.getPrototypeOf(e));return o.markToTrack(u,!0),c.set(e,[t,u]),Reflect.ownKeys(e).forEach((function(t){if(!Object.getOwnPropertyDescriptor(u,t)){var r=Reflect.get(e,t),i={value:r,enumerable:!0,configurable:!0};if(a.has(r))o.markToTrack(r,!1);else if(r instanceof Promise)delete i.value,i.get=function(){return n(r)};else if(s.has(r)){var c=s.get(r),d=c[0],f=c[1];i.value=l(d,f(),n)}Object.defineProperty(u,t,i)}})),Object.preventExtensions(u)}))),void 0===u&&(u=new WeakMap),void 0===d&&(d=[1,1]),void 0===f&&(f=function(i){if(!r(i))throw new Error("object required");var c=u.get(i);if(c)return c;var p=d[0],g=new Set,h=function(e,t){void 0===t&&(t=++d[0]),p!==t&&(p=t,g.forEach((function(n){return n(e,t)})))},b=d[1],v=function(e){return function(t,n){var o=[].concat(t);o[1]=[e].concat(o[1]),h(o,n)}},y=new Map,m=function(e){var t,n=y.get(e);n&&(y.delete(e),null==(t=n[1])||t.call(n))},w=Array.isArray(i)?[]:Object.create(Object.getPrototypeOf(i)),O=t(w,{deleteProperty:function(e,t){var n=Reflect.get(e,t);m(t);var o=Reflect.deleteProperty(e,t);return o&&h(["delete",[t],n]),o},set:function(t,i,c,l){var d=Reflect.has(t,i),p=Reflect.get(t,i,l);if(d&&(e(p,c)||u.has(c)&&e(p,u.get(c))))return!0;m(i),r(c)&&(c=o.getUntracked(c)||c);var b=c;if(c instanceof Promise)c.then((function(e){c.status="fulfilled",c.value=e,h(["resolve",[i],e])})).catch((function(e){c.status="rejected",c.reason=e,h(["reject",[i],e])}));else{!s.has(c)&&n(c)&&(b=f(c));var w=!a.has(b)&&s.get(b);w&&function(e,t){if(g.size){var n=t[3](v(e));y.set(e,[t,n])}else y.set(e,[t])}(i,w)}return Reflect.set(t,i,b,l),h(["set",[i],c,p]),!0}});u.set(i,O);var I=[w,function(e){return void 0===e&&(e=++d[1]),b===e||g.size||(b=e,y.forEach((function(t){var n=t[0][1](e);n>p&&(p=n)}))),p},l,function(e){g.add(e),1===g.size&&y.forEach((function(e,t){var n=e[0];e[1];var o=n[3](v(t));y.set(t,[n,o])}));return function(){g.delete(e),0===g.size&&y.forEach((function(e,t){var n=e[0],o=e[1];o&&(o(),y.set(t,[n]))}))}}];return s.set(O,I),Reflect.ownKeys(i).forEach((function(e){var t=Object.getOwnPropertyDescriptor(i,e);"value"in t&&(O[e]=i[e],delete t.value,delete t.writable),Object.defineProperty(w,e,t)})),O}),[f,s,a,e,t,n,i,c,l,u,d]},c=i()[0];var l=i;t.getVersion=function(e){var t=s.get(e);return null==t?void 0:t[1]()},t.proxy=function(e){return void 0===e&&(e={}),c(e)},t.ref=function(e){return a.add(e),e},t.snapshot=function(e,t){var n=s.get(e),o=n[0],r=n[1];return(0,n[2])(o,r(),t)},t.subscribe=function(e,t,n){var o,r=s.get(e),a=[],i=r[3],c=!1,l=i((function(e){a.push(e),n?t(a.splice(0)):o||(o=Promise.resolve().then((function(){o=void 0,c&&t(a.splice(0))})))}));return c=!0,function(){c=!1,l()}},t.unstable_buildProxyFunction=l},3590:function(e,t,n){"use strict";n.r(t),n.d(t,"affectedToPathList",(function(){return m})),n.d(t,"createProxy",(function(){return g})),n.d(t,"getUntracked",(function(){return v})),n.d(t,"isChanged",(function(){return h})),n.d(t,"markToTrack",(function(){return y})),n.d(t,"replaceNewProxy",(function(){return w})),n.d(t,"trackMemo",(function(){return b}));const o=Symbol(),r=Symbol(),s="a",a="w";let i=(e,t)=>new Proxy(e,t);const c=Object.getPrototypeOf,l=new WeakMap,u=e=>e&&(l.has(e)?l.get(e):c(e)===Object.prototype||c(e)===Array.prototype),d=e=>"object"==typeof e&&null!==e,f=e=>{if(Array.isArray(e))return Array.from(e);const t=Object.getOwnPropertyDescriptors(e);return Object.values(t).forEach((e=>{e.configurable=!0})),Object.create(c(e),t)},p=e=>e[r]||e,g=(e,t,n,c)=>{if(!u(e))return e;let l=c&&c.get(e);if(!l){const t=p(e);l=(e=>Object.values(Object.getOwnPropertyDescriptors(e)).some((e=>!e.configurable&&!e.writable)))(t)?[t,f(t)]:[t],null==c||c.set(e,l)}const[d,h]=l;let b=n&&n.get(d);return b&&b[1].f===!!h||(b=((e,t)=>{const n={f:t};let i=!1;const c=(t,o)=>{if(!i){let r=n[s].get(e);if(r||(r={},n[s].set(e,r)),t===a)r[a]=!0;else{let e=r[t];e||(e=new Set,r[t]=e),e.add(o)}}},l={get:(t,o)=>o===r?e:(c("k",o),g(Reflect.get(t,o),n[s],n.c,n.t)),has:(t,r)=>r===o?(i=!0,n[s].delete(e),!0):(c("h",r),Reflect.has(t,r)),getOwnPropertyDescriptor:(e,t)=>(c("o",t),Reflect.getOwnPropertyDescriptor(e,t)),ownKeys:e=>(c(a),Reflect.ownKeys(e))};return t&&(l.set=l.deleteProperty=()=>!1),[l,n]})(d,!!h),b[1].p=i(h||d,b[0]),n&&n.set(d,b)),b[1][s]=t,b[1].c=n,b[1].t=c,b[1].p},h=(e,t,n,o)=>{if(Object.is(e,t))return!1;if(!d(e)||!d(t))return!0;const r=n.get(p(e));if(!r)return!0;if(o){const n=o.get(e);if(n&&n.n===t)return n.g;o.set(e,{n:t,g:!1})}let s=null;try{for(const n of r.h||[])if(s=Reflect.has(e,n)!==Reflect.has(t,n),s)return s;if(!0===r[a]){if(s=((e,t)=>{const n=Reflect.ownKeys(e),o=Reflect.ownKeys(t);return n.length!==o.length||n.some(((e,t)=>e!==o[t]))})(e,t),s)return s}else for(const n of r.o||[])if(s=!!Reflect.getOwnPropertyDescriptor(e,n)!=!!Reflect.getOwnPropertyDescriptor(t,n),s)return s;for(const a of r.k||[])if(s=h(e[a],t[a],n,o),s)return s;return null===s&&(s=!0),s}finally{o&&o.set(e,{n:t,g:s})}},b=e=>!!u(e)&&o in e,v=e=>u(e)&&e[r]||null,y=function(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];l.set(e,t)},m=(e,t,n)=>{const o=[],r=new WeakSet,s=(e,i)=>{if(r.has(e))return;d(e)&&r.add(e);const c=d(e)&&t.get(p(e));if(c){var l,u;if(null==(l=c.h)||l.forEach((e=>{const t=":has(".concat(String(e),")");o.push(i?[...i,t]:[t])})),!0===c[a]){const e=":ownKeys";o.push(i?[...i,e]:[e])}else{var f;null==(f=c.o)||f.forEach((e=>{const t=":hasOwn(".concat(String(e),")");o.push(i?[...i,t]:[t])}))}null==(u=c.k)||u.forEach((t=>{n&&!("value"in(Object.getOwnPropertyDescriptor(e,t)||{}))||s(e[t],i?[...i,t]:[t])}))}else i&&o.push(i)};return s(e),o},w=e=>{i=e}}}]);