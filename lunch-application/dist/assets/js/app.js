webpackJsonp([0],[,function(t,e){t.exports=function(t,e,s,o,a,n){var i,r=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(i=t,r=t.default);var u="function"==typeof r?r.options:r;e&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0),s&&(u.functional=!0),a&&(u._scopeId=a);var l;if(n?(l=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(n)},u._ssrRegister=l):o&&(l=o),l){var d=u.functional,v=d?u.render:u.beforeCreate;d?(u._injectStyles=l,u.render=function(t,e){return l.call(e),v(t,e)}):u.beforeCreate=v?[].concat(v,l):[l]}return{esModule:i,exports:r,options:u}}},,,,function(t,e,s){"use strict";function o(t){if(!t)throw new Error("Vue is not installed");i=new t,i.subscribers=[]}function a(t){var e={animation:T.FADE,bodyClass:w,closeHtml:y,defaultTypeClass:d,typeClasses:{error:l,info:d,wait:v,success:u,warning:f},iconClasses:{error:h,info:m,wait:_,success:p,warning:g},mouseoverTimerStop:!1,newestOnTop:!0,positionClass:b,preventDuplicates:!1,tapToDismiss:!0,timeout:5e3,titleClass:C,toastContainerId:null,showCloseButton:!1};return t=Object.assign(e,t),t.typeClasses=Object.assign(e.typeClasses,t.typeClasses),t.iconClasses=Object.assign(e.iconClasses,t.iconClasses),t}function n(t){n.installed||(n.installed=!0,O=t,o(O),t.component("ToastContainer",S),t.prototype.$vueOnToast={pop:D.pop,remove:D.remove})}/**
  * vue-on-toast v1.0.0-alpha.1
  * (c) 2018 Stabzs
  * @license MIT
  */
var i,r="vot",c={success:"success",error:"error",info:"info",wait:"wait",warning:"warning"},u=r+"-"+c.success,l=r+"-"+c.error,d=r+"-"+c.info,v=r+"-"+c.wait,f=r+"-"+c.warning,p=r+"-icon-"+c.success,h=r+"-icon-"+c.error,m=r+"-icon-"+c.info,_=r+"-icon-"+c.wait,g=r+"-icon-"+c.warning,C=r+"-title",w=r+"-body",b=r+"-top-right",y='<button class="toast-close-button" type="button">&times;</button>',T={FADE:"fade",EASE_OUT_LEFT:"ease-out-left",EASE_OUT_RIGHT:"ease-out-right"},x={configureTimer:function(t){var e="number"==typeof t.timeout?t.timeout:t.toastConfig.timeout;"object"==typeof e&&(e=e[t.type]),e>0&&(t.timeoutId=setTimeout(function(){i.$emit("removeToast",t.toastId,t.toastContainerId)},e))}},F={Component:"Component",TrustedHtml:"TrustedHtml"},I={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{class:["toast",t.classes.typeClass],on:{click:function(e){t.onClick(t.toast,e)},mouseover:function(e){t.stopTimer(t.toast)},mouseout:function(e){t.restartTimer(t.toast)}}},[s("i",{staticClass:"toaster-icon",class:t.classes.iconClass}),s("div",{staticClass:"toast-content"},[s("div",{class:t.classes.titleClass},[t._v(t._s(t.toast.title))]),s("div",{class:t.classes.bodyClass},[t.toast.bodyOutputType==t.bodyOutputType.Component?s(t.toast.body,{tag:"component"}):t.toast.bodyOutputType==t.bodyOutputType.TrustedHtml?s("div",{domProps:{innerHTML:t._s(t.toast.body)}}):"string"==typeof t.toast.body?s("div",[t._v(t._s(t.toast.body))]):t._e()],1)]),t.toast.showCloseButton?s("div",{staticClass:"toast-close-button",domProps:{innerHTML:t._s(t.toast.toastConfig.closeHtml)},on:{click:function(e){t.onClick(t.toast,e,!0)}}}):t._e()])},staticRenderFns:[],name:"toast",props:{toast:Object},computed:{classes:function(){return{typeClass:this.toast.toastConfig.typeClasses[this.toast.type],iconClass:this.toast.toastConfig.iconClasses[this.toast.type],titleClass:this.toast.toastConfig.titleClass,bodyClass:this.toast.toastConfig.bodyClass}},bodyOutputType:function(){return F}},methods:{onClick:function(t,e,s){if(e.stopPropagation(),t.toastConfig.tapToDismiss||t.showCloseButton&&s){var o=!0;if(t.clickHandler){if("function"!=typeof t.clickHandler)return console.log("The toast click handler is not a callable function."),!1;o=t.clickHandler(t,s)}o&&i.$emit("removeToast",t.toastId,t.toastContainerId)}},stopTimer:function(t){t.toastConfig.mouseoverTimerStop&&t.timeoutId&&(window.clearTimeout(t.timeoutId),t.timeoutId=null)},restartTimer:function(t){t.toastConfig.mouseoverTimerStop?t.timeoutId||x.configureTimer(t):null===t.timeoutId&&i.$emit("removeToast",t.toastId,t.toastContainerId)}}},S={name:"toast-container",data:function(){return{toasts:[]}},components:{toast:I},props:["toastConfig"],methods:{addToast:function(t,e){if(t.toastConfig=e,!t.toastContainerId||!e.toastContainerId||t.toastContainerId===e.toastContainerId){if(t.type||(t.type=e.defaultTypeClass),e.preventDuplicates&&this.toasts.length>0){if(t.toastId&&this.toasts.some(function(e){return e.toastId===t.toastId}))return;if(this.toasts.some(function(e){return e.body===t.body}))return}this.setCloseOptions(t,e),t.bodyOutputType=t.bodyOutputType||e.bodyOutputType,x.configureTimer(t),e.newestOnTop?(this.toasts.unshift(t),this.isLimitExceeded(e)&&this.toasts.pop()):(this.toasts.push(t),this.isLimitExceeded(e)&&this.toasts.shift()),t.onShowCallback&&t.onShowCallback(t)}},setCloseOptions:function(t,e){null!==t.showCloseButton&&void 0!==t.showCloseButton||("object"==typeof e.showCloseButton?t.showCloseButton=e.showCloseButton[t.type]:"boolean"==typeof e.showCloseButton&&(t.showCloseButton=e.showCloseButton)),t.showCloseButton&&(t.closeHtml=t.closeHtml||e.closeHtml)},isLimitExceeded:function(t){return t.limit&&this.toasts.length>t.limit},removeToast:function(t){if(null!==t&&void 0!==t){var e=this.toasts.indexOf(t);e<0||(this.toasts.splice(e,1),t.timeoutId&&(clearTimeout(t.timeoutId),t.timeoutId=null),t.onHideCallback&&t.onHideCallback(t))}},removeToasts:function(t,e){null!==e&&void 0!==e&&e!==this._toastConfig.toastContainerId||(t?this.removeToast(this.toasts.filter(function(e){return e.toastId===t})[0]):this.removeAllToasts())},removeAllToasts:function(){for(var t=this,e=this.toasts.length-1;e>=0;e--)t.removeToast(t.toasts[e])}},computed:{_toastConfig:function(){return new a(this.toastConfig)}},created:function(){var t=this;i.subscribers.push(this),i.$on("addToast",function(e){t.addToast(e,t._toastConfig)}),i.$on("removeToast",function(e,s){t.removeToasts(e,s)})},render:function(t){return t("transition-group",{name:"toast-container",tag:"div",class:["toast-container",this._toastConfig.positionClass],props:{name:this._toastConfig.animation}},this.toasts.map(function(e){return t("toast",{class:"toast",props:{toast:e},key:e.toastId})}))}},D={pop:function(t,e,s){var o="string"==typeof t?{type:t,title:e,body:s}:t;if(!o||!o.type||!o.type.length)throw new Error("A toast type must be provided");if(i.subscribers.length<1)throw new Error("No Toaster Containers have been initialized to receive toasts.");return o.toastId=E.newGuid(),i.$emit("addToast",o),o},remove:function(t,e){i.$emit("removeToast",t,e)}},E=function(){};E.newGuid=function(){function t(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)}return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t)};var O;"undefined"!=typeof window&&window.Vue&&window.Vue.use(n);var k={install:n,ToastService:D};e.a=k},,,,,,,,,,function(t,e,s){"use strict";var o=s(16),a=s(51);e.a={components:{"app-header":o.a,"app-footer":a.a}}},function(t,e,s){"use strict";function o(t){s(48)}var a=s(17),n=s(49),i=s(1),r=o,c=i(a.a,n.a,!1,r,null,null);e.a=c.exports},function(t,e,s){"use strict";var o=s(4),a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var o in s)Object.prototype.hasOwnProperty.call(s,o)&&(t[o]=s[o])}return t};e.a={name:"appHeader-comp",computed:a({},Object(o.mapGetters)(["isAuthenticated"]))}},function(t,e,s){"use strict";var o=s(4),a=s(3),n=s.n(a),i=s(2),r=s(8),c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var o in s)Object.prototype.hasOwnProperty.call(s,o)&&(t[o]=s[o])}return t};i.default.use(r.default);var u=n.a.defaults.baseURL;e.a={data:function(){return{userData:[],errors:[],username:"",password:""}},created:function(){var t=this;n.a.get(u+"/userData").then(function(e){return console.log(e),t.userData=e.data,t.userData}).catch(function(e){t.errors.push(e)})},computed:c({},Object(o.mapGetters)(["isAuthenticated"])),methods:{login:function(){this.$store.dispatch("login",{Username:this.username,PasswordHash:this.password})},logout:function(){this.$store.dispatch("logout")}}}},function(t,e,s){"use strict";var o=s(3),a=s.n(o),n=s(5),i=a.a.defaults.baseURL;e.a={data:function(){return{restaurantData:[],topFiveData:[],errors:[]}},created:function(){var t=this;a.a.get(i+"/lunchdata").then(function(e){return console.log(e),t.restaurantData=e.data,t.restaurantData}),a.a.get(i+"/topfivedata").then(function(e){return console.log(e),t.topFiveData=e.data,t.topFiveData}).catch(function(e){t.errors.push(e)})},methods:{lunchLocationToast:function(){var t=Math.floor(Math.random()*this.restaurantData.length);n.a.ToastService.pop("success","Lunch Alert","lunch today is at: "+this.restaurantData[t].restaurantName)},successfulLoginToast:function(){null===window.sessionStorage.getItem("loginSuccessMessage")?console.log("no authenticated user detected"):(n.a.ToastService.pop("success",window.sessionStorage.getItem("loginSuccessMessage")),window.sessionStorage.removeItem("loginSuccessMessage"))},successfulLogoutToast:function(){null===window.sessionStorage.getItem("logoutSuccessMessage")?console.log("no logoff"):(n.a.ToastService.pop("success",window.sessionStorage.getItem("logoutSuccessMessage")),window.sessionStorage.removeItem("logoutSuccessMessage"))}},mounted:function(){this.successfulLoginToast(),this.successfulLogoutToast()}}},function(t,e,s){"use strict";var o=s(3),a=s.n(o),n=s(5),i=a.a.defaults.baseURL;e.a={data:function(){return{restaurantData:[],topFiveData:[],errors:[]}},created:function(){var t=this;a.a.get(i+"/lunchdata").then(function(e){return console.log(e),t.restaurantData=e.data,t.restaurantData}).catch(function(e){t.errors.push(e)}),a.a.get(i+"/topfivedata").then(function(e){return console.log(e),t.topFiveData=e.data,t.topFiveData}).catch(function(e){t.errors.push(e)})},methods:{submitUpdate:function(){this.topFiveData[0].restaurantOne=document.getElementById("firstChoice").value,this.topFiveData[0].restaurantTwo=document.getElementById("secondChoice").value,this.topFiveData[0].restaurantThree=document.getElementById("thirdChoice").value,this.topFiveData[0].restaurantFour=document.getElementById("fourthChoice").value,this.topFiveData[0].restaurantFive=document.getElementById("fifthChoice").value,a.a.post(i+"/topfivedata/topfive",{userId:1,restaurantOne:this.topFiveData[0].restaurantOne,restaurantTwo:this.topFiveData[0].restaurantTwo,restaurantThree:this.topFiveData[0].restaurantThree,restaurantFour:this.topFiveData[0].restaurantFour,restaurantFive:this.topFiveData[0].restaurantFive}).then(function(t){console.log(t),n.a.ToastService.pop("success","Successful Update","your preferences have been saved")}).catch(function(t){console.log(t),n.a.ToastService.pop("fail","Unsuccessful Update","your preferences have not been saved "+t)})}}}},function(t,e,s){"use strict";e.a={name:"loading-indicator",computed:{isLoading:function(){return this.$store.getters.isLoading}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s(23);o.b.onReady(function(){o.a.$mount("#app")})},function(t,e,s){"use strict";s.d(e,"a",function(){return d});var o=s(2),a=s(26),n=s(46),i=s(55),r=s(5),c=s(16),u=s(67);s.d(e,"b",function(){return i.a});var l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var o in s)Object.prototype.hasOwnProperty.call(s,o)&&(t[o]=s[o])}return t};o.default.use(r.a),o.default.component("appHeader-comp",c.a),o.default.component("loading-indicator",u.a);var d=new o.default(l({router:i.a},n.a,{store:a.a}))},,,function(t,e,s){"use strict";var o=s(2),a=s(4),n=s(27);o.default.use(a.default);var i={isAuthenticated:!1},r=new a.default.Store({state:i,getters:{isAuthenticated:function(t){return t.isAuthenticated}},actions:{logout:function(t){n.a.logout(t),t.commit("logout")},login:function(t,e){return new Promise(function(s){n.a.login(e).then(function(e){t.commit("login",e),s()}).catch(function(){"undefined"!=typeof window&&window.alert("Could not login!")})})}},mutations:{logout:function(t){"undefined"!=typeof window&&(window.sessionStorage.setItem("token",null),window.sessionStorage.setItem("tokenExpiration",null)),t.isAuthenticated=!1,window.sessionStorage.setItem("isAuthenticated",null)},login:function(t,e){"undefined"!=typeof window&&(window.sessionStorage.setItem("token",e.token),window.sessionStorage.setItem("tokenExpiration",e.expiration)),t.isAuthenticated=!0,window.sessionStorage.setItem("isAuthenticated",!0)}}});"undefined"!=typeof window&&document.addEventListener("DOMContentLoaded",function(t){var e=window.sessionStorage.getItem("tokenExpiration"),s=(new Date).getTime()/1e3;null!==e&&parseInt(e)-s>0&&(r.state.isAuthenticated=!0,window.sessionStorage.setItem("isAuthenticated",!0))}),e.a=r},function(t,e,s){"use strict";var o=s(3),a=s.n(o),n=s(5);a.a.defaults.baseURL="https://lunchapplication.azurewebsites.net";var i=a.a.defaults.baseURL;a.a.interceptors.request.use(function(t){if("undefined"==typeof window)return t;var e=window.localStorage.getItem("token");return e&&(t.headers.Authorization="Bearer "+e),t});var r={login:function(t){return new Promise(function(e,s){a.a.post(i+"/userdata/userlogin",t).then(function(t){console.log(t),!0===t.data?(window.sessionStorage.setItem("loginSuccessMessage","You have successfully logged on"),window.location.href="/home"):n.a.ToastService.pop("error","You have not been logged in. This is because of a wrong password or username")}).catch(function(t){console.log(t),n.a.ToastService.pop("error","you have not been logged in "+t)})})},logout:function(t){t?(window.sessionStorage.setItem("logoutSuccessMessage","You have successfully logged off"),window.location.href="/home",console.log("logged off")):n.a.ToastService.pop("error","You have not been logged off")}};e.a=r},,,,,,,,,,,,,,,,,,,function(t,e,s){"use strict";function o(t){s(47)}var a=s(15),n=s(54),i=s(1),r=o,c=i(a.a,n.a,!1,r,null,null);e.a=c.exports},function(t,e){},function(t,e){},function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"headerStyle"}},[o("nav",{staticClass:"appNav"},[o("router-link",{attrs:{to:"/home",exact:""}},[o("img",{attrs:{id:"chiLogo",src:s(50),alt:"Lunch App"}})]),t._v(" "),o("router-link",{staticClass:"navText navLeft",attrs:{to:"/home",exact:""}},[o("div",[t._v("Lunchable")])]),t._v(" "),o("router-link",{staticClass:"navText navRight",attrs:{to:"/login"}},[t.isAuthenticated?o("div",[t._v("LOGOUT")]):o("div",[t._v("LOGIN")])])],1)])},a=[],n={render:o,staticRenderFns:a};e.a=n},function(t,e,s){t.exports=s.p+"1c2130b39c0f14304f01b708489ee8c2.png"},function(t,e,s){"use strict";function o(t){s(52)}var a=s(53),n=s(1),i=o,r=n(null,a.a,!1,i,null,null);e.a=r.exports},function(t,e){},function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("footer",[s("div",{staticClass:"footStyle"},[s("p",[t._v("Lunch Application - Emily Weis")])])])}],n={render:o,staticRenderFns:a};e.a=n},function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("toast-container"),t._v(" "),s("app-header"),t._v(" "),s("section",{staticClass:"main-section section"},[s("div",{staticClass:"container content"},[s("router-view")],1)]),t._v(" "),s("app-footer")],1)},a=[],n={render:o,staticRenderFns:a};e.a=n},function(t,e,s){"use strict";var o=s(2),a=s(8),n=s(56),i=s(59),r=s(61),c=s(64);o.default.use(a.default);var u=new a.default({mode:"hash",linkActiveClass:"is-active",scrollBehavior:function(t,e,s){return{y:0}},routes:[{path:"/login",component:n.a},{path:"/home",component:r.a},{path:"/edittopfive",component:c.a},{path:"/",redirect:"/home"},{path:"*",component:i.a}]});e.a=u},function(t,e,s){"use strict";function o(t){s(57)}var a=s(18),n=s(58),i=s(1),r=o,c=i(a.a,n.a,!1,r,null,null);e.a=c.exports},function(t,e){},function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"login"}},[s("div",{staticClass:"card"},[s("div",{staticClass:"login"},[t.isAuthenticated?t._e():s("h2",{staticClass:"card-header"},[t._v("Login")]),t._v(" "),s("div",{staticClass:"card-main"},[s("div",{staticClass:"field is-horizontal"},[t._m(0),t._v(" "),s("div",{staticClass:"field-body"},[s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"input",attrs:{id:"loginFormInput",type:"text",placeholder:"Your username"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}})])])])]),t._v(" "),s("div",{staticClass:"field is-horizontal"},[t._m(1),t._v(" "),s("br"),t._v(" "),s("div",{staticClass:"field-body"},[s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"input",attrs:{id:"loginFormInput",type:"password",placeholder:"Your password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})])])])]),t._v(" "),s("div",{staticClass:"field is-horizontal"},[s("div",{staticClass:"field-label"}),t._v(" "),s("div",{staticClass:"field-body"},[s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("button",{staticClass:"button loginButton",on:{click:function(e){t.login()}}},[t._v("\n                Login\n                ")]),t._v(" "),s("button",{staticClass:"button loginButton",on:{click:function(e){t.logout()}}},[t._v("\n                Logout\n                ")])])])])])])])])])},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"field-label is-normal"},[s("label",{staticClass:"label"},[t._v("Username")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"field-label is-normal"},[s("label",{staticClass:"label"},[t._v("Password")])])}],n={render:o,staticRenderFns:a};e.a=n},function(t,e,s){"use strict";var o=s(60),a=s(1),n=a(null,o.a,!1,null,null,null);e.a=n.exports},function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",[t._v("page not found")])},a=[],n={render:o,staticRenderFns:a};e.a=n},function(t,e,s){"use strict";function o(t){s(62)}var a=s(19),n=s(63),i=s(1),r=o,c=i(a.a,n.a,!1,r,null,null);e.a=c.exports},function(t,e){},function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"home"}},[s("div",{staticClass:"card"},[s("div",{staticClass:"options"},[s("div",{staticClass:"card-header"},[t._v("Lunch Options")]),t._v(" "),s("div",{staticClass:"card-main"},[s("table",[t._m(0),t._v(" "),s("tbody",t._l(t.restaurantData,function(e,o){return s("tr",{key:o},[s("td",[t._v(t._s(e.restaurantName))]),t._v(" "),s("td",[t._v(t._s(e.restaurantType))]),t._v(" "),s("td",[t._v(t._s(e.foodType))]),t._v(" "),s("td",[t._v(t._s(e.price))])])}))])])])]),t._v(" "),s("div",{staticClass:"card"},[s("div",{staticClass:"topFive"},[s("div",{staticClass:"card-header"},[t._v("Your Top 5")]),t._v(" "),s("div",{staticClass:"card-main"},[s("table",[t._m(1),t._v(" "),t._l(t.topFiveData,function(e,o){return s("tbody",{key:o},[s("tr",[s("td",[t._v("1")]),t._v(" "),s("td",[t._v(t._s(e.restaurantOne))])]),t._v(" "),s("tr",[s("td",[t._v("2")]),t._v(" "),s("td",[t._v(t._s(e.restaurantTwo))])]),t._v(" "),s("tr",[s("td",[t._v("3")]),t._v(" "),s("td",[t._v(t._s(e.restaurantThree))])]),t._v(" "),s("tr",[s("td",[t._v("4")]),t._v(" "),s("td",[t._v(t._s(e.restaurantFour))])]),t._v(" "),s("tr",[s("td",[t._v("5")]),t._v(" "),s("td",[t._v(t._s(e.restaurantFive))])])])})],2)]),t._v(" "),s("router-link",{staticClass:"button",attrs:{to:"/EditTopFive",tag:"button"}},[t._v("Edit Top 5")]),t._v(" "),s("button",{staticClass:"button",attrs:{type:"submit"},on:{click:function(e){t.lunchLocationToast()}}},[t._v("Submit")])],1)])])},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",[t._v("Restaurant Name")]),t._v(" "),s("th",[t._v("Restaurant Type")]),t._v(" "),s("th",[t._v("Food Type")]),t._v(" "),s("th",[t._v("Price")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",[t._v("Restaurant Ranking")]),t._v(" "),s("th",[t._v("Restaurant Name")])])])}],n={render:o,staticRenderFns:a};e.a=n},function(t,e,s){"use strict";function o(t){s(65)}var a=s(20),n=s(66),i=s(1),r=o,c=i(a.a,n.a,!1,r,null,null);e.a=c.exports},function(t,e){},function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"editTopFive"}},[s("div",{staticClass:"card"},[s("div",{staticClass:"editTopFive"},[s("div",{staticClass:"card-header"},[t._v("Edit Top Five")]),t._v(" "),s("div",{staticClass:"card-main"},[this.topFiveData.length?s("table",[s("tbody",[s("tr",[t._m(0),t._v(" "),s("td",[s("select",{attrs:{id:"firstChoice",name:"firstChoice"}},[s("option",{attrs:{value:"",hidden:""}},[t._v(t._s(this.topFiveData[0].restaurantOne))]),t._v(" "),t._l(t.restaurantData,function(e,o){return s("option",{key:o},[t._v(t._s(e.restaurantName))])})],2)])]),t._v(" "),s("tr",[t._m(1),t._v(" "),s("td",[s("select",{attrs:{id:"secondChoice",name:"secondChoice"}},[s("option",{attrs:{value:"",hidden:""}},[t._v(t._s(this.topFiveData[0].restaurantTwo))]),t._v(" "),t._l(t.restaurantData,function(e,o){return s("option",{key:o},[t._v(t._s(e.restaurantName))])})],2)])]),t._v(" "),s("tr",[t._m(2),t._v(" "),s("td",[s("select",{attrs:{id:"thirdChoice",name:"thirdChoice"}},[s("option",{attrs:{value:"",hidden:""}},[t._v(t._s(this.topFiveData[0].restaurantThree))]),t._v(" "),t._l(t.restaurantData,function(e,o){return s("option",{key:o},[t._v(t._s(e.restaurantName))])})],2)])]),t._v(" "),s("tr",[t._m(3),t._v(" "),s("td",[s("select",{attrs:{id:"fourthChoice",name:"fourthChoice"}},[s("option",{attrs:{value:"",hidden:""}},[t._v(t._s(this.topFiveData[0].restaurantFour))]),t._v(" "),t._l(t.restaurantData,function(e,o){return s("option",{key:o},[t._v(t._s(e.restaurantName))])})],2)])]),t._v(" "),s("tr",[t._m(4),t._v(" "),s("td",[s("select",{attrs:{id:"fifthChoice",name:"fifthChoice"}},[s("option",{attrs:{value:"",hidden:""}},[t._v(t._s(this.topFiveData[0].restaurantFive))]),t._v(" "),t._l(t.restaurantData,function(e,o){return s("option",{key:o},[t._v(t._s(e.restaurantName))])})],2)])])])]):t._e()]),t._v(" "),s("router-link",{staticClass:"button",attrs:{to:"/Home",tag:"button"}},[t._v("Back")]),t._v(" "),s("button",{staticClass:"button",attrs:{type:"submit"},on:{click:function(e){t.submitUpdate()}}},[t._v("Save ")])],1)])])},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("td",[s("label",{attrs:{id:"choiceLabel",for:"firstChoice"}},[t._v("First Choice")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("td",[s("label",{attrs:{id:"choiceLabel",for:"secondChoice"}},[t._v("Second Choice")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("td",[s("label",{attrs:{id:"choiceLabel",for:"thirdChoice"}},[t._v("Third Choice")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("td",[s("label",{attrs:{id:"choiceLabel",for:"fourthChoice"}},[t._v("Fourth Choice")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("td",[s("label",{attrs:{id:"choiceLabel",for:"fifthChoice"}},[t._v("Fifth Choice")])])}],n={render:o,staticRenderFns:a};e.a=n},function(t,e,s){"use strict";function o(t){s(68)}var a=s(21),n=s(69),i=s(1),r=o,c=i(a.a,n.a,!1,r,null,null);e.a=c.exports},function(t,e){},function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("transition",{attrs:{name:"fade-loading",tag:"div"}},[o("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticClass:"loading-indicator"},[o("img",{staticClass:"loading-image",attrs:{src:s(70)}})])])},a=[],n={render:o,staticRenderFns:a};e.a=n},function(t,e,s){t.exports=s.p+"a09166e877485e2b54541d8fa708c123.gif"}],[22]);