(()=>{var Ef=Object.defineProperty;var Wn=(n,e,t)=>()=>{if(t)throw t[0];try{return n&&(e=n(n=0)),e}catch(i){throw t=[i],i}};var Dr=(n,e)=>{for(var t in e)Ef(n,t,{get:e[t],enumerable:!0})};var As,gr,B_,z_,k_,Rs,yn,nn,ju,Qu,ql,Wy,H_,V_,G_,W_,Yl,Xy,ed,td,$l,qy,Mn=Wn(()=>{(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(As||(As={}));gr=class extends Error{constructor(e,t,i){super(e),this.message=e,this.code=t,this.data=i}},B_=n=>{var e,t;return n!=null&&n.androidBridge?"android":!((t=(e=n==null?void 0:n.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},z_=n=>{let e=n.CapacitorCustomPlatform||null,t=n.Capacitor||{},i=t.Plugins=t.Plugins||{},s=()=>e!==null?e.name:B_(n),r=()=>s()!=="web",a=d=>{let f=c.get(d);return!!(f!=null&&f.platforms.has(s())||o(d))},o=d=>{var f;return(f=t.PluginHeaders)===null||f===void 0?void 0:f.find(p=>p.name===d)},l=d=>n.console.error(d),c=new Map,h=(d,f={})=>{let p=c.get(d);if(p)return console.warn(`Capacitor plugin "${d}" already registered. Cannot register plugins twice.`),p.proxy;let g=s(),v=o(d),m,u=async()=>(!m&&g in f?m=typeof f[g]=="function"?m=await f[g]():m=f[g]:e!==null&&!m&&"web"in f&&(m=typeof f.web=="function"?m=await f.web():m=f.web),m),y=(C,x)=>{var b,I;if(v){let k=v==null?void 0:v.methods.find(X=>x===X.name);if(k)return k.rtype==="promise"?X=>t.nativePromise(d,x.toString(),X):(X,L)=>t.nativeCallback(d,x.toString(),X,L);if(C)return(b=C[x])===null||b===void 0?void 0:b.bind(C)}else{if(C)return(I=C[x])===null||I===void 0?void 0:I.bind(C);throw new gr(`"${d}" plugin is not implemented on ${g}`,As.Unimplemented)}},_=C=>{let x,b=(...I)=>{let k=u().then(X=>{let L=y(X,C);if(L){let N=L(...I);return x=N==null?void 0:N.remove,N}else throw new gr(`"${d}.${C}()" is not implemented on ${g}`,As.Unimplemented)});return C==="addListener"&&(k.remove=async()=>x()),k};return b.toString=()=>`${C.toString()}() { [capacitor code] }`,Object.defineProperty(b,"name",{value:C,writable:!1,configurable:!1}),b},S=_("addListener"),w=_("removeListener"),E=(C,x)=>{let b=S({eventName:C},x).then(X=>X),I=async()=>{let X=await b;await w({eventName:C,callbackId:X})},k=new Promise(X=>b.then(()=>X({remove:I})));return k.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await I()},k},A=new Proxy({},{get(C,x){switch(x){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return v?E:S;case"removeListener":return w;default:return _(x)}}});return i[d]=A,c.set(d,{name:d,proxy:A,platforms:new Set([...Object.keys(f),...v?[g]:[]])}),A};return t.convertFileSrc||(t.convertFileSrc=d=>d),t.getPlatform=s,t.handleError=l,t.isNativePlatform=r,t.isPluginAvailable=a,t.registerPlugin=h,t.Exception=gr,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},k_=n=>n.Capacitor=z_(n),Rs=k_(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),yn=Rs.registerPlugin,nn=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let i=!1;this.listeners[e]||(this.listeners[e]=[],i=!0),this.listeners[e].push(t);let r=this.windowListeners[e];r&&!r.registered&&this.addWindowListener(r),i&&this.sendRetainedArgumentsForEvent(e);let a=async()=>this.removeListener(e,t);return Promise.resolve({remove:a})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,i){let s=this.listeners[e];if(!s){if(i){let r=this.retainedEventArguments[e];r||(r=[]),r.push(t),this.retainedEventArguments[e]=r}return}s.forEach(r=>r(t))}hasListeners(e){var t;return!!(!((t=this.listeners[e])===null||t===void 0)&&t.length)}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:i=>{this.notifyListeners(t,i)}}}unimplemented(e="not implemented"){return new Rs.Exception(e,As.Unimplemented)}unavailable(e="not available"){return new Rs.Exception(e,As.Unavailable)}async removeListener(e,t){let i=this.listeners[e];if(!i)return;let s=i.indexOf(t);s!==-1&&this.listeners[e].splice(s,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(i=>{this.notifyListeners(e,i)}))}},ju=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Qu=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),ql=class extends nn{async getCookies(){let e=document.cookie,t={};return e.split(";").forEach(i=>{if(i.length<=0)return;let[s,r]=i.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=Qu(s).trim(),r=Qu(r).trim(),t[s]=r}),t}async setCookie(e){try{let t=ju(e.key),i=ju(e.value),s=e.expires?`; expires=${e.expires.replace("expires=","")}`:"",r=(e.path||"/").replace("path=",""),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${i||""}${s}; path=${r}; ${a};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{let e=document.cookie.split(";")||[];for(let t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}},Wy=yn("CapacitorCookies",{web:()=>new ql}),H_=async n=>new Promise((e,t)=>{let i=new FileReader;i.onload=()=>{let s=i.result;e(s.indexOf(",")>=0?s.split(",")[1]:s)},i.onerror=s=>t(s),i.readAsDataURL(n)}),V_=(n={})=>{let e=Object.keys(n);return Object.keys(n).map(s=>s.toLocaleLowerCase()).reduce((s,r,a)=>(s[r]=n[e[a]],s),{})},G_=(n,e=!0)=>n?Object.entries(n).reduce((i,s)=>{let[r,a]=s,o,l;return Array.isArray(a)?(l="",a.forEach(c=>{o=e?encodeURIComponent(c):c,l+=`${r}=${o}&`}),l.slice(0,-1)):(o=e?encodeURIComponent(a):a,l=`${r}=${o}`),`${i}&${l}`},"").substr(1):null,W_=(n,e={})=>{let t=Object.assign({method:n.method||"GET",headers:n.headers},e),s=V_(n.headers)["content-type"]||"";if(typeof n.data=="string")t.body=n.data;else if(s.includes("application/x-www-form-urlencoded")){let r=new URLSearchParams;for(let[a,o]of Object.entries(n.data||{}))r.set(a,o);t.body=r.toString()}else if(s.includes("multipart/form-data")||n.data instanceof FormData){let r=new FormData;if(n.data instanceof FormData)n.data.forEach((o,l)=>{r.append(l,o)});else for(let o of Object.keys(n.data))r.append(o,n.data[o]);t.body=r;let a=new Headers(t.headers);a.delete("content-type"),t.headers=a}else(s.includes("application/json")||typeof n.data=="object")&&(t.body=JSON.stringify(n.data));return t},Yl=class extends nn{async request(e){let t=W_(e,e.webFetchExtra),i=G_(e.params,e.shouldEncodeUrlParams),s=i?`${e.url}?${i}`:e.url,r=await fetch(s,t),a=r.headers.get("content-type")||"",{responseType:o="text"}=r.ok?e:{};a.includes("application/json")&&(o="json");let l,c;switch(o){case"arraybuffer":case"blob":c=await r.blob(),l=await H_(c);break;case"json":l=await r.json();break;default:l=await r.text()}let h={};return r.headers.forEach((d,f)=>{h[f]=d}),{data:l,headers:h,status:r.status,url:r.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}},Xy=yn("CapacitorHttp",{web:()=>new Yl});(function(n){n.Dark="DARK",n.Light="LIGHT",n.Default="DEFAULT"})(ed||(ed={}));(function(n){n.StatusBar="StatusBar",n.NavigationBar="NavigationBar"})(td||(td={}));$l=class extends nn{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}},qy=yn("SystemBars",{web:()=>new $l})});var nd={};Dr(nd,{AppWeb:()=>Zl});var Zl,id=Wn(()=>{Mn();Zl=class extends nn{constructor(){super(),this.handleVisibilityChange=()=>{let e={isActive:document.hidden!==!0};this.notifyListeners("appStateChange",e),document.hidden?this.notifyListeners("pause",null):this.notifyListeners("resume",null)},document.addEventListener("visibilitychange",this.handleVisibilityChange,!1)}exitApp(){throw this.unimplemented("Not implemented on web.")}async getInfo(){throw this.unimplemented("Not implemented on web.")}async getLaunchUrl(){return{url:""}}async getState(){return{isActive:document.hidden!==!0}}async minimizeApp(){throw this.unimplemented("Not implemented on web.")}async toggleBackButtonHandler(){throw this.unimplemented("Not implemented on web.")}async getAppLanguage(){return{value:navigator.language.split("-")[0].toLowerCase()}}}});var sd={};Dr(sd,{ScreenOrientationWeb:()=>Kl});var Kl,rd=Wn(()=>{Mn();Kl=class extends nn{constructor(){super(),typeof screen<"u"&&typeof screen.orientation<"u"&&screen.orientation.addEventListener("change",()=>{let e=screen.orientation.type;this.notifyListeners("screenOrientationChange",{type:e})})}async orientation(){if(typeof screen>"u"||!screen.orientation)throw this.unavailable("ScreenOrientation API not available in this browser");return{type:screen.orientation.type}}async lock(e){if(typeof screen>"u"||!screen.orientation||!screen.orientation.lock)throw this.unavailable("ScreenOrientation API not available in this browser");try{await screen.orientation.lock(e.orientation)}catch{throw this.unavailable("ScreenOrientation API not available in this browser")}}async unlock(){if(typeof screen>"u"||!screen.orientation||!screen.orientation.unlock)throw this.unavailable("ScreenOrientation API not available in this browser");try{screen.orientation.unlock()}catch{throw this.unavailable("ScreenOrientation API not available in this browser")}}}});var vr,jl=Wn(()=>{(function(n){n.NOT_REQUIRED="NOT_REQUIRED",n.OBTAINED="OBTAINED",n.REQUIRED="REQUIRED",n.UNKNOWN="UNKNOWN"})(vr||(vr={}))});var _r,gd=Wn(()=>{(function(n){n.NOT_REQUIRED="NOT_REQUIRED",n.REQUIRED="REQUIRED",n.UNKNOWN="UNKNOWN"})(_r||(_r={}))});var vd={};Dr(vd,{AdMobWeb:()=>Ql});var Ql,_d=Wn(()=>{Mn();jl();gd();Ql=class extends nn{async initialize(){console.log("initialize")}async requestTrackingAuthorization(){console.log("requestTrackingAuthorization")}async trackingAuthorizationStatus(){return{status:"authorized"}}async requestConsentInfo(e){return console.log("requestConsentInfo",e),{status:vr.REQUIRED,isConsentFormAvailable:!0,canRequestAds:!0,privacyOptionsRequirementStatus:_r.REQUIRED}}async showPrivacyOptionsForm(){console.log("showPrivacyOptionsForm")}async showConsentForm(){return console.log("showConsentForm"),{status:vr.REQUIRED,canRequestAds:!0,privacyOptionsRequirementStatus:_r.REQUIRED}}async resetConsentInfo(){console.log("resetConsentInfo")}async setApplicationMuted(e){console.log("setApplicationMuted",e)}async setApplicationVolume(e){console.log("setApplicationVolume",e)}async getAdaptiveBannerSize(){throw this.unavailable("Adaptive banner sizes are only available on iOS and Android")}async getBannerSize(){return{width:0,height:0}}async prepareBanner(e){console.log("prepareBanner",e)}async showBanner(e){console.log("showBanner",e)}async hideBanner(){console.log("hideBanner")}async resumeBanner(){console.log("resumeBanner")}async removeBanner(){console.log("removeBanner")}async startNativeAdFeed(){throw new Error("Native ads are only available on iOS and Android")}async destroyNativeAdFeed(e){console.log("destroyNativeAdFeed",e)}async loadNativeAd(){throw new Error("Native ads are only available on iOS and Android")}async updateNativeAdPlacements(e){console.log("updateNativeAdPlacements",e)}async removeNativeAd(e){console.log("removeNativeAd",e)}async prepareInterstitial(e){return console.log("prepareInterstitial",e),{adUnitId:e.adId}}async showInterstitial(e){console.log("showInterstitial",e)}async prepareRewardVideoAd(e){return console.log("prepareRewardVideoAd",e),{adUnitId:e.adId}}async showRewardVideoAd(e){return console.log("showRewardVideoAd",e),{type:"",amount:0}}async prepareRewardInterstitialAd(e){return console.log("prepareRewardInterstitialAd",e),{adUnitId:e.adId}}async showRewardInterstitialAd(e){return console.log("showRewardInterstitialAd",e),{type:"",amount:0}}async loadAppOpen(e){return console.log("loadAppOpen",e),{adUnitId:e.adId}}async showAppOpen(e){console.log("showAppOpen",e)}async isAppOpenLoaded(){return{value:!1}}addListener(e,t){return console.log("addListener",e),Promise.resolve({remove:()=>Promise.resolve()})}}});var Jo,yd,Md,tc=Wn(()=>{(function(n){n[n.UNKNOWN=0]="UNKNOWN",n[n.UPDATE_NOT_AVAILABLE=1]="UPDATE_NOT_AVAILABLE",n[n.UPDATE_AVAILABLE=2]="UPDATE_AVAILABLE",n[n.UPDATE_IN_PROGRESS=3]="UPDATE_IN_PROGRESS"})(Jo||(Jo={}));(function(n){n[n.UNKNOWN=0]="UNKNOWN",n[n.PENDING=1]="PENDING",n[n.DOWNLOADING=2]="DOWNLOADING",n[n.INSTALLING=3]="INSTALLING",n[n.INSTALLED=4]="INSTALLED",n[n.FAILED=5]="FAILED",n[n.CANCELED=6]="CANCELED",n[n.DOWNLOADED=11]="DOWNLOADED"})(yd||(yd={}));(function(n){n[n.OK=0]="OK",n[n.CANCELED=1]="CANCELED",n[n.FAILED=2]="FAILED",n[n.NOT_AVAILABLE=3]="NOT_AVAILABLE",n[n.NOT_ALLOWED=4]="NOT_ALLOWED",n[n.INFO_MISSING=5]="INFO_MISSING"})(Md||(Md={}))});var bd={};Dr(bd,{CapacitorUpdaterWeb:()=>nc});var Ui,nc,Sd=Wn(()=>{Mn();tc();Ui={status:"success",version:"",downloaded:"1970-01-01T00:00:00.000Z",id:"builtin",checksum:""},nc=class extends nn{async setStatsUrl(e){console.warn("Cannot setStatsUrl in web",e)}async setUpdateUrl(e){console.warn("Cannot setUpdateUrl in web",e)}async setChannelUrl(e){console.warn("Cannot setChannelUrl in web",e)}async download(e){return console.warn("Cannot download version in web",e),Ui}async next(e){return console.warn("Cannot set next version in web",e),Ui}async isAutoUpdateEnabled(){return console.warn("Cannot get isAutoUpdateEnabled in web"),{enabled:!1}}async set(e){console.warn("Cannot set active bundle in web",e)}async startPreviewSession(e){console.warn("Cannot start preview session in web",e)}async listPreviews(){return console.warn("Cannot list previews in web"),{previews:[],currentBundle:Ui}}async setPreview(e){console.warn("Cannot set preview in web",e)}async resetPreview(){console.warn("Cannot reset preview in web")}async deletePreview(e){return console.warn("Cannot delete preview in web",e),{removed:!1,deleted:!1}}async checkPreviewUpdate(e){throw console.warn("Cannot check preview update in web",e),this.unimplemented("Preview updates are not available on web platform")}async updatePreview(e){throw console.warn("Cannot update preview in web",e),this.unimplemented("Preview updates are not available on web platform")}async getDeviceId(){return console.warn("Cannot get ID in web"),{deviceId:"default"}}async getBuiltinVersion(){return console.warn("Cannot get version in web"),{version:"default"}}async getPluginVersion(){return console.warn("Cannot get plugin version in web"),{version:"default"}}async delete(e){console.warn("Cannot delete bundle in web",e)}async setBundleError(e){return console.warn("Cannot setBundleError in web",e),Ui}async list(){return console.warn("Cannot list bundles in web"),{bundles:[]}}async reset(e){console.warn("Cannot reset version in web",e)}async current(){return console.warn("Cannot get current bundle in web"),{bundle:Ui,native:"0.0.0"}}async reload(){console.warn("Cannot reload current bundle in web")}async getLatest(){return console.warn("Cannot getLatest current bundle in web"),{version:"0.0.0",message:"Cannot getLatest current bundle in web"}}async triggerUpdateCheck(){return console.warn("Cannot triggerUpdateCheck in web"),{status:"unavailable",queued:!1}}async getMissingBundleFiles(e){var t,i,s;console.warn("Cannot inspect missing bundle files in web",{manifestLength:(i=(t=e.manifest)===null||t===void 0?void 0:t.length)!==null&&i!==void 0?i:0});let r=(s=e.manifest)!==null&&s!==void 0?s:[];return{missing:r,total:r.length,missingCount:r.length,reusableCount:0}}async getBundleDownloadSize(e){var t,i,s,r,a;return console.warn("Cannot estimate bundle download size in web",{manifestLength:(i=(t=e.manifest)===null||t===void 0?void 0:t.length)!==null&&i!==void 0?i:0}),{totalSize:0,knownFiles:0,unknownFiles:(r=(s=e.manifest)===null||s===void 0?void 0:s.length)!==null&&r!==void 0?r:0,files:((a=e.manifest)!==null&&a!==void 0?a:[]).map(o=>({file_name:o.file_name,file_hash:o.file_hash,download_url:o.download_url,error:"unavailable"}))}}async setChannel(e){return console.warn("Cannot setChannel in web",e),{status:"error",error:"Cannot setChannel in web"}}async unsetChannel(e){console.warn("Cannot unsetChannel in web",e)}async setCustomId(e){console.warn("Cannot setCustomId in web",e)}async getChannel(){return console.warn("Cannot getChannel in web"),{status:"error",error:"Cannot getChannel in web"}}async listChannels(){throw console.warn("Cannot listChannels in web"),{message:"Cannot listChannels in web",error:"platform_not_supported"}}async notifyAppReady(){return{bundle:Ui}}async setMultiDelay(e){console.warn("Cannot setMultiDelay in web",e==null?void 0:e.delayConditions)}async cancelDelay(){console.warn("Cannot cancelDelay in web")}async isAutoUpdateAvailable(){return console.warn("Cannot isAutoUpdateAvailable in web"),{available:!1}}async getCurrentBundle(){return console.warn("Cannot get current bundle in web"),Ui}async getNextBundle(){return Promise.resolve(null)}async getFailedUpdate(){return console.warn("Cannot getFailedUpdate in web"),null}async setShakeMenu(e){throw this.unimplemented("Shake menu not available on web platform")}async isShakeMenuEnabled(){return Promise.resolve({enabled:!1,gesture:"shake"})}async setShakeChannelSelector(e){throw this.unimplemented("Shake channel selector not available on web platform")}async isShakeChannelSelectorEnabled(){return Promise.resolve({enabled:!1})}async getAppId(){return console.warn("Cannot getAppId in web"),{appId:"default"}}async setAppId(e){console.warn("Cannot setAppId in web",e)}async getAppUpdateInfo(e){return console.warn("getAppUpdateInfo is not available on web platform"),{currentVersionName:"0.0.0",currentVersionCode:"0",updateAvailability:Jo.UNKNOWN}}async openAppStore(e){throw this.unimplemented("openAppStore is not available on web platform")}async performImmediateUpdate(){throw this.unimplemented("performImmediateUpdate is only available on Android")}async startFlexibleUpdate(){throw this.unimplemented("startFlexibleUpdate is only available on Android")}async completeFlexibleUpdate(){throw this.unimplemented("completeFlexibleUpdate is only available on Android")}}});var Tf=0,jc=1,Af=2;var Tu=1,Dl=2,Nn=3,ei=0,Nt=1,vn=2;var wn=0,ls=1,us=2,Qc=3,eh=4,Rf=5,Si=100,Cf=101,Pf=102,th=103,nh=104,Lf=200,If=201,Uf=202,Df=203,Qa=204,el=205,Nf=206,Of=207,Ff=208,Bf=209,zf=210,kf=211,Hf=212,Vf=213,Gf=214,Wf=0,Xf=1,qf=2,ao=3,Yf=4,$f=5,Zf=6,Kf=7,Au=0,Jf=1,jf=2,jn=0,Nl=1,Ol=2,Fl=3,fr=4,Qf=5,Bl=6;var Ru=300,ds=301,fs=302,tl=303,nl=304,Bo=306,er=1e3,jt=1001,il=1002,Ht=1003,ih=1004;var Sa=1005;var an=1006,ep=1007;var tr=1008;var Qn=1009,tp=1010,np=1011,zl=1012,Cu=1013,Kn=1014,Jn=1015,Qt=1016,Pu=1017,Lu=1018,Ei=1020,ip=1021,_n=1023,sp=1024,rp=1025,Ti=1026,ps=1027,op=1028,Iu=1029,ap=1030,Uu=1031,Du=1033,wa=33776,Ea=33777,Ta=33778,Aa=33779,sh=35840,rh=35841,oh=35842,ah=35843,Nu=36196,lh=37492,ch=37496,hh=37808,uh=37809,dh=37810,fh=37811,ph=37812,mh=37813,gh=37814,vh=37815,_h=37816,xh=37817,yh=37818,Mh=37819,bh=37820,Sh=37821,Ra=36492,wh=36494,Eh=36495,lp=36283,Th=36284,Ah=36285,Rh=36286;var lo=2300,co=2301,Ca=2302,Ch=2400,Ph=2401,Lh=2402;var Ou=3e3,Ai=3001,cp=3200,hp=3201,Fu=0,up=1,ln="",yt="srgb",Bn="srgb-linear",kl="display-p3",zo="display-p3-linear",ho="linear",Ke="srgb",uo="rec709",fo="p3";var Hi=7680;var Ih=519,dp=512,fp=513,pp=514,Bu=515,mp=516,gp=517,vp=518,_p=519,Uh=35044;var Dh="300 es",sl=1035,Fn=2e3,po=2001,ti=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let i=this._listeners[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Nh=1234567,Ks=Math.PI/180,ms=180/Math.PI;function Ss(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]).toLowerCase()}function Ut(n,e,t){return Math.max(e,Math.min(t,n))}function Hl(n,e){return(n%e+e)%e}function xp(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function yp(n,e,t){return n!==e?(t-n)/(e-n):0}function Js(n,e,t){return(1-t)*n+t*e}function Mp(n,e,t,i){return Js(n,e,1-Math.exp(-t*i))}function bp(n,e=1){return e-Math.abs(Hl(n,e*2)-e)}function Sp(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function wp(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Ep(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Tp(n,e){return n+Math.random()*(e-n)}function Ap(n){return n*(.5-Math.random())}function Rp(n){n!==void 0&&(Nh=n);let e=Nh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Cp(n){return n*Ks}function Pp(n){return n*ms}function rl(n){return(n&n-1)===0&&n!==0}function Lp(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function mo(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Ip(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),h=a((e+i)/2),d=r((e-i)/2),f=a((e-i)/2),p=r((i-e)/2),g=a((i-e)/2);switch(s){case"XYX":n.set(o*h,l*d,l*f,o*c);break;case"YZY":n.set(l*f,o*h,l*d,o*c);break;case"ZXZ":n.set(l*d,l*f,o*h,o*c);break;case"XZX":n.set(o*h,l*g,l*p,o*c);break;case"YXY":n.set(l*p,o*h,l*g,o*c);break;case"ZYZ":n.set(l*g,l*p,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ss(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function zt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var zu={DEG2RAD:Ks,RAD2DEG:ms,generateUUID:Ss,clamp:Ut,euclideanModulo:Hl,mapLinear:xp,inverseLerp:yp,lerp:Js,damp:Mp,pingpong:bp,smoothstep:Sp,smootherstep:wp,randInt:Ep,randFloat:Tp,randFloatSpread:Ap,seededRandom:Rp,degToRad:Cp,radToDeg:Pp,isPowerOfTwo:rl,ceilPowerOfTwo:Lp,floorPowerOfTwo:mo,setQuaternionFromProperEuler:Ip,normalize:zt,denormalize:ss},_e=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ve=class n{constructor(e,t,i,s,r,a,o,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],f=i[2],p=i[5],g=i[8],v=s[0],m=s[3],u=s[6],y=s[1],_=s[4],S=s[7],w=s[2],E=s[5],A=s[8];return r[0]=a*v+o*y+l*w,r[3]=a*m+o*_+l*E,r[6]=a*u+o*S+l*A,r[1]=c*v+h*y+d*w,r[4]=c*m+h*_+d*E,r[7]=c*u+h*S+d*A,r[2]=f*v+p*y+g*w,r[5]=f*m+p*_+g*E,r[8]=f*u+p*S+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,f=o*l-h*r,p=c*r-a*l,g=t*d+i*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return e[0]=d*v,e[1]=(s*c-h*i)*v,e[2]=(o*i-s*a)*v,e[3]=f*v,e[4]=(h*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=p*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Pa.makeScale(e,t)),this}rotate(e){return this.premultiply(Pa.makeRotation(-e)),this}translate(e,t){return this.premultiply(Pa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Pa=new Ve;function ku(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function go(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Up(){let n=go("canvas");return n.style.display="block",n}var Oh={};function js(n){n in Oh||(Oh[n]=!0,console.warn(n))}var Fh=new Ve().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Bh=new Ve().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Nr={[Bn]:{transfer:ho,primaries:uo,toReference:n=>n,fromReference:n=>n},[yt]:{transfer:Ke,primaries:uo,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[zo]:{transfer:ho,primaries:fo,toReference:n=>n.applyMatrix3(Bh),fromReference:n=>n.applyMatrix3(Fh)},[kl]:{transfer:Ke,primaries:fo,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Bh),fromReference:n=>n.applyMatrix3(Fh).convertLinearToSRGB()}},Dp=new Set([Bn,zo]),qe={enabled:!0,_workingColorSpace:Bn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Dp.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;let i=Nr[e].toReference,s=Nr[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Nr[n].primaries},getTransfer:function(n){return n===ln?ho:Nr[n].transfer}};function cs(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function La(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Vi,vo=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Vi===void 0&&(Vi=go("canvas")),Vi.width=e.width,Vi.height=e.height;let i=Vi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Vi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=go("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=cs(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(cs(t[i]/255)*255):t[i]=cs(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Np=0,_o=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=Ss(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ia(s[a].image)):r.push(Ia(s[a]))}else r=Ia(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function Ia(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?vo.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Op=0,cn=class n extends ti{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=jt,s=jt,r=an,a=tr,o=_n,l=Qn,c=n.DEFAULT_ANISOTROPY,h=ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Op++}),this.uuid=Ss(),this.name="",this.source=new _o(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new _e(0,0),this.repeat=new _e(1,1),this.center=new _e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(js("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Ai?yt:ln),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ru)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case er:e.x=e.x-Math.floor(e.x);break;case jt:e.x=e.x<0?0:1;break;case il:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case er:e.y=e.y-Math.floor(e.y);break;case jt:e.y=e.y<0?0:1;break;case il:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return js("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===yt?Ai:Ou}set encoding(e){js("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Ai?yt:ln}};cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=Ru;cn.DEFAULT_ANISOTROPY=1;var Tt=class n{constructor(e=0,t=0,i=0,s=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,l=e.elements,c=l[0],h=l[4],d=l[8],f=l[1],p=l[5],g=l[9],v=l[2],m=l[6],u=l[10];if(Math.abs(h-f)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(c+1)/2,S=(p+1)/2,w=(u+1)/2,E=(h+f)/4,A=(d+v)/4,C=(g+m)/4;return _>S&&_>w?_<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(_),s=E/i,r=A/i):S>w?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=E/s,r=C/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=A/r,s=C/r),this.set(i,s,r,t),this}let y=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(d-v)/y,this.z=(f-h)/y,this.w=Math.acos((c+p+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ol=class extends ti{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);let s={width:e,height:t,depth:1};i.encoding!==void 0&&(js("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Ai?yt:ln),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new cn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new _o(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ct=class extends ol{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},xo=class extends cn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var al=class extends cn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var En=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],d=i[s+3],f=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(d!==v||l!==f||c!==p||h!==g){let m=1-o,u=l*f+c*p+h*g+d*v,y=u>=0?1:-1,_=1-u*u;if(_>Number.EPSILON){let w=Math.sqrt(_),E=Math.atan2(w,u*y);m=Math.sin(m*E)/w,o=Math.sin(o*E)/w}let S=o*y;if(l=l*m+f*S,c=c*m+p*S,h=h*m+g*S,d=d*m+v*S,m===1-o){let w=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=w,c*=w,h*=w,d*=w}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],d=r[a],f=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+h*d+l*p-c*f,e[t+1]=l*g+h*f+c*d-o*p,e[t+2]=c*g+h*p+o*f-l*d,e[t+3]=h*g-o*d-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),d=o(r/2),f=l(i/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*d+c*p*g,this._y=c*p*d-f*h*g,this._z=c*h*g+f*p*d,this._w=c*h*d-f*p*g;break;case"YXZ":this._x=f*h*d+c*p*g,this._y=c*p*d-f*h*g,this._z=c*h*g-f*p*d,this._w=c*h*d+f*p*g;break;case"ZXY":this._x=f*h*d-c*p*g,this._y=c*p*d+f*h*g,this._z=c*h*g+f*p*d,this._w=c*h*d-f*p*g;break;case"ZYX":this._x=f*h*d-c*p*g,this._y=c*p*d+f*h*g,this._z=c*h*g-f*p*d,this._w=c*h*d+f*p*g;break;case"YZX":this._x=f*h*d+c*p*g,this._y=c*p*d+f*h*g,this._z=c*h*g-f*p*d,this._w=c*h*d-f*p*g;break;case"XZY":this._x=f*h*d-c*p*g,this._y=c*p*d-f*h*g,this._z=c*h*g+f*p*d,this._w=c*h*d+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],f=i+o+d;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>d){let p=2*Math.sqrt(1+i-o-d);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-i-d);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+d-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ut(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-t)*h)/c,f=Math.sin(t*h)/c;return this._w=a*d+this._w*f,this._x=i*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),i*Math.sin(r),i*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(zh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(zh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),h=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+l*c+a*d-o*h,this.y=i+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ua.copy(this).projectOnVector(e),this.sub(Ua)}reflect(e){return this.sub(Ua.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ua=new U,zh=new En,zn=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,pn):pn.fromBufferAttribute(r,a),pn.applyMatrix4(e.matrixWorld),this.expandByPoint(pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Or.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Or.copy(i.boundingBox)),Or.applyMatrix4(e.matrixWorld),this.union(Or)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,pn),pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ws),Fr.subVectors(this.max,Ws),Gi.subVectors(e.a,Ws),Wi.subVectors(e.b,Ws),Xi.subVectors(e.c,Ws),Xn.subVectors(Wi,Gi),qn.subVectors(Xi,Wi),_i.subVectors(Gi,Xi);let t=[0,-Xn.z,Xn.y,0,-qn.z,qn.y,0,-_i.z,_i.y,Xn.z,0,-Xn.x,qn.z,0,-qn.x,_i.z,0,-_i.x,-Xn.y,Xn.x,0,-qn.y,qn.x,0,-_i.y,_i.x,0];return!Da(t,Gi,Wi,Xi,Fr)||(t=[1,0,0,0,1,0,0,0,1],!Da(t,Gi,Wi,Xi,Fr))?!1:(Br.crossVectors(Xn,qn),t=[Br.x,Br.y,Br.z],Da(t,Gi,Wi,Xi,Fr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Pn=[new U,new U,new U,new U,new U,new U,new U,new U],pn=new U,Or=new zn,Gi=new U,Wi=new U,Xi=new U,Xn=new U,qn=new U,_i=new U,Ws=new U,Fr=new U,Br=new U,xi=new U;function Da(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){xi.fromArray(n,r);let o=s.x*Math.abs(xi.x)+s.y*Math.abs(xi.y)+s.z*Math.abs(xi.z),l=e.dot(xi),c=t.dot(xi),h=i.dot(xi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Fp=new zn,Xs=new U,Na=new U,ni=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Fp.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xs.subVectors(e,this.center);let t=Xs.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Xs,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Na.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xs.copy(e.center).add(Na)),this.expandByPoint(Xs.copy(e.center).sub(Na))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Ln=new U,Oa=new U,zr=new U,Yn=new U,Fa=new U,kr=new U,Ba=new U,yo=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ln)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ln.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ln.copy(this.origin).addScaledVector(this.direction,t),Ln.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Oa.copy(e).add(t).multiplyScalar(.5),zr.copy(t).sub(e).normalize(),Yn.copy(this.origin).sub(Oa);let r=e.distanceTo(t)*.5,a=-this.direction.dot(zr),o=Yn.dot(this.direction),l=-Yn.dot(zr),c=Yn.lengthSq(),h=Math.abs(1-a*a),d,f,p,g;if(h>0)if(d=a*l-o,f=a*o-l,g=r*h,d>=0)if(f>=-g)if(f<=g){let v=1/h;d*=v,f*=v,p=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=r,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+f*(f+2*l)+c);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Oa).addScaledVector(zr,f),p}intersectSphere(e,t){Ln.subVectors(e.center,this.origin);let i=Ln.dot(this.direction),s=Ln.dot(Ln)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Ln)!==null}intersectTriangle(e,t,i,s,r){Fa.subVectors(t,e),kr.subVectors(i,e),Ba.crossVectors(Fa,kr);let a=this.direction.dot(Ba),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Yn.subVectors(this.origin,e);let l=o*this.direction.dot(kr.crossVectors(Yn,kr));if(l<0)return null;let c=o*this.direction.dot(Fa.cross(Yn));if(c<0||l+c>a)return null;let h=-o*Yn.dot(Ba);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},nt=class n{constructor(e,t,i,s,r,a,o,l,c,h,d,f,p,g,v,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,h,d,f,p,g,v,m)}set(e,t,i,s,r,a,o,l,c,h,d,f,p,g,v,m){let u=this.elements;return u[0]=e,u[4]=t,u[8]=i,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=h,u[10]=d,u[14]=f,u[3]=p,u[7]=g,u[11]=v,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,s=1/qi.setFromMatrixColumn(e,0).length(),r=1/qi.setFromMatrixColumn(e,1).length(),a=1/qi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let f=a*h,p=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=p+g*c,t[5]=f-v*c,t[9]=-o*l,t[2]=v-f*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){let f=l*h,p=l*d,g=c*h,v=c*d;t[0]=f+v*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=v+f*o,t[10]=a*l}else if(e.order==="ZXY"){let f=l*h,p=l*d,g=c*h,v=c*d;t[0]=f-v*o,t[4]=-a*d,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=v-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let f=a*h,p=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=g*c-p,t[8]=f*c+v,t[1]=l*d,t[5]=v*c+f,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let f=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=v-f*d,t[8]=g*d+p,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*d+g,t[10]=f-v*d}else if(e.order==="XZY"){let f=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=f*d+v,t[5]=a*h,t[9]=p*d-g,t[2]=g*d-p,t[6]=o*h,t[10]=v*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bp,e,zp)}lookAt(e,t,i){let s=this.elements;return Kt.subVectors(e,t),Kt.lengthSq()===0&&(Kt.z=1),Kt.normalize(),$n.crossVectors(i,Kt),$n.lengthSq()===0&&(Math.abs(i.z)===1?Kt.x+=1e-4:Kt.z+=1e-4,Kt.normalize(),$n.crossVectors(i,Kt)),$n.normalize(),Hr.crossVectors(Kt,$n),s[0]=$n.x,s[4]=Hr.x,s[8]=Kt.x,s[1]=$n.y,s[5]=Hr.y,s[9]=Kt.y,s[2]=$n.z,s[6]=Hr.z,s[10]=Kt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],f=i[9],p=i[13],g=i[2],v=i[6],m=i[10],u=i[14],y=i[3],_=i[7],S=i[11],w=i[15],E=s[0],A=s[4],C=s[8],x=s[12],b=s[1],I=s[5],k=s[9],X=s[13],L=s[2],N=s[6],V=s[10],Y=s[14],q=s[3],W=s[7],Z=s[11],j=s[15];return r[0]=a*E+o*b+l*L+c*q,r[4]=a*A+o*I+l*N+c*W,r[8]=a*C+o*k+l*V+c*Z,r[12]=a*x+o*X+l*Y+c*j,r[1]=h*E+d*b+f*L+p*q,r[5]=h*A+d*I+f*N+p*W,r[9]=h*C+d*k+f*V+p*Z,r[13]=h*x+d*X+f*Y+p*j,r[2]=g*E+v*b+m*L+u*q,r[6]=g*A+v*I+m*N+u*W,r[10]=g*C+v*k+m*V+u*Z,r[14]=g*x+v*X+m*Y+u*j,r[3]=y*E+_*b+S*L+w*q,r[7]=y*A+_*I+S*N+w*W,r[11]=y*C+_*k+S*V+w*Z,r[15]=y*x+_*X+S*Y+w*j,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],f=e[10],p=e[14],g=e[3],v=e[7],m=e[11],u=e[15];return g*(+r*l*d-s*c*d-r*o*f+i*c*f+s*o*p-i*l*p)+v*(+t*l*p-t*c*f+r*a*f-s*a*p+s*c*h-r*l*h)+m*(+t*c*d-t*o*p-r*a*d+i*a*p+r*o*h-i*c*h)+u*(-s*o*h-t*l*d+t*o*f+s*a*d-i*a*f+i*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],f=e[10],p=e[11],g=e[12],v=e[13],m=e[14],u=e[15],y=d*m*c-v*f*c+v*l*p-o*m*p-d*l*u+o*f*u,_=g*f*c-h*m*c-g*l*p+a*m*p+h*l*u-a*f*u,S=h*v*c-g*d*c+g*o*p-a*v*p-h*o*u+a*d*u,w=g*d*l-h*v*l-g*o*f+a*v*f+h*o*m-a*d*m,E=t*y+i*_+s*S+r*w;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/E;return e[0]=y*A,e[1]=(v*f*r-d*m*r-v*s*p+i*m*p+d*s*u-i*f*u)*A,e[2]=(o*m*r-v*l*r+v*s*c-i*m*c-o*s*u+i*l*u)*A,e[3]=(d*l*r-o*f*r-d*s*c+i*f*c+o*s*p-i*l*p)*A,e[4]=_*A,e[5]=(h*m*r-g*f*r+g*s*p-t*m*p-h*s*u+t*f*u)*A,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*u-t*l*u)*A,e[7]=(a*f*r-h*l*r+h*s*c-t*f*c-a*s*p+t*l*p)*A,e[8]=S*A,e[9]=(g*d*r-h*v*r-g*i*p+t*v*p+h*i*u-t*d*u)*A,e[10]=(a*v*r-g*o*r+g*i*c-t*v*c-a*i*u+t*o*u)*A,e[11]=(h*o*r-a*d*r-h*i*c+t*d*c+a*i*p-t*o*p)*A,e[12]=w*A,e[13]=(h*v*s-g*d*s+g*i*f-t*v*f-h*i*m+t*d*m)*A,e[14]=(g*o*s-a*v*s-g*i*l+t*v*l+a*i*m-t*o*m)*A,e[15]=(a*d*s-h*o*s+h*i*l-t*d*l-a*i*f+t*o*f)*A,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,f=r*c,p=r*h,g=r*d,v=a*h,m=a*d,u=o*d,y=l*c,_=l*h,S=l*d,w=i.x,E=i.y,A=i.z;return s[0]=(1-(v+u))*w,s[1]=(p+S)*w,s[2]=(g-_)*w,s[3]=0,s[4]=(p-S)*E,s[5]=(1-(f+u))*E,s[6]=(m+y)*E,s[7]=0,s[8]=(g+_)*A,s[9]=(m-y)*A,s[10]=(1-(f+v))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements,r=qi.set(s[0],s[1],s[2]).length(),a=qi.set(s[4],s[5],s[6]).length(),o=qi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],mn.copy(this);let c=1/r,h=1/a,d=1/o;return mn.elements[0]*=c,mn.elements[1]*=c,mn.elements[2]*=c,mn.elements[4]*=h,mn.elements[5]*=h,mn.elements[6]*=h,mn.elements[8]*=d,mn.elements[9]*=d,mn.elements[10]*=d,t.setFromRotationMatrix(mn),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=Fn){let l=this.elements,c=2*r/(t-e),h=2*r/(i-s),d=(t+e)/(t-e),f=(i+s)/(i-s),p,g;if(o===Fn)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===po)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Fn){let l=this.elements,c=1/(t-e),h=1/(i-s),d=1/(a-r),f=(t+e)*c,p=(i+s)*h,g,v;if(o===Fn)g=(a+r)*d,v=-2*d;else if(o===po)g=r*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},qi=new U,mn=new nt,Bp=new U(0,0,0),zp=new U(1,1,1),$n=new U,Hr=new U,Kt=new U,kh=new nt,Hh=new En,gs=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ut(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return kh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(kh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hh.setFromEuler(this),this.setFromQuaternion(Hh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};gs.DEFAULT_ORDER="XYZ";var Mo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},kp=0,Vh=new U,Yi=new En,In=new nt,Vr=new U,qs=new U,Hp=new U,Vp=new En,Gh=new U(1,0,0),Wh=new U(0,1,0),Xh=new U(0,0,1),Gp={type:"added"},Wp={type:"removed"},_t=class n extends ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kp++}),this.uuid=Ss(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new U,t=new gs,i=new En,s=new U(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new nt},normalMatrix:{value:new Ve}}),this.matrix=new nt,this.matrixWorld=new nt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Mo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Yi.setFromAxisAngle(e,t),this.quaternion.multiply(Yi),this}rotateOnWorldAxis(e,t){return Yi.setFromAxisAngle(e,t),this.quaternion.premultiply(Yi),this}rotateX(e){return this.rotateOnAxis(Gh,e)}rotateY(e){return this.rotateOnAxis(Wh,e)}rotateZ(e){return this.rotateOnAxis(Xh,e)}translateOnAxis(e,t){return Vh.copy(e).applyQuaternion(this.quaternion),this.position.add(Vh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gh,e)}translateY(e){return this.translateOnAxis(Wh,e)}translateZ(e){return this.translateOnAxis(Xh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Vr.copy(e):Vr.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(qs,Vr,this.up):In.lookAt(Vr,qs,this.up),this.quaternion.setFromRotationMatrix(In),s&&(In.extractRotation(s.matrixWorld),Yi.setFromRotationMatrix(In),this.quaternion.premultiply(Yi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Gp)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wp)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),In.multiply(e.parent.matrixWorld)),e.applyMatrix4(In),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qs,e,Hp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qs,Vp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++){let r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++){let o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),f=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}};_t.DEFAULT_UP=new U(0,1,0);_t.DEFAULT_MATRIX_AUTO_UPDATE=!0;_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var gn=new U,Un=new U,za=new U,Dn=new U,$i=new U,Zi=new U,qh=new U,ka=new U,Ha=new U,Va=new U,Gr=!1,rs=class n{constructor(e=new U,t=new U,i=new U){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),gn.subVectors(e,t),s.cross(gn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){gn.subVectors(s,t),Un.subVectors(i,t),za.subVectors(e,t);let a=gn.dot(gn),o=gn.dot(Un),l=gn.dot(za),c=Un.dot(Un),h=Un.dot(za),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let f=1/d,p=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getUV(e,t,i,s,r,a,o,l){return Gr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Gr=!0),this.getInterpolation(e,t,i,s,r,a,o,l)}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,Dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Dn.x),l.addScaledVector(a,Dn.y),l.addScaledVector(o,Dn.z),l)}static isFrontFacing(e,t,i,s){return gn.subVectors(i,t),Un.subVectors(e,t),gn.cross(Un).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return gn.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),gn.cross(Un).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,s,r){return Gr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Gr=!0),n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;$i.subVectors(s,i),Zi.subVectors(r,i),ka.subVectors(e,i);let l=$i.dot(ka),c=Zi.dot(ka);if(l<=0&&c<=0)return t.copy(i);Ha.subVectors(e,s);let h=$i.dot(Ha),d=Zi.dot(Ha);if(h>=0&&d<=h)return t.copy(s);let f=l*d-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector($i,a);Va.subVectors(e,r);let p=$i.dot(Va),g=Zi.dot(Va);if(g>=0&&p<=g)return t.copy(r);let v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(Zi,o);let m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return qh.subVectors(r,s),o=(d-h)/(d-h+(p-g)),t.copy(s).addScaledVector(qh,o);let u=1/(m+v+f);return a=v*u,o=f*u,t.copy(i).addScaledVector($i,a).addScaledVector(Zi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Hu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},Wr={h:0,s:0,l:0};function Ga(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var ce=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,qe.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=qe.workingColorSpace){if(e=Hl(e,1),t=Ut(t,0,1),i=Ut(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Ga(a,r,e+1/3),this.g=Ga(a,r,e),this.b=Ga(a,r,e-1/3)}return qe.toWorkingColorSpace(this,s),this}setStyle(e,t=yt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){let i=Hu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=cs(e.r),this.g=cs(e.g),this.b=cs(e.b),this}copyLinearToSRGB(e){return this.r=La(e.r),this.g=La(e.g),this.b=La(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return qe.fromWorkingColorSpace(It.copy(this),e),Math.round(Ut(It.r*255,0,255))*65536+Math.round(Ut(It.g*255,0,255))*256+Math.round(Ut(It.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.fromWorkingColorSpace(It.copy(this),t);let i=It.r,s=It.g,r=It.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=qe.workingColorSpace){return qe.fromWorkingColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=yt){qe.fromWorkingColorSpace(It.copy(this),e);let t=It.r,i=It.g,s=It.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Zn),this.setHSL(Zn.h+e,Zn.s+t,Zn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Zn),e.getHSL(Wr);let i=Js(Zn.h,Wr.h,t),s=Js(Zn.s,Wr.s,t),r=Js(Zn.l,Wr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},It=new ce;ce.NAMES=Hu;var Xp=0,ii=class extends ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xp++}),this.uuid=Ss(),this.name="",this.type="Material",this.blending=ls,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qa,this.blendDst=el,this.blendEquation=Si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ce(0,0,0),this.blendAlpha=0,this.depthFunc=ao,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ih,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hi,this.stencilZFail=Hi,this.stencilZPass=Hi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ls&&(i.blending=this.blending),this.side!==ei&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Qa&&(i.blendSrc=this.blendSrc),this.blendDst!==el&&(i.blendDst=this.blendDst),this.blendEquation!==Si&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ao&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ih&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Hi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Hi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},en=class extends ii{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Au,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var vt=new U,Xr=new _e,it=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Uh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Jn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Xr.fromBufferAttribute(this,t),Xr.applyMatrix3(e),this.setXY(t,Xr.x,Xr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ss(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=zt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ss(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ss(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ss(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ss(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),s=zt(s,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Uh&&(e.usage=this.usage),e}};var bo=class extends it{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var So=class extends it{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Ze=class extends it{constructor(e,t,i){super(new Float32Array(e),t,i)}};var qp=0,on=new nt,Wa=new _t,Ki=new U,Jt=new zn,Ys=new zn,Et=new U,ht=class n extends ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qp++}),this.uuid=Ss(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ku(e)?So:bo)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ve().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return on.makeRotationFromQuaternion(e),this.applyMatrix4(on),this}rotateX(e){return on.makeRotationX(e),this.applyMatrix4(on),this}rotateY(e){return on.makeRotationY(e),this.applyMatrix4(on),this}rotateZ(e){return on.makeRotationZ(e),this.applyMatrix4(on),this}translate(e,t,i){return on.makeTranslation(e,t,i),this.applyMatrix4(on),this}scale(e,t,i){return on.makeScale(e,t,i),this.applyMatrix4(on),this}lookAt(e){return Wa.lookAt(e),Wa.updateMatrix(),this.applyMatrix4(Wa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ki).negate(),this.translate(Ki.x,Ki.y,Ki.z),this}setFromPoints(e){let t=[];for(let i=0,s=e.length;i<s;i++){let r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Ze(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];Jt.setFromBufferAttribute(r),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Jt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Jt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Jt.min),this.boundingBox.expandByPoint(Jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ni);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(e){let i=this.boundingSphere.center;if(Jt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Ys.setFromBufferAttribute(o),this.morphTargetsRelative?(Et.addVectors(Jt.min,Ys.min),Jt.expandByPoint(Et),Et.addVectors(Jt.max,Ys.max),Jt.expandByPoint(Et)):(Jt.expandByPoint(Ys.min),Jt.expandByPoint(Ys.max))}Jt.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Et.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Et));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Et.fromBufferAttribute(o,c),l&&(Ki.fromBufferAttribute(e,c),Et.add(Ki)),s=Math.max(s,i.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new it(new Float32Array(4*o),4));let l=this.getAttribute("tangent").array,c=[],h=[];for(let b=0;b<o;b++)c[b]=new U,h[b]=new U;let d=new U,f=new U,p=new U,g=new _e,v=new _e,m=new _e,u=new U,y=new U;function _(b,I,k){d.fromArray(s,b*3),f.fromArray(s,I*3),p.fromArray(s,k*3),g.fromArray(a,b*2),v.fromArray(a,I*2),m.fromArray(a,k*2),f.sub(d),p.sub(d),v.sub(g),m.sub(g);let X=1/(v.x*m.y-m.x*v.y);isFinite(X)&&(u.copy(f).multiplyScalar(m.y).addScaledVector(p,-v.y).multiplyScalar(X),y.copy(p).multiplyScalar(v.x).addScaledVector(f,-m.x).multiplyScalar(X),c[b].add(u),c[I].add(u),c[k].add(u),h[b].add(y),h[I].add(y),h[k].add(y))}let S=this.groups;S.length===0&&(S=[{start:0,count:i.length}]);for(let b=0,I=S.length;b<I;++b){let k=S[b],X=k.start,L=k.count;for(let N=X,V=X+L;N<V;N+=3)_(i[N+0],i[N+1],i[N+2])}let w=new U,E=new U,A=new U,C=new U;function x(b){A.fromArray(r,b*3),C.copy(A);let I=c[b];w.copy(I),w.sub(A.multiplyScalar(A.dot(I))).normalize(),E.crossVectors(C,I);let X=E.dot(h[b])<0?-1:1;l[b*4]=w.x,l[b*4+1]=w.y,l[b*4+2]=w.z,l[b*4+3]=X}for(let b=0,I=S.length;b<I;++b){let k=S[b],X=k.start,L=k.count;for(let N=X,V=X+L;N<V;N+=3)x(i[N+0]),x(i[N+1]),x(i[N+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new it(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);let s=new U,r=new U,a=new U,o=new U,l=new U,c=new U,h=new U,d=new U;if(e)for(let f=0,p=e.count;f<p;f+=3){let g=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,f=new c.constructor(l.length*h),p=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*h;for(let u=0;u<h;u++)f[g++]=c[p++]}return new it(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,i);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let f=c[h],p=e(f,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,f=c.length;d<f;d++){let p=c[d];h.push(p.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone(t));let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let f=0,p=d.length;f<p;f++)h.push(d[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yh=new nt,yi=new yo,qr=new ni,$h=new U,Ji=new U,ji=new U,Qi=new U,Xa=new U,Yr=new U,$r=new _e,Zr=new _e,Kr=new _e,Zh=new U,Kh=new U,Jh=new U,Jr=new U,jr=new U,et=class extends _t{constructor(e=new ht,t=new en){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Yr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(Xa.fromBufferAttribute(d,e),a?Yr.addScaledVector(Xa,h):Yr.addScaledVector(Xa.sub(t),h))}t.add(Yr)}return t}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),qr.copy(i.boundingSphere),qr.applyMatrix4(r),yi.copy(e.ray).recast(e.near),!(qr.containsPoint(yi.origin)===!1&&(yi.intersectSphere(qr,$h)===null||yi.origin.distanceToSquared($h)>(e.far-e.near)**2))&&(Yh.copy(r).invert(),yi.copy(e.ray).applyMatrix4(Yh),!(i.boundingBox!==null&&yi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,yi)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){let m=f[g],u=a[m.materialIndex],y=Math.max(m.start,p.start),_=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let S=y,w=_;S<w;S+=3){let E=o.getX(S),A=o.getX(S+1),C=o.getX(S+2);s=Qr(this,u,e,i,c,h,d,E,A,C),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,u=v;m<u;m+=3){let y=o.getX(m),_=o.getX(m+1),S=o.getX(m+2);s=Qr(this,a,e,i,c,h,d,y,_,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){let m=f[g],u=a[m.materialIndex],y=Math.max(m.start,p.start),_=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=y,w=_;S<w;S+=3){let E=S,A=S+1,C=S+2;s=Qr(this,u,e,i,c,h,d,E,A,C),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,u=v;m<u;m+=3){let y=m,_=m+1,S=m+2;s=Qr(this,a,e,i,c,h,d,y,_,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Yp(n,e,t,i,s,r,a,o){let l;if(e.side===Nt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===ei,o),l===null)return null;jr.copy(o),jr.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(jr);return c<t.near||c>t.far?null:{distance:c,point:jr.clone(),object:n}}function Qr(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,Ji),n.getVertexPosition(l,ji),n.getVertexPosition(c,Qi);let h=Yp(n,e,t,i,Ji,ji,Qi,Jr);if(h){s&&($r.fromBufferAttribute(s,o),Zr.fromBufferAttribute(s,l),Kr.fromBufferAttribute(s,c),h.uv=rs.getInterpolation(Jr,Ji,ji,Qi,$r,Zr,Kr,new _e)),r&&($r.fromBufferAttribute(r,o),Zr.fromBufferAttribute(r,l),Kr.fromBufferAttribute(r,c),h.uv1=rs.getInterpolation(Jr,Ji,ji,Qi,$r,Zr,Kr,new _e),h.uv2=h.uv1),a&&(Zh.fromBufferAttribute(a,o),Kh.fromBufferAttribute(a,l),Jh.fromBufferAttribute(a,c),h.normal=rs.getInterpolation(Jr,Ji,ji,Qi,Zh,Kh,Jh,new U),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new U,materialIndex:0};rs.getNormal(Ji,ji,Qi,d.normal),h.face=d}return h}var Xe=class n extends ht{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],f=0,p=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Ze(c,3)),this.setAttribute("normal",new Ze(h,3)),this.setAttribute("uv",new Ze(d,2));function g(v,m,u,y,_,S,w,E,A,C,x){let b=S/A,I=w/C,k=S/2,X=w/2,L=E/2,N=A+1,V=C+1,Y=0,q=0,W=new U;for(let Z=0;Z<V;Z++){let j=Z*I-X;for(let oe=0;oe<N;oe++){let G=oe*b-k;W[v]=G*y,W[m]=j*_,W[u]=L,c.push(W.x,W.y,W.z),W[v]=0,W[m]=0,W[u]=E>0?1:-1,h.push(W.x,W.y,W.z),d.push(oe/A),d.push(1-Z/C),Y+=1}}for(let Z=0;Z<C;Z++)for(let j=0;j<A;j++){let oe=f+j+N*Z,G=f+j+N*(Z+1),$=f+(j+1)+N*(Z+1),ae=f+(j+1)+N*Z;l.push(oe,G,ae),l.push(G,$,ae),q+=6}o.addGroup(p,q,x),p+=q,f+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function vs(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function kt(n){let e={};for(let t=0;t<n.length;t++){let i=vs(n[t]);for(let s in i)e[s]=i[s]}return e}function $p(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Vu(n){return n.getRenderTarget()===null?n.outputColorSpace:qe.workingColorSpace}var si={clone:vs,merge:kt},Zp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Kp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,dt=class extends ii{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zp,this.fragmentShader=Kp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vs(e.uniforms),this.uniformsGroups=$p(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},wo=class extends _t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nt,this.projectionMatrix=new nt,this.projectionMatrixInverse=new nt,this.coordinateSystem=Fn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Dt=class extends wo{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ms*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ks*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ms*2*Math.atan(Math.tan(Ks*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ks*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},es=-90,ts=1,ll=class extends _t{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Dt(es,ts,e,t);s.layers=this.layers,this.add(s);let r=new Dt(es,ts,e,t);r.layers=this.layers,this.add(r);let a=new Dt(es,ts,e,t);a.layers=this.layers,this.add(a);let o=new Dt(es,ts,e,t);o.layers=this.layers,this.add(o);let l=new Dt(es,ts,e,t);l.layers=this.layers,this.add(l);let c=new Dt(es,ts,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Fn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===po)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(d,f,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Eo=class extends cn{constructor(e,t,i,s,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:ds,super(e,t,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},cl=class extends Ct{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];t.encoding!==void 0&&(js("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Ai?yt:ln),this.texture=new Eo(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:an}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Xe(5,5,5),r=new dt({name:"CubemapFromEquirect",uniforms:vs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Nt,blending:wn});r.uniforms.tEquirect.value=t;let a=new et(s,r),o=t.minFilter;return t.minFilter===tr&&(t.minFilter=an),new ll(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,s){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}},qa=new U,Jp=new U,jp=new Ve,On=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=qa.subVectors(i,t).cross(Jp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(qa),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||jp.getNormalMatrix(e),s=this.coplanarPoint(qa).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Mi=new ni,eo=new U,nr=class{constructor(e=new On,t=new On,i=new On,s=new On,r=new On,a=new On){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Fn){let i=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],d=s[6],f=s[7],p=s[8],g=s[9],v=s[10],m=s[11],u=s[12],y=s[13],_=s[14],S=s[15];if(i[0].setComponents(l-r,f-c,m-p,S-u).normalize(),i[1].setComponents(l+r,f+c,m+p,S+u).normalize(),i[2].setComponents(l+a,f+h,m+g,S+y).normalize(),i[3].setComponents(l-a,f-h,m-g,S-y).normalize(),i[4].setComponents(l-o,f-d,m-v,S-_).normalize(),t===Fn)i[5].setComponents(l+o,f+d,m+v,S+_).normalize();else if(t===po)i[5].setComponents(o,d,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Mi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Mi)}intersectsSprite(e){return Mi.center.set(0,0,0),Mi.radius=.7071067811865476,Mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Mi)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(eo.x=s.normal.x>0?e.max.x:e.min.x,eo.y=s.normal.y>0?e.max.y:e.min.y,eo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(eo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Gu(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Qp(n,e){let t=e.isWebGL2,i=new WeakMap;function s(c,h){let d=c.array,f=c.usage,p=d.byteLength,g=n.createBuffer();n.bindBuffer(h,g),n.bufferData(h,d,f),c.onUploadCallback();let v;if(d instanceof Float32Array)v=n.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=n.UNSIGNED_SHORT;else if(d instanceof Int16Array)v=n.SHORT;else if(d instanceof Uint32Array)v=n.UNSIGNED_INT;else if(d instanceof Int32Array)v=n.INT;else if(d instanceof Int8Array)v=n.BYTE;else if(d instanceof Uint8Array)v=n.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)v=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:v,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:p}}function r(c,h,d){let f=h.array,p=h._updateRange,g=h.updateRanges;if(n.bindBuffer(d,c),p.count===-1&&g.length===0&&n.bufferSubData(d,0,f),g.length!==0){for(let v=0,m=g.length;v<m;v++){let u=g[v];t?n.bufferSubData(d,u.start*f.BYTES_PER_ELEMENT,f,u.start,u.count):n.bufferSubData(d,u.start*f.BYTES_PER_ELEMENT,f.subarray(u.start,u.start+u.count))}h.clearUpdateRanges()}p.count!==-1&&(t?n.bufferSubData(d,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count):n.bufferSubData(d,p.offset*f.BYTES_PER_ELEMENT,f.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);let h=i.get(c);h&&(n.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){let f=i.get(c);(!f||f.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let d=i.get(c);if(d===void 0)i.set(c,s(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,c,h),d.version=c.version}}return{get:a,remove:o,update:l}}var _s=class n extends ht{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,d=e/o,f=t/l,p=[],g=[],v=[],m=[];for(let u=0;u<h;u++){let y=u*f-a;for(let _=0;_<c;_++){let S=_*d-r;g.push(S,-y,0),v.push(0,0,1),m.push(_/o),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let y=0;y<o;y++){let _=y+c*u,S=y+c*(u+1),w=y+1+c*(u+1),E=y+1+c*u;p.push(_,S,E),p.push(S,w,E)}this.setIndex(p),this.setAttribute("position",new Ze(g,3)),this.setAttribute("normal",new Ze(v,3)),this.setAttribute("uv",new Ze(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},em=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,nm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,im=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sm=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,rm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,om=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,am=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lm=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,cm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,hm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,um=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,fm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,pm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,mm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,gm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_m=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ym=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Mm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,bm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Sm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,wm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Em=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Tm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Am=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Pm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lm=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Im=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Um=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Dm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Nm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Om=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Fm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,km=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Vm=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Gm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ym=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,$m=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Km=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Qm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,eg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,tg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ng=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ig=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,og=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,ag=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,hg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ug=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fg=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,mg=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,gg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,vg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,_g=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,xg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Sg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Eg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Tg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ag=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Cg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Lg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ig=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ug=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Dg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ng=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Og=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Fg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Bg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,zg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,kg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Hg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Gg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Yg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$g=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Zg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Kg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,jg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Qg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,e0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,n0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,i0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,s0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,r0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,o0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,a0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,l0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,c0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,h0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,u0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,d0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,f0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,p0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,m0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,g0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,v0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,_0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,y0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,M0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,b0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,w0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,E0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,T0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,R0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,C0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,P0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,L0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,I0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ne={alphahash_fragment:em,alphahash_pars_fragment:tm,alphamap_fragment:nm,alphamap_pars_fragment:im,alphatest_fragment:sm,alphatest_pars_fragment:rm,aomap_fragment:om,aomap_pars_fragment:am,batching_pars_vertex:lm,batching_vertex:cm,begin_vertex:hm,beginnormal_vertex:um,bsdfs:dm,iridescence_fragment:fm,bumpmap_pars_fragment:pm,clipping_planes_fragment:mm,clipping_planes_pars_fragment:gm,clipping_planes_pars_vertex:vm,clipping_planes_vertex:_m,color_fragment:xm,color_pars_fragment:ym,color_pars_vertex:Mm,color_vertex:bm,common:Sm,cube_uv_reflection_fragment:wm,defaultnormal_vertex:Em,displacementmap_pars_vertex:Tm,displacementmap_vertex:Am,emissivemap_fragment:Rm,emissivemap_pars_fragment:Cm,colorspace_fragment:Pm,colorspace_pars_fragment:Lm,envmap_fragment:Im,envmap_common_pars_fragment:Um,envmap_pars_fragment:Dm,envmap_pars_vertex:Nm,envmap_physical_pars_fragment:Ym,envmap_vertex:Om,fog_vertex:Fm,fog_pars_vertex:Bm,fog_fragment:zm,fog_pars_fragment:km,gradientmap_pars_fragment:Hm,lightmap_fragment:Vm,lightmap_pars_fragment:Gm,lights_lambert_fragment:Wm,lights_lambert_pars_fragment:Xm,lights_pars_begin:qm,lights_toon_fragment:$m,lights_toon_pars_fragment:Zm,lights_phong_fragment:Km,lights_phong_pars_fragment:Jm,lights_physical_fragment:jm,lights_physical_pars_fragment:Qm,lights_fragment_begin:eg,lights_fragment_maps:tg,lights_fragment_end:ng,logdepthbuf_fragment:ig,logdepthbuf_pars_fragment:sg,logdepthbuf_pars_vertex:rg,logdepthbuf_vertex:og,map_fragment:ag,map_pars_fragment:lg,map_particle_fragment:cg,map_particle_pars_fragment:hg,metalnessmap_fragment:ug,metalnessmap_pars_fragment:dg,morphcolor_vertex:fg,morphnormal_vertex:pg,morphtarget_pars_vertex:mg,morphtarget_vertex:gg,normal_fragment_begin:vg,normal_fragment_maps:_g,normal_pars_fragment:xg,normal_pars_vertex:yg,normal_vertex:Mg,normalmap_pars_fragment:bg,clearcoat_normal_fragment_begin:Sg,clearcoat_normal_fragment_maps:wg,clearcoat_pars_fragment:Eg,iridescence_pars_fragment:Tg,opaque_fragment:Ag,packing:Rg,premultiplied_alpha_fragment:Cg,project_vertex:Pg,dithering_fragment:Lg,dithering_pars_fragment:Ig,roughnessmap_fragment:Ug,roughnessmap_pars_fragment:Dg,shadowmap_pars_fragment:Ng,shadowmap_pars_vertex:Og,shadowmap_vertex:Fg,shadowmask_pars_fragment:Bg,skinbase_vertex:zg,skinning_pars_vertex:kg,skinning_vertex:Hg,skinnormal_vertex:Vg,specularmap_fragment:Gg,specularmap_pars_fragment:Wg,tonemapping_fragment:Xg,tonemapping_pars_fragment:qg,transmission_fragment:Yg,transmission_pars_fragment:$g,uv_pars_fragment:Zg,uv_pars_vertex:Kg,uv_vertex:Jg,worldpos_vertex:jg,background_vert:Qg,background_frag:e0,backgroundCube_vert:t0,backgroundCube_frag:n0,cube_vert:i0,cube_frag:s0,depth_vert:r0,depth_frag:o0,distanceRGBA_vert:a0,distanceRGBA_frag:l0,equirect_vert:c0,equirect_frag:h0,linedashed_vert:u0,linedashed_frag:d0,meshbasic_vert:f0,meshbasic_frag:p0,meshlambert_vert:m0,meshlambert_frag:g0,meshmatcap_vert:v0,meshmatcap_frag:_0,meshnormal_vert:x0,meshnormal_frag:y0,meshphong_vert:M0,meshphong_frag:b0,meshphysical_vert:S0,meshphysical_frag:w0,meshtoon_vert:E0,meshtoon_frag:T0,points_vert:A0,points_frag:R0,shadow_vert:C0,shadow_frag:P0,sprite_vert:L0,sprite_frag:I0},ne={common:{diffuse:{value:new ce(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new _e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ce(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new ce(16777215)},opacity:{value:1},center:{value:new _e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Sn={basic:{uniforms:kt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:kt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new ce(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:kt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new ce(0)},specular:{value:new ce(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:kt([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:kt([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new ce(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:kt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:kt([ne.points,ne.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:kt([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:kt([ne.common,ne.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:kt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:kt([ne.sprite,ne.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:kt([ne.common,ne.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:kt([ne.lights,ne.fog,{color:{value:new ce(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};Sn.physical={uniforms:kt([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new _e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new ce(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new _e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new ce(0)},specularColor:{value:new ce(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new _e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};var to={r:0,b:0,g:0};function U0(n,e,t,i,s,r,a){let o=new ce(0),l=r===!0?0:1,c,h,d=null,f=0,p=null;function g(m,u){let y=!1,_=u.isScene===!0?u.background:null;_&&_.isTexture&&(_=(u.backgroundBlurriness>0?t:e).get(_)),_===null?v(o,l):_&&_.isColor&&(v(_,1),y=!0);let S=n.xr.getEnvironmentBlendMode();S==="additive"?i.buffers.color.setClear(0,0,0,1,a):S==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||y)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),_&&(_.isCubeTexture||_.mapping===Bo)?(h===void 0&&(h=new et(new Xe(1,1,1),new dt({name:"BackgroundCubeMaterial",uniforms:vs(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:Nt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,h.material.toneMapped=qe.getTransfer(_.colorSpace)!==Ke,(d!==_||f!==_.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,d=_,f=_.version,p=n.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new et(new _s(2,2),new dt({name:"BackgroundMaterial",uniforms:vs(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,c.material.toneMapped=qe.getTransfer(_.colorSpace)!==Ke,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||f!==_.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,d=_,f=_.version,p=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function v(m,u){m.getRGB(to,Vu(n)),i.buffers.color.setClear(to.r,to.g,to.b,u,a)}return{getClearColor:function(){return o},setClearColor:function(m,u=1){o.set(m),l=u,v(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,v(o,l)},render:g}}function D0(n,e,t,i){let s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||r!==null,o={},l=m(null),c=l,h=!1;function d(L,N,V,Y,q){let W=!1;if(a){let Z=v(Y,V,N);c!==Z&&(c=Z,p(c.object)),W=u(L,Y,V,q),W&&y(L,Y,V,q)}else{let Z=N.wireframe===!0;(c.geometry!==Y.id||c.program!==V.id||c.wireframe!==Z)&&(c.geometry=Y.id,c.program=V.id,c.wireframe=Z,W=!0)}q!==null&&t.update(q,n.ELEMENT_ARRAY_BUFFER),(W||h)&&(h=!1,C(L,N,V,Y),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function f(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function p(L){return i.isWebGL2?n.bindVertexArray(L):r.bindVertexArrayOES(L)}function g(L){return i.isWebGL2?n.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function v(L,N,V){let Y=V.wireframe===!0,q=o[L.id];q===void 0&&(q={},o[L.id]=q);let W=q[N.id];W===void 0&&(W={},q[N.id]=W);let Z=W[Y];return Z===void 0&&(Z=m(f()),W[Y]=Z),Z}function m(L){let N=[],V=[],Y=[];for(let q=0;q<s;q++)N[q]=0,V[q]=0,Y[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:V,attributeDivisors:Y,object:L,attributes:{},index:null}}function u(L,N,V,Y){let q=c.attributes,W=N.attributes,Z=0,j=V.getAttributes();for(let oe in j)if(j[oe].location>=0){let $=q[oe],ae=W[oe];if(ae===void 0&&(oe==="instanceMatrix"&&L.instanceMatrix&&(ae=L.instanceMatrix),oe==="instanceColor"&&L.instanceColor&&(ae=L.instanceColor)),$===void 0||$.attribute!==ae||ae&&$.data!==ae.data)return!0;Z++}return c.attributesNum!==Z||c.index!==Y}function y(L,N,V,Y){let q={},W=N.attributes,Z=0,j=V.getAttributes();for(let oe in j)if(j[oe].location>=0){let $=W[oe];$===void 0&&(oe==="instanceMatrix"&&L.instanceMatrix&&($=L.instanceMatrix),oe==="instanceColor"&&L.instanceColor&&($=L.instanceColor));let ae={};ae.attribute=$,$&&$.data&&(ae.data=$.data),q[oe]=ae,Z++}c.attributes=q,c.attributesNum=Z,c.index=Y}function _(){let L=c.newAttributes;for(let N=0,V=L.length;N<V;N++)L[N]=0}function S(L){w(L,0)}function w(L,N){let V=c.newAttributes,Y=c.enabledAttributes,q=c.attributeDivisors;V[L]=1,Y[L]===0&&(n.enableVertexAttribArray(L),Y[L]=1),q[L]!==N&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,N),q[L]=N)}function E(){let L=c.newAttributes,N=c.enabledAttributes;for(let V=0,Y=N.length;V<Y;V++)N[V]!==L[V]&&(n.disableVertexAttribArray(V),N[V]=0)}function A(L,N,V,Y,q,W,Z){Z===!0?n.vertexAttribIPointer(L,N,V,q,W):n.vertexAttribPointer(L,N,V,Y,q,W)}function C(L,N,V,Y){if(i.isWebGL2===!1&&(L.isInstancedMesh||Y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();let q=Y.attributes,W=V.getAttributes(),Z=N.defaultAttributeValues;for(let j in W){let oe=W[j];if(oe.location>=0){let G=q[j];if(G===void 0&&(j==="instanceMatrix"&&L.instanceMatrix&&(G=L.instanceMatrix),j==="instanceColor"&&L.instanceColor&&(G=L.instanceColor)),G!==void 0){let $=G.normalized,ae=G.itemSize,ge=t.get(G);if(ge===void 0)continue;let me=ge.buffer,Le=ge.type,Ue=ge.bytesPerElement,Ee=i.isWebGL2===!0&&(Le===n.INT||Le===n.UNSIGNED_INT||G.gpuType===Cu);if(G.isInterleavedBufferAttribute){let We=G.data,O=We.stride,Ot=G.offset;if(We.isInstancedInterleavedBuffer){for(let xe=0;xe<oe.locationSize;xe++)w(oe.location+xe,We.meshPerAttribute);L.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=We.meshPerAttribute*We.count)}else for(let xe=0;xe<oe.locationSize;xe++)S(oe.location+xe);n.bindBuffer(n.ARRAY_BUFFER,me);for(let xe=0;xe<oe.locationSize;xe++)A(oe.location+xe,ae/oe.locationSize,Le,$,O*Ue,(Ot+ae/oe.locationSize*xe)*Ue,Ee)}else{if(G.isInstancedBufferAttribute){for(let We=0;We<oe.locationSize;We++)w(oe.location+We,G.meshPerAttribute);L.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let We=0;We<oe.locationSize;We++)S(oe.location+We);n.bindBuffer(n.ARRAY_BUFFER,me);for(let We=0;We<oe.locationSize;We++)A(oe.location+We,ae/oe.locationSize,Le,$,ae*Ue,ae/oe.locationSize*We*Ue,Ee)}}else if(Z!==void 0){let $=Z[j];if($!==void 0)switch($.length){case 2:n.vertexAttrib2fv(oe.location,$);break;case 3:n.vertexAttrib3fv(oe.location,$);break;case 4:n.vertexAttrib4fv(oe.location,$);break;default:n.vertexAttrib1fv(oe.location,$)}}}}E()}function x(){k();for(let L in o){let N=o[L];for(let V in N){let Y=N[V];for(let q in Y)g(Y[q].object),delete Y[q];delete N[V]}delete o[L]}}function b(L){if(o[L.id]===void 0)return;let N=o[L.id];for(let V in N){let Y=N[V];for(let q in Y)g(Y[q].object),delete Y[q];delete N[V]}delete o[L.id]}function I(L){for(let N in o){let V=o[N];if(V[L.id]===void 0)continue;let Y=V[L.id];for(let q in Y)g(Y[q].object),delete Y[q];delete V[L.id]}}function k(){X(),h=!0,c!==l&&(c=l,p(c.object))}function X(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:k,resetDefaultState:X,dispose:x,releaseStatesOfGeometry:b,releaseStatesOfProgram:I,initAttributes:_,enableAttribute:S,disableUnusedAttributes:E}}function N0(n,e,t,i){let s=i.isWebGL2,r;function a(h){r=h}function o(h,d){n.drawArrays(r,h,d),t.update(d,r,1)}function l(h,d,f){if(f===0)return;let p,g;if(s)p=n,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](r,h,d,f),t.update(d,r,f)}function c(h,d,f){if(f===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<f;g++)this.render(h[g],d[g]);else{p.multiDrawArraysWEBGL(r,h,0,d,0,f);let g=0;for(let v=0;v<f;v++)g+=d[v];t.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function O0(n,e,t){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext",o=t.precision!==void 0?t.precision:"highp",l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);let c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),v=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),u=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),_=f>0,S=a||e.has("OES_texture_float"),w=_&&S,E=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:m,maxVaryings:u,maxFragmentUniforms:y,vertexTextures:_,floatFragmentTextures:S,floatVertexTextures:w,maxSamples:E}}function F0(n){let e=this,t=null,i=0,s=!1,r=!1,a=new On,o=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let p=d.length!==0||f||i!==0||s;return s=f,i=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=h(d,f,0)},this.setState=function(d,f,p){let g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,u=n.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let y=r?0:i,_=y*4,S=u.clippingState||null;l.value=S,S=h(g,f,_,p);for(let w=0;w!==_;++w)S[w]=t[w];u.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,f,p,g){let v=d!==null?d.length:0,m=null;if(v!==0){if(m=l.value,g!==!0||m===null){let u=p+v*4,y=f.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<u)&&(m=new Float32Array(u));for(let _=0,S=p;_!==v;++_,S+=4)a.copy(d[_]).applyMatrix4(y,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function B0(n){let e=new WeakMap;function t(a,o){return o===tl?a.mapping=ds:o===nl&&(a.mapping=fs),a}function i(a){if(a&&a.isTexture){let o=a.mapping;if(o===tl||o===nl)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new cl(l.height/2);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}var xs=class extends wo{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},os=4,jh=[.125,.215,.35,.446,.526,.582],wi=20,Ya=new xs,Qh=new ce,$a=null,Za=0,Ka=0,bi=(1+Math.sqrt(5))/2,ns=1/bi,eu=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,bi,ns),new U(0,bi,-ns),new U(ns,0,bi),new U(-ns,0,bi),new U(bi,ns,0),new U(-bi,ns,0)],ys=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){$a=this._renderer.getRenderTarget(),Za=this._renderer.getActiveCubeFace(),Ka=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=iu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget($a,Za,Ka),e.scissorTest=!1,no(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ds||e.mapping===fs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$a=this._renderer.getRenderTarget(),Za=this._renderer.getActiveCubeFace(),Ka=this._renderer.getActiveMipmapLevel();let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:an,minFilter:an,generateMipmaps:!1,type:Qt,format:_n,colorSpace:Bn,depthBuffer:!1},s=tu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tu(e,t,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=z0(r)),this._blurMaterial=k0(r,e,t)}return s}_compileMaterial(e){let t=new et(this._lodPlanes[0],e);this._renderer.compile(t,Ya)}_sceneToCubeUV(e,t,i,s){let o=new Dt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Qh),h.toneMapping=jn,h.autoClear=!1;let p=new en({name:"PMREM.Background",side:Nt,depthWrite:!1,depthTest:!1}),g=new et(new Xe,p),v=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,v=!0):(p.color.copy(Qh),v=!0);for(let u=0;u<6;u++){let y=u%3;y===0?(o.up.set(0,l[u],0),o.lookAt(c[u],0,0)):y===1?(o.up.set(0,0,l[u]),o.lookAt(0,c[u],0)):(o.up.set(0,l[u],0),o.lookAt(0,0,c[u]));let _=this._cubeSize;no(s,y*_,u>2?_:0,_,_),h.setRenderTarget(s),v&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=m}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===ds||e.mapping===fs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=iu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new et(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;no(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Ya)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=eu[(s-1)%eu.length];this._blur(e,s-1,s,r,a)}t.autoClear=i}_blur(e,t,i,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new et(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*wi-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):wi;m>wi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${wi}`);let u=[],y=0;for(let A=0;A<wi;++A){let C=A/v,x=Math.exp(-C*C/2);u.push(x),A===0?y+=x:A<m&&(y+=2*x)}for(let A=0;A<u.length;A++)u[A]=u[A]/y;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=u,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:_}=this;f.dTheta.value=g,f.mipInt.value=_-i;let S=this._sizeLods[s],w=3*S*(s>_-os?s-_+os:0),E=4*(this._cubeSize-S);no(t,w,E,3*S,2*S),l.setRenderTarget(t),l.render(d,Ya)}};function z0(n){let e=[],t=[],i=[],s=n,r=n-os+1+jh.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>n-os?l=jh[a-n+os-1]:a===0&&(l=0),i.push(l);let c=1/(o-2),h=-c,d=1+c,f=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,v=3,m=2,u=1,y=new Float32Array(v*g*p),_=new Float32Array(m*g*p),S=new Float32Array(u*g*p);for(let E=0;E<p;E++){let A=E%3*2/3-1,C=E>2?0:-1,x=[A,C,0,A+2/3,C,0,A+2/3,C+1,0,A,C,0,A+2/3,C+1,0,A,C+1,0];y.set(x,v*g*E),_.set(f,m*g*E);let b=[E,E,E,E,E,E];S.set(b,u*g*E)}let w=new ht;w.setAttribute("position",new it(y,v)),w.setAttribute("uv",new it(_,m)),w.setAttribute("faceIndex",new it(S,u)),e.push(w),s>os&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function tu(n,e,t){let i=new Ct(n,e,t);return i.texture.mapping=Bo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function no(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function k0(n,e,t){let i=new Float32Array(wi),s=new U(0,1,0);return new dt({name:"SphericalGaussianBlur",defines:{n:wi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function nu(){return new dt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function iu(){return new dt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Vl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function H0(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===tl||l===nl,h=l===ds||l===fs;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let d=e.get(o);return t===null&&(t=new ys(n)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),e.set(o,d),d.texture}else{if(e.has(o))return e.get(o).texture;{let d=o.image;if(c&&d&&d.height>0||h&&d&&s(d)){t===null&&(t=new ys(n));let f=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function V0(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){let s=t(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function G0(n,e,t,i){let s={},r=new WeakMap;function a(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);for(let g in f.morphAttributes){let v=f.morphAttributes[g];for(let m=0,u=v.length;m<u;m++)e.remove(v[m])}f.removeEventListener("dispose",a),delete s[f.id];let p=r.get(f);p&&(e.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(d){let f=d.attributes;for(let g in f)e.update(f[g],n.ARRAY_BUFFER);let p=d.morphAttributes;for(let g in p){let v=p[g];for(let m=0,u=v.length;m<u;m++)e.update(v[m],n.ARRAY_BUFFER)}}function c(d){let f=[],p=d.index,g=d.attributes.position,v=0;if(p!==null){let y=p.array;v=p.version;for(let _=0,S=y.length;_<S;_+=3){let w=y[_+0],E=y[_+1],A=y[_+2];f.push(w,E,E,A,A,w)}}else if(g!==void 0){let y=g.array;v=g.version;for(let _=0,S=y.length/3-1;_<S;_+=3){let w=_+0,E=_+1,A=_+2;f.push(w,E,E,A,A,w)}}else return;let m=new(ku(f)?So:bo)(f,1);m.version=v;let u=r.get(d);u&&e.remove(u),r.set(d,m)}function h(d){let f=r.get(d);if(f){let p=d.index;p!==null&&f.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function W0(n,e,t,i){let s=i.isWebGL2,r;function a(p){r=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function h(p,g){n.drawElements(r,g,o,p*l),t.update(g,r,1)}function d(p,g,v){if(v===0)return;let m,u;if(s)m=n,u="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[u](r,g,o,p*l,v),t.update(g,r,v)}function f(p,g,v){if(v===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<v;u++)this.render(p[u]/l,g[u]);else{m.multiDrawElementsWEBGL(r,g,0,o,p,0,v);let u=0;for(let y=0;y<v;y++)u+=g[y];t.update(u,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=f}function X0(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function q0(n,e){return n[0]-e[0]}function Y0(n,e){return Math.abs(e[1])-Math.abs(n[1])}function $0(n,e,t){let i={},s=new Float32Array(8),r=new WeakMap,a=new Tt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,d){let f=c.morphTargetInfluences;if(e.isWebGL2===!0){let p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=p!==void 0?p.length:0,v=r.get(h);if(v===void 0||v.count!==g){let L=function(){k.dispose(),r.delete(h),h.removeEventListener("dispose",L)};v!==void 0&&v.texture.dispose();let y=h.morphAttributes.position!==void 0,_=h.morphAttributes.normal!==void 0,S=h.morphAttributes.color!==void 0,w=h.morphAttributes.position||[],E=h.morphAttributes.normal||[],A=h.morphAttributes.color||[],C=0;y===!0&&(C=1),_===!0&&(C=2),S===!0&&(C=3);let x=h.attributes.position.count*C,b=1;x>e.maxTextureSize&&(b=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let I=new Float32Array(x*b*4*g),k=new xo(I,x,b,g);k.type=Jn,k.needsUpdate=!0;let X=C*4;for(let N=0;N<g;N++){let V=w[N],Y=E[N],q=A[N],W=x*b*4*N;for(let Z=0;Z<V.count;Z++){let j=Z*X;y===!0&&(a.fromBufferAttribute(V,Z),I[W+j+0]=a.x,I[W+j+1]=a.y,I[W+j+2]=a.z,I[W+j+3]=0),_===!0&&(a.fromBufferAttribute(Y,Z),I[W+j+4]=a.x,I[W+j+5]=a.y,I[W+j+6]=a.z,I[W+j+7]=0),S===!0&&(a.fromBufferAttribute(q,Z),I[W+j+8]=a.x,I[W+j+9]=a.y,I[W+j+10]=a.z,I[W+j+11]=q.itemSize===4?a.w:1)}}v={count:g,texture:k,size:new _e(x,b)},r.set(h,v),h.addEventListener("dispose",L)}let m=0;for(let y=0;y<f.length;y++)m+=f[y];let u=h.morphTargetsRelative?1:1-m;d.getUniforms().setValue(n,"morphTargetBaseInfluence",u),d.getUniforms().setValue(n,"morphTargetInfluences",f),d.getUniforms().setValue(n,"morphTargetsTexture",v.texture,t),d.getUniforms().setValue(n,"morphTargetsTextureSize",v.size)}else{let p=f===void 0?0:f.length,g=i[h.id];if(g===void 0||g.length!==p){g=[];for(let _=0;_<p;_++)g[_]=[_,0];i[h.id]=g}for(let _=0;_<p;_++){let S=g[_];S[0]=_,S[1]=f[_]}g.sort(Y0);for(let _=0;_<8;_++)_<p&&g[_][1]?(o[_][0]=g[_][0],o[_][1]=g[_][1]):(o[_][0]=Number.MAX_SAFE_INTEGER,o[_][1]=0);o.sort(q0);let v=h.morphAttributes.position,m=h.morphAttributes.normal,u=0;for(let _=0;_<8;_++){let S=o[_],w=S[0],E=S[1];w!==Number.MAX_SAFE_INTEGER&&E?(v&&h.getAttribute("morphTarget"+_)!==v[w]&&h.setAttribute("morphTarget"+_,v[w]),m&&h.getAttribute("morphNormal"+_)!==m[w]&&h.setAttribute("morphNormal"+_,m[w]),s[_]=E,u+=E):(v&&h.hasAttribute("morphTarget"+_)===!0&&h.deleteAttribute("morphTarget"+_),m&&h.hasAttribute("morphNormal"+_)===!0&&h.deleteAttribute("morphNormal"+_),s[_]=0)}let y=h.morphTargetsRelative?1:1-u;d.getUniforms().setValue(n,"morphTargetBaseInfluence",y),d.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:l}}function Z0(n,e,t,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,d=e.get(l,h);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return d}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}var To=class extends cn{constructor(e,t,i,s,r,a,o,l,c,h){if(h=h!==void 0?h:Ti,h!==Ti&&h!==ps)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ti&&(i=Kn),i===void 0&&h===ps&&(i=Ei),super(null,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Ht,this.minFilter=l!==void 0?l:Ht,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Wu=new cn,Xu=new To(1,1);Xu.compareFunction=Bu;var qu=new xo,Yu=new al,$u=new Eo,su=[],ru=[],ou=new Float32Array(16),au=new Float32Array(9),lu=new Float32Array(4);function ws(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=su[s];if(r===void 0&&(r=new Float32Array(s),su[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Mt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function bt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ko(n,e){let t=ru[e];t===void 0&&(t=new Int32Array(e),ru[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function K0(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function J0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2fv(this.addr,e),bt(t,e)}}function j0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;n.uniform3fv(this.addr,e),bt(t,e)}}function Q0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4fv(this.addr,e),bt(t,e)}}function ev(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),bt(t,e)}else{if(Mt(t,i))return;lu.set(i),n.uniformMatrix2fv(this.addr,!1,lu),bt(t,i)}}function tv(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),bt(t,e)}else{if(Mt(t,i))return;au.set(i),n.uniformMatrix3fv(this.addr,!1,au),bt(t,i)}}function nv(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),bt(t,e)}else{if(Mt(t,i))return;ou.set(i),n.uniformMatrix4fv(this.addr,!1,ou),bt(t,i)}}function iv(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function sv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2iv(this.addr,e),bt(t,e)}}function rv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3iv(this.addr,e),bt(t,e)}}function ov(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4iv(this.addr,e),bt(t,e)}}function av(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function lv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2uiv(this.addr,e),bt(t,e)}}function cv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3uiv(this.addr,e),bt(t,e)}}function hv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4uiv(this.addr,e),bt(t,e)}}function uv(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r=this.type===n.SAMPLER_2D_SHADOW?Xu:Wu;t.setTexture2D(e||r,s)}function dv(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Yu,s)}function fv(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||$u,s)}function pv(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||qu,s)}function mv(n){switch(n){case 5126:return K0;case 35664:return J0;case 35665:return j0;case 35666:return Q0;case 35674:return ev;case 35675:return tv;case 35676:return nv;case 5124:case 35670:return iv;case 35667:case 35671:return sv;case 35668:case 35672:return rv;case 35669:case 35673:return ov;case 5125:return av;case 36294:return lv;case 36295:return cv;case 36296:return hv;case 35678:case 36198:case 36298:case 36306:case 35682:return uv;case 35679:case 36299:case 36307:return dv;case 35680:case 36300:case 36308:case 36293:return fv;case 36289:case 36303:case 36311:case 36292:return pv}}function gv(n,e){n.uniform1fv(this.addr,e)}function vv(n,e){let t=ws(e,this.size,2);n.uniform2fv(this.addr,t)}function _v(n,e){let t=ws(e,this.size,3);n.uniform3fv(this.addr,t)}function xv(n,e){let t=ws(e,this.size,4);n.uniform4fv(this.addr,t)}function yv(n,e){let t=ws(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Mv(n,e){let t=ws(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function bv(n,e){let t=ws(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Sv(n,e){n.uniform1iv(this.addr,e)}function wv(n,e){n.uniform2iv(this.addr,e)}function Ev(n,e){n.uniform3iv(this.addr,e)}function Tv(n,e){n.uniform4iv(this.addr,e)}function Av(n,e){n.uniform1uiv(this.addr,e)}function Rv(n,e){n.uniform2uiv(this.addr,e)}function Cv(n,e){n.uniform3uiv(this.addr,e)}function Pv(n,e){n.uniform4uiv(this.addr,e)}function Lv(n,e,t){let i=this.cache,s=e.length,r=ko(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),bt(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Wu,r[a])}function Iv(n,e,t){let i=this.cache,s=e.length,r=ko(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),bt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Yu,r[a])}function Uv(n,e,t){let i=this.cache,s=e.length,r=ko(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),bt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||$u,r[a])}function Dv(n,e,t){let i=this.cache,s=e.length,r=ko(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),bt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||qu,r[a])}function Nv(n){switch(n){case 5126:return gv;case 35664:return vv;case 35665:return _v;case 35666:return xv;case 35674:return yv;case 35675:return Mv;case 35676:return bv;case 5124:case 35670:return Sv;case 35667:case 35671:return wv;case 35668:case 35672:return Ev;case 35669:case 35673:return Tv;case 5125:return Av;case 36294:return Rv;case 36295:return Cv;case 36296:return Pv;case 35678:case 36198:case 36298:case 36306:case 35682:return Lv;case 35679:case 36299:case 36307:return Iv;case 35680:case 36300:case 36308:case 36293:return Uv;case 36289:case 36303:case 36311:case 36292:return Dv}}var hl=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=mv(t.type)}},ul=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Nv(t.type)}},dl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},Ja=/(\w+)(\])?(\[|\.)?/g;function cu(n,e){n.seq.push(e),n.map[e.id]=e}function Ov(n,e,t){let i=n.name,s=i.length;for(Ja.lastIndex=0;;){let r=Ja.exec(i),a=Ja.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){cu(t,c===void 0?new hl(o,n,e):new ul(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new dl(o),cu(t,d)),t=d}}}var hs=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Ov(r,a,this)}}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};function hu(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var Fv=37297,Bv=0;function zv(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function kv(n){let e=qe.getPrimaries(qe.workingColorSpace),t=qe.getPrimaries(n),i;switch(e===t?i="":e===fo&&t===uo?i="LinearDisplayP3ToLinearSRGB":e===uo&&t===fo&&(i="LinearSRGBToLinearDisplayP3"),n){case Bn:case zo:return[i,"LinearTransferOETF"];case yt:case kl:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function uu(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+zv(n.getShaderSource(e),a)}else return s}function Hv(n,e){let t=kv(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Vv(n,e){let t;switch(e){case Nl:t="Linear";break;case Ol:t="Reinhard";break;case Fl:t="OptimizedCineon";break;case fr:t="ACESFilmic";break;case Bl:t="AgX";break;case Qf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Gv(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(as).join(`
`)}function Wv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(as).join(`
`)}function Xv(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function qv(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function as(n){return n!==""}function du(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function fu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Yv=/^[ \t]*#include +<([\w\d./]+)>/gm;function fl(n){return n.replace(Yv,Zv)}var $v=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Zv(n,e){let t=Ne[e];if(t===void 0){let i=$v.get(e);if(i!==void 0)t=Ne[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return fl(t)}var Kv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pu(n){return n.replace(Kv,Jv)}function Jv(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function mu(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function jv(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Tu?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Dl?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Nn&&(e="SHADOWMAP_TYPE_VSM"),e}function Qv(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ds:case fs:e="ENVMAP_TYPE_CUBE";break;case Bo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function e_(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===fs&&(e="ENVMAP_MODE_REFRACTION"),e}function t_(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Au:e="ENVMAP_BLENDING_MULTIPLY";break;case Jf:e="ENVMAP_BLENDING_MIX";break;case jf:e="ENVMAP_BLENDING_ADD";break}return e}function n_(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function i_(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=jv(t),c=Qv(t),h=e_(t),d=t_(t),f=n_(t),p=t.isWebGL2?"":Gv(t),g=Wv(t),v=Xv(r),m=s.createProgram(),u,y,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(as).join(`
`),u.length>0&&(u+=`
`),y=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(as).join(`
`),y.length>0&&(y+=`
`)):(u=[mu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(as).join(`
`),y=[p,mu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==jn?"#define TONE_MAPPING":"",t.toneMapping!==jn?Ne.tonemapping_pars_fragment:"",t.toneMapping!==jn?Vv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,Hv("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(as).join(`
`)),a=fl(a),a=du(a,t),a=fu(a,t),o=fl(o),o=du(o,t),o=fu(o,t),a=pu(a),o=pu(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,u=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,y=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Dh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Dh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);let S=_+u+a,w=_+y+o,E=hu(s,s.VERTEX_SHADER,S),A=hu(s,s.FRAGMENT_SHADER,w);s.attachShader(m,E),s.attachShader(m,A),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function C(k){if(n.debug.checkShaderErrors){let X=s.getProgramInfoLog(m).trim(),L=s.getShaderInfoLog(E).trim(),N=s.getShaderInfoLog(A).trim(),V=!0,Y=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,m,E,A);else{let q=uu(s,E,"vertex"),W=uu(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+X+`
`+q+`
`+W)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(L===""||N==="")&&(Y=!1);Y&&(k.diagnostics={runnable:V,programLog:X,vertexShader:{log:L,prefix:u},fragmentShader:{log:N,prefix:y}})}s.deleteShader(E),s.deleteShader(A),x=new hs(s,m),b=qv(s,m)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(m,Fv)),I},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Bv++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=E,this.fragmentShader=A,this}var s_=0,pl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new ml(e),t.set(e,i)),i}},ml=class{constructor(e){this.id=s_++,this.code=e,this.usedTimes=0}};function r_(n,e,t,i,s,r,a){let o=new Mo,l=new pl,c=[],h=s.isWebGL2,d=s.logarithmicDepthBuffer,f=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(x){return x===0?"uv":`uv${x}`}function m(x,b,I,k,X){let L=k.fog,N=X.geometry,V=x.isMeshStandardMaterial?k.environment:null,Y=(x.isMeshStandardMaterial?t:e).get(x.envMap||V),q=Y&&Y.mapping===Bo?Y.image.height:null,W=g[x.type];x.precision!==null&&(p=s.getMaxPrecision(x.precision),p!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",p,"instead."));let Z=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,j=Z!==void 0?Z.length:0,oe=0;N.morphAttributes.position!==void 0&&(oe=1),N.morphAttributes.normal!==void 0&&(oe=2),N.morphAttributes.color!==void 0&&(oe=3);let G,$,ae,ge;if(W){let Ft=Sn[W];G=Ft.vertexShader,$=Ft.fragmentShader}else G=x.vertexShader,$=x.fragmentShader,l.update(x),ae=l.getVertexShaderID(x),ge=l.getFragmentShaderID(x);let me=n.getRenderTarget(),Le=X.isInstancedMesh===!0,Ue=X.isBatchedMesh===!0,Ee=!!x.map,We=!!x.matcap,O=!!Y,Ot=!!x.aoMap,xe=!!x.lightMap,Ce=!!x.bumpMap,de=!!x.normalMap,ot=!!x.displacementMap,Fe=!!x.emissiveMap,R=!!x.metalnessMap,M=!!x.roughnessMap,B=x.anisotropy>0,Q=x.clearcoat>0,J=x.iridescence>0,ee=x.sheen>0,fe=x.transmission>0,re=B&&!!x.anisotropyMap,he=Q&&!!x.clearcoatMap,we=Q&&!!x.clearcoatNormalMap,Be=Q&&!!x.clearcoatRoughnessMap,K=J&&!!x.iridescenceMap,$e=J&&!!x.iridescenceThicknessMap,Ge=ee&&!!x.sheenColorMap,Re=ee&&!!x.sheenRoughnessMap,ve=!!x.specularMap,ue=!!x.specularColorMap,De=!!x.specularIntensityMap,Ye=fe&&!!x.transmissionMap,lt=fe&&!!x.thicknessMap,ke=!!x.gradientMap,te=!!x.alphaMap,P=x.alphaTest>0,ie=!!x.alphaHash,se=!!x.extensions,Te=!!N.attributes.uv1,ye=!!N.attributes.uv2,Je=!!N.attributes.uv3,je=jn;return x.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(je=n.toneMapping),{isWebGL2:h,shaderID:W,shaderType:x.type,shaderName:x.name,vertexShader:G,fragmentShader:$,defines:x.defines,customVertexShaderID:ae,customFragmentShaderID:ge,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:p,batching:Ue,instancing:Le,instancingColor:Le&&X.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:me===null?n.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:Bn,map:Ee,matcap:We,envMap:O,envMapMode:O&&Y.mapping,envMapCubeUVHeight:q,aoMap:Ot,lightMap:xe,bumpMap:Ce,normalMap:de,displacementMap:f&&ot,emissiveMap:Fe,normalMapObjectSpace:de&&x.normalMapType===up,normalMapTangentSpace:de&&x.normalMapType===Fu,metalnessMap:R,roughnessMap:M,anisotropy:B,anisotropyMap:re,clearcoat:Q,clearcoatMap:he,clearcoatNormalMap:we,clearcoatRoughnessMap:Be,iridescence:J,iridescenceMap:K,iridescenceThicknessMap:$e,sheen:ee,sheenColorMap:Ge,sheenRoughnessMap:Re,specularMap:ve,specularColorMap:ue,specularIntensityMap:De,transmission:fe,transmissionMap:Ye,thicknessMap:lt,gradientMap:ke,opaque:x.transparent===!1&&x.blending===ls,alphaMap:te,alphaTest:P,alphaHash:ie,combine:x.combine,mapUv:Ee&&v(x.map.channel),aoMapUv:Ot&&v(x.aoMap.channel),lightMapUv:xe&&v(x.lightMap.channel),bumpMapUv:Ce&&v(x.bumpMap.channel),normalMapUv:de&&v(x.normalMap.channel),displacementMapUv:ot&&v(x.displacementMap.channel),emissiveMapUv:Fe&&v(x.emissiveMap.channel),metalnessMapUv:R&&v(x.metalnessMap.channel),roughnessMapUv:M&&v(x.roughnessMap.channel),anisotropyMapUv:re&&v(x.anisotropyMap.channel),clearcoatMapUv:he&&v(x.clearcoatMap.channel),clearcoatNormalMapUv:we&&v(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&v(x.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&v(x.iridescenceMap.channel),iridescenceThicknessMapUv:$e&&v(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ge&&v(x.sheenColorMap.channel),sheenRoughnessMapUv:Re&&v(x.sheenRoughnessMap.channel),specularMapUv:ve&&v(x.specularMap.channel),specularColorMapUv:ue&&v(x.specularColorMap.channel),specularIntensityMapUv:De&&v(x.specularIntensityMap.channel),transmissionMapUv:Ye&&v(x.transmissionMap.channel),thicknessMapUv:lt&&v(x.thicknessMap.channel),alphaMapUv:te&&v(x.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(de||B),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,vertexUv1s:Te,vertexUv2s:ye,vertexUv3s:Je,pointsUvs:X.isPoints===!0&&!!N.attributes.uv&&(Ee||te),fog:!!L,useFog:x.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:X.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:oe,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:je,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Ee&&x.map.isVideoTexture===!0&&qe.getTransfer(x.map.colorSpace)===Ke,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===vn,flipSided:x.side===Nt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:se&&x.extensions.derivatives===!0,extensionFragDepth:se&&x.extensions.fragDepth===!0,extensionDrawBuffers:se&&x.extensions.drawBuffers===!0,extensionShaderTextureLOD:se&&x.extensions.shaderTextureLOD===!0,extensionClipCullDistance:se&&x.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()}}function u(x){let b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(let I in x.defines)b.push(I),b.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(y(b,x),_(b,x),b.push(n.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function y(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapCubeUVHeight),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.morphAttributeCount),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function _(x,b){o.disableAll(),b.isWebGL2&&o.enable(0),b.supportsVertexTextures&&o.enable(1),b.instancing&&o.enable(2),b.instancingColor&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),x.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.skinning&&o.enable(4),b.morphTargets&&o.enable(5),b.morphNormals&&o.enable(6),b.morphColors&&o.enable(7),b.premultipliedAlpha&&o.enable(8),b.shadowMapEnabled&&o.enable(9),b.useLegacyLights&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),x.push(o.mask)}function S(x){let b=g[x.type],I;if(b){let k=Sn[b];I=si.clone(k.uniforms)}else I=x.uniforms;return I}function w(x,b){let I;for(let k=0,X=c.length;k<X;k++){let L=c[k];if(L.cacheKey===b){I=L,++I.usedTimes;break}}return I===void 0&&(I=new i_(n,b,x,r),c.push(I)),I}function E(x){if(--x.usedTimes===0){let b=c.indexOf(x);c[b]=c[c.length-1],c.pop(),x.destroy()}}function A(x){l.remove(x)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:S,acquireProgram:w,releaseProgram:E,releaseShaderCache:A,programs:c,dispose:C}}function o_(){let n=new WeakMap;function e(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function t(r){n.delete(r)}function i(r,a,o){n.get(r)[a]=o}function s(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:s}}function a_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function gu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function vu(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d,f,p,g,v,m){let u=n[e];return u===void 0?(u={id:d.id,object:d,geometry:f,material:p,groupOrder:g,renderOrder:d.renderOrder,z:v,group:m},n[e]=u):(u.id=d.id,u.object=d,u.geometry=f,u.material=p,u.groupOrder=g,u.renderOrder=d.renderOrder,u.z=v,u.group=m),e++,u}function o(d,f,p,g,v,m){let u=a(d,f,p,g,v,m);p.transmission>0?i.push(u):p.transparent===!0?s.push(u):t.push(u)}function l(d,f,p,g,v,m){let u=a(d,f,p,g,v,m);p.transmission>0?i.unshift(u):p.transparent===!0?s.unshift(u):t.unshift(u)}function c(d,f){t.length>1&&t.sort(d||a_),i.length>1&&i.sort(f||gu),s.length>1&&s.sort(f||gu)}function h(){for(let d=e,f=n.length;d<f;d++){let p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function l_(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new vu,n.set(i,[a])):s>=r.length?(a=new vu,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function c_(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new ce};break;case"SpotLight":t={position:new U,direction:new U,color:new ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new ce,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new ce,groundColor:new ce};break;case"RectAreaLight":t={color:new ce,position:new U,halfWidth:new U,halfHeight:new U};break}return n[e.id]=t,t}}}function h_(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var u_=0;function d_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function f_(n,e){let t=new c_,i=h_(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new U);let r=new U,a=new nt,o=new nt;function l(h,d){let f=0,p=0,g=0;for(let k=0;k<9;k++)s.probe[k].set(0,0,0);let v=0,m=0,u=0,y=0,_=0,S=0,w=0,E=0,A=0,C=0,x=0;h.sort(d_);let b=d===!0?Math.PI:1;for(let k=0,X=h.length;k<X;k++){let L=h[k],N=L.color,V=L.intensity,Y=L.distance,q=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=N.r*V*b,p+=N.g*V*b,g+=N.b*V*b;else if(L.isLightProbe){for(let W=0;W<9;W++)s.probe[W].addScaledVector(L.sh.coefficients[W],V);x++}else if(L.isDirectionalLight){let W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity*b),L.castShadow){let Z=L.shadow,j=i.get(L);j.shadowBias=Z.bias,j.shadowNormalBias=Z.normalBias,j.shadowRadius=Z.radius,j.shadowMapSize=Z.mapSize,s.directionalShadow[v]=j,s.directionalShadowMap[v]=q,s.directionalShadowMatrix[v]=L.shadow.matrix,S++}s.directional[v]=W,v++}else if(L.isSpotLight){let W=t.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(N).multiplyScalar(V*b),W.distance=Y,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,s.spot[u]=W;let Z=L.shadow;if(L.map&&(s.spotLightMap[A]=L.map,A++,Z.updateMatrices(L),L.castShadow&&C++),s.spotLightMatrix[u]=Z.matrix,L.castShadow){let j=i.get(L);j.shadowBias=Z.bias,j.shadowNormalBias=Z.normalBias,j.shadowRadius=Z.radius,j.shadowMapSize=Z.mapSize,s.spotShadow[u]=j,s.spotShadowMap[u]=q,E++}u++}else if(L.isRectAreaLight){let W=t.get(L);W.color.copy(N).multiplyScalar(V),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),s.rectArea[y]=W,y++}else if(L.isPointLight){let W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity*b),W.distance=L.distance,W.decay=L.decay,L.castShadow){let Z=L.shadow,j=i.get(L);j.shadowBias=Z.bias,j.shadowNormalBias=Z.normalBias,j.shadowRadius=Z.radius,j.shadowMapSize=Z.mapSize,j.shadowCameraNear=Z.camera.near,j.shadowCameraFar=Z.camera.far,s.pointShadow[m]=j,s.pointShadowMap[m]=q,s.pointShadowMatrix[m]=L.shadow.matrix,w++}s.point[m]=W,m++}else if(L.isHemisphereLight){let W=t.get(L);W.skyColor.copy(L.color).multiplyScalar(V*b),W.groundColor.copy(L.groundColor).multiplyScalar(V*b),s.hemi[_]=W,_++}}y>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ne.LTC_FLOAT_1,s.rectAreaLTC2=ne.LTC_FLOAT_2):(s.rectAreaLTC1=ne.LTC_HALF_1,s.rectAreaLTC2=ne.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ne.LTC_FLOAT_1,s.rectAreaLTC2=ne.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ne.LTC_HALF_1,s.rectAreaLTC2=ne.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=p,s.ambient[2]=g;let I=s.hash;(I.directionalLength!==v||I.pointLength!==m||I.spotLength!==u||I.rectAreaLength!==y||I.hemiLength!==_||I.numDirectionalShadows!==S||I.numPointShadows!==w||I.numSpotShadows!==E||I.numSpotMaps!==A||I.numLightProbes!==x)&&(s.directional.length=v,s.spot.length=u,s.rectArea.length=y,s.point.length=m,s.hemi.length=_,s.directionalShadow.length=S,s.directionalShadowMap.length=S,s.pointShadow.length=w,s.pointShadowMap.length=w,s.spotShadow.length=E,s.spotShadowMap.length=E,s.directionalShadowMatrix.length=S,s.pointShadowMatrix.length=w,s.spotLightMatrix.length=E+A-C,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=C,s.numLightProbes=x,I.directionalLength=v,I.pointLength=m,I.spotLength=u,I.rectAreaLength=y,I.hemiLength=_,I.numDirectionalShadows=S,I.numPointShadows=w,I.numSpotShadows=E,I.numSpotMaps=A,I.numLightProbes=x,s.version=u_++)}function c(h,d){let f=0,p=0,g=0,v=0,m=0,u=d.matrixWorldInverse;for(let y=0,_=h.length;y<_;y++){let S=h[y];if(S.isDirectionalLight){let w=s.directional[f];w.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(u),f++}else if(S.isSpotLight){let w=s.spot[g];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(u),w.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(u),g++}else if(S.isRectAreaLight){let w=s.rectArea[v];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(u),o.identity(),a.copy(S.matrixWorld),a.premultiply(u),o.extractRotation(a),w.halfWidth.set(S.width*.5,0,0),w.halfHeight.set(0,S.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),v++}else if(S.isPointLight){let w=s.point[p];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(u),p++}else if(S.isHemisphereLight){let w=s.hemi[m];w.direction.setFromMatrixPosition(S.matrixWorld),w.direction.transformDirection(u),m++}}}return{setup:l,setupView:c,state:s}}function _u(n,e){let t=new f_(n,e),i=[],s=[];function r(){i.length=0,s.length=0}function a(d){i.push(d)}function o(d){s.push(d)}function l(d){t.setup(i,d)}function c(d){t.setupView(i,d)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function p_(n,e){let t=new WeakMap;function i(r,a=0){let o=t.get(r),l;return o===void 0?(l=new _u(n,e),t.set(r,[l])):a>=o.length?(l=new _u(n,e),o.push(l)):l=o[a],l}function s(){t=new WeakMap}return{get:i,dispose:s}}var gl=class extends ii{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=cp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},vl=class extends ii{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},m_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,g_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function v_(n,e,t){let i=new nr,s=new _e,r=new _e,a=new Tt,o=new gl({depthPacking:hp}),l=new vl,c={},h=t.maxTextureSize,d={[ei]:Nt,[Nt]:ei,[vn]:vn},f=new dt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _e},radius:{value:4}},vertexShader:m_,fragmentShader:g_}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let g=new ht;g.setAttribute("position",new it(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new et(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tu;let u=this.type;this.render=function(E,A,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;let x=n.getRenderTarget(),b=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),k=n.state;k.setBlending(wn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let X=u!==Nn&&this.type===Nn,L=u===Nn&&this.type!==Nn;for(let N=0,V=E.length;N<V;N++){let Y=E[N],q=Y.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let W=q.getFrameExtents();if(s.multiply(W),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/W.x),s.x=r.x*W.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/W.y),s.y=r.y*W.y,q.mapSize.y=r.y)),q.map===null||X===!0||L===!0){let j=this.type!==Nn?{minFilter:Ht,magFilter:Ht}:{};q.map!==null&&q.map.dispose(),q.map=new Ct(s.x,s.y,j),q.map.texture.name=Y.name+".shadowMap",q.camera.updateProjectionMatrix()}n.setRenderTarget(q.map),n.clear();let Z=q.getViewportCount();for(let j=0;j<Z;j++){let oe=q.getViewport(j);a.set(r.x*oe.x,r.y*oe.y,r.x*oe.z,r.y*oe.w),k.viewport(a),q.updateMatrices(Y,j),i=q.getFrustum(),S(A,C,q.camera,Y,this.type)}q.isPointLightShadow!==!0&&this.type===Nn&&y(q,C),q.needsUpdate=!1}u=this.type,m.needsUpdate=!1,n.setRenderTarget(x,b,I)};function y(E,A){let C=e.update(v);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Ct(s.x,s.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(A,null,C,f,v,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(A,null,C,p,v,null)}function _(E,A,C,x){let b=null,I=C.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)b=I;else if(b=C.isPointLight===!0?l:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let k=b.uuid,X=A.uuid,L=c[k];L===void 0&&(L={},c[k]=L);let N=L[X];N===void 0&&(N=b.clone(),L[X]=N,A.addEventListener("dispose",w)),b=N}if(b.visible=A.visible,b.wireframe=A.wireframe,x===Nn?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:d[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,C.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let k=n.properties.get(b);k.light=C}return b}function S(E,A,C,x,b){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&b===Nn)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,E.matrixWorld);let X=e.update(E),L=E.material;if(Array.isArray(L)){let N=X.groups;for(let V=0,Y=N.length;V<Y;V++){let q=N[V],W=L[q.materialIndex];if(W&&W.visible){let Z=_(E,W,x,b);E.onBeforeShadow(n,E,A,C,X,Z,q),n.renderBufferDirect(C,null,X,Z,E,q),E.onAfterShadow(n,E,A,C,X,Z,q)}}}else if(L.visible){let N=_(E,L,x,b);E.onBeforeShadow(n,E,A,C,X,N,null),n.renderBufferDirect(C,null,X,N,E,null),E.onAfterShadow(n,E,A,C,X,N,null)}}let k=E.children;for(let X=0,L=k.length;X<L;X++)S(k[X],A,C,x,b)}function w(E){E.target.removeEventListener("dispose",w);for(let C in c){let x=c[C],b=E.target.uuid;b in x&&(x[b].dispose(),delete x[b])}}}function __(n,e,t){let i=t.isWebGL2;function s(){let P=!1,ie=new Tt,se=null,Te=new Tt(0,0,0,0);return{setMask:function(ye){se!==ye&&!P&&(n.colorMask(ye,ye,ye,ye),se=ye)},setLocked:function(ye){P=ye},setClear:function(ye,Je,je,St,Ft){Ft===!0&&(ye*=St,Je*=St,je*=St),ie.set(ye,Je,je,St),Te.equals(ie)===!1&&(n.clearColor(ye,Je,je,St),Te.copy(ie))},reset:function(){P=!1,se=null,Te.set(-1,0,0,0)}}}function r(){let P=!1,ie=null,se=null,Te=null;return{setTest:function(ye){ye?Ue(n.DEPTH_TEST):Ee(n.DEPTH_TEST)},setMask:function(ye){ie!==ye&&!P&&(n.depthMask(ye),ie=ye)},setFunc:function(ye){if(se!==ye){switch(ye){case Wf:n.depthFunc(n.NEVER);break;case Xf:n.depthFunc(n.ALWAYS);break;case qf:n.depthFunc(n.LESS);break;case ao:n.depthFunc(n.LEQUAL);break;case Yf:n.depthFunc(n.EQUAL);break;case $f:n.depthFunc(n.GEQUAL);break;case Zf:n.depthFunc(n.GREATER);break;case Kf:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}se=ye}},setLocked:function(ye){P=ye},setClear:function(ye){Te!==ye&&(n.clearDepth(ye),Te=ye)},reset:function(){P=!1,ie=null,se=null,Te=null}}}function a(){let P=!1,ie=null,se=null,Te=null,ye=null,Je=null,je=null,St=null,Ft=null;return{setTest:function(Qe){P||(Qe?Ue(n.STENCIL_TEST):Ee(n.STENCIL_TEST))},setMask:function(Qe){ie!==Qe&&!P&&(n.stencilMask(Qe),ie=Qe)},setFunc:function(Qe,Bt,bn){(se!==Qe||Te!==Bt||ye!==bn)&&(n.stencilFunc(Qe,Bt,bn),se=Qe,Te=Bt,ye=bn)},setOp:function(Qe,Bt,bn){(Je!==Qe||je!==Bt||St!==bn)&&(n.stencilOp(Qe,Bt,bn),Je=Qe,je=Bt,St=bn)},setLocked:function(Qe){P=Qe},setClear:function(Qe){Ft!==Qe&&(n.clearStencil(Qe),Ft=Qe)},reset:function(){P=!1,ie=null,se=null,Te=null,ye=null,Je=null,je=null,St=null,Ft=null}}}let o=new s,l=new r,c=new a,h=new WeakMap,d=new WeakMap,f={},p={},g=new WeakMap,v=[],m=null,u=!1,y=null,_=null,S=null,w=null,E=null,A=null,C=null,x=new ce(0,0,0),b=0,I=!1,k=null,X=null,L=null,N=null,V=null,Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,W=0,Z=n.getParameter(n.VERSION);Z.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(Z)[1]),q=W>=1):Z.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),q=W>=2);let j=null,oe={},G=n.getParameter(n.SCISSOR_BOX),$=n.getParameter(n.VIEWPORT),ae=new Tt().fromArray(G),ge=new Tt().fromArray($);function me(P,ie,se,Te){let ye=new Uint8Array(4),Je=n.createTexture();n.bindTexture(P,Je),n.texParameteri(P,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(P,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let je=0;je<se;je++)i&&(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)?n.texImage3D(ie,0,n.RGBA,1,1,Te,0,n.RGBA,n.UNSIGNED_BYTE,ye):n.texImage2D(ie+je,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ye);return Je}let Le={};Le[n.TEXTURE_2D]=me(n.TEXTURE_2D,n.TEXTURE_2D,1),Le[n.TEXTURE_CUBE_MAP]=me(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Le[n.TEXTURE_2D_ARRAY]=me(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Le[n.TEXTURE_3D]=me(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ue(n.DEPTH_TEST),l.setFunc(ao),Fe(!1),R(jc),Ue(n.CULL_FACE),de(wn);function Ue(P){f[P]!==!0&&(n.enable(P),f[P]=!0)}function Ee(P){f[P]!==!1&&(n.disable(P),f[P]=!1)}function We(P,ie){return p[P]!==ie?(n.bindFramebuffer(P,ie),p[P]=ie,i&&(P===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=ie),P===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=ie)),!0):!1}function O(P,ie){let se=v,Te=!1;if(P)if(se=g.get(ie),se===void 0&&(se=[],g.set(ie,se)),P.isWebGLMultipleRenderTargets){let ye=P.texture;if(se.length!==ye.length||se[0]!==n.COLOR_ATTACHMENT0){for(let Je=0,je=ye.length;Je<je;Je++)se[Je]=n.COLOR_ATTACHMENT0+Je;se.length=ye.length,Te=!0}}else se[0]!==n.COLOR_ATTACHMENT0&&(se[0]=n.COLOR_ATTACHMENT0,Te=!0);else se[0]!==n.BACK&&(se[0]=n.BACK,Te=!0);Te&&(t.isWebGL2?n.drawBuffers(se):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(se))}function Ot(P){return m!==P?(n.useProgram(P),m=P,!0):!1}let xe={[Si]:n.FUNC_ADD,[Cf]:n.FUNC_SUBTRACT,[Pf]:n.FUNC_REVERSE_SUBTRACT};if(i)xe[th]=n.MIN,xe[nh]=n.MAX;else{let P=e.get("EXT_blend_minmax");P!==null&&(xe[th]=P.MIN_EXT,xe[nh]=P.MAX_EXT)}let Ce={[Lf]:n.ZERO,[If]:n.ONE,[Uf]:n.SRC_COLOR,[Qa]:n.SRC_ALPHA,[zf]:n.SRC_ALPHA_SATURATE,[Ff]:n.DST_COLOR,[Nf]:n.DST_ALPHA,[Df]:n.ONE_MINUS_SRC_COLOR,[el]:n.ONE_MINUS_SRC_ALPHA,[Bf]:n.ONE_MINUS_DST_COLOR,[Of]:n.ONE_MINUS_DST_ALPHA,[kf]:n.CONSTANT_COLOR,[Hf]:n.ONE_MINUS_CONSTANT_COLOR,[Vf]:n.CONSTANT_ALPHA,[Gf]:n.ONE_MINUS_CONSTANT_ALPHA};function de(P,ie,se,Te,ye,Je,je,St,Ft,Qe){if(P===wn){u===!0&&(Ee(n.BLEND),u=!1);return}if(u===!1&&(Ue(n.BLEND),u=!0),P!==Rf){if(P!==y||Qe!==I){if((_!==Si||E!==Si)&&(n.blendEquation(n.FUNC_ADD),_=Si,E=Si),Qe)switch(P){case ls:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case us:n.blendFunc(n.ONE,n.ONE);break;case Qc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case eh:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case ls:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case us:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Qc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case eh:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}S=null,w=null,A=null,C=null,x.set(0,0,0),b=0,y=P,I=Qe}return}ye=ye||ie,Je=Je||se,je=je||Te,(ie!==_||ye!==E)&&(n.blendEquationSeparate(xe[ie],xe[ye]),_=ie,E=ye),(se!==S||Te!==w||Je!==A||je!==C)&&(n.blendFuncSeparate(Ce[se],Ce[Te],Ce[Je],Ce[je]),S=se,w=Te,A=Je,C=je),(St.equals(x)===!1||Ft!==b)&&(n.blendColor(St.r,St.g,St.b,Ft),x.copy(St),b=Ft),y=P,I=!1}function ot(P,ie){P.side===vn?Ee(n.CULL_FACE):Ue(n.CULL_FACE);let se=P.side===Nt;ie&&(se=!se),Fe(se),P.blending===ls&&P.transparent===!1?de(wn):de(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),l.setFunc(P.depthFunc),l.setTest(P.depthTest),l.setMask(P.depthWrite),o.setMask(P.colorWrite);let Te=P.stencilWrite;c.setTest(Te),Te&&(c.setMask(P.stencilWriteMask),c.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),c.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),B(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?Ue(n.SAMPLE_ALPHA_TO_COVERAGE):Ee(n.SAMPLE_ALPHA_TO_COVERAGE)}function Fe(P){k!==P&&(P?n.frontFace(n.CW):n.frontFace(n.CCW),k=P)}function R(P){P!==Tf?(Ue(n.CULL_FACE),P!==X&&(P===jc?n.cullFace(n.BACK):P===Af?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ee(n.CULL_FACE),X=P}function M(P){P!==L&&(q&&n.lineWidth(P),L=P)}function B(P,ie,se){P?(Ue(n.POLYGON_OFFSET_FILL),(N!==ie||V!==se)&&(n.polygonOffset(ie,se),N=ie,V=se)):Ee(n.POLYGON_OFFSET_FILL)}function Q(P){P?Ue(n.SCISSOR_TEST):Ee(n.SCISSOR_TEST)}function J(P){P===void 0&&(P=n.TEXTURE0+Y-1),j!==P&&(n.activeTexture(P),j=P)}function ee(P,ie,se){se===void 0&&(j===null?se=n.TEXTURE0+Y-1:se=j);let Te=oe[se];Te===void 0&&(Te={type:void 0,texture:void 0},oe[se]=Te),(Te.type!==P||Te.texture!==ie)&&(j!==se&&(n.activeTexture(se),j=se),n.bindTexture(P,ie||Le[P]),Te.type=P,Te.texture=ie)}function fe(){let P=oe[j];P!==void 0&&P.type!==void 0&&(n.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function re(){try{n.compressedTexImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function he(){try{n.compressedTexImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function we(){try{n.texSubImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Be(){try{n.texSubImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function K(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function $e(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ge(){try{n.texStorage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Re(){try{n.texStorage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ve(){try{n.texImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ue(){try{n.texImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function De(P){ae.equals(P)===!1&&(n.scissor(P.x,P.y,P.z,P.w),ae.copy(P))}function Ye(P){ge.equals(P)===!1&&(n.viewport(P.x,P.y,P.z,P.w),ge.copy(P))}function lt(P,ie){let se=d.get(ie);se===void 0&&(se=new WeakMap,d.set(ie,se));let Te=se.get(P);Te===void 0&&(Te=n.getUniformBlockIndex(ie,P.name),se.set(P,Te))}function ke(P,ie){let Te=d.get(ie).get(P);h.get(ie)!==Te&&(n.uniformBlockBinding(ie,Te,P.__bindingPointIndex),h.set(ie,Te))}function te(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},j=null,oe={},p={},g=new WeakMap,v=[],m=null,u=!1,y=null,_=null,S=null,w=null,E=null,A=null,C=null,x=new ce(0,0,0),b=0,I=!1,k=null,X=null,L=null,N=null,V=null,ae.set(0,0,n.canvas.width,n.canvas.height),ge.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ue,disable:Ee,bindFramebuffer:We,drawBuffers:O,useProgram:Ot,setBlending:de,setMaterial:ot,setFlipSided:Fe,setCullFace:R,setLineWidth:M,setPolygonOffset:B,setScissorTest:Q,activeTexture:J,bindTexture:ee,unbindTexture:fe,compressedTexImage2D:re,compressedTexImage3D:he,texImage2D:ve,texImage3D:ue,updateUBOMapping:lt,uniformBlockBinding:ke,texStorage2D:Ge,texStorage3D:Re,texSubImage2D:we,texSubImage3D:Be,compressedTexSubImage2D:K,compressedTexSubImage3D:$e,scissor:De,viewport:Ye,reset:te}}function x_(n,e,t,i,s,r,a){let o=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,M){return p?new OffscreenCanvas(R,M):go("canvas")}function v(R,M,B,Q){let J=1;if((R.width>Q||R.height>Q)&&(J=Q/Math.max(R.width,R.height)),J<1||M===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){let ee=M?mo:Math.floor,fe=ee(J*R.width),re=ee(J*R.height);d===void 0&&(d=g(fe,re));let he=B?g(fe,re):d;return he.width=fe,he.height=re,he.getContext("2d").drawImage(R,0,0,fe,re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+fe+"x"+re+")."),he}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function m(R){return rl(R.width)&&rl(R.height)}function u(R){return o?!1:R.wrapS!==jt||R.wrapT!==jt||R.minFilter!==Ht&&R.minFilter!==an}function y(R,M){return R.generateMipmaps&&M&&R.minFilter!==Ht&&R.minFilter!==an}function _(R){n.generateMipmap(R)}function S(R,M,B,Q,J=!1){if(o===!1)return M;if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ee=M;if(M===n.RED&&(B===n.FLOAT&&(ee=n.R32F),B===n.HALF_FLOAT&&(ee=n.R16F),B===n.UNSIGNED_BYTE&&(ee=n.R8)),M===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(ee=n.R8UI),B===n.UNSIGNED_SHORT&&(ee=n.R16UI),B===n.UNSIGNED_INT&&(ee=n.R32UI),B===n.BYTE&&(ee=n.R8I),B===n.SHORT&&(ee=n.R16I),B===n.INT&&(ee=n.R32I)),M===n.RG&&(B===n.FLOAT&&(ee=n.RG32F),B===n.HALF_FLOAT&&(ee=n.RG16F),B===n.UNSIGNED_BYTE&&(ee=n.RG8)),M===n.RGBA){let fe=J?ho:qe.getTransfer(Q);B===n.FLOAT&&(ee=n.RGBA32F),B===n.HALF_FLOAT&&(ee=n.RGBA16F),B===n.UNSIGNED_BYTE&&(ee=fe===Ke?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT_4_4_4_4&&(ee=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(ee=n.RGB5_A1)}return(ee===n.R16F||ee===n.R32F||ee===n.RG16F||ee===n.RG32F||ee===n.RGBA16F||ee===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function w(R,M,B){return y(R,B)===!0||R.isFramebufferTexture&&R.minFilter!==Ht&&R.minFilter!==an?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function E(R){return R===Ht||R===ih||R===Sa?n.NEAREST:n.LINEAR}function A(R){let M=R.target;M.removeEventListener("dispose",A),x(M),M.isVideoTexture&&h.delete(M)}function C(R){let M=R.target;M.removeEventListener("dispose",C),I(M)}function x(R){let M=i.get(R);if(M.__webglInit===void 0)return;let B=R.source,Q=f.get(B);if(Q){let J=Q[M.__cacheKey];J.usedTimes--,J.usedTimes===0&&b(R),Object.keys(Q).length===0&&f.delete(B)}i.remove(R)}function b(R){let M=i.get(R);n.deleteTexture(M.__webglTexture);let B=R.source,Q=f.get(B);delete Q[M.__cacheKey],a.memory.textures--}function I(R){let M=R.texture,B=i.get(R),Q=i.get(M);if(Q.__webglTexture!==void 0&&(n.deleteTexture(Q.__webglTexture),a.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(B.__webglFramebuffer[J]))for(let ee=0;ee<B.__webglFramebuffer[J].length;ee++)n.deleteFramebuffer(B.__webglFramebuffer[J][ee]);else n.deleteFramebuffer(B.__webglFramebuffer[J]);B.__webglDepthbuffer&&n.deleteRenderbuffer(B.__webglDepthbuffer[J])}else{if(Array.isArray(B.__webglFramebuffer))for(let J=0;J<B.__webglFramebuffer.length;J++)n.deleteFramebuffer(B.__webglFramebuffer[J]);else n.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&n.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&n.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let J=0;J<B.__webglColorRenderbuffer.length;J++)B.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(B.__webglColorRenderbuffer[J]);B.__webglDepthRenderbuffer&&n.deleteRenderbuffer(B.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let J=0,ee=M.length;J<ee;J++){let fe=i.get(M[J]);fe.__webglTexture&&(n.deleteTexture(fe.__webglTexture),a.memory.textures--),i.remove(M[J])}i.remove(M),i.remove(R)}let k=0;function X(){k=0}function L(){let R=k;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),k+=1,R}function N(R){let M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function V(R,M){let B=i.get(R);if(R.isVideoTexture&&ot(R),R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){let Q=R.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ae(B,R,M);return}}t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+M)}function Y(R,M){let B=i.get(R);if(R.version>0&&B.__version!==R.version){ae(B,R,M);return}t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+M)}function q(R,M){let B=i.get(R);if(R.version>0&&B.__version!==R.version){ae(B,R,M);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+M)}function W(R,M){let B=i.get(R);if(R.version>0&&B.__version!==R.version){ge(B,R,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+M)}let Z={[er]:n.REPEAT,[jt]:n.CLAMP_TO_EDGE,[il]:n.MIRRORED_REPEAT},j={[Ht]:n.NEAREST,[ih]:n.NEAREST_MIPMAP_NEAREST,[Sa]:n.NEAREST_MIPMAP_LINEAR,[an]:n.LINEAR,[ep]:n.LINEAR_MIPMAP_NEAREST,[tr]:n.LINEAR_MIPMAP_LINEAR},oe={[dp]:n.NEVER,[_p]:n.ALWAYS,[fp]:n.LESS,[Bu]:n.LEQUAL,[pp]:n.EQUAL,[vp]:n.GEQUAL,[mp]:n.GREATER,[gp]:n.NOTEQUAL};function G(R,M,B){if(B?(n.texParameteri(R,n.TEXTURE_WRAP_S,Z[M.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,Z[M.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,Z[M.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,j[M.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,j[M.minFilter])):(n.texParameteri(R,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(R,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(M.wrapS!==jt||M.wrapT!==jt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(R,n.TEXTURE_MAG_FILTER,E(M.magFilter)),n.texParameteri(R,n.TEXTURE_MIN_FILTER,E(M.minFilter)),M.minFilter!==Ht&&M.minFilter!==an&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,oe[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let Q=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===Ht||M.minFilter!==Sa&&M.minFilter!==tr||M.type===Jn&&e.has("OES_texture_float_linear")===!1||o===!1&&M.type===Qt&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||i.get(M).__currentAnisotropy)&&(n.texParameterf(R,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy)}}function $(R,M){let B=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",A));let Q=M.source,J=f.get(Q);J===void 0&&(J={},f.set(Q,J));let ee=N(M);if(ee!==R.__cacheKey){J[ee]===void 0&&(J[ee]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),J[ee].usedTimes++;let fe=J[R.__cacheKey];fe!==void 0&&(J[R.__cacheKey].usedTimes--,fe.usedTimes===0&&b(M)),R.__cacheKey=ee,R.__webglTexture=J[ee].texture}return B}function ae(R,M,B){let Q=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Q=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Q=n.TEXTURE_3D);let J=$(R,M),ee=M.source;t.bindTexture(Q,R.__webglTexture,n.TEXTURE0+B);let fe=i.get(ee);if(ee.version!==fe.__version||J===!0){t.activeTexture(n.TEXTURE0+B);let re=qe.getPrimaries(qe.workingColorSpace),he=M.colorSpace===ln?null:qe.getPrimaries(M.colorSpace),we=M.colorSpace===ln||re===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);let Be=u(M)&&m(M.image)===!1,K=v(M.image,Be,!1,s.maxTextureSize);K=Fe(M,K);let $e=m(K)||o,Ge=r.convert(M.format,M.colorSpace),Re=r.convert(M.type),ve=S(M.internalFormat,Ge,Re,M.colorSpace,M.isVideoTexture);G(Q,M,$e);let ue,De=M.mipmaps,Ye=o&&M.isVideoTexture!==!0&&ve!==Nu,lt=fe.__version===void 0||J===!0,ke=w(M,K,$e);if(M.isDepthTexture)ve=n.DEPTH_COMPONENT,o?M.type===Jn?ve=n.DEPTH_COMPONENT32F:M.type===Kn?ve=n.DEPTH_COMPONENT24:M.type===Ei?ve=n.DEPTH24_STENCIL8:ve=n.DEPTH_COMPONENT16:M.type===Jn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===Ti&&ve===n.DEPTH_COMPONENT&&M.type!==zl&&M.type!==Kn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=Kn,Re=r.convert(M.type)),M.format===ps&&ve===n.DEPTH_COMPONENT&&(ve=n.DEPTH_STENCIL,M.type!==Ei&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=Ei,Re=r.convert(M.type))),lt&&(Ye?t.texStorage2D(n.TEXTURE_2D,1,ve,K.width,K.height):t.texImage2D(n.TEXTURE_2D,0,ve,K.width,K.height,0,Ge,Re,null));else if(M.isDataTexture)if(De.length>0&&$e){Ye&&lt&&t.texStorage2D(n.TEXTURE_2D,ke,ve,De[0].width,De[0].height);for(let te=0,P=De.length;te<P;te++)ue=De[te],Ye?t.texSubImage2D(n.TEXTURE_2D,te,0,0,ue.width,ue.height,Ge,Re,ue.data):t.texImage2D(n.TEXTURE_2D,te,ve,ue.width,ue.height,0,Ge,Re,ue.data);M.generateMipmaps=!1}else Ye?(lt&&t.texStorage2D(n.TEXTURE_2D,ke,ve,K.width,K.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,K.width,K.height,Ge,Re,K.data)):t.texImage2D(n.TEXTURE_2D,0,ve,K.width,K.height,0,Ge,Re,K.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ye&&lt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ke,ve,De[0].width,De[0].height,K.depth);for(let te=0,P=De.length;te<P;te++)ue=De[te],M.format!==_n?Ge!==null?Ye?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,ue.width,ue.height,K.depth,Ge,ue.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,te,ve,ue.width,ue.height,K.depth,0,ue.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,ue.width,ue.height,K.depth,Ge,Re,ue.data):t.texImage3D(n.TEXTURE_2D_ARRAY,te,ve,ue.width,ue.height,K.depth,0,Ge,Re,ue.data)}else{Ye&&lt&&t.texStorage2D(n.TEXTURE_2D,ke,ve,De[0].width,De[0].height);for(let te=0,P=De.length;te<P;te++)ue=De[te],M.format!==_n?Ge!==null?Ye?t.compressedTexSubImage2D(n.TEXTURE_2D,te,0,0,ue.width,ue.height,Ge,ue.data):t.compressedTexImage2D(n.TEXTURE_2D,te,ve,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage2D(n.TEXTURE_2D,te,0,0,ue.width,ue.height,Ge,Re,ue.data):t.texImage2D(n.TEXTURE_2D,te,ve,ue.width,ue.height,0,Ge,Re,ue.data)}else if(M.isDataArrayTexture)Ye?(lt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ke,ve,K.width,K.height,K.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,Ge,Re,K.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,ve,K.width,K.height,K.depth,0,Ge,Re,K.data);else if(M.isData3DTexture)Ye?(lt&&t.texStorage3D(n.TEXTURE_3D,ke,ve,K.width,K.height,K.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,Ge,Re,K.data)):t.texImage3D(n.TEXTURE_3D,0,ve,K.width,K.height,K.depth,0,Ge,Re,K.data);else if(M.isFramebufferTexture){if(lt)if(Ye)t.texStorage2D(n.TEXTURE_2D,ke,ve,K.width,K.height);else{let te=K.width,P=K.height;for(let ie=0;ie<ke;ie++)t.texImage2D(n.TEXTURE_2D,ie,ve,te,P,0,Ge,Re,null),te>>=1,P>>=1}}else if(De.length>0&&$e){Ye&&lt&&t.texStorage2D(n.TEXTURE_2D,ke,ve,De[0].width,De[0].height);for(let te=0,P=De.length;te<P;te++)ue=De[te],Ye?t.texSubImage2D(n.TEXTURE_2D,te,0,0,Ge,Re,ue):t.texImage2D(n.TEXTURE_2D,te,ve,Ge,Re,ue);M.generateMipmaps=!1}else Ye?(lt&&t.texStorage2D(n.TEXTURE_2D,ke,ve,K.width,K.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ge,Re,K)):t.texImage2D(n.TEXTURE_2D,0,ve,Ge,Re,K);y(M,$e)&&_(Q),fe.__version=ee.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function ge(R,M,B){if(M.image.length!==6)return;let Q=$(R,M),J=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+B);let ee=i.get(J);if(J.version!==ee.__version||Q===!0){t.activeTexture(n.TEXTURE0+B);let fe=qe.getPrimaries(qe.workingColorSpace),re=M.colorSpace===ln?null:qe.getPrimaries(M.colorSpace),he=M.colorSpace===ln||fe===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);let we=M.isCompressedTexture||M.image[0].isCompressedTexture,Be=M.image[0]&&M.image[0].isDataTexture,K=[];for(let te=0;te<6;te++)!we&&!Be?K[te]=v(M.image[te],!1,!0,s.maxCubemapSize):K[te]=Be?M.image[te].image:M.image[te],K[te]=Fe(M,K[te]);let $e=K[0],Ge=m($e)||o,Re=r.convert(M.format,M.colorSpace),ve=r.convert(M.type),ue=S(M.internalFormat,Re,ve,M.colorSpace),De=o&&M.isVideoTexture!==!0,Ye=ee.__version===void 0||Q===!0,lt=w(M,$e,Ge);G(n.TEXTURE_CUBE_MAP,M,Ge);let ke;if(we){De&&Ye&&t.texStorage2D(n.TEXTURE_CUBE_MAP,lt,ue,$e.width,$e.height);for(let te=0;te<6;te++){ke=K[te].mipmaps;for(let P=0;P<ke.length;P++){let ie=ke[P];M.format!==_n?Re!==null?De?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,P,0,0,ie.width,ie.height,Re,ie.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,P,ue,ie.width,ie.height,0,ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):De?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,P,0,0,ie.width,ie.height,Re,ve,ie.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,P,ue,ie.width,ie.height,0,Re,ve,ie.data)}}}else{ke=M.mipmaps,De&&Ye&&(ke.length>0&&lt++,t.texStorage2D(n.TEXTURE_CUBE_MAP,lt,ue,K[0].width,K[0].height));for(let te=0;te<6;te++)if(Be){De?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,K[te].width,K[te].height,Re,ve,K[te].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,ue,K[te].width,K[te].height,0,Re,ve,K[te].data);for(let P=0;P<ke.length;P++){let se=ke[P].image[te].image;De?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,P+1,0,0,se.width,se.height,Re,ve,se.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,P+1,ue,se.width,se.height,0,Re,ve,se.data)}}else{De?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Re,ve,K[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,ue,Re,ve,K[te]);for(let P=0;P<ke.length;P++){let ie=ke[P];De?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,P+1,0,0,Re,ve,ie.image[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,P+1,ue,Re,ve,ie.image[te])}}}y(M,Ge)&&_(n.TEXTURE_CUBE_MAP),ee.__version=J.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function me(R,M,B,Q,J,ee){let fe=r.convert(B.format,B.colorSpace),re=r.convert(B.type),he=S(B.internalFormat,fe,re,B.colorSpace);if(!i.get(M).__hasExternalTextures){let Be=Math.max(1,M.width>>ee),K=Math.max(1,M.height>>ee);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,ee,he,Be,K,M.depth,0,fe,re,null):t.texImage2D(J,ee,he,Be,K,0,fe,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,R),de(M)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,J,i.get(B).__webglTexture,0,Ce(M)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Q,J,i.get(B).__webglTexture,ee),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Le(R,M,B){if(n.bindRenderbuffer(n.RENDERBUFFER,R),M.depthBuffer&&!M.stencilBuffer){let Q=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(B||de(M)){let J=M.depthTexture;J&&J.isDepthTexture&&(J.type===Jn?Q=n.DEPTH_COMPONENT32F:J.type===Kn&&(Q=n.DEPTH_COMPONENT24));let ee=Ce(M);de(M)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ee,Q,M.width,M.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ee,Q,M.width,M.height)}else n.renderbufferStorage(n.RENDERBUFFER,Q,M.width,M.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,R)}else if(M.depthBuffer&&M.stencilBuffer){let Q=Ce(M);B&&de(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Q,n.DEPTH24_STENCIL8,M.width,M.height):de(M)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Q,n.DEPTH24_STENCIL8,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,R)}else{let Q=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let J=0;J<Q.length;J++){let ee=Q[J],fe=r.convert(ee.format,ee.colorSpace),re=r.convert(ee.type),he=S(ee.internalFormat,fe,re,ee.colorSpace),we=Ce(M);B&&de(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,we,he,M.width,M.height):de(M)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,we,he,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,he,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ue(R,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),V(M.depthTexture,0);let Q=i.get(M.depthTexture).__webglTexture,J=Ce(M);if(M.depthTexture.format===Ti)de(M)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0);else if(M.depthTexture.format===ps)de(M)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ee(R){let M=i.get(R),B=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Ue(M.__webglFramebuffer,R)}else if(B){M.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[Q]),M.__webglDepthbuffer[Q]=n.createRenderbuffer(),Le(M.__webglDepthbuffer[Q],R,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=n.createRenderbuffer(),Le(M.__webglDepthbuffer,R,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function We(R,M,B){let Q=i.get(R);M!==void 0&&me(Q.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&Ee(R)}function O(R){let M=R.texture,B=i.get(R),Q=i.get(M);R.addEventListener("dispose",C),R.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=n.createTexture()),Q.__version=M.version,a.memory.textures++);let J=R.isWebGLCubeRenderTarget===!0,ee=R.isWebGLMultipleRenderTargets===!0,fe=m(R)||o;if(J){B.__webglFramebuffer=[];for(let re=0;re<6;re++)if(o&&M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[re]=[];for(let he=0;he<M.mipmaps.length;he++)B.__webglFramebuffer[re][he]=n.createFramebuffer()}else B.__webglFramebuffer[re]=n.createFramebuffer()}else{if(o&&M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let re=0;re<M.mipmaps.length;re++)B.__webglFramebuffer[re]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(ee)if(s.drawBuffers){let re=R.texture;for(let he=0,we=re.length;he<we;he++){let Be=i.get(re[he]);Be.__webglTexture===void 0&&(Be.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&R.samples>0&&de(R)===!1){let re=ee?M:[M];B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let he=0;he<re.length;he++){let we=re[he];B.__webglColorRenderbuffer[he]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[he]);let Be=r.convert(we.format,we.colorSpace),K=r.convert(we.type),$e=S(we.internalFormat,Be,K,we.colorSpace,R.isXRRenderTarget===!0),Ge=Ce(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ge,$e,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,B.__webglColorRenderbuffer[he])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),Le(B.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(J){t.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture),G(n.TEXTURE_CUBE_MAP,M,fe);for(let re=0;re<6;re++)if(o&&M.mipmaps&&M.mipmaps.length>0)for(let he=0;he<M.mipmaps.length;he++)me(B.__webglFramebuffer[re][he],R,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,he);else me(B.__webglFramebuffer[re],R,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);y(M,fe)&&_(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){let re=R.texture;for(let he=0,we=re.length;he<we;he++){let Be=re[he],K=i.get(Be);t.bindTexture(n.TEXTURE_2D,K.__webglTexture),G(n.TEXTURE_2D,Be,fe),me(B.__webglFramebuffer,R,Be,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,0),y(Be,fe)&&_(n.TEXTURE_2D)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(o?re=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(re,Q.__webglTexture),G(re,M,fe),o&&M.mipmaps&&M.mipmaps.length>0)for(let he=0;he<M.mipmaps.length;he++)me(B.__webglFramebuffer[he],R,M,n.COLOR_ATTACHMENT0,re,he);else me(B.__webglFramebuffer,R,M,n.COLOR_ATTACHMENT0,re,0);y(M,fe)&&_(re),t.unbindTexture()}R.depthBuffer&&Ee(R)}function Ot(R){let M=m(R)||o,B=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let Q=0,J=B.length;Q<J;Q++){let ee=B[Q];if(y(ee,M)){let fe=R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,re=i.get(ee).__webglTexture;t.bindTexture(fe,re),_(fe),t.unbindTexture()}}}function xe(R){if(o&&R.samples>0&&de(R)===!1){let M=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],B=R.width,Q=R.height,J=n.COLOR_BUFFER_BIT,ee=[],fe=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=i.get(R),he=R.isWebGLMultipleRenderTargets===!0;if(he)for(let we=0;we<M.length;we++)t.bindFramebuffer(n.FRAMEBUFFER,re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,re.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let we=0;we<M.length;we++){ee.push(n.COLOR_ATTACHMENT0+we),R.depthBuffer&&ee.push(fe);let Be=re.__ignoreDepthValues!==void 0?re.__ignoreDepthValues:!1;if(Be===!1&&(R.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),he&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,re.__webglColorRenderbuffer[we]),Be===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[fe]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[fe])),he){let K=i.get(M[we]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,K,0)}n.blitFramebuffer(0,0,B,Q,0,0,B,Q,J,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),he)for(let we=0;we<M.length;we++){t.bindFramebuffer(n.FRAMEBUFFER,re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,re.__webglColorRenderbuffer[we]);let Be=i.get(M[we]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,Be,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,re.__webglMultisampledFramebuffer)}}function Ce(R){return Math.min(s.maxSamples,R.samples)}function de(R){let M=i.get(R);return o&&R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ot(R){let M=a.render.frame;h.get(R)!==M&&(h.set(R,M),R.update())}function Fe(R,M){let B=R.colorSpace,Q=R.format,J=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===sl||B!==Bn&&B!==ln&&(qe.getTransfer(B)===Ke?o===!1?e.has("EXT_sRGB")===!0&&Q===_n?(R.format=sl,R.minFilter=an,R.generateMipmaps=!1):M=vo.sRGBToLinear(M):(Q!==_n||J!==Qn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}this.allocateTextureUnit=L,this.resetTextureUnits=X,this.setTexture2D=V,this.setTexture2DArray=Y,this.setTexture3D=q,this.setTextureCube=W,this.rebindTextures=We,this.setupRenderTarget=O,this.updateRenderTargetMipmap=Ot,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=me,this.useMultisampledRTT=de}function y_(n,e,t){let i=t.isWebGL2;function s(r,a=ln){let o,l=qe.getTransfer(a);if(r===Qn)return n.UNSIGNED_BYTE;if(r===Pu)return n.UNSIGNED_SHORT_4_4_4_4;if(r===Lu)return n.UNSIGNED_SHORT_5_5_5_1;if(r===tp)return n.BYTE;if(r===np)return n.SHORT;if(r===zl)return n.UNSIGNED_SHORT;if(r===Cu)return n.INT;if(r===Kn)return n.UNSIGNED_INT;if(r===Jn)return n.FLOAT;if(r===Qt)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===ip)return n.ALPHA;if(r===_n)return n.RGBA;if(r===sp)return n.LUMINANCE;if(r===rp)return n.LUMINANCE_ALPHA;if(r===Ti)return n.DEPTH_COMPONENT;if(r===ps)return n.DEPTH_STENCIL;if(r===sl)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===op)return n.RED;if(r===Iu)return n.RED_INTEGER;if(r===ap)return n.RG;if(r===Uu)return n.RG_INTEGER;if(r===Du)return n.RGBA_INTEGER;if(r===wa||r===Ea||r===Ta||r===Aa)if(l===Ke)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===wa)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ea)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Ta)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Aa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===wa)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ea)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Ta)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Aa)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===sh||r===rh||r===oh||r===ah)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===sh)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===rh)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===oh)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===ah)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Nu)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===lh||r===ch)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===lh)return l===Ke?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===ch)return l===Ke?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===hh||r===uh||r===dh||r===fh||r===ph||r===mh||r===gh||r===vh||r===_h||r===xh||r===yh||r===Mh||r===bh||r===Sh)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===hh)return l===Ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===uh)return l===Ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===dh)return l===Ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===fh)return l===Ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===ph)return l===Ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===mh)return l===Ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===gh)return l===Ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===vh)return l===Ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===_h)return l===Ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===xh)return l===Ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===yh)return l===Ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Mh)return l===Ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===bh)return l===Ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Sh)return l===Ke?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ra||r===wh||r===Eh)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Ra)return l===Ke?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===wh)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Eh)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===lp||r===Th||r===Ah||r===Rh)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Ra)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Th)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Ah)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Rh)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Ei?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}var _l=class extends Dt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Yt=class extends _t{constructor(){super(),this.isGroup=!0,this.type="Group"}},M_={type:"move"},Qs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,i),u=this._getHandJoint(c,v);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(M_)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Yt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},xl=class extends ti{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,f=null,p=null,g=null,v=t.getContextAttributes(),m=null,u=null,y=[],_=[],S=new _e,w=null,E=new Dt;E.layers.enable(1),E.viewport=new Tt;let A=new Dt;A.layers.enable(2),A.viewport=new Tt;let C=[E,A],x=new _l;x.layers.enable(1),x.layers.enable(2);let b=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let $=y[G];return $===void 0&&($=new Qs,y[G]=$),$.getTargetRaySpace()},this.getControllerGrip=function(G){let $=y[G];return $===void 0&&($=new Qs,y[G]=$),$.getGripSpace()},this.getHand=function(G){let $=y[G];return $===void 0&&($=new Qs,y[G]=$),$.getHandSpace()};function k(G){let $=_.indexOf(G.inputSource);if($===-1)return;let ae=y[$];ae!==void 0&&(ae.update(G.inputSource,G.frame,c||a),ae.dispatchEvent({type:G.type,data:G.inputSource}))}function X(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",L);for(let G=0;G<y.length;G++){let $=_[G];$!==null&&(_[G]=null,y[G].disconnect($))}b=null,I=null,e.setRenderTarget(m),p=null,f=null,d=null,s=null,u=null,oe.stop(),i.isPresenting=!1,e.setPixelRatio(w),e.setSize(S.width,S.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",X),s.addEventListener("inputsourceschange",L),v.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(S),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let $={antialias:s.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,$),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),u=new Ct(p.framebufferWidth,p.framebufferHeight,{format:_n,type:Qn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let $=null,ae=null,ge=null;v.depth&&(ge=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,$=v.stencil?ps:Ti,ae=v.stencil?Ei:Kn);let me={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:r};d=new XRWebGLBinding(s,t),f=d.createProjectionLayer(me),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),u=new Ct(f.textureWidth,f.textureHeight,{format:_n,type:Qn,depthTexture:new To(f.textureWidth,f.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0});let Le=e.properties.get(u);Le.__ignoreDepthValues=f.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),oe.setContext(s),oe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function L(G){for(let $=0;$<G.removed.length;$++){let ae=G.removed[$],ge=_.indexOf(ae);ge>=0&&(_[ge]=null,y[ge].disconnect(ae))}for(let $=0;$<G.added.length;$++){let ae=G.added[$],ge=_.indexOf(ae);if(ge===-1){for(let Le=0;Le<y.length;Le++)if(Le>=_.length){_.push(ae),ge=Le;break}else if(_[Le]===null){_[Le]=ae,ge=Le;break}if(ge===-1)break}let me=y[ge];me&&me.connect(ae)}}let N=new U,V=new U;function Y(G,$,ae){N.setFromMatrixPosition($.matrixWorld),V.setFromMatrixPosition(ae.matrixWorld);let ge=N.distanceTo(V),me=$.projectionMatrix.elements,Le=ae.projectionMatrix.elements,Ue=me[14]/(me[10]-1),Ee=me[14]/(me[10]+1),We=(me[9]+1)/me[5],O=(me[9]-1)/me[5],Ot=(me[8]-1)/me[0],xe=(Le[8]+1)/Le[0],Ce=Ue*Ot,de=Ue*xe,ot=ge/(-Ot+xe),Fe=ot*-Ot;$.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(Fe),G.translateZ(ot),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert();let R=Ue+ot,M=Ee+ot,B=Ce-Fe,Q=de+(ge-Fe),J=We*Ee/M*R,ee=O*Ee/M*R;G.projectionMatrix.makePerspective(B,Q,J,ee,R,M),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}function q(G,$){$===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices($.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;x.near=A.near=E.near=G.near,x.far=A.far=E.far=G.far,(b!==x.near||I!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),b=x.near,I=x.far);let $=G.parent,ae=x.cameras;q(x,$);for(let ge=0;ge<ae.length;ge++)q(ae[ge],$);ae.length===2?Y(x,E,A):x.projectionMatrix.copy(E.projectionMatrix),W(G,x,$)};function W(G,$,ae){ae===null?G.matrix.copy($.matrixWorld):(G.matrix.copy(ae.matrixWorld),G.matrix.invert(),G.matrix.multiply($.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy($.projectionMatrix),G.projectionMatrixInverse.copy($.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=ms*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(G){l=G,f!==null&&(f.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)};let Z=null;function j(G,$){if(h=$.getViewerPose(c||a),g=$,h!==null){let ae=h.views;p!==null&&(e.setRenderTargetFramebuffer(u,p.framebuffer),e.setRenderTarget(u));let ge=!1;ae.length!==x.cameras.length&&(x.cameras.length=0,ge=!0);for(let me=0;me<ae.length;me++){let Le=ae[me],Ue=null;if(p!==null)Ue=p.getViewport(Le);else{let We=d.getViewSubImage(f,Le);Ue=We.viewport,me===0&&(e.setRenderTargetTextures(u,We.colorTexture,f.ignoreDepthValues?void 0:We.depthStencilTexture),e.setRenderTarget(u))}let Ee=C[me];Ee===void 0&&(Ee=new Dt,Ee.layers.enable(me),Ee.viewport=new Tt,C[me]=Ee),Ee.matrix.fromArray(Le.transform.matrix),Ee.matrix.decompose(Ee.position,Ee.quaternion,Ee.scale),Ee.projectionMatrix.fromArray(Le.projectionMatrix),Ee.projectionMatrixInverse.copy(Ee.projectionMatrix).invert(),Ee.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),me===0&&(x.matrix.copy(Ee.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ge===!0&&x.cameras.push(Ee)}}for(let ae=0;ae<y.length;ae++){let ge=_[ae],me=y[ae];ge!==null&&me!==void 0&&me.update(ge,$,c||a)}Z&&Z(G,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),g=null}let oe=new Gu;oe.setAnimationLoop(j),this.setAnimationLoop=function(G){Z=G},this.dispose=function(){}}};function b_(n,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,Vu(n)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function s(m,u,y,_,S){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(m,u):u.isMeshToonMaterial?(r(m,u),d(m,u)):u.isMeshPhongMaterial?(r(m,u),h(m,u)):u.isMeshStandardMaterial?(r(m,u),f(m,u),u.isMeshPhysicalMaterial&&p(m,u,S)):u.isMeshMatcapMaterial?(r(m,u),g(m,u)):u.isMeshDepthMaterial?r(m,u):u.isMeshDistanceMaterial?(r(m,u),v(m,u)):u.isMeshNormalMaterial?r(m,u):u.isLineBasicMaterial?(a(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?l(m,u,y,_):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===Nt&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===Nt&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);let y=e.get(u).envMap;if(y&&(m.envMap.value=y,m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap){m.lightMap.value=u.lightMap;let _=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=u.lightMapIntensity*_,t(u.lightMap,m.lightMapTransform)}u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function a(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,y,_){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*y,m.scale.value=_*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function h(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function d(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function f(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),e.get(u).envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,y){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Nt&&m.clearcoatNormalScale.value.negate())),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,u){u.matcap&&(m.matcap.value=u.matcap)}function v(m,u){let y=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function S_(n,e,t,i){let s={},r={},a=[],o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(y,_){let S=_.program;i.uniformBlockBinding(y,S)}function c(y,_){let S=s[y.id];S===void 0&&(g(y),S=h(y),s[y.id]=S,y.addEventListener("dispose",m));let w=_.program;i.updateUBOMapping(y,w);let E=e.render.frame;r[y.id]!==E&&(f(y),r[y.id]=E)}function h(y){let _=d();y.__bindingPointIndex=_;let S=n.createBuffer(),w=y.__size,E=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,w,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,S),S}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){let _=s[y.id],S=y.uniforms,w=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let E=0,A=S.length;E<A;E++){let C=Array.isArray(S[E])?S[E]:[S[E]];for(let x=0,b=C.length;x<b;x++){let I=C[x];if(p(I,E,x,w)===!0){let k=I.__offset,X=Array.isArray(I.value)?I.value:[I.value],L=0;for(let N=0;N<X.length;N++){let V=X[N],Y=v(V);typeof V=="number"||typeof V=="boolean"?(I.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,k+L,I.__data)):V.isMatrix3?(I.__data[0]=V.elements[0],I.__data[1]=V.elements[1],I.__data[2]=V.elements[2],I.__data[3]=0,I.__data[4]=V.elements[3],I.__data[5]=V.elements[4],I.__data[6]=V.elements[5],I.__data[7]=0,I.__data[8]=V.elements[6],I.__data[9]=V.elements[7],I.__data[10]=V.elements[8],I.__data[11]=0):(V.toArray(I.__data,L),L+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,_,S,w){let E=y.value,A=_+"_"+S;if(w[A]===void 0)return typeof E=="number"||typeof E=="boolean"?w[A]=E:w[A]=E.clone(),!0;{let C=w[A];if(typeof E=="number"||typeof E=="boolean"){if(C!==E)return w[A]=E,!0}else if(C.equals(E)===!1)return C.copy(E),!0}return!1}function g(y){let _=y.uniforms,S=0,w=16;for(let A=0,C=_.length;A<C;A++){let x=Array.isArray(_[A])?_[A]:[_[A]];for(let b=0,I=x.length;b<I;b++){let k=x[b],X=Array.isArray(k.value)?k.value:[k.value];for(let L=0,N=X.length;L<N;L++){let V=X[L],Y=v(V),q=S%w;q!==0&&w-q<Y.boundary&&(S+=w-q),k.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=S,S+=Y.storage}}}let E=S%w;return E>0&&(S+=w-E),y.__size=S,y.__cache={},this}function v(y){let _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function m(y){let _=y.target;_.removeEventListener("dispose",m);let S=a.indexOf(_.__bindingPointIndex);a.splice(S,1),n.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function u(){for(let y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:u}}var ir=class{constructor(e={}){let{canvas:t=Up(),context:i=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let f;i!==null?f=i.getContextAttributes().alpha:f=a;let p=new Uint32Array(4),g=new Int32Array(4),v=null,m=null,u=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=yt,this._useLegacyLights=!1,this.toneMapping=jn,this.toneMappingExposure=1;let _=this,S=!1,w=0,E=0,A=null,C=-1,x=null,b=new Tt,I=new Tt,k=null,X=new ce(0),L=0,N=t.width,V=t.height,Y=1,q=null,W=null,Z=new Tt(0,0,N,V),j=new Tt(0,0,N,V),oe=!1,G=new nr,$=!1,ae=!1,ge=null,me=new nt,Le=new _e,Ue=new U,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function We(){return A===null?Y:1}let O=i;function Ot(T,D){for(let z=0;z<T.length;z++){let H=T[z],F=t.getContext(H,D);if(F!==null)return F}return null}try{let T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r160"),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",P,!1),t.addEventListener("webglcontextcreationerror",ie,!1),O===null){let D=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&D.shift(),O=Ot(D,T),O===null)throw Ot(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let xe,Ce,de,ot,Fe,R,M,B,Q,J,ee,fe,re,he,we,Be,K,$e,Ge,Re,ve,ue,De,Ye;function lt(){xe=new V0(O),Ce=new O0(O,xe,e),xe.init(Ce),ue=new y_(O,xe,Ce),de=new __(O,xe,Ce),ot=new X0(O),Fe=new o_,R=new x_(O,xe,de,Fe,Ce,ue,ot),M=new B0(_),B=new H0(_),Q=new Qp(O,Ce),De=new D0(O,xe,Q,Ce),J=new G0(O,Q,ot,De),ee=new Z0(O,J,Q,ot),Ge=new $0(O,Ce,R),Be=new F0(Fe),fe=new r_(_,M,B,xe,Ce,De,Be),re=new b_(_,Fe),he=new l_,we=new p_(xe,Ce),$e=new U0(_,M,B,de,ee,f,l),K=new v_(_,ee,Ce),Ye=new S_(O,ot,Ce,de),Re=new N0(O,xe,ot,Ce),ve=new W0(O,xe,ot,Ce),ot.programs=fe.programs,_.capabilities=Ce,_.extensions=xe,_.properties=Fe,_.renderLists=he,_.shadowMap=K,_.state=de,_.info=ot}lt();let ke=new xl(_,O);this.xr=ke,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let T=xe.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=xe.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(T){T!==void 0&&(Y=T,this.setSize(N,V,!1))},this.getSize=function(T){return T.set(N,V)},this.setSize=function(T,D,z=!0){if(ke.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=T,V=D,t.width=Math.floor(T*Y),t.height=Math.floor(D*Y),z===!0&&(t.style.width=T+"px",t.style.height=D+"px"),this.setViewport(0,0,T,D)},this.getDrawingBufferSize=function(T){return T.set(N*Y,V*Y).floor()},this.setDrawingBufferSize=function(T,D,z){N=T,V=D,Y=z,t.width=Math.floor(T*z),t.height=Math.floor(D*z),this.setViewport(0,0,T,D)},this.getCurrentViewport=function(T){return T.copy(b)},this.getViewport=function(T){return T.copy(Z)},this.setViewport=function(T,D,z,H){T.isVector4?Z.set(T.x,T.y,T.z,T.w):Z.set(T,D,z,H),de.viewport(b.copy(Z).multiplyScalar(Y).floor())},this.getScissor=function(T){return T.copy(j)},this.setScissor=function(T,D,z,H){T.isVector4?j.set(T.x,T.y,T.z,T.w):j.set(T,D,z,H),de.scissor(I.copy(j).multiplyScalar(Y).floor())},this.getScissorTest=function(){return oe},this.setScissorTest=function(T){de.setScissorTest(oe=T)},this.setOpaqueSort=function(T){q=T},this.setTransparentSort=function(T){W=T},this.getClearColor=function(T){return T.copy($e.getClearColor())},this.setClearColor=function(){$e.setClearColor.apply($e,arguments)},this.getClearAlpha=function(){return $e.getClearAlpha()},this.setClearAlpha=function(){$e.setClearAlpha.apply($e,arguments)},this.clear=function(T=!0,D=!0,z=!0){let H=0;if(T){let F=!1;if(A!==null){let le=A.texture.format;F=le===Du||le===Uu||le===Iu}if(F){let le=A.texture.type,pe=le===Qn||le===Kn||le===zl||le===Ei||le===Pu||le===Lu,be=$e.getClearColor(),Ae=$e.getClearAlpha(),ze=be.r,Pe=be.g,Ie=be.b;pe?(p[0]=ze,p[1]=Pe,p[2]=Ie,p[3]=Ae,O.clearBufferuiv(O.COLOR,0,p)):(g[0]=ze,g[1]=Pe,g[2]=Ie,g[3]=Ae,O.clearBufferiv(O.COLOR,0,g))}else H|=O.COLOR_BUFFER_BIT}D&&(H|=O.DEPTH_BUFFER_BIT),z&&(H|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",P,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),he.dispose(),we.dispose(),Fe.dispose(),M.dispose(),B.dispose(),ee.dispose(),De.dispose(),Ye.dispose(),fe.dispose(),ke.dispose(),ke.removeEventListener("sessionstart",Ft),ke.removeEventListener("sessionend",Qe),ge&&(ge.dispose(),ge=null),Bt.stop()};function te(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function P(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;let T=ot.autoReset,D=K.enabled,z=K.autoUpdate,H=K.needsUpdate,F=K.type;lt(),ot.autoReset=T,K.enabled=D,K.autoUpdate=z,K.needsUpdate=H,K.type=F}function ie(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function se(T){let D=T.target;D.removeEventListener("dispose",se),Te(D)}function Te(T){ye(T),Fe.remove(T)}function ye(T){let D=Fe.get(T).programs;D!==void 0&&(D.forEach(function(z){fe.releaseProgram(z)}),T.isShaderMaterial&&fe.releaseShaderCache(T))}this.renderBufferDirect=function(T,D,z,H,F,le){D===null&&(D=Ee);let pe=F.isMesh&&F.matrixWorld.determinant()<0,be=Mf(T,D,z,H,F);de.setMaterial(H,pe);let Ae=z.index,ze=1;if(H.wireframe===!0){if(Ae=J.getWireframeAttribute(z),Ae===void 0)return;ze=2}let Pe=z.drawRange,Ie=z.attributes.position,ut=Pe.start*ze,Zt=(Pe.start+Pe.count)*ze;le!==null&&(ut=Math.max(ut,le.start*ze),Zt=Math.min(Zt,(le.start+le.count)*ze)),Ae!==null?(ut=Math.max(ut,0),Zt=Math.min(Zt,Ae.count)):Ie!=null&&(ut=Math.max(ut,0),Zt=Math.min(Zt,Ie.count));let wt=Zt-ut;if(wt<0||wt===1/0)return;De.setup(F,H,be,z,Ae);let Cn,at=Re;if(Ae!==null&&(Cn=Q.get(Ae),at=ve,at.setIndex(Cn)),F.isMesh)H.wireframe===!0?(de.setLineWidth(H.wireframeLinewidth*We()),at.setMode(O.LINES)):at.setMode(O.TRIANGLES);else if(F.isLine){let He=H.linewidth;He===void 0&&(He=1),de.setLineWidth(He*We()),F.isLineSegments?at.setMode(O.LINES):F.isLineLoop?at.setMode(O.LINE_LOOP):at.setMode(O.LINE_STRIP)}else F.isPoints?at.setMode(O.POINTS):F.isSprite&&at.setMode(O.TRIANGLES);if(F.isBatchedMesh)at.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)at.renderInstances(ut,wt,F.count);else if(z.isInstancedBufferGeometry){let He=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,xa=Math.min(z.instanceCount,He);at.renderInstances(ut,wt,xa)}else at.render(ut,wt)};function Je(T,D,z){T.transparent===!0&&T.side===vn&&T.forceSinglePass===!1?(T.side=Nt,T.needsUpdate=!0,Ur(T,D,z),T.side=ei,T.needsUpdate=!0,Ur(T,D,z),T.side=vn):Ur(T,D,z)}this.compile=function(T,D,z=null){z===null&&(z=T),m=we.get(z),m.init(),y.push(m),z.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),T!==z&&T.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights(_._useLegacyLights);let H=new Set;return T.traverse(function(F){let le=F.material;if(le)if(Array.isArray(le))for(let pe=0;pe<le.length;pe++){let be=le[pe];Je(be,z,F),H.add(be)}else Je(le,z,F),H.add(le)}),y.pop(),m=null,H},this.compileAsync=function(T,D,z=null){let H=this.compile(T,D,z);return new Promise(F=>{function le(){if(H.forEach(function(pe){Fe.get(pe).currentProgram.isReady()&&H.delete(pe)}),H.size===0){F(T);return}setTimeout(le,10)}xe.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let je=null;function St(T){je&&je(T)}function Ft(){Bt.stop()}function Qe(){Bt.start()}let Bt=new Gu;Bt.setAnimationLoop(St),typeof self<"u"&&Bt.setContext(self),this.setAnimationLoop=function(T){je=T,ke.setAnimationLoop(T),T===null?Bt.stop():Bt.start()},ke.addEventListener("sessionstart",Ft),ke.addEventListener("sessionend",Qe),this.render=function(T,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),ke.enabled===!0&&ke.isPresenting===!0&&(ke.cameraAutoUpdate===!0&&ke.updateCamera(D),D=ke.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,D,A),m=we.get(T,y.length),m.init(),y.push(m),me.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),G.setFromProjectionMatrix(me),ae=this.localClippingEnabled,$=Be.init(this.clippingPlanes,ae),v=he.get(T,u.length),v.init(),u.push(v),bn(T,D,0,_.sortObjects),v.finish(),_.sortObjects===!0&&v.sort(q,W),this.info.render.frame++,$===!0&&Be.beginShadows();let z=m.state.shadowsArray;if(K.render(z,T,D),$===!0&&Be.endShadows(),this.info.autoReset===!0&&this.info.reset(),$e.render(v,T),m.setupLights(_._useLegacyLights),D.isArrayCamera){let H=D.cameras;for(let F=0,le=H.length;F<le;F++){let pe=H[F];qc(v,T,pe,pe.viewport)}}else qc(v,T,D);A!==null&&(R.updateMultisampleRenderTarget(A),R.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(_,T,D),De.resetDefaultState(),C=-1,x=null,y.pop(),y.length>0?m=y[y.length-1]:m=null,u.pop(),u.length>0?v=u[u.length-1]:v=null};function bn(T,D,z,H){if(T.visible===!1)return;if(T.layers.test(D.layers)){if(T.isGroup)z=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(D);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||G.intersectsSprite(T)){H&&Ue.setFromMatrixPosition(T.matrixWorld).applyMatrix4(me);let pe=ee.update(T),be=T.material;be.visible&&v.push(T,pe,be,z,Ue.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||G.intersectsObject(T))){let pe=ee.update(T),be=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ue.copy(T.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),Ue.copy(pe.boundingSphere.center)),Ue.applyMatrix4(T.matrixWorld).applyMatrix4(me)),Array.isArray(be)){let Ae=pe.groups;for(let ze=0,Pe=Ae.length;ze<Pe;ze++){let Ie=Ae[ze],ut=be[Ie.materialIndex];ut&&ut.visible&&v.push(T,pe,ut,z,Ue.z,Ie)}}else be.visible&&v.push(T,pe,be,z,Ue.z,null)}}let le=T.children;for(let pe=0,be=le.length;pe<be;pe++)bn(le[pe],D,z,H)}function qc(T,D,z,H){let F=T.opaque,le=T.transmissive,pe=T.transparent;m.setupLightsView(z),$===!0&&Be.setGlobalState(_.clippingPlanes,z),le.length>0&&yf(F,le,D,z),H&&de.viewport(b.copy(H)),F.length>0&&Ir(F,D,z),le.length>0&&Ir(le,D,z),pe.length>0&&Ir(pe,D,z),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function yf(T,D,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;let le=Ce.isWebGL2;ge===null&&(ge=new Ct(1,1,{generateMipmaps:!0,type:xe.has("EXT_color_buffer_half_float")?Qt:Qn,minFilter:tr,samples:le?4:0})),_.getDrawingBufferSize(Le),le?ge.setSize(Le.x,Le.y):ge.setSize(mo(Le.x),mo(Le.y));let pe=_.getRenderTarget();_.setRenderTarget(ge),_.getClearColor(X),L=_.getClearAlpha(),L<1&&_.setClearColor(16777215,.5),_.clear();let be=_.toneMapping;_.toneMapping=jn,Ir(T,z,H),R.updateMultisampleRenderTarget(ge),R.updateRenderTargetMipmap(ge);let Ae=!1;for(let ze=0,Pe=D.length;ze<Pe;ze++){let Ie=D[ze],ut=Ie.object,Zt=Ie.geometry,wt=Ie.material,Cn=Ie.group;if(wt.side===vn&&ut.layers.test(H.layers)){let at=wt.side;wt.side=Nt,wt.needsUpdate=!0,Yc(ut,z,H,Zt,wt,Cn),wt.side=at,wt.needsUpdate=!0,Ae=!0}}Ae===!0&&(R.updateMultisampleRenderTarget(ge),R.updateRenderTargetMipmap(ge)),_.setRenderTarget(pe),_.setClearColor(X,L),_.toneMapping=be}function Ir(T,D,z){let H=D.isScene===!0?D.overrideMaterial:null;for(let F=0,le=T.length;F<le;F++){let pe=T[F],be=pe.object,Ae=pe.geometry,ze=H===null?pe.material:H,Pe=pe.group;be.layers.test(z.layers)&&Yc(be,D,z,Ae,ze,Pe)}}function Yc(T,D,z,H,F,le){T.onBeforeRender(_,D,z,H,F,le),T.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),F.onBeforeRender(_,D,z,H,T,le),F.transparent===!0&&F.side===vn&&F.forceSinglePass===!1?(F.side=Nt,F.needsUpdate=!0,_.renderBufferDirect(z,D,H,F,T,le),F.side=ei,F.needsUpdate=!0,_.renderBufferDirect(z,D,H,F,T,le),F.side=vn):_.renderBufferDirect(z,D,H,F,T,le),T.onAfterRender(_,D,z,H,F,le)}function Ur(T,D,z){D.isScene!==!0&&(D=Ee);let H=Fe.get(T),F=m.state.lights,le=m.state.shadowsArray,pe=F.state.version,be=fe.getParameters(T,F.state,le,D,z),Ae=fe.getProgramCacheKey(be),ze=H.programs;H.environment=T.isMeshStandardMaterial?D.environment:null,H.fog=D.fog,H.envMap=(T.isMeshStandardMaterial?B:M).get(T.envMap||H.environment),ze===void 0&&(T.addEventListener("dispose",se),ze=new Map,H.programs=ze);let Pe=ze.get(Ae);if(Pe!==void 0){if(H.currentProgram===Pe&&H.lightsStateVersion===pe)return Zc(T,be),Pe}else be.uniforms=fe.getUniforms(T),T.onBuild(z,be,_),T.onBeforeCompile(be,_),Pe=fe.acquireProgram(be,Ae),ze.set(Ae,Pe),H.uniforms=be.uniforms;let Ie=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ie.clippingPlanes=Be.uniform),Zc(T,be),H.needsLights=Sf(T),H.lightsStateVersion=pe,H.needsLights&&(Ie.ambientLightColor.value=F.state.ambient,Ie.lightProbe.value=F.state.probe,Ie.directionalLights.value=F.state.directional,Ie.directionalLightShadows.value=F.state.directionalShadow,Ie.spotLights.value=F.state.spot,Ie.spotLightShadows.value=F.state.spotShadow,Ie.rectAreaLights.value=F.state.rectArea,Ie.ltc_1.value=F.state.rectAreaLTC1,Ie.ltc_2.value=F.state.rectAreaLTC2,Ie.pointLights.value=F.state.point,Ie.pointLightShadows.value=F.state.pointShadow,Ie.hemisphereLights.value=F.state.hemi,Ie.directionalShadowMap.value=F.state.directionalShadowMap,Ie.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ie.spotShadowMap.value=F.state.spotShadowMap,Ie.spotLightMatrix.value=F.state.spotLightMatrix,Ie.spotLightMap.value=F.state.spotLightMap,Ie.pointShadowMap.value=F.state.pointShadowMap,Ie.pointShadowMatrix.value=F.state.pointShadowMatrix),H.currentProgram=Pe,H.uniformsList=null,Pe}function $c(T){if(T.uniformsList===null){let D=T.currentProgram.getUniforms();T.uniformsList=hs.seqWithValue(D.seq,T.uniforms)}return T.uniformsList}function Zc(T,D){let z=Fe.get(T);z.outputColorSpace=D.outputColorSpace,z.batching=D.batching,z.instancing=D.instancing,z.instancingColor=D.instancingColor,z.skinning=D.skinning,z.morphTargets=D.morphTargets,z.morphNormals=D.morphNormals,z.morphColors=D.morphColors,z.morphTargetsCount=D.morphTargetsCount,z.numClippingPlanes=D.numClippingPlanes,z.numIntersection=D.numClipIntersection,z.vertexAlphas=D.vertexAlphas,z.vertexTangents=D.vertexTangents,z.toneMapping=D.toneMapping}function Mf(T,D,z,H,F){D.isScene!==!0&&(D=Ee),R.resetTextureUnits();let le=D.fog,pe=H.isMeshStandardMaterial?D.environment:null,be=A===null?_.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Bn,Ae=(H.isMeshStandardMaterial?B:M).get(H.envMap||pe),ze=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Pe=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ie=!!z.morphAttributes.position,ut=!!z.morphAttributes.normal,Zt=!!z.morphAttributes.color,wt=jn;H.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(wt=_.toneMapping);let Cn=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,at=Cn!==void 0?Cn.length:0,He=Fe.get(H),xa=m.state.lights;if($===!0&&(ae===!0||T!==x)){let rn=T===x&&H.id===C;Be.setState(H,T,rn)}let ct=!1;H.version===He.__version?(He.needsLights&&He.lightsStateVersion!==xa.state.version||He.outputColorSpace!==be||F.isBatchedMesh&&He.batching===!1||!F.isBatchedMesh&&He.batching===!0||F.isInstancedMesh&&He.instancing===!1||!F.isInstancedMesh&&He.instancing===!0||F.isSkinnedMesh&&He.skinning===!1||!F.isSkinnedMesh&&He.skinning===!0||F.isInstancedMesh&&He.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&He.instancingColor===!1&&F.instanceColor!==null||He.envMap!==Ae||H.fog===!0&&He.fog!==le||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==Be.numPlanes||He.numIntersection!==Be.numIntersection)||He.vertexAlphas!==ze||He.vertexTangents!==Pe||He.morphTargets!==Ie||He.morphNormals!==ut||He.morphColors!==Zt||He.toneMapping!==wt||Ce.isWebGL2===!0&&He.morphTargetsCount!==at)&&(ct=!0):(ct=!0,He.__version=H.version);let gi=He.currentProgram;ct===!0&&(gi=Ur(H,D,F));let Kc=!1,Gs=!1,ya=!1,Pt=gi.getUniforms(),vi=He.uniforms;if(de.useProgram(gi.program)&&(Kc=!0,Gs=!0,ya=!0),H.id!==C&&(C=H.id,Gs=!0),Kc||x!==T){Pt.setValue(O,"projectionMatrix",T.projectionMatrix),Pt.setValue(O,"viewMatrix",T.matrixWorldInverse);let rn=Pt.map.cameraPosition;rn!==void 0&&rn.setValue(O,Ue.setFromMatrixPosition(T.matrixWorld)),Ce.logarithmicDepthBuffer&&Pt.setValue(O,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Pt.setValue(O,"isOrthographic",T.isOrthographicCamera===!0),x!==T&&(x=T,Gs=!0,ya=!0)}if(F.isSkinnedMesh){Pt.setOptional(O,F,"bindMatrix"),Pt.setOptional(O,F,"bindMatrixInverse");let rn=F.skeleton;rn&&(Ce.floatVertexTextures?(rn.boneTexture===null&&rn.computeBoneTexture(),Pt.setValue(O,"boneTexture",rn.boneTexture,R)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}F.isBatchedMesh&&(Pt.setOptional(O,F,"batchingTexture"),Pt.setValue(O,"batchingTexture",F._matricesTexture,R));let Ma=z.morphAttributes;if((Ma.position!==void 0||Ma.normal!==void 0||Ma.color!==void 0&&Ce.isWebGL2===!0)&&Ge.update(F,z,gi),(Gs||He.receiveShadow!==F.receiveShadow)&&(He.receiveShadow=F.receiveShadow,Pt.setValue(O,"receiveShadow",F.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(vi.envMap.value=Ae,vi.flipEnvMap.value=Ae.isCubeTexture&&Ae.isRenderTargetTexture===!1?-1:1),Gs&&(Pt.setValue(O,"toneMappingExposure",_.toneMappingExposure),He.needsLights&&bf(vi,ya),le&&H.fog===!0&&re.refreshFogUniforms(vi,le),re.refreshMaterialUniforms(vi,H,Y,V,ge),hs.upload(O,$c(He),vi,R)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(hs.upload(O,$c(He),vi,R),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Pt.setValue(O,"center",F.center),Pt.setValue(O,"modelViewMatrix",F.modelViewMatrix),Pt.setValue(O,"normalMatrix",F.normalMatrix),Pt.setValue(O,"modelMatrix",F.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){let rn=H.uniformsGroups;for(let ba=0,wf=rn.length;ba<wf;ba++)if(Ce.isWebGL2){let Jc=rn[ba];Ye.update(Jc,gi),Ye.bind(Jc,gi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return gi}function bf(T,D){T.ambientLightColor.needsUpdate=D,T.lightProbe.needsUpdate=D,T.directionalLights.needsUpdate=D,T.directionalLightShadows.needsUpdate=D,T.pointLights.needsUpdate=D,T.pointLightShadows.needsUpdate=D,T.spotLights.needsUpdate=D,T.spotLightShadows.needsUpdate=D,T.rectAreaLights.needsUpdate=D,T.hemisphereLights.needsUpdate=D}function Sf(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,D,z){Fe.get(T.texture).__webglTexture=D,Fe.get(T.depthTexture).__webglTexture=z;let H=Fe.get(T);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=z===void 0,H.__autoAllocateDepthBuffer||xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,D){let z=Fe.get(T);z.__webglFramebuffer=D,z.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(T,D=0,z=0){A=T,w=D,E=z;let H=!0,F=null,le=!1,pe=!1;if(T){let Ae=Fe.get(T);Ae.__useDefaultFramebuffer!==void 0?(de.bindFramebuffer(O.FRAMEBUFFER,null),H=!1):Ae.__webglFramebuffer===void 0?R.setupRenderTarget(T):Ae.__hasExternalTextures&&R.rebindTextures(T,Fe.get(T.texture).__webglTexture,Fe.get(T.depthTexture).__webglTexture);let ze=T.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(pe=!0);let Pe=Fe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Pe[D])?F=Pe[D][z]:F=Pe[D],le=!0):Ce.isWebGL2&&T.samples>0&&R.useMultisampledRTT(T)===!1?F=Fe.get(T).__webglMultisampledFramebuffer:Array.isArray(Pe)?F=Pe[z]:F=Pe,b.copy(T.viewport),I.copy(T.scissor),k=T.scissorTest}else b.copy(Z).multiplyScalar(Y).floor(),I.copy(j).multiplyScalar(Y).floor(),k=oe;if(de.bindFramebuffer(O.FRAMEBUFFER,F)&&Ce.drawBuffers&&H&&de.drawBuffers(T,F),de.viewport(b),de.scissor(I),de.setScissorTest(k),le){let Ae=Fe.get(T.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+D,Ae.__webglTexture,z)}else if(pe){let Ae=Fe.get(T.texture),ze=D||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ae.__webglTexture,z||0,ze)}C=-1},this.readRenderTargetPixels=function(T,D,z,H,F,le,pe){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=Fe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&pe!==void 0&&(be=be[pe]),be){de.bindFramebuffer(O.FRAMEBUFFER,be);try{let Ae=T.texture,ze=Ae.format,Pe=Ae.type;if(ze!==_n&&ue.convert(ze)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Ie=Pe===Qt&&(xe.has("EXT_color_buffer_half_float")||Ce.isWebGL2&&xe.has("EXT_color_buffer_float"));if(Pe!==Qn&&ue.convert(Pe)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Pe===Jn&&(Ce.isWebGL2||xe.has("OES_texture_float")||xe.has("WEBGL_color_buffer_float")))&&!Ie){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=T.width-H&&z>=0&&z<=T.height-F&&O.readPixels(D,z,H,F,ue.convert(ze),ue.convert(Pe),le)}finally{let Ae=A!==null?Fe.get(A).__webglFramebuffer:null;de.bindFramebuffer(O.FRAMEBUFFER,Ae)}}},this.copyFramebufferToTexture=function(T,D,z=0){let H=Math.pow(2,-z),F=Math.floor(D.image.width*H),le=Math.floor(D.image.height*H);R.setTexture2D(D,0),O.copyTexSubImage2D(O.TEXTURE_2D,z,0,0,T.x,T.y,F,le),de.unbindTexture()},this.copyTextureToTexture=function(T,D,z,H=0){let F=D.image.width,le=D.image.height,pe=ue.convert(z.format),be=ue.convert(z.type);R.setTexture2D(z,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,z.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,z.unpackAlignment),D.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,H,T.x,T.y,F,le,pe,be,D.image.data):D.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,H,T.x,T.y,D.mipmaps[0].width,D.mipmaps[0].height,pe,D.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,H,T.x,T.y,pe,be,D.image),H===0&&z.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),de.unbindTexture()},this.copyTextureToTexture3D=function(T,D,z,H,F=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let le=T.max.x-T.min.x+1,pe=T.max.y-T.min.y+1,be=T.max.z-T.min.z+1,Ae=ue.convert(H.format),ze=ue.convert(H.type),Pe;if(H.isData3DTexture)R.setTexture3D(H,0),Pe=O.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)R.setTexture2DArray(H,0),Pe=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,H.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,H.unpackAlignment);let Ie=O.getParameter(O.UNPACK_ROW_LENGTH),ut=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Zt=O.getParameter(O.UNPACK_SKIP_PIXELS),wt=O.getParameter(O.UNPACK_SKIP_ROWS),Cn=O.getParameter(O.UNPACK_SKIP_IMAGES),at=z.isCompressedTexture?z.mipmaps[F]:z.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,at.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,at.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,T.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,T.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,T.min.z),z.isDataTexture||z.isData3DTexture?O.texSubImage3D(Pe,F,D.x,D.y,D.z,le,pe,be,Ae,ze,at.data):z.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(Pe,F,D.x,D.y,D.z,le,pe,be,Ae,at.data)):O.texSubImage3D(Pe,F,D.x,D.y,D.z,le,pe,be,Ae,ze,at),O.pixelStorei(O.UNPACK_ROW_LENGTH,Ie),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ut),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Zt),O.pixelStorei(O.UNPACK_SKIP_ROWS,wt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Cn),F===0&&H.generateMipmaps&&O.generateMipmap(Pe),de.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?R.setTextureCube(T,0):T.isData3DTexture?R.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?R.setTexture2DArray(T,0):R.setTexture2D(T,0),de.unbindTexture()},this.resetState=function(){w=0,E=0,A=null,de.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===kl?"display-p3":"srgb",t.unpackColorSpace=qe.workingColorSpace===zo?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===yt?Ai:Ou}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Ai?yt:Bn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},yl=class extends ir{};yl.prototype.isWebGL1Renderer=!0;var Ao=class n{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new ce(e),this.near=t,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},sr=class extends _t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}};var rr=class extends it{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},is=new nt,xu=new nt,io=[],yu=new zn,w_=new nt,$s=new et,Zs=new ni,or=class extends et{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new rr(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,w_)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,is),yu.copy(e.boundingBox).applyMatrix4(is),this.boundingBox.union(yu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ni),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,is),Zs.copy(e.boundingSphere).applyMatrix4(is),this.boundingSphere.union(Zs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let i=this.matrixWorld,s=this.count;if($s.geometry=this.geometry,$s.material=this.material,$s.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Zs.copy(this.boundingSphere),Zs.applyMatrix4(i),e.ray.intersectsSphere(Zs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,is),xu.multiplyMatrices(i,is),$s.matrixWorld=xu,$s.raycast(e,io);for(let a=0,o=io.length;a<o;a++){let l=io[a];l.instanceId=r,l.object=this,t.push(l)}io.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new rr(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var ar=class extends ii{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ce(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Mu=new nt,Ml=new yo,so=new ni,ro=new U,lr=class extends _t{constructor(e=new ht,t=new ar){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),so.copy(i.boundingSphere),so.applyMatrix4(s),so.radius+=r,e.ray.intersectsSphere(so)===!1)return;Mu.copy(s).invert(),Ml.copy(e.ray).applyMatrix4(Mu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){let f=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=f,v=p;g<v;g++){let m=c.getX(g);ro.fromBufferAttribute(d,m),bu(ro,m,l,s,e,t,this)}}else{let f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let g=f,v=p;g<v;g++)ro.fromBufferAttribute(d,g),bu(ro,g,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function bu(n,e,t,i,s,r,a){let o=Ml.distanceSqToPoint(n);if(o<t){let l=new U;Ml.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}var Ms=class extends cn{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ro=class n extends ht{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new U,h=new _e;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){let p=i+d/t*s;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/e+1)/2,h.y=(a[f+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Ze(a,3)),this.setAttribute("normal",new Ze(o,3)),this.setAttribute("uv",new Ze(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},kn=class n extends ht{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],f=[],p=[],g=0,v=[],m=i/2,u=0;y(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Ze(d,3)),this.setAttribute("normal",new Ze(f,3)),this.setAttribute("uv",new Ze(p,2));function y(){let S=new U,w=new U,E=0,A=(t-e)/i;for(let C=0;C<=r;C++){let x=[],b=C/r,I=b*(t-e)+e;for(let k=0;k<=s;k++){let X=k/s,L=X*l+o,N=Math.sin(L),V=Math.cos(L);w.x=I*N,w.y=-b*i+m,w.z=I*V,d.push(w.x,w.y,w.z),S.set(N,A,V).normalize(),f.push(S.x,S.y,S.z),p.push(X,1-b),x.push(g++)}v.push(x)}for(let C=0;C<s;C++)for(let x=0;x<r;x++){let b=v[x][C],I=v[x+1][C],k=v[x+1][C+1],X=v[x][C+1];h.push(b,I,X),h.push(I,k,X),E+=6}c.addGroup(u,E,0),u+=E}function _(S){let w=g,E=new _e,A=new U,C=0,x=S===!0?e:t,b=S===!0?1:-1;for(let k=1;k<=s;k++)d.push(0,m*b,0),f.push(0,b,0),p.push(.5,.5),g++;let I=g;for(let k=0;k<=s;k++){let L=k/s*l+o,N=Math.cos(L),V=Math.sin(L);A.x=x*V,A.y=m*b,A.z=x*N,d.push(A.x,A.y,A.z),f.push(0,b,0),E.x=N*.5+.5,E.y=V*.5*b+.5,p.push(E.x,E.y),g++}for(let k=0;k<s;k++){let X=w+k,L=I+k;S===!0?h.push(L,L+1,X):h.push(L+1,L,X),C+=3}c.addGroup(u,C,S===!0?1:2),u+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ri=class n extends kn{constructor(e=1,t=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Co=class n extends ht{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};let r=[],a=[];o(s),c(i),h(),this.setAttribute("position",new Ze(r,3)),this.setAttribute("normal",new Ze(r.slice(),3)),this.setAttribute("uv",new Ze(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(y){let _=new U,S=new U,w=new U;for(let E=0;E<t.length;E+=3)p(t[E+0],_),p(t[E+1],S),p(t[E+2],w),l(_,S,w,y)}function l(y,_,S,w){let E=w+1,A=[];for(let C=0;C<=E;C++){A[C]=[];let x=y.clone().lerp(S,C/E),b=_.clone().lerp(S,C/E),I=E-C;for(let k=0;k<=I;k++)k===0&&C===E?A[C][k]=x:A[C][k]=x.clone().lerp(b,k/I)}for(let C=0;C<E;C++)for(let x=0;x<2*(E-C)-1;x++){let b=Math.floor(x/2);x%2===0?(f(A[C][b+1]),f(A[C+1][b]),f(A[C][b])):(f(A[C][b+1]),f(A[C+1][b+1]),f(A[C+1][b]))}}function c(y){let _=new U;for(let S=0;S<r.length;S+=3)_.x=r[S+0],_.y=r[S+1],_.z=r[S+2],_.normalize().multiplyScalar(y),r[S+0]=_.x,r[S+1]=_.y,r[S+2]=_.z}function h(){let y=new U;for(let _=0;_<r.length;_+=3){y.x=r[_+0],y.y=r[_+1],y.z=r[_+2];let S=m(y)/2/Math.PI+.5,w=u(y)/Math.PI+.5;a.push(S,1-w)}g(),d()}function d(){for(let y=0;y<a.length;y+=6){let _=a[y+0],S=a[y+2],w=a[y+4],E=Math.max(_,S,w),A=Math.min(_,S,w);E>.9&&A<.1&&(_<.2&&(a[y+0]+=1),S<.2&&(a[y+2]+=1),w<.2&&(a[y+4]+=1))}}function f(y){r.push(y.x,y.y,y.z)}function p(y,_){let S=y*3;_.x=e[S+0],_.y=e[S+1],_.z=e[S+2]}function g(){let y=new U,_=new U,S=new U,w=new U,E=new _e,A=new _e,C=new _e;for(let x=0,b=0;x<r.length;x+=9,b+=6){y.set(r[x+0],r[x+1],r[x+2]),_.set(r[x+3],r[x+4],r[x+5]),S.set(r[x+6],r[x+7],r[x+8]),E.set(a[b+0],a[b+1]),A.set(a[b+2],a[b+3]),C.set(a[b+4],a[b+5]),w.copy(y).add(_).add(S).divideScalar(3);let I=m(w);v(E,b+0,y,I),v(A,b+2,_,I),v(C,b+4,S,I)}}function v(y,_,S,w){w<0&&y.x===1&&(a[_]=y.x-1),S.x===0&&S.z===0&&(a[_]=w/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function u(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.vertices,e.indices,e.radius,e.details)}},Po=class n extends Co{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}};var cr=class n extends Co{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}};var hr=class n extends ht{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new U,f=new U,p=[],g=[],v=[],m=[];for(let u=0;u<=i;u++){let y=[],_=u/i,S=0;u===0&&a===0?S=.5/t:u===i&&l===Math.PI&&(S=-.5/t);for(let w=0;w<=t;w++){let E=w/t;d.x=-e*Math.cos(s+E*r)*Math.sin(a+_*o),d.y=e*Math.cos(a+_*o),d.z=e*Math.sin(s+E*r)*Math.sin(a+_*o),g.push(d.x,d.y,d.z),f.copy(d).normalize(),v.push(f.x,f.y,f.z),m.push(E+S,1-_),y.push(c++)}h.push(y)}for(let u=0;u<i;u++)for(let y=0;y<t;y++){let _=h[u][y+1],S=h[u][y],w=h[u+1][y],E=h[u+1][y+1];(u!==0||a>0)&&p.push(_,S,E),(u!==i-1||l<Math.PI)&&p.push(S,w,E)}this.setIndex(p),this.setAttribute("position",new Ze(g,3)),this.setAttribute("normal",new Ze(v,3)),this.setAttribute("uv",new Ze(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Lo=class extends dt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ft=class extends ii{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ce(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fu,this.normalScale=new _e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Io=class extends ft{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new _e(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ut(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ce(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ce(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ce(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function oo(n,e,t){return!n||!t&&n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function E_(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var bs=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break n}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},bl=class extends bs{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ch,endingEnd:Ch}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ph:r=e,o=2*t-i;break;case Lh:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Ph:a=e,l=2*i-t;break;case Lh:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}let c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,p=this._weightNext,g=(i-t)/(s-t),v=g*g,m=v*g,u=-f*m+2*f*v-f*g,y=(1+f)*m+(-1.5-2*f)*v+(-.5+f)*g+1,_=(-1-p)*m+(1.5+p)*v+.5*g,S=p*m-p*v;for(let w=0;w!==o;++w)r[w]=u*a[h+w]+y*a[c+w]+_*a[l+w]+S*a[d+w];return r}},Sl=class extends bs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(i-t)/(s-t),d=1-h;for(let f=0;f!==o;++f)r[f]=a[c+f]*d+a[l+f]*h;return r}},wl=class extends bs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},xn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=oo(t,this.TimeBufferType),this.values=oo(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:oo(e.times,Array),values:oo(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new wl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Sl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new bl(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case lo:t=this.InterpolantFactoryMethodDiscrete;break;case co:t=this.InterpolantFactoryMethodLinear;break;case Ca:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return lo;case this.InterpolantFactoryMethodLinear:return co;case this.InterpolantFactoryMethodSmooth:return Ca}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&E_(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Ca,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*i,f=d-i,p=d+i;for(let g=0;g!==i;++g){let v=t[d+g];if(v!==t[f+g]||v!==t[p+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*i,f=a*i;for(let p=0;p!==i;++p)t[f+p]=t[d+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};xn.prototype.TimeBufferType=Float32Array;xn.prototype.ValueBufferType=Float32Array;xn.prototype.DefaultInterpolation=co;var Ci=class extends xn{};Ci.prototype.ValueTypeName="bool";Ci.prototype.ValueBufferType=Array;Ci.prototype.DefaultInterpolation=lo;Ci.prototype.InterpolantFactoryMethodLinear=void 0;Ci.prototype.InterpolantFactoryMethodSmooth=void 0;var El=class extends xn{};El.prototype.ValueTypeName="color";var Tl=class extends xn{};Tl.prototype.ValueTypeName="number";var Al=class extends bs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t),c=e*o;for(let h=c+o;c!==h;c+=4)En.slerpFlat(r,0,a,c-o,a,c,l);return r}},ur=class extends xn{InterpolantFactoryMethodLinear(e){return new Al(this.times,this.values,this.getValueSize(),e)}};ur.prototype.ValueTypeName="quaternion";ur.prototype.DefaultInterpolation=co;ur.prototype.InterpolantFactoryMethodSmooth=void 0;var Pi=class extends xn{};Pi.prototype.ValueTypeName="string";Pi.prototype.ValueBufferType=Array;Pi.prototype.DefaultInterpolation=lo;Pi.prototype.InterpolantFactoryMethodLinear=void 0;Pi.prototype.InterpolantFactoryMethodSmooth=void 0;var Rl=class extends xn{};Rl.prototype.ValueTypeName="vector";var Cl=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,f=c.length;d<f;d+=2){let p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},T_=new Cl,Pl=class{constructor(e){this.manager=e!==void 0?e:T_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Pl.DEFAULT_MATERIAL_NAME="__DEFAULT";var dr=class extends _t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ce(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},Uo=class extends dr{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ce(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},ja=new nt,Su=new U,wu=new U,Do=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _e(512,512),this.map=null,this.mapPass=null,this.matrix=new nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new nr,this._frameExtents=new _e(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;Su.setFromMatrixPosition(e.matrixWorld),t.position.copy(Su),wu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wu),t.updateMatrixWorld(),ja.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ja),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ja)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ll=class extends Do{constructor(){super(new Dt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,i=ms*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},No=class extends dr{constructor(e,t,i=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Ll}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Il=class extends Do{constructor(){super(new xs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Oo=class extends dr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.shadow=new Il}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Fo=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Eu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=Eu();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function Eu(){return(typeof performance>"u"?Date:performance).now()}var Gl="\\[\\]\\.:\\/",A_=new RegExp("["+Gl+"]","g"),Wl="[^"+Gl+"]",R_="[^"+Gl.replace("\\.","")+"]",C_=/((?:WC+[\/:])*)/.source.replace("WC",Wl),P_=/(WCOD+)?/.source.replace("WCOD",R_),L_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Wl),I_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Wl),U_=new RegExp("^"+C_+P_+L_+I_+"$"),D_=["material","materials","bones","map"],Ul=class{constructor(e,t,i){let s=i||st.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},st=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(A_,"")}static parseTrackName(e){let t=U_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);D_.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};st.Composite=Ul;st.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};st.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};st.prototype.GetterByBindingType=[st.prototype._getValue_direct,st.prototype._getValue_array,st.prototype._getValue_arrayElement,st.prototype._getValue_toArray];st.prototype.SetterByBindingTypeAndVersioning=[[st.prototype._setValue_direct,st.prototype._setValue_direct_setNeedsUpdate,st.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[st.prototype._setValue_array,st.prototype._setValue_array_setNeedsUpdate,st.prototype._setValue_array_setMatrixWorldNeedsUpdate],[st.prototype._setValue_arrayElement,st.prototype._setValue_arrayElement_setNeedsUpdate,st.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[st.prototype._setValue_fromArray,st.prototype._setValue_fromArray_setNeedsUpdate,st.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ry=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");var Ho={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var tn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},O_=new xs(-1,1,1,-1,0,1),Xl=class extends ht{constructor(){super(),this.setAttribute("position",new Ze([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ze([0,2,0,0,2,0],2))}},F_=new Xl,ri=class{constructor(e){this._mesh=new et(F_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,O_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Vo=class extends tn{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof dt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=si.clone(e.uniforms),this.material=new dt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new ri(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var pr=class extends tn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Go=class extends tn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Wo=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new _e);this._width=i.width,this._height=i.height,t=new Ct(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Qt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Vo(Ho),this.copyPass.material.blending=wn,this.clock=new Fo}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}pr!==void 0&&(a instanceof pr?i=!0:a instanceof Go&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new _e);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Xo=class extends tn{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ce}render(e,t,i){let s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}};var Zu={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ce(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Es=class n extends tn{constructor(e,t,i,s){super(),this.strength=t!==void 0?t:1,this.radius=i,this.threshold=s,this.resolution=e!==void 0?new _e(e.x,e.y):new _e(256,256),this.clearColor=new ce(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Ct(r,a,{type:Qt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){let f=new Ct(r,a,{type:Qt});f.texture.name="UnrealBloomPass.h"+d,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);let p=new Ct(r,a,{type:Qt});p.texture.name="UnrealBloomPass.v"+d,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),a=Math.round(a/2)}let o=Zu;this.highPassUniforms=si.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new dt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new _e(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let h=Ho;this.copyUniforms=si.clone(h.uniforms),this.blendMaterial=new dt({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:us,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new ce,this.oldClearAlpha=1,this.basic=new en,this.fsQuad=new ri(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new _e(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(e,t,i,s,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){let t=[];for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new dt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new _e(.5,.5)},direction:{value:new _e(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new dt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};Es.BlurDirectionX=new _e(1,0);Es.BlurDirectionY=new _e(0,1);var Ku={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var qo=class extends tn{constructor(){super();let e=Ku;this.uniforms=si.clone(e.uniforms),this.material=new Lo({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new ri(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},qe.getTransfer(this._outputColorSpace)===Ke&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Nl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ol?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Fl?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===fr?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Bl&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var mr=new U;function hn(n,e,t,i,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;mr.copy(e),mr[i]=0,mr.normalize();let c=.5*a/(a+o),h=1-mr.angleTo(n)/l;return Math.sign(mr[t])===1?h*c:o/(a+o)+c+c*(1-h)}var Tn=class extends Xe{constructor(e=1,t=1,i=1,s=2,r=.1){if(s=s*2+1,r=Math.min(e/2,t/2,i/2,r),super(1,1,1,s,s,s),s===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let o=new U,l=new U,c=new U(e,t,i).divideScalar(2).subScalar(r),h=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=h.length/6,g=new U,v=.5/s;for(let m=0,u=0;m<h.length;m+=3,u+=2)switch(o.fromArray(h,m),l.copy(o),l.x-=Math.sign(l.x)*v,l.y-=Math.sign(l.y)*v,l.z-=Math.sign(l.z)*v,l.normalize(),h[m+0]=c.x*Math.sign(o.x)+l.x*r,h[m+1]=c.y*Math.sign(o.y)+l.y*r,h[m+2]=c.z*Math.sign(o.z)+l.z*r,d[m+0]=l.x,d[m+1]=l.y,d[m+2]=l.z,Math.floor(m/p)){case 0:g.set(1,0,0),f[u+0]=hn(g,l,"z","y",r,i),f[u+1]=1-hn(g,l,"y","z",r,t);break;case 1:g.set(-1,0,0),f[u+0]=1-hn(g,l,"z","y",r,i),f[u+1]=1-hn(g,l,"y","z",r,t);break;case 2:g.set(0,1,0),f[u+0]=1-hn(g,l,"x","z",r,e),f[u+1]=hn(g,l,"z","x",r,i);break;case 3:g.set(0,-1,0),f[u+0]=1-hn(g,l,"x","z",r,e),f[u+1]=1-hn(g,l,"z","x",r,i);break;case 4:g.set(0,0,1),f[u+0]=1-hn(g,l,"x","y",r,e),f[u+1]=1-hn(g,l,"y","x",r,t);break;case 5:g.set(0,0,-1),f[u+0]=hn(g,l,"x","y",r,e),f[u+1]=1-hn(g,l,"y","x",r,t);break}}};function Ts(n,e=!1){let t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},a={},o=n[0].morphTargetsRelative,l=new ht,c=0;for(let h=0;h<n.length;++h){let d=n[h],f=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in d.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(d.attributes[p]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in d.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(d.morphAttributes[p])}if(e){let p;if(t)p=d.index.count;else if(d.attributes.position!==void 0)p=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,h),c+=p}}if(t){let h=0,d=[];for(let f=0;f<n.length;++f){let p=n[f].index;for(let g=0;g<p.count;++g)d.push(p.getX(g)+h);h+=n[f].attributes.position.count}l.setIndex(d)}for(let h in r){let d=Ju(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(let h in a){let d=a[h][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<d;++f){let p=[];for(let v=0;v<a[h].length;++v)p.push(a[h][v][f]);let g=Ju(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Ju(n){let e,t,i,s=-1,r=0;for(let c=0;c<n.length;++c){let h=n[c];if(h.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.array.length}let a=new e(r),o=0;for(let c=0;c<n.length;++c)a.set(n[c].array,o),o+=n[c].array.length;let l=new it(a,t,i);return s!==void 0&&(l.gpuType=s),l}Mn();Mn();var Yo=yn("App",{web:()=>Promise.resolve().then(()=>(id(),nd)).then(n=>new n.AppWeb)});Mn();var od=yn("ScreenOrientation",{web:()=>Promise.resolve().then(()=>(rd(),sd)).then(n=>new n.ScreenOrientationWeb)});Mn();Mn();var Li=":is([data-native-ui-snapshot-source], [data-native-ui-snapshot-prepared], [data-native-ui-snapshot-content])",hM=`
@layer native-ui-projection {
${Li}, ${Li} *, ${Li}::part(native) { visibility: hidden !important; }
${Li}::before, ${Li}::after,
${Li} *::before, ${Li} *::after {
  visibility: hidden !important;
}
}
[data-native-ui-snapshot-visible][data-native-ui-snapshot-positioned] { position:relative!important; }
`;var Jl;(function(n){n.Small="small",n.Medium="medium"})(Jl||(Jl={}));var J_;var ad=n=>{J_=n};var ld;(function(n){n.General="General",n.ParentalGuidance="ParentalGuidance",n.Teen="Teen",n.MatureAudience="MatureAudience"})(ld||(ld={}));var $o;(function(n){n.SizeChanged="bannerAdSizeChanged",n.Loaded="bannerAdLoaded",n.FailedToLoad="bannerAdFailedToLoad",n.Opened="bannerAdOpened",n.Closed="bannerAdClosed",n.AdImpression="bannerAdImpression",n.AdPaid="bannerAdPaid"})($o||($o={}));var Zo;(function(n){n.TOP_CENTER="TOP_CENTER",n.CENTER="CENTER",n.BOTTOM_CENTER="BOTTOM_CENTER"})(Zo||(Zo={}));var Ko;(function(n){n.BANNER="BANNER",n.FULL_BANNER="FULL_BANNER",n.LARGE_BANNER="LARGE_BANNER",n.MEDIUM_RECTANGLE="MEDIUM_RECTANGLE",n.LEADERBOARD="LEADERBOARD",n.ADAPTIVE_BANNER="ADAPTIVE_BANNER",n.SMART_BANNER="SMART_BANNER"})(Ko||(Ko={}));var cd;(function(n){n.Loaded="interstitialAdLoaded",n.FailedToLoad="interstitialAdFailedToLoad",n.Showed="interstitialAdShowed",n.FailedToShow="interstitialAdFailedToShow",n.Dismissed="interstitialAdDismissed",n.AdImpression="interstitialAdImpression"})(cd||(cd={}));var hd;(function(n){n.Loaded="onRewardedInterstitialAdLoaded",n.FailedToLoad="onRewardedInterstitialAdFailedToLoad",n.Showed="onRewardedInterstitialAdShowed",n.FailedToShow="onRewardedInterstitialAdFailedToShow",n.Dismissed="onRewardedInterstitialAdDismissed",n.Rewarded="onRewardedInterstitialAdReward",n.AdImpression="onRewardedInterstitialAdImpression"})(hd||(hd={}));var ud;(function(n){n.adClicked="onRewardedVideoAdClicked",n.Loaded="onRewardedVideoAdLoaded",n.FailedToLoad="onRewardedVideoAdFailedToLoad",n.Showed="onRewardedVideoAdShowed",n.FailedToShow="onRewardedVideoAdFailedToShow",n.Dismissed="onRewardedVideoAdDismissed",n.Rewarded="onRewardedVideoAdReward",n.AdImpression="onRewardedVideoAdImpression"})(ud||(ud={}));jl();var dd;(function(n){n[n.DISABLED=0]="DISABLED",n[n.EEA=1]="EEA",n[n.NOT_EEA=2]="NOT_EEA",n[n.US=3]="US",n[n.OTHER=4]="OTHER"})(dd||(dd={}));var fd;(function(n){n[n.Unknown=0]="Unknown",n[n.Estimated=1]="Estimated",n[n.PublisherProvided=2]="PublisherProvided",n[n.Precise=3]="Precise"})(fd||(fd={}));var pd;(function(n){n.Loaded="appOpenAdLoaded",n.FailedToLoad="appOpenAdFailedToLoad",n.Opened="appOpenAdOpened",n.Closed="appOpenAdClosed",n.FailedToShow="appOpenAdFailedToShow",n.AdImpression="appOpenAdImpression"})(pd||(pd={}));var md;(function(n){n.Loaded="nativeAdLoaded",n.FailedToLoad="nativeAdFailedToLoad",n.Clicked="nativeAdClicked",n.AdImpression="nativeAdImpression",n.Opened="nativeAdOpened",n.Closed="nativeAdClosed",n.AdPaid="nativeAdPaid"})(md||(md={}));var xd=yn("AdMob",{web:()=>Promise.resolve().then(()=>(_d(),vd)).then(n=>new n.AdMobWeb)}),Ii=xd;ad(xd);Mn();var j_="__capgo_keep_url_path_after_reload",ec="__capgo_history_stack__";var Q_=typeof window<"u"&&typeof document<"u"&&typeof history<"u";if(Q_){let n=window;if(!n.__capgoHistoryPatched){n.__capgoHistoryPatched=!0;let e=()=>{try{if(n.__capgoKeepUrlPathAfterReload)return!0}catch{}try{return window.localStorage.getItem(j_)==="1"}catch{return!1}},t=()=>{try{let w=window.sessionStorage.getItem(ec);if(!w)return{stack:[],index:-1};let E=JSON.parse(w);return!E||!Array.isArray(E.stack)||typeof E.index!="number"?{stack:[],index:-1}:E}catch{return{stack:[],index:-1}}},i=(w,E)=>{try{window.sessionStorage.setItem(ec,JSON.stringify({stack:w,index:E}))}catch{}},s=()=>{try{window.sessionStorage.removeItem(ec)}catch{}},r=w=>{try{let E=w??window.location.href,A=new URL(E instanceof URL?E.toString():E,window.location.href);return`${A.pathname}${A.search}${A.hash}`}catch{return null}},a=(w,E)=>{if(w.length<=100)return{stack:w,index:E};let A=w.length-100,C=w.slice(A),x=Math.max(0,E-A);return{stack:C,index:x}},o=w=>{document.readyState==="complete"||document.readyState==="interactive"?w():window.addEventListener("DOMContentLoaded",w,{once:!0})},l=!1,c=!1,h=!1,d=()=>{if(!l)return;let w=t(),E=r();if(E){if(w.stack.length===0){w.stack.push(E),w.index=0,i(w.stack,w.index);return}(w.index<0||w.index>=w.stack.length)&&(w.index=w.stack.length-1),w.stack[w.index]!==E&&(w.stack[w.index]=E,i(w.stack,w.index))}},f=(w,E)=>{if(!l||c)return;let A=r(w);if(!A)return;let{stack:C,index:x}=t();C.length===0?(C.push(A),x=C.length-1):E?((x<0||x>=C.length)&&(x=C.length-1),C[x]=A):x>=C.length-1?(C.push(A),x=C.length-1):(C=C.slice(0,x+1),C.push(A),x=C.length-1),{stack:C,index:x}=a(C,x),i(C,x)},p=()=>{if(!l||c)return;let w=t();if(w.stack.length===0){d();return}let E=w.index>=0&&w.index<w.stack.length?w.index:w.stack.length-1,A=r();if(w.stack.length===1&&A===w.stack[0])return;let C=w.stack[0];if(!C)return;c=!0;try{history.replaceState(history.state,document.title,C);for(let I=1;I<w.stack.length;I+=1)history.pushState(history.state,document.title,w.stack[I])}catch{c=!1;return}c=!1;let x=w.stack.length-1,b=E-x;b!==0?history.go(b):(history.replaceState(history.state,document.title,w.stack[E]),window.dispatchEvent(new PopStateEvent("popstate")))},g=()=>{!l||h||(h=!0,o(()=>{h=!1,p()}))},v=null,m=null,u=()=>{if(!l||c)return;let w=r();if(!w)return;let E=t(),A=E.stack.lastIndexOf(w);A>=0?E.index=A:(E.stack.push(w),E.index=E.stack.length-1);let C=a(E.stack,E.index);i(C.stack,C.index)},y=()=>{v&&m||(v=history.pushState,m=history.replaceState,history.pushState=function(E,A,C){let x=v==null?void 0:v.call(history,E,A,C);return f(C,!1),x},history.replaceState=function(E,A,C){let x=m==null?void 0:m.call(history,E,A,C);return f(C,!0),x},window.addEventListener("popstate",u))},_=()=>{v&&(history.pushState=v,v=null),m&&(history.replaceState=m,m=null),window.removeEventListener("popstate",u)},S=w=>{if(l===w){l&&(d(),g());return}l=w,l?(y(),d(),g()):(_(),s())};window.addEventListener("CapacitorUpdaterKeepUrlPathAfterReload",w=>{var E;let A=w,C=(E=A==null?void 0:A.detail)===null||E===void 0?void 0:E.enabled;typeof C=="boolean"?(n.__capgoKeepUrlPathAfterReload=C,S(C)):(n.__capgoKeepUrlPathAfterReload=!0,S(!0))}),S(e())}}tc();var xr=yn("CapacitorUpdater",{web:()=>Promise.resolve().then(()=>(Sd(),bd)).then(n=>new n.CapacitorUpdaterWeb)});var yr=Rs.isNativePlatform(),ex="202611232143",tx="https://bcool5869-coder.github.io/car-game-/updates/";async function nx(n){try{await xr.notifyAppReady();let e=await fetch(`${tx}${n}.json?t=${Date.now()}`,{cache:"no-store"});if(!e.ok)return;let t=await e.json();if(!t.version||!t.url||!(String(t.version)>ex))return;let{bundles:i}=await xr.list(),s=i.find(r=>r.version===t.version&&r.status==="success");s||(s=await xr.download({url:t.url,version:t.version})),await xr.next({id:s.id})}catch{}}var jo={enabled:!0,testing:!0,bannerId:"ca-app-pub-3940256099942544/6300978111"},Td=!1,wd=!1,ic=!1,Ad=!1,Rd=0,Ed=n=>({adId:jo.bannerId,adSize:Ko.BANNER,position:Zo.TOP_CENTER,margin:n,isTesting:jo.testing});function sc(){let n=ic?Rd:0,e=innerWidth<640;document.documentElement.style.setProperty("--ad",(e?n:0)+"px"),document.documentElement.style.setProperty("--ad-mid",(e?0:n)+"px")}async function Cd({app:n,onBack:e,onPauseApp:t}){if(yr&&(Yo.addListener("backButton",()=>e()),Yo.addListener("appStateChange",({isActive:i})=>{i||t()}),nx(n),jo.enabled))try{await Ii.initialize({initializeForTesting:jo.testing}),Ii.addListener($o.SizeChanged,i=>{i&&i.height&&(Rd=Math.round(i.height)),sc()}),addEventListener("resize",sc),Td=!0,Ad&&oi(!0)}catch{}}async function oi(n){if(Ad=n,!(!Td||n===ic)){ic=n,sc();try{n&&!wd?(wd=!0,await Ii.showBanner(Ed(0)),await Ii.showBanner(Ed(1))):n?await Ii.resumeBanner():await Ii.hideBanner()}catch{}}}async function Pd(n){if(!yr)return!1;try{return await od.lock({orientation:n?"landscape":"portrait"}),!0}catch{return!1}}function Ld(){yr&&Yo.exitApp()}var mt=(n,e,t)=>n<e?e:n>t?t:n,Gt=(n,e,t)=>n+(e-n)*t,Fi=(n,e,t)=>{let i=mt((t-n)/(e-n),0,1);return i*i*(3-2*i)},dn=(n,e)=>1-Math.exp(-n*e),Vt=(n,e)=>n+Math.random()*(e-n),Cc=(n,e)=>{let t=e-n;for(;t>Math.PI;)t-=Math.PI*2;for(;t<-Math.PI;)t+=Math.PI*2;return t};function da(n){return function(){n|=0,n=n+1831565813|0;let e=Math.imul(n^n>>>15,1|n);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var Rt={get(n,e){try{let t=localStorage.getItem(n);return t===null?e:JSON.parse(t)}catch{return e}},set(n,e){try{localStorage.setItem(n,JSON.stringify(e))}catch{}}},sa=8,Gd=[-6,-2,2,6];function br(n){return 60*Math.sin(n*.003)+25*Math.sin(n*.0071+1.3)+5*Math.sin(n*.011+.4)}function ki(n){return .18*Math.cos(n*.003)+.1775*Math.cos(n*.0071+1.3)+.055*Math.cos(n*.011+.4)}function Gn(n){return 18*Math.sin(n*.0015)+6*Math.sin(n*.004+2)+2*Math.sin(n*.011)}function ix(n){return .027*Math.cos(n*.0015)+.024*Math.cos(n*.004+2)+.022*Math.cos(n*.011)}function Sr(n){return Math.atan(ki(n))}var sx={x:0,z:0};function Ns(n,e,t=sx){let i=ki(n),s=Math.hypot(1,i);return t.x=br(n)+e/s,t.z=n-e*i/s,t}var Bi={s:0,u:0};function Pc(n,e){let t=ki(e),i=Math.hypot(1,t),s=(n-br(e))/i,r=e+s*t/i;return t=ki(r),i=Math.hypot(1,t),s=(n-br(r))*i,Bi.s=e+s*t/i,Bi.u=s,Bi}function mc(n,e){return .5+.22*Math.sin(n*.021+e*.013)+.15*Math.sin(n*.047-e*.031+1.7)+.08*Math.sin(n*.11+e*.09+4.1)+.05*Math.sin(n*.23-e*.19+2.2)}function Is(n,e,t){let i=Math.abs(n);return i<=sa?0:i<=10.5?-.06:-.06+-.7*Math.sin(mt((i-10.5)/6,0,1)*Math.PI)+Fi(12,70,i)*(3+30*mc(e,t))}function ci(n,e){let t=Pc(n,e);return Gn(t.s)+Is(t.u,n,e)}var Xt;try{Xt=new ir({antialias:!1,powerPreference:"default"})}catch(n){let e=document.getElementById("err");throw e.style.display="flex",e.textContent="Your browser could not start WebGL, which this game needs.",n}var fi=matchMedia("(pointer: coarse)").matches,tt={saver:Rt.get("sd-saver",!1),steer:Rt.get("sd-steer",Rt.get("sd-tilt",!1)?"tilt":"buttons"),sens:Rt.get("sd-sens",.5),road:Rt.get("sd-road","two")},rx=Math.min(window.devicePixelRatio||1,fi?1.35:1.5),gc=1,vc=!0,wr=()=>tt.saver?Math.min(window.devicePixelRatio||1,1):Math.max(.75,rx*gc);Xt.setPixelRatio(wr());Xt.setSize(innerWidth,innerHeight);Xt.toneMapping=fr;Xt.toneMappingExposure=1.05;Xt.shadowMap.enabled=!0;Xt.shadowMap.type=Dl;document.getElementById("app").appendChild(Xt.domElement);var qt=new sr,Cr=new ce(15902588);qt.fog=new Ao(Cr,50,330);qt.background=Cr;var pt=new Dt(62,innerWidth/innerHeight,.1,3500),li=new U(-.55,.14,-1).normalize(),Us=li.clone(),Lc=new dt({side:Nt,depthWrite:!1,fog:!1,uniforms:{uTop:{value:new ce(2375806)},uMid:{value:new ce(16234894)},uHorizon:{value:Cr.clone()},uSunColor:{value:new ce(16765594)},uSunDir:{value:li},uSunScale:{value:1},uMoon:{value:0}},vertexShader:`
    varying vec3 vDir;
    void main(){
      vDir = position;
      vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      gl_Position = p.xyww;
    }`,fragmentShader:`
    uniform vec3 uTop, uMid, uHorizon, uSunColor, uSunDir;
    uniform float uSunScale, uMoon;
    varying vec3 vDir;
    void main(){
      vec3 d = normalize(vDir);
      float h = d.y;
      float sd = max(dot(d, uSunDir), 0.0);
      vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.14, h));
      col = mix(col, uTop, smoothstep(0.1, 0.7, h));
      // thin warm band of clouds near the horizon
      float band = smoothstep(0.05, 0.09, h) * (1.0 - smoothstep(0.09, 0.2, h));
      float wave = 0.5 + 0.5 * sin(atan(d.z, d.x) * 9.0 + h * 40.0) * sin(atan(d.z, d.x) * 23.0);
      col = mix(col, uMid * 1.12 + vec3(0.06, 0.02, 0.04), band * wave * 0.5);
      if (h < 0.0) col = uHorizon;
      float up = smoothstep(-0.25, 0.02, uSunDir.y);       // sun glow fades once it has set
      col += uSunColor * (pow(sd, 8.0) * 0.22 + pow(sd, 64.0) * 0.35) * min(uSunScale, 1.0) * up;
      col += uSunColor * smoothstep(0.99935, 0.9997, sd) * 5.0 * uSunScale;
      float md = max(dot(d, -uSunDir), 0.0);               // moon opposite the sun
      col += vec3(0.75, 0.82, 1.0) * (smoothstep(0.99955, 0.9998, md) * 2.2 + pow(md, 300.0) * 0.12) * uMoon * min(uSunScale * 6.0, 1.0) * step(0.0, h);
      gl_FragColor = vec4(col, 1.0);
    }`}),Pr=new et(new hr(1,48,24),Lc);Pr.scale.setScalar(3e3);Pr.renderOrder=-10;Pr.frustumCulled=!1;qt.add(Pr);var Wd=new ys(Xt),fa=new sr,Ic=Lc.clone();Ic.uniforms.uSunScale.value=.06;var Xd=new et(new hr(1,32,16),Ic);Xd.scale.setScalar(50);fa.add(Xd);var Uc=new et(new Ro(40,24).rotateX(-Math.PI/2),new en({color:4866104}));Uc.position.y=-2;fa.add(Uc);var ta=Wd.fromScene(fa,.02,.1,200),Er=ta.texture,na=new Uo(11846911,7032888,1.15);qt.add(na);var fn=new Oo(16761994,3.3);fn.castShadow=!0;fn.shadow.mapSize.set(fi?1024:2048,fi?1024:2048);Object.assign(fn.shadow.camera,{left:-45,right:45,top:45,bottom:-45,near:1,far:400});fn.shadow.bias=-4e-4;fn.shadow.normalBias=.04;qt.add(fn,fn.target);var pa=new Yt;qt.add(pa);function qd(n,e,t,i,s){let a=[],o=[],l=[],c=new ce(e),h=Cr.clone(),d=da(t);for(let g=0;g<=220;g++){let v=g/220*Math.PI*2,m=.5+.28*Math.sin(v*3+t)+.14*Math.sin(v*7.3+t*2)+.08*Math.sin(v*17+t),u=i+(s-i)*m+(d()-.5)*22,y=Math.cos(v)*n,_=Math.sin(v)*n;if(a.push(y,u,_,y,-120,_),o.push(c.r,c.g,c.b,h.r,h.g,h.b),g<220){let S=g*2;l.push(S,S+1,S+2,S+1,S+3,S+2)}}let f=new ht;f.setAttribute("position",new Ze(a,3)),f.setAttribute("color",new Ze(o,3)),f.setIndex(l);let p=new et(f,new en({vertexColors:!0,fog:!1,side:vn,depthWrite:!1}));return p.frustumCulled=!1,p.userData.recolor=(g,v)=>{let m=f.attributes.color.array;for(let u=0;u<m.length;u+=6)m[u]=g.r,m[u+1]=g.g,m[u+2]=g.b,m[u+3]=v.r,m[u+4]=v.g,m[u+5]=v.b;f.attributes.color.needsUpdate=!0},p}var Dc=qd(2200,13209498,7,60,330);Dc.renderOrder=-9;var Nc=qd(1700,9332360,19,20,200);Nc.renderOrder=-8;pa.add(Dc,Nc);var Yd=new en({color:16766656,fog:!1,transparent:!0,opacity:.85,depthWrite:!1});{let n=new cr(1,1),e=da(99),t=[];for(let s=0;s<18;s++){let r=new Yt,a=e()*Math.PI*2,o=1300+e()*700;r.position.set(Math.cos(a)*o,260+e()*260,Math.sin(a)*o);for(let l=0;l<5;l++){let c=new _t;c.position.set((e()-.5)*220,(e()-.5)*16,(e()-.5)*80),c.scale.set(60+e()*70,14+e()*12,40+e()*40),r.add(c)}r.lookAt(0,r.position.y,0),r.updateMatrixWorld(!0);for(let l of r.children)t.push(n.clone().applyMatrix4(l.matrixWorld))}let i=new et(Ts(t),Yd);i.renderOrder=-7,i.frustumCulled=!1,pa.add(i)}function ox(n=!1){let s=document.createElement("canvas");s.width=512,s.height=384;let r=s.getContext("2d");r.fillStyle="#3b3c41",r.fillRect(0,0,512,384);let a=r.getImageData(0,0,512,384),o=a.data;for(let h=0;h<o.length;h+=4){let d=(Math.random()-.5)*26;o[h]+=d,o[h+1]+=d,o[h+2]+=d}r.putImageData(a,0,0);let l=h=>(h+8)/16*512;r.fillStyle="rgba(0,0,0,0.13)";for(let h of Gd)for(let d of[-.85,.85])r.fillRect(l(h+d-.35),0,.7*32,384);if(r.fillStyle="#ebe7dd",r.fillRect(l(-7.78),0,.2*32,384),r.fillRect(l(7.58),0,.2*32,384),n){r.fillStyle="#ebe7dd";for(let h of[-4,0,4])r.fillRect(l(h-.08),0,.16*32,128)}else{r.fillStyle="#efb52e",r.fillRect(l(-.24),0,.13*32,384),r.fillRect(l(.11),0,.13*32,384),r.fillStyle="#ebe7dd";for(let h of[-4,4])r.fillRect(l(h-.08),0,.16*32,128)}let c=new Ms(s);return c.wrapS=jt,c.wrapT=er,c.colorSpace=yt,c.anisotropy=Xt.capabilities.getMaxAnisotropy(),c}var rc={},$d=n=>rc[n]||(rc[n]=ox(n==="one")),_c=new ft({map:$d(tt.road),roughness:.82,metalness:0}),ax=new ft({vertexColors:!0,flatShading:!0,roughness:1}),lx=new ft({color:5914155,roughness:1,flatShading:!0}),Id=new ft({color:16777215,roughness:.9,flatShading:!0}),cx=new ft({color:9273720,roughness:1,flatShading:!0}),hx=new ft({color:4474445,roughness:.5,metalness:.7}),Zd=new ft({color:16770752,emissive:16760944,emissiveIntensity:5}),ux=new ft({color:15658734,roughness:.6}),dx=new ft({color:16747050,emissive:16742938,emissiveIntensity:2.4}),fx=new kn(.18,.28,2,6).translate(0,1,0),px=Ts([new Ri(2,4.2,7).translate(0,3.6,0),new Ri(1.45,3.2,7).translate(0,5.6,0),new Ri(.9,2.2,7).translate(0,7.2,0)]),mx=new cr(2.3,0).translate(0,3.9,0),gx=new Po(1,0),vx=Ts([new kn(.1,.14,7.6,8).translate(0,3.8,0),new Xe(2.3,.12,.14).translate(-1.1,7.5,0),new Xe(.7,.16,.36).translate(-2,7.38,0)]),_x=new Xe(.55,.06,.28).translate(-2,7.28,0),xx=new Xe(.12,1,.12).translate(0,.5,0),yx=new Xe(.14,.14,.14).translate(0,.9,0),Mx=new ce(9272680),bx=new ce(5400876),Sx=new ce(6985531),wx=new ce(10990678),Ex=new ce(4155950),Tx=new ce(9667702);function Ax(n,e,t,i,s){let r=Math.abs(n);return r<=10.6?(s.copy(Mx).offsetHSL(0,0,Math.sin(t*1.7+i*2.3)*.04),s):(s.copy(Sx).lerp(wx,Fi(.3,.8,mc(t*2.3,i*2.3))),s.lerp(Ex,Fi(.65,.25,mc(i*1.3+50,t*1.1))*.55),e>14&&s.lerp(Tx,Fi(14,28,e)*.85),r<16.5&&s.lerp(bx,.45),s)}var Vn=120,Ud=4,Dd=2,xc=[8,10,11.5,13,15,17.5,20.5,24,28,33,39,46,55,66,80,98,120,145,175,210,250,295,340],Nd=[...xc.map(n=>-n).reverse(),...xc],Oi=new Map,ra=new nt,oa=new En,aa=new U,la=new U,ca=new gs,Hn=new ce;function ai(n,e,t,i=!0){if(!t.length)return null;let s=new or(n,e,t.length);return t.forEach((r,a)=>{s.setMatrixAt(a,r.m),r.c&&s.setColorAt(a,r.c)}),s.castShadow=i,s.receiveShadow=!0,s.computeBoundingSphere&&s.computeBoundingSphere(),s}function Cs(n,e,t,i,s,r=s,a=s,o=0,l=0){return ca.set(o,i,l),oa.setFromEuler(ca),aa.set(n,e,t),la.set(s,r,a),new nt().compose(aa,oa,la)}function Rx(n){let e=new Yt,t=-n*Vn;{let p=Vn/Ud+1,g=Nd.length,v=new Float32Array(p*g*3),m=new Float32Array(p*g*3),u=0;for(let E=0;E<p;E++){let A=t-E*Ud,C=ki(A),x=Math.hypot(1,C),b=br(A),I=Gn(A);for(let k=0;k<g;k++){let X=Nd[k],L=b+X/x,N=A-X*C/x,V=Is(X,L,N);v[u]=L,v[u+1]=I+V,v[u+2]=N,Ax(X,V,L,N,Hn),m[u]=Hn.r,m[u+1]=Hn.g,m[u+2]=Hn.b,u+=3}}let y=[],_=xc.length-1;for(let E=0;E<p-1;E++)for(let A=0;A<g-1;A++){if(A===_)continue;let C=E*g+A,x=C+1,b=C+g,I=b+1;y.push(C,x,b,x,I,b)}let S=new ht;S.setAttribute("position",new it(v,3)),S.setAttribute("color",new it(m,3)),S.setIndex(y),S.computeVertexNormals();let w=new et(S,ax);w.receiveShadow=!0,e.add(w)}{let p=Vn/Dd+1,g=new Float32Array(p*2*3),v=new Float32Array(p*2*2);for(let _=0;_<p;_++){let S=t-_*Dd,w=ki(S),E=Math.hypot(1,w),A=br(S),C=Gn(S);for(let x=0;x<2;x++){let b=x===0?-sa:sa,I=_*2+x;g[I*3]=A+b/E,g[I*3+1]=C+.005,g[I*3+2]=S-b*w/E,v[I*2]=x,v[I*2+1]=S/12}}let m=[];for(let _=0;_<p-1;_++){let S=_*2,w=S+1,E=S+2,A=S+3;m.push(S,w,E,w,A,E)}let u=new ht;u.setAttribute("position",new it(g,3)),u.setAttribute("uv",new it(v,2)),u.setIndex(m),u.computeVertexNormals();let y=new et(u,_c);y.receiveShadow=!0,e.add(y)}let i=da((n*2654435761^2654435769)>>>0),s=[],r=[],a=[],o=[],l=[],c=[],h=[],d=[],f=[];for(let p=0;p<80;p++){let g=t-i()*Vn,m=(i()<.5?-1:1)*(14.5+Math.pow(i(),1.5)*230),u=Ns(g,m),y=Gn(g)+Is(m,u.x,u.z)-.15,_=.75+i()*.9,S=i()*Math.PI*2,w=i()<.62;Math.abs(m)<70&&f.push({x:u.x,z:u.z,r:.32*_}),s.push({m:Cs(u.x,y,u.z,S,_,_*(w?1:1.25),_)}),w?(Hn.setHSL(.27+i()*.08,.45+i()*.2,.2+i()*.1),r.push({m:Cs(u.x,y,u.z,S,_),c:Hn.clone()})):(i()<.3?Hn.setHSL(.05+i()*.07,.75,.42+i()*.1):Hn.setHSL(.2+i()*.08,.5+i()*.2,.3+i()*.1),a.push({m:Cs(u.x,y,u.z,S,_,_*(.85+i()*.4),_),c:Hn.clone()}))}for(let p=0;p<12;p++){let g=t-i()*Vn,m=(i()<.5?-1:1)*(12+Math.pow(i(),1.3)*150),u=Ns(g,m),y=Gn(g)+Is(m,u.x,u.z),_=.5+i()*2.2;Math.abs(m)<70&&_>.9&&f.push({x:u.x,z:u.z,r:_*.85}),o.push({m:Cs(u.x,y-_*.3,u.z,i()*6,_*(1+i()*.6),_*(.6+i()*.5),_,i(),i())})}for(let p=Math.ceil(-t/70);p*70<-t+Vn;p++){let g=-p*70,v=p%2===0?1:-1,m=v*10.3,u=Ns(g,m),y=Gn(g)+Is(m,u.x,u.z),_=Sr(g)+(v<0?Math.PI:0),S=Cs(u.x,y,u.z,_,1);l.push({m:S}),c.push({m:S}),f.push({x:u.x,z:u.z,r:.18})}for(let p=Math.ceil(-t/25);p*25<-t+Vn;p++){let g=-p*25;for(let v of[-1,1]){let m=v*9.4,u=Ns(g,m),y=Gn(g)+Is(m,u.x,u.z),_=Cs(u.x,y,u.z,Sr(g),1);h.push({m:_}),d.push({m:_})}}for(let p of[ai(fx,lx,s),ai(px,Id,r),ai(mx,Id,a),ai(gx,cx,o),ai(vx,hx,l),ai(_x,Zd,c,!1),ai(xx,ux,h),ai(yx,dx,d,!1)])p&&e.add(p);return e.userData.obstacles=f,qt.add(e),e}function Kd(n){qt.remove(n),n.children.forEach(e=>{e.isInstancedMesh?e.dispose():e.geometry.dispose()})}function Oc(n=!1){let e=Math.floor(-Me.z/Vn);for(let[i,s]of Oi)(i<e-2||i>e+4)&&(Kd(s),Oi.delete(i));let t=0;for(let i=e-1;i<=e+3&&!(!Oi.has(i)&&(Oi.set(i,Rx(i)),!n&&++t>=1));i++);}var Jd=new ft({color:922912,metalness:.9,roughness:.18,envMap:Er,envMapIntensity:1.4}),jd=new ft({vertexColors:!0,metalness:.5,roughness:.45,envMap:Er}),Cx=new ft({color:1776672,roughness:.6,metalness:.3}),Qd=new ft({color:14540253,metalness:1,roughness:.15,envMap:Er}),ef=new ft({color:16777215,emissive:16773852,emissiveIntensity:3.2}),Px=(()=>{let n=document.createElement("canvas");n.width=n.height=128;let e=n.getContext("2d"),t=e.createRadialGradient(64,64,4,64,64,64);return t.addColorStop(0,"rgba(0,0,0,0.75)"),t.addColorStop(.6,"rgba(0,0,0,0.4)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),new Ms(n)})(),Lx=new en({map:Px,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}),oc={};function Ix(n,e){let t=n+"_"+e;if(oc[t])return oc[t];let i=(r,a)=>{r.index&&(r=r.toNonIndexed()),r.deleteAttribute("uv");let o=new ce(a),l=r.attributes.position.count,c=new Float32Array(l*3);for(let h=0;h<l;h++)c[h*3]=o.r,c[h*3+1]=o.g,c[h*3+2]=o.b;return r.setAttribute("color",new it(c,3)),r},s=[i(new kn(n,n,e,20).rotateZ(Math.PI/2),1644827)];s.push(i(new kn(n*.64,n*.64,e+.02,14).rotateZ(Math.PI/2),12172740));for(let r=0;r<5;r++)s.push(i(new Xe(e+.04,n*1.15,n*.16).rotateX(r/5*Math.PI),14014685));return oc[t]=Ts(s)}var Ux={sport:{w:1.95,l:4.5,bodyH:.56,bodyY:.6,cabin:[1.52,.5,2,.35],roofY:0,wheelR:.38,wheelZ:[-1.45,1.45],mass:1},sedan:{w:1.85,l:4.5,bodyH:.62,bodyY:.64,cabin:[1.62,.56,2.35,.15],wheelR:.36,wheelZ:[-1.4,1.4],mass:1.1},suv:{w:2,l:4.8,bodyH:.85,bodyY:.82,cabin:[1.86,.62,2.9,.35],wheelR:.44,wheelZ:[-1.55,1.55],mass:1.6},truck:{w:2.4,l:8.2,truck:!0,wheelR:.52,wheelZ:[-2.8,1.2,2.6],mass:4}},Dx={paint:!0,cargo:!0,dark:!0,glass:!0,head:!1,tail:!1,chrome:!1},ac={};function Nx(n,e){let t={},i=(r,a,o,l,c)=>{let h=r.clone().translate(o,l,c);(t[a]||(t[a]=[])).push(h.index?h.toNonIndexed():h)},s=n.l/2;if(n.truck)i(new Tn(2.3,1.7,2.1,3,.18),"paint",0,1.45,-s+1.15),i(new Tn(2.1,.75,.08,2,.03),"glass",0,1.75,-s+.08),i(new Xe(2.3,.4,.15),"dark",0,.62,-s+.05),i(new Tn(2.45,2.9,5.8,2,.08),"cargo",0,2.05,s-2.95),i(new Xe(2,.35,n.l-.6),"dark",0,.62,.2),i(new Xe(.4,.14,.04),"head",-.85,.9,-s-.01),i(new Xe(.4,.14,.04),"head",.85,.9,-s-.01),i(new Xe(.3,.2,.04),"tail",-1,.75,s+.06),i(new Xe(.3,.2,.04),"tail",1,.75,s+.06);else{let[r,a,o,l]=n.cabin;i(new Tn(n.w,n.bodyH,n.l,4,.2),"paint",0,n.bodyY,0),i(new Tn(r,a,o,4,.2),"glass",0,n.bodyY+n.bodyH/2+a/2-.06,l),i(new Tn(r-.08,.08,o*.7,2,.03),"paint",0,n.bodyY+n.bodyH/2+a-.08,l+.05),i(new Xe(r+.02,a*.7,.12),"paint",0,n.bodyY+n.bodyH/2+a/2-.08,l+o/2-.25);let c=-s-.005,h=s+.005;if(i(new Xe(.46,.12,.06),"head",-n.w/2+.38,n.bodyY+.1,c),i(new Xe(.46,.12,.06),"head",n.w/2-.38,n.bodyY+.1,c),i(new Xe(n.w*.5,.18,.06),"dark",0,n.bodyY-.08,c),e){i(new Xe(n.w-.25,.1,.06),"tail",0,n.bodyY+.15,h),i(new Xe(n.w-.2,.2,.06),"dark",0,n.bodyY-.12,h),i(new Xe(.08,.26,.12),"dark",-.6,n.bodyY+n.bodyH/2+.12,s-.3),i(new Xe(.08,.26,.12),"dark",.6,n.bodyY+n.bodyH/2+.12,s-.3),i(new Tn(1.9,.06,.42,2,.02),"paint",0,n.bodyY+n.bodyH/2+.27,s-.25),i(new Xe(.05,.12,n.l*.6),"dark",-n.w/2-.01,n.bodyY-.2,0),i(new Xe(.05,.12,n.l*.6),"dark",n.w/2+.01,n.bodyY-.2,0);let d=new kn(.07,.07,.2,10).rotateX(Math.PI/2);i(d,"chrome",-.45,n.bodyY-.18,h+.05),i(d,"chrome",.45,n.bodyY-.18,h+.05)}else i(new Xe(.4,.14,.06),"tail",-n.w/2+.33,n.bodyY+.12,h),i(new Xe(.4,.14,.06),"tail",n.w/2-.33,n.bodyY+.12,h)}return Object.entries(t).map(([r,a])=>({role:r,geo:Ts(a)}))}function tf(n,e,t=!1){let i=Ux[n],s=new Yt,r=new Yt;s.add(r);let a=t?new Io({color:e,metalness:.55,roughness:.32,clearcoat:1,clearcoatRoughness:.06,envMap:Er,envMapIntensity:1.3}):new ft({color:e,metalness:.45,roughness:.38,envMap:Er,envMapIntensity:1}),o=new ft({color:5570560,emissive:16715808,emissiveIntensity:1.6}),l=i.truck?new ft({color:[15921906,14275783,10466503][Math.floor(Math.random()*3)],roughness:.6}):null,c={paint:a,glass:Jd,dark:Cx,head:ef,tail:o,chrome:Qd,cargo:l},h=n+(t?":player":""),d=ac[h]||(ac[h]=Nx(i,t));for(let{role:y,geo:_}of d){let S=new et(_,c[y]);S.castShadow=Dx[y],r.add(S)}let f=i.l/2,p=Ix(i.wheelR,i.truck?.4:.3),g=[],v=(i.truck?2.3:i.w)/2-.12;i.wheelZ.forEach((y,_)=>{for(let S of[-1,1]){let w=new Yt;w.position.set(S*v,i.wheelR,y);let E=new Yt,A=new et(p,jd);A.castShadow=t,E.add(A),w.add(E),s.add(w),g.push({pivot:w,spin:E,front:_===0})}});let m=new et(new _s(i.w+1.1,i.l+1.4).rotateX(-Math.PI/2),Lx);m.position.y=.04,s.add(m);let u=null;if(t){let y=new en({color:new ce(1.6,2.6,6),transparent:!0,opacity:.9,blending:us,depthWrite:!1,toneMapped:!1}),_=new Ri(.09,.9,10).rotateX(-Math.PI/2).translate(0,0,.45);u=[-.45,.45].map(S=>{let w=new et(_,y);return w.position.set(S,i.bodyY-.18,f+.12),w.visible=!1,r.add(w),w})}return{root:s,body:r,wheels:g,tail:o,paint:a,flames:u,T:i,hw:(i.truck?2.45:i.w)/2,hl:i.l/2+.05,wheelR:i.wheelR}}var zs=tf("sport",14164015,!0);qt.add(zs.root);var Me={};function Ox(){let n=Ns(0,2);Object.assign(Me,{x:n.x,z:n.z,y:Gn(0),heading:Sr(0),vx:0,vz:0,fwd:0,lat:0,steer:0,yawRate:0,accel:0,nitro:1,nitroOn:!1,health:3,invuln:0,s:0,u:2,offroad:!1,maxProg:0,score:0,topSpeed:0,nearMisses:0,combo:0,comboTimer:0,nextHeart:2500,drift:0,driftCool:0,pitch:0,roll:0,bodyRoll:0,bodyPitch:0,mult:1,rpm:900,gear:1,slip:0})}var Od=[15329770,2039844,2576278,12003874,14211288,7172729,3108176,13936428,9212828,4927368,15755818,2002856],An=[],nf=24;function Fx(){let n=Math.random();return n<.5?"sedan":n<.82?"suv":"truck"}for(let n=0;n<nf;n++){let e=Fx(),t=tf(e,Od[n%Od.length]);t.root.visible=!1,qt.add(t.root),An.push({car:t,type:e,active:!1,s:0,u:0,dir:-1,speed:0,x:0,z:0,y:0,heading:0,vx:0,vz:0,hit:!1,yawRate:0,prevLz:0,near:!1,mass:t.T.mass})}function sf(n,e,t){for(let i=0;i<10;i++){let s=Gd[Math.floor(Math.random()*4)],r=Me.z-Vt(e,t),a=!0;for(let c of An)if(c!==n&&c.active&&Math.abs(c.u-s)<1&&Math.abs(c.s-r)<32){a=!1;break}if(!a)continue;n.active=!0,n.hit=!1,n.near=!1,n.yawRate=0;let o=tt.road==="one";n.s=r,n.u=s,n.dir=s>0||o?-1:1;let l=n.type==="truck";return o?n.baseSpeed={"-6":Vt(31,37),"-2":Vt(27,33),2:Vt(23,29),6:Vt(17,23)}[s]:n.baseSpeed=s>0?s>4?Vt(17,23):Vt(25,32):Vt(22,31),l&&(n.baseSpeed*=.85),n.speed=n.baseSpeed,n.car.root.visible=!0,rf(n),n.prevLz=null,!0}return n.active=!1,n.car.root.visible=!1,!1}function rf(n){let e=Ns(n.s,n.u);n.x=e.x,n.z=e.z,n.heading=Sr(n.s)+(n.dir>0?Math.PI:0);let t=-Math.sin(n.heading),i=-Math.cos(n.heading);n.vx=t*n.speed,n.vz=i*n.speed}function of(){An.forEach(n=>{n.active=!1,n.car.root.visible=!1});for(let n=0;n<12;n++)sf(An[n],90,650)}function Bx(n){let e=Math.max(0,-Me.z),t=Math.min(nf,12+Math.floor(e/700)),i=0;for(let s of An)s.active&&i++;for(let s of An){if(!s.active){i<t&&sf(s,300,620)&&i++;continue}if(s.hit){let l=Math.hypot(s.vx,s.vz);if(l>.01){let c=Math.max(0,l-7*n)/l;s.vx*=c,s.vz*=c}s.x+=s.vx*n,s.z+=s.vz*n,s.heading+=s.yawRate*n,s.yawRate*=Math.exp(-1.8*n),s.y=ci(s.x,s.z),s.pitch=0,s.s=Bi.s}else{let l=s.baseSpeed;for(let c of An){if(c===s||!c.active)continue;let h=c.hit?Pc(c.x,c.z).u:c.u;if(Math.abs(h-s.u)>2.2)continue;let d=(c.hit?Bi.s:c.s)-s.s,f=s.dir<0?-d:d;if(f>0&&f<22){let p=c.hit?0:c.speed;l=Math.min(l,f<9?0:p)}}s.speed=Gt(s.speed,l,dn(2.5,n)),s.s+=s.dir*s.speed*n,rf(s),s.y=Gn(s.s),s.pitch=Math.atan(ix(s.s))*-s.dir}let r=s.hit?Math.hypot(s.vx,s.vz):s.speed;for(let l of s.car.wheels)l.spin.rotation.x-=r/s.car.wheelR*n;s.car.root.position.set(s.x,s.y,s.z),s.car.root.rotation.set(s.pitch,s.heading,0,"YXZ");let a=s.x-Me.x,o=s.z-Me.z;s.car.root.visible=a*a+o*o<350*350,(s.z>Me.z+70||s.z<Me.z-900)&&(s.active=!1,s.car.root.visible=!1,i--)}}var Fc=900,ks=new or(new _s(.26,1).rotateX(-Math.PI/2),new en({color:789516,transparent:!0,opacity:.5,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4}),Fc);ks.frustumCulled=!1;qt.add(ks);var lc=0,Fs=[null,null];function zx(){ra.makeScale(0,0,0);for(let n=0;n<Fc;n++)ks.setMatrixAt(n,ra);ks.instanceMatrix.needsUpdate=!0,Fs[0]=Fs[1]=null}function kx(n,e,t){let i=Fs[n];if(!i){Fs[n]={x:e,z:t};return}let s=e-i.x,r=t-i.z,a=Math.hypot(s,r);if(a<.35)return;if(a>4){Fs[n]={x:e,z:t};return}let o=(e+i.x)/2,l=(t+i.z)/2;ca.set(0,Math.atan2(s,r),0),oa.setFromEuler(ca),aa.set(o,ci(o,l)+.03,l),la.set(1,1,a+.05),ra.compose(aa,oa,la),ks.setMatrixAt(lc,ra),lc=(lc+1)%Fc,ks.instanceMatrix.needsUpdate=!0,i.x=e,i.z=t}var Vs=260,zi=new ht,ia=new Float32Array(Vs*3),af=new Float32Array(Vs),yc=new Float32Array(Vs);zi.setAttribute("position",new it(ia,3));zi.setAttribute("aSize",new it(af,1));zi.setAttribute("aAlpha",new it(yc,1));var Hx=(()=>{let n=document.createElement("canvas");n.width=n.height=64;let e=n.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.5,"rgba(255,255,255,.45)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new Ms(n)})(),lf=new dt({transparent:!0,depthWrite:!1,uniforms:{map:{value:Hx},uScale:{value:400},uColor:{value:new ce(13221299)}},vertexShader:`
    attribute float aSize; attribute float aAlpha; varying float vAlpha; uniform float uScale;
    void main(){ vAlpha = aAlpha; vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = min(aSize * uScale / max(-mv.z, 0.1), 180.0); gl_Position = projectionMatrix * mv; }`,fragmentShader:`
    uniform sampler2D map; uniform vec3 uColor; varying float vAlpha;
    void main(){ vec4 t = texture2D(map, gl_PointCoord); gl_FragColor = vec4(uColor, t.a * vAlpha); }`}),cf=new lr(zi,lf);cf.frustumCulled=!1;qt.add(cf);var Bc=Array.from({length:Vs},()=>({life:0,max:1,x:0,y:0,z:0,vx:0,vy:0,vz:0,size:1})),cc=0,ha=!1;function Mc(n,e,t,i,s,r){let a=Bc[cc];cc=(cc+1)%Vs,ha=!0,a.life=a.max=Vt(.7,1.3),a.x=n+Vt(-.2,.2),a.y=e+.25,a.z=t+Vt(-.2,.2),a.vx=i*.25+Vt(-1,1),a.vy=Vt(.6,1.6),a.vz=s*.25+Vt(-1,1),a.size=Vt(.5,.8)*(.7+r*.5)}var hc=0;function hf(n){if(!(hc===0&&ha===!1)){ha=!1,hc=0;for(let e=0;e<Vs;e++){let t=Bc[e];if(t.life>0){t.life-=n,hc++,t.x+=t.vx*n,t.y+=t.vy*n,t.z+=t.vz*n,t.vx*=.96,t.vz*=.96;let i=1-t.life/t.max;ia[e*3]=t.x,ia[e*3+1]=t.y,ia[e*3+2]=t.z,af[e]=t.size*(1+i*3),yc[e]=Math.sin(Math.min(1,i*4)*Math.PI/2)*(1-i)*.32}else yc[e]=0}zi.attributes.position.needsUpdate=!0,zi.attributes.aSize.needsUpdate=!0,zi.attributes.aAlpha.needsUpdate=!0}}function Vx(){Bc.forEach(n=>n.life=0),ha=!0}var bc=class{constructor(){this.ctx=null,this.muted=Rt.get("sd-muted",!1)}init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}let e=window.AudioContext||window.webkitAudioContext;if(!e)return;let t=this.ctx=new e;this.master=t.createGain(),this.master.gain.value=this.muted?0:.55;let i=t.createDynamicsCompressor();this.master.connect(i).connect(t.destination),this.engF=t.createBiquadFilter(),this.engF.type="lowpass",this.engF.frequency.value=700,this.engF.Q.value=3,this.engG=t.createGain(),this.engG.gain.value=0,this.engF.connect(this.engG).connect(this.master),this.o1=t.createOscillator(),this.o1.type="sawtooth",this.o2=t.createOscillator(),this.o2.type="sawtooth",this.o2.detune.value=14,this.o3=t.createOscillator(),this.o3.type="square";let s=t.createGain();s.gain.value=.4,this.o1.connect(this.engF),this.o2.connect(this.engF),this.o3.connect(s).connect(this.engF),[this.o1,this.o2,this.o3].forEach(l=>{l.frequency.value=30,l.start()});let r=t.createBuffer(1,t.sampleRate*2,t.sampleRate),a=r.getChannelData(0);for(let l=0;l<a.length;l++)a[l]=Math.random()*2-1;this.noise=r;let o=(l,c,h)=>{let d=t.createBufferSource();d.buffer=r,d.loop=!0;let f=t.createBiquadFilter();f.type=l,f.frequency.value=c,f.Q.value=h;let p=t.createGain();return p.gain.value=0,d.connect(f).connect(p).connect(this.master),d.start(),p};this.skidG=o("bandpass",1100,1.8),this.windG=o("lowpass",420,.7),this.nosG=o("highpass",2500,.5)}update(e,t,i,s,r,a){if(!this.ctx)return;let o=this.ctx.currentTime,l=e/60*2;this.o1.frequency.setTargetAtTime(l,o,.03),this.o2.frequency.setTargetAtTime(l*1.003,o,.03),this.o3.frequency.setTargetAtTime(l*.5,o,.03),this.engF.frequency.setTargetAtTime(350+e*.22+t*900,o,.05),this.engG.gain.setTargetAtTime(a?.09+t*.11:.05,o,.06),this.skidG.gain.setTargetAtTime(a?mt((i-4)/7,0,1)*.32:0,o,.05),this.windG.gain.setTargetAtTime(mt(s/85,0,1)*.35,o,.1),this.nosG.gain.setTargetAtTime(r?.08:0,o,.05)}crash(e){if(!this.ctx)return;let t=this.ctx,i=t.currentTime,s=t.createBufferSource();s.buffer=this.noise;let r=t.createBiquadFilter();r.type="lowpass",r.frequency.setValueAtTime(2500,i),r.frequency.exponentialRampToValueAtTime(150,i+.6);let a=t.createGain();a.gain.setValueAtTime(mt(e/25,.25,1)*.9,i),a.gain.exponentialRampToValueAtTime(.001,i+.7),s.connect(r).connect(a).connect(this.master),s.start(i),s.stop(i+.8);let o=t.createOscillator();o.type="triangle",o.frequency.setValueAtTime(90,i),o.frequency.exponentialRampToValueAtTime(35,i+.4);let l=t.createGain();l.gain.setValueAtTime(.6,i),l.gain.exponentialRampToValueAtTime(.001,i+.45),o.connect(l).connect(this.master),o.start(i),o.stop(i+.5)}whoosh(){if(!this.ctx)return;let e=this.ctx,t=e.currentTime,i=e.createBufferSource();i.buffer=this.noise;let s=e.createBiquadFilter();s.type="bandpass",s.Q.value=2,s.frequency.setValueAtTime(400,t),s.frequency.exponentialRampToValueAtTime(2400,t+.25),s.frequency.exponentialRampToValueAtTime(300,t+.5);let r=e.createGain();r.gain.setValueAtTime(1e-4,t),r.gain.exponentialRampToValueAtTime(.5,t+.15),r.gain.exponentialRampToValueAtTime(.001,t+.5),i.connect(s).connect(r).connect(this.master),i.start(t),i.stop(t+.55);let a=e.createOscillator();a.type="sine",a.frequency.setValueAtTime(660,t+.05),a.frequency.exponentialRampToValueAtTime(1320,t+.2);let o=e.createGain();o.gain.setValueAtTime(1e-4,t),o.gain.exponentialRampToValueAtTime(.12,t+.08),o.gain.exponentialRampToValueAtTime(.001,t+.35),a.connect(o).connect(this.master),a.start(t),a.stop(t+.4)}setMuted(e){this.muted=e,Rt.set("sd-muted",e),this.master&&this.master.gain.setTargetAtTime(e?0:.55,this.ctx.currentTime,.05)}},gt=new bc,xt={gas:!1,brake:!1,left:!1,right:!1,hand:!1,nitro:!1},uf={ArrowUp:"gas",KeyW:"gas",ArrowDown:"brake",KeyS:"brake",ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",Space:"hand",ShiftLeft:"nitro",ShiftRight:"nitro",KeyN:"nitro"};addEventListener("keydown",n=>{let e=uf[n.code];if(e&&(xt[e]=!0,n.preventDefault()),!n.repeat){if(zc()){n.code==="Escape"&&Lr();return}n.code==="Enter"&&(Se==="menu"?va():Se==="over"&&Tc()),n.code==="KeyC"&&(sn=(sn+1)%3,Rt.set("sd-cam",sn)),n.code==="KeyM"&&(gt.setMuted(!gt.muted),vf()),n.code==="KeyR"&&Se==="over"&&Tc(),(n.code==="KeyP"||n.code==="Escape")&&pi()}});addEventListener("keyup",n=>{let e=uf[n.code];e&&(xt[e]=!1)});addEventListener("blur",()=>{for(let n in xt)xt[n]=!1;Se==="play"&&pi()});var Gx={left:"left",right:"right",gas:"gas",brake:"brake",nitro:"nitro"};document.querySelectorAll("#touch button").forEach(n=>{let e=Gx[n.dataset.k],t=s=>{s.preventDefault(),xt[e]=!0,n.classList.add("on"),gt.init()},i=s=>{s.preventDefault(),xt[e]=!1,n.classList.remove("on")};n.addEventListener("pointerdown",t),n.addEventListener("pointerup",i),n.addEventListener("pointercancel",i),n.addEventListener("pointerleave",i)});document.getElementById("pausebtn").addEventListener("click",pi);document.getElementById("setbtn").addEventListener("click",()=>{Se==="play"&&pi(),Se==="paused"&&df()});var $t=n=>document.getElementById(n),Bs=null;function ma(){let n={steer:tt.steer,road:tt.road,cam:String(sn),gfx:tt.saver?"saver":"best",sound:gt.muted?"off":"on"};document.querySelectorAll("#settings .seg").forEach(e=>{e.querySelectorAll("button").forEach(t=>{let i=t.dataset.v===n[e.dataset.set];t.classList.toggle("on",i),t.setAttribute("aria-pressed",i)})}),$t("sens").value=Math.round(tt.sens*10),$t("sensrow").hidden=tt.steer!=="tilt",$t("roadnote").textContent=tt.road==="two"?"Oncoming traffic in the left lanes":"All traffic drives your way"}function df(){Bs=["menu","pause","over"].find(e=>!$t(e).classList.contains("hidden"))||null,Bs&&$t(Bs).classList.add("hidden"),ma(),$t("settings").classList.remove("hidden");let n=$t("settings").querySelector(".seg button.on");n&&!fi&&n.focus()}function Lr(){$t("settings").classList.add("hidden"),Bs&&$t(Bs).classList.remove("hidden"),Bs=null,document.activeElement&&document.activeElement.blur&&document.activeElement.blur()}var zc=()=>!$t("settings").classList.contains("hidden");function Wx(n){tt.road=n,Rt.set("sd-road",n),_c.map=$d(n),_c.needsUpdate=!0,of()}document.querySelectorAll("[data-open-settings]").forEach(n=>n.addEventListener("click",()=>{gt.init(),df()}));$t("setdone").addEventListener("click",Lr);$t("setclose").addEventListener("click",Lr);$t("settings").addEventListener("click",n=>{n.target.id==="settings"&&Lr()});$t("sens").addEventListener("input",n=>{tt.sens=n.target.value/10,Rt.set("sd-sens",tt.sens)});document.querySelectorAll("#settings .seg button").forEach(n=>n.addEventListener("click",()=>{let e=n.parentElement.dataset.set,t=n.dataset.v;e==="steer"?(tt.steer=t,Rt.set("sd-steer",t),t==="tilt"?kc():ga(!1)):e==="road"?t!==tt.road&&Wx(t):e==="cam"?(sn=+t,Rt.set("sd-cam",sn)):e==="gfx"?(tt.saver=t==="saver",Rt.set("sd-saver",tt.saver),ua()):e==="sound"&&t==="off"!==gt.muted&&gt.setMuted(t==="off"),ma()}));var Fd=0;function Sc(n,e){let t=document.getElementById("toast");t.innerHTML=n+(e?`<small>${e}</small>`:""),t.classList.add("on"),clearTimeout(Fd),Fd=setTimeout(()=>t.classList.remove("on"),2600)}var wc=()=>innerWidth>innerHeight;async function ff(){let n=document.documentElement,e=!wc();if(yr)return await Pd(e),!0;if(e){try{document.fullscreenElement||(n.requestFullscreen?await n.requestFullscreen({navigationUI:"hide"}):n.webkitRequestFullscreen&&n.webkitRequestFullscreen())}catch{}try{return await screen.orientation.lock("landscape"),!0}catch{return Sc("TURN YOUR PHONE SIDEWAYS","If it stays upright, switch off rotation lock"),!1}}else{try{screen.orientation.unlock()}catch{}try{document.fullscreenElement&&await document.exitFullscreen()}catch{}return wc()&&Sc("TURN YOUR PHONE UPRIGHT"),!0}}document.getElementById("rotbtn").addEventListener("click",()=>{gt.init(),ff()});document.getElementById("sidewaysbtn").addEventListener("click",async()=>{gt.init(),wc()||await ff(),va()});var Wt={on:!1,live:!1,value:0,timer:0};function Xx(){return(((screen.orientation&&screen.orientation.angle)??window.orientation??0)%360+360)%360}function Bd(n){if(n.beta===null||n.gamma===null)return;let e=Xx(),t;e===90?t=-n.beta:e===270?t=n.beta:e===180?t=n.gamma:t=-n.gamma;let i=2.5,s=Gt(36,12,tt.sens),r=Math.abs(t);Wt.value=r<i?0:Math.sign(t)*mt((r-i)/(s-i),0,1),Wt.live||(Wt.live=!0,clearTimeout(Wt.timer))}function ga(n){Wt.on=n,Wt.live=!1,Wt.value=0,document.getElementById("touch").classList.toggle("tilt",n),clearTimeout(Wt.timer),n?(addEventListener("deviceorientation",Bd),Wt.timer=setTimeout(()=>{Wt.live||(ga(!1),tt.steer="buttons",Rt.set("sd-steer","buttons"),ma(),Sc("TILT NOT AVAILABLE","This browser blocks the motion sensor, so the arrow buttons are back"))},1800)):removeEventListener("deviceorientation",Bd)}async function kc(){if(Wt.on)return;let n=window.DeviceOrientationEvent;if(n&&typeof n.requestPermission=="function")try{await n.requestPermission()}catch{}ga(!0)}var qx=()=>!!(window.DeviceOrientationEvent&&typeof DeviceOrientationEvent.requestPermission=="function");fi&&tt.steer==="tilt"&&!qx()&&ga(!0);document.getElementById("startbtn").addEventListener("click",va);document.getElementById("restartbtn").addEventListener("click",Tc);document.getElementById("resumebtn").addEventListener("click",pi);var Oe=n=>document.getElementById(n),rt={score:Oe("score"),dist:Oe("dist"),mult:Oe("mult"),speed:Oe("speed"),gear:Oe("gear"),arc:Oe("arc"),nitro:Oe("nitro"),hearts:Oe("hearts"),oncoming:Oe("oncoming"),drift:Oe("drift"),wrong:Oe("wrongway"),popups:Oe("popups"),vignette:Oe("vignette"),speedfx:Oe("speedfx")},Yx='<svg class="heart" viewBox="0 0 24 24"><path fill="#ff4d6d" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.1 5.3 3 1.7-1.9 3.2-3 5.3-3 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>';rt.hearts.innerHTML=Yx.repeat(3);function Hc(){[...rt.hearts.children].forEach((n,e)=>n.classList.toggle("lost",e>=Me.health))}function Tr(n,e,t=""){let i=document.createElement("div");for(i.className="popup "+t,i.innerHTML=n+(e?`<small>${e}</small>`:"");rt.popups.children.length>=3;)rt.popups.firstChild.remove();[...rt.popups.children].forEach(s=>{s.style.top=(parseFloat(s.style.top)||0)-56+"px"}),i.style.top="0px",rt.popups.appendChild(i),setTimeout(()=>i.remove(),1300)}var Rn={};function Ps(n,e,t){Rn[n]!==t&&(Rn[n]=t,e.textContent=t)}function Ec(n,e,t,i){Rn[n]!==i&&(Rn[n]=i,e.style[t]=i)}function Qo(n,e,t,i){Rn[n]!==i&&(Rn[n]=i,e.classList.toggle(t,i))}var zd=1;function $x(){let n=Math.abs(Me.fwd)*3.6,e=Math.round(n);Ps("speed",rt.speed,String(e)),Rn.arc!==e&&(Rn.arc=e,rt.arc.setAttribute("stroke-dasharray",`${(377*mt(n/320,0,1)).toFixed(1)} 503`)),Ps("gear",rt.gear,Me.fwd<-.5?"R":n<1?"N":String(Me.gear)),Ps("score",rt.score,Math.floor(Me.score).toLocaleString("en-US")),Ps("dist",rt.dist,(Me.maxProg/1e3).toFixed(2)+" km"),Ps("mult",rt.mult,"x"+Me.mult),Me.mult!==zd&&(rt.mult.classList.add("pop"),setTimeout(()=>rt.mult.classList.remove("pop"),200),zd=Me.mult),Ec("nitro",rt.nitro,"width",Math.round(Me.nitro*100)+"%"),Qo("nitroOn",rt.nitro,"active",Me.nitroOn),Qo("onc",rt.oncoming,"on",Se==="play"&&Me.oncoming),Qo("wrong",rt.wrong,"on",Se==="play"&&!!Me.wrongWay),Qo("drift",rt.drift,"on",Se==="play"&&Me.drift>40),Me.drift>40&&Ps("driftT",rt.drift,"DRIFT "+Math.floor(Me.drift)),Ec("sfx",rt.speedfx,"opacity",(mt((n-180)/140,0,1)*.8+(Me.nitroOn?.5:0)).toFixed(2))}var Se="menu",sn=mt(+Rt.get("sd-cam",0)||0,0,2),Os=1,ui=0,Ar=0,di=Rt.get("sd-best",0);function Vc(){let n=di>0?"BEST  "+Math.floor(di).toLocaleString("en-US"):"";Oe("bestmenu").textContent=n,Oe("bestover").textContent=n}Vc();function Hs(){for(let n in xt)xt[n]=!1;document.querySelectorAll("#touch button.on").forEach(n=>n.classList.remove("on")),document.activeElement&&document.activeElement.blur&&document.activeElement.blur()}function va(){Se==="menu"&&(Hs(),fi&&tt.steer==="tilt"&&kc(),gt.init(),Se="play",oi(!0),Oe("menu").classList.add("hidden"),Oe("hud").classList.remove("hidden"),Oe("touch").classList.add("show"),Oe("hudbtns").classList.add("show"),Ni=Me.heading)}function Tc(){Se==="over"&&(Hs(),fi&&tt.steer==="tilt"&&kc(),Gc(),rt.popups.textContent="",ui=0,hi=0,Se="play",Os=1,oi(!0),Oe("over").classList.add("hidden"),Oe("hud").classList.remove("hidden"),Oe("touch").classList.add("show"),Oe("hudbtns").classList.add("show"),Ni=Me.heading,gt.init())}function pi(){Se==="play"?(oi(!1),Se="paused",Hs(),Oe("pause").classList.remove("hidden"),gt.ctx&&gt.ctx.suspend()):Se==="paused"&&(oi(!0),Se="play",Hs(),Oe("pause").classList.add("hidden"),gt.ctx&&gt.ctx.resume(),Mr=performance.now())}function pf(){if(Se!=="menu"){Hs(),oi(!1),Me.score>di&&(di=Me.score,Rt.set("sd-best",di)),gt.ctx&&gt.ctx.state==="suspended"&&gt.ctx.resume(),Gc(),rt.popups.textContent="",ui=0,hi=0,Os=1,Se="menu";for(let n of["pause","over","settings"])Oe(n).classList.add("hidden");Oe("menu").classList.remove("hidden"),Oe("hud").classList.add("hidden"),Oe("touch").classList.remove("show"),Oe("hudbtns").classList.remove("show"),Vc(),Mr=performance.now()}}document.querySelectorAll("[data-go-menu]").forEach(n=>n.addEventListener("click",pf));function Ac(){Se="over",Hs(),oi(!1);let n=Me.score>di;n&&(di=Me.score,Rt.set("sd-best",di)),Oe("o-score").textContent=Math.floor(Me.score).toLocaleString("en-US"),Oe("o-dist").textContent=(Me.maxProg/1e3).toFixed(2)+" km",Oe("o-top").textContent=Math.round(Me.topSpeed*3.6)+" km/h",Oe("o-near").textContent=Me.nearMisses,Oe("newbest").textContent=n?"\u2605 NEW BEST \u2605":"",Vc(),Oe("over").classList.remove("hidden"),Oe("hud").classList.add("hidden"),Oe("touch").classList.remove("show"),Oe("hudbtns").classList.remove("show")}function Gc(){Ox();for(let[,n]of Oi)Kd(n);Oi.clear(),Oc(!0),of(),zx(),Vx(),Hc()}var uc=[0,17,30,43,56,70,999];function Zx(n){let e=Me,t=Se==="play",i=t&&(xt.gas||xt.nitro)?1:0,s=t&&xt.brake?1:0,r=t&&xt.hand,a=(xt.left?1:0)-(xt.right?1:0),o=t?a!==0?a:Wt.on&&Wt.live?Wt.value:0:0;e.steer+=(o-e.steer)*Math.min(1,(Wt.on&&a===0?10:o!==0?4.2:7)*n);let l=e.heading,c=-Math.sin(l),h=-Math.cos(l),d=Math.cos(l),f=-Math.sin(l),p=e.vx*c+e.vz*h,g=e.vx*d+e.vz*f;Pc(e.x,e.z),e.s=Bi.s,e.u=Bi.u;let v=Math.abs(e.u)>sa+.6;e.offroad=v;let m=t&&xt.nitro&&e.nitro>.01&&p>5&&!s;e.nitroOn=m,e.nitro=m?Math.max(0,e.nitro-n*.3):Math.min(1,e.nitro+n*.03);let u=(m?115:88)*(v?.55:1),y=0;i&&(y+=p>=-.5?(15+(m?14:0))*Math.max(0,1-p/u):30),s&&(y-=p>.5?34:9*Math.max(0,1+p/14)),!i&&!s&&(y-=1.4*Math.sign(p)),r&&(y-=5*Math.sign(p)),t||(y-=6*Math.sign(p)),y-=9e-4*p*Math.abs(p)+.2*Math.sign(p),v&&(y-=p*.35);let _=p;p+=y*n,!i&&!s&&Math.sign(p)!==Math.sign(_)&&_!==0&&(p=0),e.accel=Gt(e.accel,(p-_)/Math.max(n,1e-4),dn(6,n));let S=Math.abs(p),w=e.steer*2.1*mt(S/8,0,1)/(1+S*.017);p<0&&(w=-w),r&&(w*=1.55),e.heading+=w*n,e.yawRate=w;let E=c*p+d*g,A=h*p+f*g;l=e.heading,c=-Math.sin(l),h=-Math.cos(l),d=Math.cos(l),f=-Math.sin(l),p=E*c+A*h,g=E*d+A*f;let C=r?1.2:v?3.5:8.5,x=g;g*=Math.exp(-C*n),p-=Math.sign(p)*Math.min(Math.abs(p),Math.abs(x-g)*.18),e.vx=c*p+d*g,e.vz=h*p+f*g,e.fwd=p,e.lat=g,e.slip=Math.abs(g),e.x+=e.vx*n,e.z+=e.vz*n;let b=ci(e.x,e.z);e.y=b;let I=ci(e.x+c*1.6,e.z+h*1.6),k=ci(e.x-c*1.6,e.z-h*1.6),X=ci(e.x+d*.9,e.z+f*.9),L=ci(e.x-d*.9,e.z-f*.9);e.pitch=Gt(e.pitch,Math.atan2(I-k,3.2),dn(12,n)),e.roll=Gt(e.roll,Math.atan2(X-L,1.8),dn(12,n));let N=v?Math.sin(performance.now()*.05)*.02*mt(S/20,0,1):0;e.bodyRoll=Gt(e.bodyRoll,mt(-w*p*.0045,-.09,.09)+N,dn(6,n)),e.bodyPitch=Gt(e.bodyPitch,mt(e.accel*.0028,-.06,.05),dn(5,n));let V=1;for(;V<6&&S>uc[V];)V++;let Y=V===1?0:uc[V-1]*.55,q=V===6?120:uc[V],W=900+6400*mt((S-Y)/(q-Y),0,1)+(i&&S<3?2200:0);e.gear=V,e.rpm=Gt(e.rpm,W,dn(12,n)),e.topSpeed=Math.max(e.topSpeed,S);let Z=Sr(e.s),j=Math.cos(Cc(l,Z));if(e.wrongWay=p>8&&j<-.3,e.oncoming=tt.road==="two"&&!v&&e.u<-.3&&p>12&&j>.5,!t)return;let oe=-e.z,G=S*3.6;if(e.mult=(1+Math.floor(G/100))*(e.oncoming?2:1),oe>e.maxProg&&(e.score+=(oe-e.maxProg)*e.mult,e.maxProg=oe),e.maxProg>e.nextHeart&&(e.nextHeart+=2500,e.health<3&&(e.health++,Hc(),Tr("+1 \u2665","REPAIRED","good"))),e.slip>6&&S>14&&!v)e.drift+=e.slip*n*12,e.driftCool=.5;else if(e.drift>0&&(e.driftCool-=n,e.driftCool<=0)){if(e.drift>40){let $=Math.floor(e.drift)*2;e.score+=$,Tr("DRIFT","+"+$)}e.drift=0}e.comboTimer-=n,e.comboTimer<=0&&(e.combo=0),e.invuln-=n}function mf(n){let e=Me,t=zs;t.root.position.set(e.x,e.y,e.z),t.root.rotation.set(e.pitch,e.heading,e.roll,"YXZ"),t.body.rotation.set(e.bodyPitch,0,e.bodyRoll),t.body.position.y=-Math.abs(e.bodyRoll)*.3;for(let h of t.wheels)h.spin.rotation.x-=e.fwd/t.wheelR*n,h.front&&(h.pivot.rotation.y=e.steer*.42);let i=Se==="play"&&xt.brake&&e.fwd>.5;t.tail.emissiveIntensity=Gt(t.tail.emissiveIntensity,i?6:1.6,dn(15,n)),t.flames.forEach(h=>{h.visible=e.nitroOn,e.nitroOn&&h.scale.set(1,1,.7+Math.random()*.8)}),t.root.visible=sn!==2||Se!=="play",e.invuln>0&&Se==="play"&&(t.root.visible=t.root.visible&&Math.floor(e.invuln*12)%2===0);let s=-Math.sin(e.heading),r=-Math.cos(e.heading),a=Math.cos(e.heading),o=-Math.sin(e.heading),l=Se==="play"&&xt.brake&&e.fwd>18,c=(e.slip>6.5||l||Se==="play"&&xt.hand&&Math.abs(e.fwd)>8)&&!e.offroad;for(let h=0;h<2;h++){let d=h===0?-1:1,f=e.x+a*d*.86+s*1.45*-1,p=e.z+o*d*.86+r*1.45*-1;c?kx(h,f,p):Fs[h]=null;let g=mt((e.slip-5)/8,0,1)+(l?.3:0);c&&Math.random()<g*.6+.05&&Mc(f,e.y,p,e.vx,e.vz,g),e.offroad&&Math.abs(e.fwd)>10&&Math.random()<.15&&Mc(f,e.y,p,e.vx,e.vz,.4)}}function Kx(){let n=Me,e=zs.hw,t=zs.hl;for(let r of An){if(!r.active)continue;let a=n.x-r.x,o=n.z-r.z;if(a*a+o*o>400){r.prevLz=null;continue}let l=-Math.sin(r.heading),c=-Math.cos(r.heading),h=Math.cos(r.heading),d=-Math.sin(r.heading),f=a*h+o*d,p=a*l+o*c,g=Math.abs(Cc(n.heading,r.heading)),v=Math.abs(Math.cos(g)),m=Math.abs(Math.sin(g)),u=e*v+t*m,y=e*m+t*v,_=r.car.hw+u-Math.abs(f),S=r.car.hl+y-Math.abs(p);if(_>0&&S>0){let w,E,A;if(_<S){let I=Math.sign(f)||1;w=h*I,E=d*I,A=_}else{let I=Math.sign(p)||1;w=l*I,E=c*I,A=S}n.x+=w*A,n.z+=E*A;let C=n.vx-r.vx,x=n.vz-r.vz,b=C*w+x*E;if(b<0){let I=-1.35*b/(1+1/r.mass);n.vx+=w*I,n.vz+=E*I;let k=C-b*w,X=x-b*E;n.vx-=k*.25,n.vz-=X*.25,r.hit||(r.hit=!0),r.vx-=w*I/r.mass,r.vz-=E*I/r.mass,r.yawRate+=(Math.random()<.5?-1:1)*mt(-b*.12,.3,3)/r.mass;let L=-Math.sin(n.heading),N=-Math.cos(n.heading);n.fwd=n.vx*L+n.vz*N,n.heading+=(Math.random()-.5)*mt(-b*.01,0,.25),kd(-b,n.x-w*1.5,n.z-E*1.5,r.vx,r.vz)}r.near=!0}else if(Se==="play"&&r.prevLz!==null&&Math.sign(p)!==Math.sign(r.prevLz)&&!r.near){let w=Math.abs(f)-r.car.hw-u,E=Math.hypot(n.vx-r.vx,n.vz-r.vz);if(w<1.5&&E>18&&Math.abs(n.fwd)>20){r.near=!0,n.nearMisses++,n.combo++,n.comboTimer=4;let A=r.dir>0,C=(A?500:250)*n.combo;n.score+=C,n.nitro=Math.min(1,n.nitro+.2),Tr(A?"CLOSE CALL!":"NEAR MISS",`+${C}${n.combo>1?"  \xD7"+n.combo:""}`,"good"),gt.whoosh()}}r.prevLz=p}let i=Math.floor(-n.z/Vn),s=1.05;for(let r=i-1;r<=i+1;r++){let a=Oi.get(r);if(a)for(let o of a.userData.obstacles){let l=n.x-o.x,c=n.z-o.z,h=o.r+s,d=l*l+c*c;if(d>=h*h)continue;let f=Math.sqrt(d)||.001,p=l/f,g=c/f;n.x=o.x+p*h,n.z=o.z+g*h;let v=n.vx*p+n.vz*g;if(v<0){n.vx-=1.3*v*p,n.vz-=1.3*v*g,n.vx*=.7,n.vz*=.7;let m=-Math.sin(n.heading),u=-Math.cos(n.heading);n.fwd=n.vx*m+n.vz*u,n.heading+=(Math.random()-.5)*mt(-v*.015,0,.4),kd(-v,o.x+p*o.r,o.z+g*o.r,0,0)}}}}function kd(n,e,t,i,s){let r=Me;if(n>4){ui=Math.max(ui,mt(n/25,.25,1)),gt.crash(n);for(let a=0;a<10;a++)Mc(e,r.y,t,i,s,.8)}Se==="play"&&n>9&&r.invuln<=0&&(r.health--,r.invuln=1.2,r.combo=0,Hc(),Jx(),r.health<=0?(Se="dying",Ar=0,Tr("WRECKED","","bad")):Tr("CRASH!",`${r.health} \u2665 LEFT`,"bad"))}var hi=0;function Jx(){hi=1}var Ni=0,Ls=0,dc=0,Hd=new U;function Wc(n,e){let t=Me,i=Math.abs(t.fwd);if(Se==="menu"){dc+=e*.12;let _=t.heading+Math.PI*.85+Math.sin(dc)*.9,S=8.5;pt.position.set(t.x-Math.sin(_)*S,t.y+2.2+Math.sin(dc*.7)*.6,t.z-Math.cos(_)*S),pt.lookAt(t.x,t.y+.9,t.z),pt.fov=52,pt.updateProjectionMatrix(),Ls=pt.position.y,Ni=t.heading;return}let s=sn===2?25:5.5;Ni+=Cc(Ni,t.heading+(t.fwd<-2,0))*dn(s,n);let r=-Math.sin(Ni),a=-Math.cos(Ni),o,l,c;sn===0?(o=6.8+i*.03,l=2.3+i*.006,c=6):sn===1?(o=12+i*.03,l=4.8,c=8):(o=-1,l=1,c=30);let h=t.x-r*o,d=t.z-a*o,f=t.y+l;Ls=sn===2?f:Gt(Ls,f,dn(7,n)),Ls=Math.max(Ls,ci(h,d)+.7);let p=0,g=0,v=mt((i-40)/60,0,1)*.025+(t.offroad?mt(i/30,0,1)*.05:0),m=ui*ui*.5+v;m>0&&(p=(Math.random()-.5)*m,g=(Math.random()-.5)*m),ui=Math.max(0,ui-e*1.8),pt.position.set(h+p,Ls+g,d),Hd.set(t.x+r*c,t.y+(sn===2?.9:1),t.z+a*c),pt.lookAt(Hd);let u=pt.aspect<1?(1-pt.aspect)*28:0,y=(sn===2?70:60)+u+i*.2+(t.nitroOn?9:0);pt.fov=Gt(pt.fov,y,dn(3,n)),pt.updateProjectionMatrix()}var jx=600,Ds=Math.PI-.75,ea=[{e:-.35,top:330266,mid:1121340,fog:1581630,cloud:2502734,light:10467071,li:.9,hs:8032464,hg:1710630,hi:1.25,far:2239306,near:1581112,ground:1184540,exp:1.4},{e:-.08,top:1383488,mid:6177392,fog:6441062,cloud:8279670,light:11049168,li:.6,hs:8029368,hg:2762802,hi:1,far:4996448,near:3681606,ground:2761770,exp:1.2},{e:.14,top:2375806,mid:16234894,fog:15902588,cloud:16766656,light:16761994,li:3.3,hs:11846911,hg:7032888,hi:1.15,far:13209498,near:9332360,ground:4866104,exp:1.05},{e:.45,top:2909888,mid:10405870,fog:13032430,cloud:16777215,light:16773336,li:3.2,hs:13821183,hg:7298628,hi:1.05,far:10137291,near:7440811,ground:5918784,exp:1}].map(n=>{let e={e:n.e,li:n.li,hi:n.hi,exp:n.exp};for(let t of["top","mid","fog","cloud","light","hs","hg","far","near","ground"])e[t]=new ce(n[t]);return e}),At={};for(let n of["top","mid","fog","cloud","light","hs","hg","far","near","ground"])At[n]=new ce;var Rc=(()=>{let e=new Float32Array(2700),t=da(7);for(let r=0;r<900;r++){let a=t()*Math.PI*2,o=.04+Math.pow(t(),.8)*.96,l=Math.sqrt(1-o*o);e[r*3]=Math.cos(a)*l*2600,e[r*3+1]=o*2600,e[r*3+2]=Math.sin(a)*l*2600}let i=new ht;i.setAttribute("position",new it(e,3));let s=new lr(i,new ar({color:14673663,size:1.6,sizeAttenuation:!1,transparent:!0,opacity:0,fog:!1,depthWrite:!1}));return s.frustumCulled=!1,s.renderOrder=-9.5,s.visible=!1,qt.add(s),s})(),Rr=new No(16773334,0,110,.62,.5,1);Rr.position.set(0,.8,-2.3);Rr.target.position.set(0,-1.2,-22);zs.root.add(Rr,Rr.target);var Qx=[Jd,jd,Qd,zs.paint,...An.map(n=>n.car.paint)],fc=0,pc=0,Di=0;function Xc(n,e=!1){Ds+=n*(Math.PI*2/jx)*(li.y<0?2:1),Ds>Math.PI*2&&(Ds-=Math.PI*2),li.set(Math.cos(Ds),Math.sin(Ds)*.85,-.65).normalize();let t=li.y,i=0;for(;i<ea.length-2&&t>ea[i+1].e;)i++;let s=ea[i],r=ea[i+1],a=Fi(s.e,r.e,t);for(let c in At)At[c].copy(s[c]).lerp(r[c],a);let o=Gt(s.li,r.li,a),l=Gt(s.hi,r.hi,a);Di=1-Fi(-.06,.1,t);for(let c of[Lc.uniforms,Ic.uniforms])c.uTop.value.copy(At.top),c.uMid.value.copy(At.mid),c.uHorizon.value.copy(At.fog),c.uSunColor.value.copy(At.light),c.uSunDir.value.copy(li),c.uMoon.value=Di;if(Cr.copy(At.fog),qt.fog.color.copy(At.fog),Yd.color.copy(At.cloud),na.color.copy(At.hs),na.groundColor.copy(At.hg),na.intensity=l,t>=0?Us.copy(li):Us.copy(li).negate(),Us.y=Math.max(Us.y,.12),Us.normalize(),fn.color.copy(At.light),fn.intensity=o*(.2+.8*Fi(0,.06,Math.abs(t))),Xt.toneMappingExposure=Gt(s.exp,r.exp,a),Rc.visible=Di>.02,Rc.material.opacity=Di*.9,Rr.intensity=Di*180,Zd.emissiveIntensity=.8+Di*4.5,ef.emissiveIntensity=1.6+Di*2,fc-=n,pc-=n,(fc<=0||e)&&(fc=.5,Dc.userData.recolor(At.far,At.fog),Nc.userData.recolor(At.near,At.fog)),pc<=0||e){pc=6,Uc.material.color.copy(At.ground);let c=ta;ta=Wd.fromScene(fa,.02,.1,200);for(let h of Qx)h.envMap=ta.texture;c.dispose()}}var ey=fi?2:4,ty=new Ct(innerWidth*wr(),innerHeight*wr(),{type:Qt,samples:ey}),mi=new Wo(Xt,ty);mi.setPixelRatio(wr());mi.setSize(innerWidth,innerHeight);mi.addPass(new Xo(qt,pt));var _a=new Es(new _e(innerWidth,innerHeight),.45,.5,1);mi.addPass(_a);mi.addPass(new qo);function gf(){pt.aspect=innerWidth/innerHeight,pt.updateProjectionMatrix();let n=wr();Xt.setPixelRatio(n),mi.setPixelRatio(n),Xt.setSize(innerWidth,innerHeight),mi.setSize(innerWidth,innerHeight),_a.setSize(innerWidth,innerHeight)}function ua(){_a.enabled=!tt.saver&&vc,gf(),vf()}function vf(){zc()&&ma()}var un={t:0,frames:0,warm:0};function ny(n){if(Se!=="play"||tt.saver){un.t=0,un.frames=0,un.warm=0;return}if(un.warm+=n,un.warm<3||(un.t+=n,un.frames++,un.t<2))return;let e=un.t/un.frames;un.t=0,un.frames=0,e>1/45&&(gc>.7?(gc-=.15,ua()):vc&&(vc=!1,ua()))}addEventListener("resize",gf);document.addEventListener("visibilitychange",()=>{document.hidden&&Se==="play"&&pi()});Gc();Wc(.016,.016);var Mr=performance.now(),Vd=0,iy=1/60;function _f(n){let e=Math.max(1,Math.ceil(n/iy-.01)),t=n/e;for(let i=0;i<e;i++)Se!=="menu"&&(Zx(t),Kx()),Bx(t)}function xf(n){if(requestAnimationFrame(xf),Se==="paused"){Mr=n;return}let e=tt.saver||Se==="menu"||Se==="over"?1e3/30:0;if(e&&n-Vd<e-3)return;Vd=n;let t=Math.min((n-Mr)/1e3,.1);Mr=n,Se==="dying"&&(Ar+=t,Os=Gt(Os,.25,dn(6,t)),Ar>1.8&&(Os=1,Ac()));let i=t*Os;_f(i),Xc(t),mf(i),Oc(),hf(i),Wc(i,t),fn.target.position.set(Me.x,Me.y,Me.z),fn.position.copy(fn.target.position).addScaledVector(Us,150),Pr.position.copy(pt.position),Rc.position.copy(pt.position),pa.position.set(pt.position.x,pt.position.y-40,pt.position.z),lf.uniforms.uScale.value=Xt.domElement.height/2/Math.tan(zu.degToRad(pt.fov/2)),_a.strength=.45+(Me.nitroOn?.2:0),(hi>0||Rn.vig!==0)&&(hi=Math.max(0,hi-t*1.6),Ec("vig",rt.vignette,"opacity",hi.toFixed(2)),hi===0&&(Rn.vig=0)),gt.update(Me.rpm,Se==="play"&&xt.gas?1:0,Me.slip,Math.abs(Me.fwd),Me.nitroOn,Se==="play"||Se==="dying"),Se!=="menu"&&$x(),ny(t),mi.render()}Xc(0,!0);ua();requestAnimationFrame(xf);Cd({app:"sunset-drive",onBack(){zc()?Lr():Se==="play"?pi():Se==="paused"||Se==="over"?pf():Se==="menu"&&Ld()},onPauseApp(){Se==="play"&&pi()}});/[?&]debug\b/.test(location.search)&&(window.__game={player:Me,input:xt,traffic:An,roadDX:ki,get state(){return Se},startGame:va,gameOver:Ac,settings:tt,setTime(n){Ds=n,Xc(0,!0)},sim(n,e=1/60){for(let t=0;t<n;t++)_f(e),mf(e),Oc(),hf(e),Wc(e,e),Se==="dying"&&(Ar+=e,Ar>1.8&&Ac())}});})();
