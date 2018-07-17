module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var listToStyles = __webpack_require__(22)

module.exports = function (parentId, list, isProduction, context) {
  if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
    context = __VUE_SSR_CONTEXT__
  }
  if (context) {
    if (!context.hasOwnProperty('styles')) {
      Object.defineProperty(context, 'styles', {
        enumerable: true,
        get: function() {
          return renderStyles(context._styles)
        }
      })
      // expose renderStyles for vue-server-renderer (vuejs/#6353)
      context._renderStyles = renderStyles
    }

    var styles = context._styles || (context._styles = {})
    list = listToStyles(parentId, list)
    if (isProduction) {
      addStyleProd(styles, list)
    } else {
      addStyleDev(styles, list)
    }
  }
}

// In production, render as few style tags as possible.
// (mostly because IE9 has a limit on number of style tags)
function addStyleProd (styles, list) {
  for (var i = 0; i < list.length; i++) {
    var parts = list[i].parts
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j]
      // group style tags by media types.
      var id = part.media || 'default'
      var style = styles[id]
      if (style) {
        if (style.ids.indexOf(part.id) < 0) {
          style.ids.push(part.id)
          style.css += '\n' + part.css
        }
      } else {
        styles[id] = {
          ids: [part.id],
          css: part.css,
          media: part.media
        }
      }
    }
  }
}

// In dev we use individual style tag for each module for hot-reload
// and source maps.
function addStyleDev (styles, list) {
  for (var i = 0; i < list.length; i++) {
    var parts = list[i].parts
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j]
      styles[part.id] = {
        ids: [part.id],
        css: part.css,
        media: part.media
      }
    }
  }
}

function renderStyles (styles) {
  var css = ''
  for (var key in styles) {
    var style = styles[key]
    css += '<style data-vue-ssr-id="' + style.ids.join(' ') + '"' +
        (style.media ? ( ' media="' + style.media + '"' ) : '') + '>' +
        style.css + '</style>'
  }
  return css
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("vuex");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("vue-on-toast");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);


__WEBPACK_IMPORTED_MODULE_0_axios___default.a.defaults.baseURL = 'https://lunchapplication.azurewebsites.net';
var baseUrl = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.defaults.baseURL;

__WEBPACK_IMPORTED_MODULE_0_axios___default.a.interceptors.request.use(function (config) {
  if (typeof window === 'undefined') {
    return config;
  }
  var token = window.localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
});

var appService = {
  getPosts: function getPosts(categoryId) {
    return new Promise(function (resolve) {
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/wp-json/wp/v2/posts?categories=' + categoryId + '&per_page=6').then(function (response) {
        resolve(response.data);
      });
    });
  },
  getProfile: function getProfile() {
    return new Promise(function (resolve) {
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/services/profile.php').then(function (response) {
        resolve(response.data);
      });
    });
  },
  login: function login(credentials) {
    return new Promise(function (resolve, reject) {
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(baseUrl + '/userdata', credentials).then(function (response) {
        resolve(response.data);
      }).catch(function (response) {
        reject(response.status);
      });
    });
  }
};

/* harmony default export */ __webpack_exports__["a"] = (appService);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppHeader_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AppFooter_vue__ = __webpack_require__(27);
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    'app-header': __WEBPACK_IMPORTED_MODULE_0__AppHeader_vue__["a" /* default */],
    'app-footer': __WEBPACK_IMPORTED_MODULE_1__AppFooter_vue__["a" /* default */]
  }
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AppHeader_vue__ = __webpack_require__(10);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a50c3bfe_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_AppHeader_vue__ = __webpack_require__(25);
function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(23),i.__inject__&&i.__inject__(ssrContext),i)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "021bb858"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AppHeader_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a50c3bfe_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_AppHeader_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuex__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'appHeader-comp',
  computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['isAuthenticated']))
});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuex__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      username: '',
      password: ''
    };
  },

  computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['isAuthenticated'])),
  methods: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapActions"])({
    logout: 'logout'
  }), {
    login: function login() {
      var _this = this;

      this.$store.dispatch('login', { username: this.username, password: this.password }).then(function () {
        _this.username = '';
        _this.password = '';
      });
    }
  })
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_on_toast__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_on_toast___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_on_toast__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var baseUrl = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.defaults.baseURL;

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      restaurantData: [],
      topFiveData: [],
      errors: []
    };
  },
  created: function created() {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(baseUrl + '/lunchdata').then(function (response) {
      console.log(response);
      _this.restaurantData = response.data;
      return _this.restaurantData;
    });
    __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(baseUrl + '/topfivedata').then(function (response) {
      console.log(response);
      _this.topFiveData = response.data;
      return _this.topFiveData;
    }).catch(function (e) {
      _this.errors.push(e);
    });
  },

  methods: {
    lunchLocationToast: function lunchLocationToast() {
      var random = Math.floor(Math.random() * this.restaurantData.length);
      __WEBPACK_IMPORTED_MODULE_1_vue_on_toast___default.a.ToastService.pop('success', 'Lunch Alert', 'lunch today is at: ' + this.restaurantData[random].restaurantName);
    }
  }
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_on_toast__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_on_toast___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_on_toast__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var baseUrl = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.defaults.baseURL;

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      restaurantData: [],
      topFiveData: [],
      errors: []
    };
  },
  created: function created() {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(baseUrl + '/lunchdata').then(function (response) {
      console.log(response);
      _this.restaurantData = response.data;
      return _this.restaurantData;
    }).catch(function (e) {
      _this.errors.push(e);
    });
    __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(baseUrl + '/topfivedata').then(function (response) {
      console.log(response);
      _this.topFiveData = response.data;
      return _this.topFiveData;
    }).catch(function (e) {
      _this.errors.push(e);
    });
  },

  methods: {
    submitUpdate: function submitUpdate() {
      this.topFiveData[0].restaurantOne = document.getElementById('firstChoice').value;
      this.topFiveData[0].restaurantTwo = document.getElementById('secondChoice').value;
      this.topFiveData[0].restaurantThree = document.getElementById('thirdChoice').value;
      this.topFiveData[0].restaurantFour = document.getElementById('fourthChoice').value;
      this.topFiveData[0].restaurantFive = document.getElementById('fifthChoice').value;

      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(baseUrl + '/topfivedata/topfive', {
        userId: 1,
        restaurantOne: this.topFiveData[0].restaurantOne,
        restaurantTwo: this.topFiveData[0].restaurantTwo,
        restaurantThree: this.topFiveData[0].restaurantThree,
        restaurantFour: this.topFiveData[0].restaurantFour,
        restaurantFive: this.topFiveData[0].restaurantFive
      }).then(function (response) {
        console.log(response);
        __WEBPACK_IMPORTED_MODULE_1_vue_on_toast___default.a.ToastService.pop('success', 'Successful Update', 'your preferences have been saved');
      }).catch(function (error) {
        console.log(error);
        __WEBPACK_IMPORTED_MODULE_1_vue_on_toast___default.a.ToastService.pop('fail', 'Unsuccessful Update', 'your preferences have not been saved ' + error);
      });
    }
  }
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'loading-indicator',
  computed: {
    isLoading: function isLoading() {
      return this.$store.getters.isLoading;
    }
  }
});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(16);


/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  __WEBPACK_IMPORTED_MODULE_0__app__["b" /* router */].push(context.url);
  return Promise.all(__WEBPACK_IMPORTED_MODULE_0__app__["b" /* router */].getMatchedComponents().map(function (component) {
    if (component.asyncData) {
      return component.asyncData(__WEBPACK_IMPORTED_MODULE_0__app__["c" /* store */], __WEBPACK_IMPORTED_MODULE_0__app__["b" /* router */].currentRoute);
    }
  })).then(function () {
    context.initialState = __WEBPACK_IMPORTED_MODULE_0__app__["c" /* store */].state;
    return __WEBPACK_IMPORTED_MODULE_0__app__["a" /* app */];
  });
});

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return app; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vuex_index_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__theme_Layout_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_on_toast__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_on_toast___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue_on_toast__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__theme_AppHeader_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__theme_LoadingIndicator_vue__ = __webpack_require__(48);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__router__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__vuex_index_js__["a"]; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };










__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_4_vue_on_toast___default.a);

__WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('appHeader-comp', __WEBPACK_IMPORTED_MODULE_5__theme_AppHeader_vue__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('loading-indicator', __WEBPACK_IMPORTED_MODULE_6__theme_LoadingIndicator_vue__["a" /* default */]);

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(_extends({
  router: __WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */]
}, __WEBPACK_IMPORTED_MODULE_2__theme_Layout_vue__["a" /* default */], {
  store: __WEBPACK_IMPORTED_MODULE_1__vuex_index_js__["a" /* default */]
}));



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__posts__ = __webpack_require__(18);





__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex___default.a);

var state = {
  isAuthenticated: false
};

var store = new __WEBPACK_IMPORTED_MODULE_1_vuex___default.a.Store({
  modules: {
    postsModule: __WEBPACK_IMPORTED_MODULE_3__posts__["a" /* default */]
  },
  state: state,
  getters: {
    isAuthenticated: function isAuthenticated(state) {
      return state.isAuthenticated;
    }
  },
  actions: {
    logout: function logout(context) {
      context.commit('logout');
    },
    login: function login(context, credentials) {
      return new Promise(function (resolve) {
        __WEBPACK_IMPORTED_MODULE_2__app_service_js__["a" /* default */].login(credentials).then(function (data) {
          context.commit('login', data);
          resolve();
        }).catch(function () {
          if (typeof window !== 'undefined') {
            window.alert('Could not login!');
          }
        });
      });
    }
  },
  mutations: {
    logout: function logout(state) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', null);
        window.localStorage.setItem('tokenExpiration', null);
      }
      state.isAuthenticated = false;
    },
    login: function login(state, token) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', token.token);
        window.localStorage.setItem('tokenExpiration', token.expiration);
      }
      state.isAuthenticated = true;
    }
  }
});

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function (event) {
    var expiration = window.localStorage.getItem('tokenExpiration');
    var unixTimestamp = new Date().getTime() / 1000;
    if (expiration !== null && parseInt(expiration) - unixTimestamp > 0) {
      store.state.isAuthenticated = true;
    }
  });
}

/* harmony default export */ __webpack_exports__["a"] = (store);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_service_js__ = __webpack_require__(7);

var defaultState = {
  posts: [],
  categoryId: 0
};

var inBrowser = typeof window !== 'undefined';
var state = inBrowser && window.__INITIAL_STATE__ ? window.__INITIAL_STATE__.postsModule : defaultState;

var getters = {
  posts: function posts(state) {
    return state.posts;
  }
};

var actions = {
  updateCategory: function updateCategory(context, categoryId) {
    return __WEBPACK_IMPORTED_MODULE_0__app_service_js__["a" /* default */].getPosts(categoryId).then(function (data) {
      context.commit('updateCategory', { categoryId: categoryId, posts: data });
    });
  }
};

var mutations = {
  updateCategory: function updateCategory(state, category) {
    state.categoryId = category.categoryId;
    state.posts = category.posts;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ({
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Layout_vue__ = __webpack_require__(8);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_03c42142_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Layout_vue__ = __webpack_require__(31);
function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(20),i.__inject__&&i.__inject__(ssrContext),i)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "6432c550"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Layout_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_03c42142_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Layout_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("5dfa04ba", content, true, context)
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".toast-container{position:fixed;z-index:999999;pointer-events:auto}#toast-container *{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.toast-container>div{margin:0 0 6px;padding:15px 15px 15px 10px;width:300px;-moz-border-radius:3px 3px 3px 3px;-webkit-border-radius:3px 3px 3px 3px;border-radius:3px 3px 3px 3px;-moz-box-shadow:0 0 12px #999;-webkit-box-shadow:0 0 12px #999;box-shadow:0 0 12px #999;color:#fff}.toast-container>:hover{-moz-box-shadow:0 0 12px #000;-webkit-box-shadow:0 0 12px #000;box-shadow:0 0 12px #000;cursor:pointer}.toast-container.toast-bottom-center,.toast-container.toast-center,.toast-container.toast-top-center{width:100%;pointer-events:none;left:0;right:0}.toast-container.toast-bottom-center>div,.toast-container.toast-center>div,.toast-container.toast-top-center>div{margin:6px auto;pointer-events:auto}.toast-container.toast-bottom-center>button,.toast-container.toast-center>button,.toast-container.toast-top-center>button{pointer-events:auto}.vot-top-full-width{top:0;right:0;width:100%}.vot-bottom-full-width{bottom:0;right:0;width:100%}.vot-top-left{top:12px;left:12px}.vot-top-center{top:12px}.vot-top-right{top:12px;right:12px}.vot-bottom-right{right:12px;bottom:12px}.vot-bottom-center{bottom:12px}.vot-bottom-left{bottom:12px;left:12px}.vot-center{top:45%}.toast-container .ease-out-right-enter{opacity:0;transform:translateX(200%)}.toast-container .ease-out-right-enter-to{transition:all .5s;transform:translateX(0)}.toast-container .ease-out-right-leave-to{opacity:0;transition:all .5s;transform:translateX(100%)}.toast-container .ease-out-left-enter{opacity:0;transform:translateX(-200%)}.toast-container .ease-out-left-enter-to{transition:all .5s;transform:translateX(0)}.toast-container .ease-out-left-leave-to{opacity:0;transition:all .5s;transform:translateX(-100%)}.toast-container .ease-out-left-leave-active,.toast-container .ease-out-right-leave-active{position:absolute}.toast-container .ease-out-left-move,.toast-container .ease-out-right-move{transition:all .5s}.toast-container .fade-enter-active,.toast-container .fade-leave-active{transition:all .5s linear}.toast-container .fade-leave-active{position:absolute}.toast-container .fade-enter,.toast-container .fade-leave-to{opacity:0;transform:translateX(0)}.toast-container .fade-move{transition:all .5s}.toast{display:-webkit-flex;display:flex;-webkit-flex-direction:row;flex-direction:row;-webkit-justify-content:flex-start;justify-content:flex-start;background-color:#030303;margin-right:10px}.toaster-icon{font-weight:400;color:#fff}.vot-title{font-weight:700}.vot-message{-ms-word-wrap:break-word;word-wrap:break-word}.vot-message a,.vot-message label{color:#fff}.vot-message a:hover{color:#ccc;text-decoration:none}.toast-close-button{position:relative;right:-.2em;top:-.2em;float:right;font-size:20px;font-weight:700;color:#fff;-webkit-text-shadow:0 1px 0 #fff;text-shadow:0 1px 0 #fff;opacity:.8;z-index:999}.toast-close-button:focus,.toast-close-button:hover{color:#000;text-decoration:none;cursor:pointer;opacity:.4}button.toast-close-button{padding:0;cursor:pointer;background:transparent;border:0;-webkit-appearance:none}.toast-content{width:95%;margin-left:10px}.vot-icon-error,.vot-icon-info,.vot-icon-success,.vot-icon-wait,.vot-icon-warning{width:35px;display:flex;background-repeat:no-repeat;background-position:100% 50%}.vot-icon-info{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVEhLtZa9SgNBEMc9sUxxRcoUKSzSWIhXpFMhhYWFhaBg4yPYiWCXZxBLERsLRS3EQkEfwCKdjWJAwSKCgoKCcudv4O5YLrt7EzgXhiU3/4+b2ckmwVjJSpKkQ6wAi4gwhT+z3wRBcEz0yjSseUTrcRyfsHsXmD0AmbHOC9Ii8VImnuXBPglHpQ5wwSVM7sNnTG7Za4JwDdCjxyAiH3nyA2mtaTJufiDZ5dCaqlItILh1NHatfN5skvjx9Z38m69CgzuXmZgVrPIGE763Jx9qKsRozWYw6xOHdER+nn2KkO+Bb+UV5CBN6WC6QtBgbRVozrahAbmm6HtUsgtPC19tFdxXZYBOfkbmFJ1VaHA1VAHjd0pp70oTZzvR+EVrx2Ygfdsq6eu55BHYR8hlcki+n+kERUFG8BrA0BwjeAv2M8WLQBtcy+SD6fNsmnB3AlBLrgTtVW1c2QN4bVWLATaIS60J2Du5y1TiJgjSBvFVZgTmwCU+dAZFoPxGEEs8nyHC9Bwe2GvEJv2WXZb0vjdyFT4Cxk3e/kIqlOGoVLwwPevpYHT+00T+hWwXDf4AJAOUqWcDhbwAAAAASUVORK5CYII=\")}.vot-icon-wait{background-size:29px 29px;background-image:url(\"data:image/gif;base64,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\")}.vot-icon-error{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHOSURBVEhLrZa/SgNBEMZzh0WKCClSCKaIYOED+AAKeQQLG8HWztLCImBrYadgIdY+gIKNYkBFSwu7CAoqCgkkoGBI/E28PdbLZmeDLgzZzcx83/zZ2SSXC1j9fr+I1Hq93g2yxH4iwM1vkoBWAdxCmpzTxfkN2RcyZNaHFIkSo10+8kgxkXIURV5HGxTmFuc75B2RfQkpxHG8aAgaAFa0tAHqYFfQ7Iwe2yhODk8+J4C7yAoRTWI3w/4klGRgR4lO7Rpn9+gvMyWp+uxFh8+H+ARlgN1nJuJuQAYvNkEnwGFck18Er4q3egEc/oO+mhLdKgRyhdNFiacC0rlOCbhNVz4H9FnAYgDBvU3QIioZlJFLJtsoHYRDfiZoUyIxqCtRpVlANq0EU4dApjrtgezPFad5S19Wgjkc0hNVnuF4HjVA6C7QrSIbylB+oZe3aHgBsqlNqKYH48jXyJKMuAbiyVJ8KzaB3eRc0pg9VwQ4niFryI68qiOi3AbjwdsfnAtk0bCjTLJKr6mrD9g8iq/S/B81hguOMlQTnVyG40wAcjnmgsCNESDrjme7wfftP4P7SP4N3CJZdvzoNyGq2c/HWOXJGsvVg+RA/k2MC/wN6I2YA2Pt8GkAAAAASUVORK5CYII=\")}.vot-icon-success{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADsSURBVEhLY2AYBfQMgf///3P8+/evAIgvA/FsIF+BavYDDWMBGroaSMMBiE8VC7AZDrIFaMFnii3AZTjUgsUUWUDA8OdAH6iQbQEhw4HyGsPEcKBXBIC4ARhex4G4BsjmweU1soIFaGg/WtoFZRIZdEvIMhxkCCjXIVsATV6gFGACs4Rsw0EGgIIH3QJYJgHSARQZDrWAB+jawzgs+Q2UO49D7jnRSRGoEFRILcdmEMWGI0cm0JJ2QpYA1RDvcmzJEWhABhD/pqrL0S0CWuABKgnRki9lLseS7g2AlqwHWQSKH4oKLrILpRGhEQCw2LiRUIa4lwAAAABJRU5ErkJggg==\")}.vot-icon-warning{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGYSURBVEhL5ZSvTsNQFMbXZGICMYGYmJhAQIJAICYQPAACiSDB8AiICQQJT4CqQEwgJvYASAQCiZiYmJhAIBATCARJy+9rTsldd8sKu1M0+dLb057v6/lbq/2rK0mS/TRNj9cWNAKPYIJII7gIxCcQ51cvqID+GIEX8ASG4B1bK5gIZFeQfoJdEXOfgX4QAQg7kH2A65yQ87lyxb27sggkAzAuFhbbg1K2kgCkB1bVwyIR9m2L7PRPIhDUIXgGtyKw575yz3lTNs6X4JXnjV+LKM/m3MydnTbtOKIjtz6VhCBq4vSm3ncdrD2lk0VgUXSVKjVDJXJzijW1RQdsU7F77He8u68koNZTz8Oz5yGa6J3H3lZ0xYgXBK2QymlWWA+RWnYhskLBv2vmE+hBMCtbA7KX5drWyRT/2JsqZ2IvfB9Y4bWDNMFbJRFmC9E74SoS0CqulwjkC0+5bpcV1CZ8NMej4pjy0U+doDQsGyo1hzVJttIjhQ7GnBtRFN1UarUlH8F3xict+HY07rEzoUGPlWcjRFRr4/gChZgc3ZL2d8oAAAAASUVORK5CYII=\")}.vot-info{background-color:#2f96b4}.vot-success{background-color:#51a351}.vot-error{background-color:#bd362f}.vot-wait{background-color:#2f96b4}.vot-warning{background-color:#f89406}.accordion-header.card-header{background-color:#f0e7d8;border:1px solid #aeadad}.accordion-header.card-header button{background-color:#f0e7d8;color:#4f4f4f;text-transform:uppercase;font-size:.85em;font-weight:700;text-align:left;border:none;cursor:pointer}.accordion-header.card-header button:focus{box-shadow:none}.accordion-header.card-header button:hover{background-color:inherit;color:#9c9c9c}.accordion-body.card-body{border:1px solid #aeadad;border-top:none}.breadcrumb{text-transform:uppercase;font-size:.8em;font-weight:700;font-family:Helvetica,Arial,sans-serif;background-color:#efefef;border:1px solid #ddd}.breadcrumb-item a{color:#ba0000}.breadcrumb-item a:hover{color:#870000}.btn-row>div{justify-content:space-between}button.btn{cursor:pointer;text-transform:uppercase;font-size:1em}.btn-search{background-color:#447c9d;border:1px solid #3c6e8b}.btn-search:hover{background-color:#356079}.btn-clear-search{background-color:#bf8240;border:1px solid #7e562a}.btn-clear-search:hover{background-color:#996833}h2 .btn-delete{font-size:.5em!important;float:right}button.btn-delete{background-color:#ba0000;color:#fff;cursor:auto}button.btn-delete:hover:not(.disabled){background-color:#870000;cursor:pointer}button.btn-spaced{margin-right:6px}input.form-control{color:#777;font-family:Helvetica,Arial,sans-serif;font-size:.93em}.form-row>.col,.form-row>[class*=col-]{display:flex;align-items:center}.col-form-label{text-transform:uppercase;font-size:.93em}@media (min-width:576px){.col-form-label.col-sm-2.text-left{padding-left:5%}}.b-table tbody tr{cursor:pointer}.columns{flex-wrap:wrap}body,html{height:100%;width:100%;padding:0;margin:0}body{background-color:#e7dcc8;color:#222;font-size:14px;height:100%;flex-direction:column;flex:1}#app,body{min-height:100vh;display:flex}#app{flex-direction:column}.main-section{flex:1 0 auto;margin-top:60px}.main-section,footer{background-color:#e7dcc8}footer{text-align:center}.heading,h1,h2,h3,h4,h5,h6{text-transform:uppercase;font-weight:700;color:#222}h2{font-size:2em}h4{font-size:1.17em}#app{font-family:Roboto Condensed,Franklin Gothic,Arial Narrow,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.route-content{padding:20px 0}.container{padding-bottom:15px;margin-bottom:20px;border-radius:5px}.fade-enter-active{transition-property:opacity;transition-duration:.25s}.fade-leave-active{transition-property:opacity;transition-duration:0s;position:absolute}.fade-enter-active{transition-delay:.15s}.fade-enter,.fade-leave-active{opacity:0}", ""]);

// exports


/***/ }),
/* 22 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("42833a71", content, true, context)
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".accordion-header.card-header{background-color:#f0e7d8;border:1px solid #aeadad}.accordion-header.card-header button{background-color:#f0e7d8;color:#4f4f4f;text-transform:uppercase;font-size:.85em;font-weight:700;text-align:left;border:none;cursor:pointer}.accordion-header.card-header button:focus{box-shadow:none}.accordion-header.card-header button:hover{background-color:inherit;color:#9c9c9c}.accordion-body.card-body{border:1px solid #aeadad;border-top:none}.breadcrumb{text-transform:uppercase;font-size:.8em;font-weight:700;font-family:Helvetica,Arial,sans-serif;background-color:#efefef;border:1px solid #ddd}.breadcrumb-item a{color:#ba0000}.breadcrumb-item a:hover{color:#870000}.btn-row>div{justify-content:space-between}button.btn{cursor:pointer;text-transform:uppercase;font-size:1em}.btn-search{background-color:#447c9d;border:1px solid #3c6e8b}.btn-search:hover{background-color:#356079}.btn-clear-search{background-color:#bf8240;border:1px solid #7e562a}.btn-clear-search:hover{background-color:#996833}h2 .btn-delete{font-size:.5em!important;float:right}button.btn-delete{background-color:#ba0000;color:#fff;cursor:auto}button.btn-delete:hover:not(.disabled){background-color:#870000;cursor:pointer}button.btn-spaced{margin-right:6px}input.form-control{color:#777;font-family:Helvetica,Arial,sans-serif;font-size:.93em}.form-row>.col,.form-row>[class*=col-]{display:flex;align-items:center}.col-form-label{text-transform:uppercase;font-size:.93em}@media (min-width:576px){.col-form-label.col-sm-2.text-left{padding-left:5%}}.b-table tbody tr{cursor:pointer}#headerStyle .appNav{min-height:50px;max-height:60px;position:fixed;width:100%;top:0;z-index:50;background-color:#fff;box-shadow:0 3px 4px silver;display:flex;flex-direction:row;align-items:center}#headerStyle .navRight{margin-left:auto;margin-right:20px}#headerStyle .navLeft{margin-right:10px;margin-left:120px}#headerStyle .navText{height:35px;font-size:20px;font-weight:700;text-transform:uppercase;padding:0;margin-top:10px;color:rgba(0,0,0,.5);text-decoration:none}#headerStyle #chiLogo{width:80px;height:80px;margin-left:25px;margin-top:-20px;position:absolute}", ""]);

// exports


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"headerStyle"}},[_vm._ssrNode("<nav class=\"appNav\">","</nav>",[_c('router-link',{attrs:{"to":"/home","exact":""}},[_c('img',{attrs:{"id":"chiLogo","src":__webpack_require__(26),"alt":"Lunch App"}})]),_vm._ssrNode(" "),_c('router-link',{staticClass:"navText navLeft",attrs:{"to":"/home","exact":""}},[_c('div',[_vm._v("Lunchable")])]),_vm._ssrNode(" "),_c('router-link',{staticClass:"navText navRight",attrs:{"to":"/login"}},[(_vm.isAuthenticated)?_c('div',[_vm._v("LOGOUT")]):_c('div',[_vm._v("LOGIN")])])],2)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1c2130b39c0f14304f01b708489ee8c2.png";

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3f16aeca_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_AppFooter_vue__ = __webpack_require__(30);
function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(28),i.__inject__&&i.__inject__(ssrContext),i)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "3e2d5734"
var Component = normalizeComponent(
  __vue_script__,
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3f16aeca_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_AppFooter_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("6434bea8", content, true, context)
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".footStyle{height:35px;font-size:15px;text-transform:uppercase;padding:0;color:rgba(0,0,0,.5)}", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('footer',[_vm._ssrNode("<div class=\"footStyle\"><p>Lunch Application - Emily Weis</p></div>")])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('toast-container'),_vm._ssrNode(" "),_c('app-header'),_vm._ssrNode(" "),_vm._ssrNode("<section class=\"main-section section\">","</section>",[_vm._ssrNode("<div class=\"container content\">","</div>",[_c('router-view')],1)]),_vm._ssrNode(" "),_c('app-footer')],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__theme_Login_vue__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__theme_NotFound_vue__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__theme_Home_vue__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__theme_EditTopFive_vue__ = __webpack_require__(44);







__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router___default.a);

var router = new __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a({
  mode: 'hash',
  linkActiveClass: 'is-active',
  scrollBehavior: function scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
  routes: [{ path: '/login', component: __WEBPACK_IMPORTED_MODULE_2__theme_Login_vue__["a" /* default */] }, { path: '/home', component: __WEBPACK_IMPORTED_MODULE_4__theme_Home_vue__["a" /* default */] }, { path: '/edittopfive', component: __WEBPACK_IMPORTED_MODULE_5__theme_EditTopFive_vue__["a" /* default */] }, { path: '/', redirect: '/home' }, { path: '*', component: __WEBPACK_IMPORTED_MODULE_3__theme_NotFound_vue__["a" /* default */] }]
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("vue-router");

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue__ = __webpack_require__(11);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5d8cefe8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Login_vue__ = __webpack_require__(37);
function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(35),i.__inject__&&i.__inject__(ssrContext),i)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "22c5819a"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5d8cefe8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Login_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(36);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("5442356e", content, true, context)
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "#login{display:flex;justify-content:center;margin-top:50px}#login .login{margin:20px;padding:20px}#login .card{overflow:hidden;margin:10px;flex-basis:content;align-items:stretch;flex-wrap:wrap;border:none;border-radius:5px;background-color:#fff}#login .card-header{text-align:left;font-size:30px;box-shadow:none}#login .card-main{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:15px}#login .control{margin-right:30px}#login .loginButton{margin-top:10px}#login .button{background-color:#008cba;border-radius:4px;border:none;padding:10px;color:#fff;text-transform:uppercase}#login .button:hover{background-color:#016e92}#login input[id=loginFormInput]{width:100%;padding:12px 20px;margin:8px 0;display:inline-block;border:1px solid #ccc;border-radius:4px;box-sizing:border-box}#login .label{font-size:15px}", ""]);

// exports


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"login"}},[_vm._ssrNode("<div class=\"card\"><div class=\"login\">"+((_vm.isAuthenticated)?("<div class=\"card-main\">\n        Hello authenticated user!\n        <button class=\"button loginButton\">\n          Logout\n        </button></div>"):("<h2 class=\"card-header\">Login</h2>"))+" <div class=\"card-main\"><div class=\"field is-horizontal\"><div class=\"field-label is-normal\"><label class=\"label\">Username</label></div> <div class=\"field-body\"><div class=\"field\"><div class=\"control\"><input id=\"loginFormInput\" type=\"text\" placeholder=\"Your username\""+(_vm._ssrAttr("value",(_vm.username)))+" class=\"input\"></div></div></div></div> <div class=\"field is-horizontal\"><div class=\"field-label is-normal\"><label class=\"label\">Password</label></div> <br> <div class=\"field-body\"><div class=\"field\"><div class=\"control\"><input id=\"loginFormInput\" type=\"password\" placeholder=\"Your password\""+(_vm._ssrAttr("value",(_vm.password)))+" class=\"input\"></div></div></div></div> <div class=\"field is-horizontal\"><div class=\"field-label\"></div> <div class=\"field-body\"><div class=\"field\"><div class=\"control\"><button id=\"login\" class=\"button is-info loginButton\">\n                Login\n                </button></div></div></div></div></div></div></div>")])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b7a57594_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NotFound_vue__ = __webpack_require__(39);
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "03ce7c95"
var Component = normalizeComponent(
  __vue_script__,
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b7a57594_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NotFound_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._ssrNode("page not found")])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__ = __webpack_require__(12);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cc811170_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Home_vue__ = __webpack_require__(43);
function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(41),i.__inject__&&i.__inject__(ssrContext),i)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "ea46aff6"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cc811170_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Home_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(42);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("985b7c7c", content, true, context)
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "#home{display:flex;align-items:flex-start;margin-left:10%;margin-right:10%;margin-top:50px}#home .options{order:1;margin:20px;padding:20px}#home .topFive{order:2;margin:20px;padding:20px}#home .card{flex:1;overflow:hidden;margin:10px;flex-basis:content;align-items:stretch;flex-wrap:wrap;border:none;border-radius:5px;background-color:#fff}#home .card-header{text-align:left;font-size:30px;box-shadow:none}#home .card-main{display:flex;flex-direction:column;justify-content:stretch;align-items:center;padding:15px 0}#home table{width:100%;border-collapse:collapse;font-size:15px;margin:10px}#home td,#home th{padding:7px;text-align:left;border-bottom:1px solid #ddd}#home tr:hover{background-color:#f5f5f5}#home .button{background-color:#008cba;border-radius:4px;border:none;padding:10px;color:#fff;text-transform:uppercase}#home .button:hover{background-color:#016e92}", ""]);

// exports


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"home"}},[_vm._ssrNode("<div class=\"card\"><div class=\"options\"><div class=\"card-header\">Lunch Options</div> <div class=\"card-main\"><table><thead><tr><th>Restaurant Name</th> <th>Restaurant Type</th> <th>Food Type</th> <th>Price</th></tr></thead> <tbody>"+(_vm._ssrList((_vm.restaurantData),function(row,index){return ("<tr><td>"+_vm._ssrEscape(_vm._s(row.restaurantName))+"</td> <td>"+_vm._ssrEscape(_vm._s(row.restaurantType))+"</td> <td>"+_vm._ssrEscape(_vm._s(row.foodType))+"</td> <td>"+_vm._ssrEscape(_vm._s(row.price))+"</td></tr>")}))+"</tbody></table></div></div></div> "),_vm._ssrNode("<div class=\"card\">","</div>",[_vm._ssrNode("<div class=\"topFive\">","</div>",[_vm._ssrNode("<div class=\"card-header\">Your Top 5</div> <div class=\"card-main\"><table><thead><tr><th>Restaurant Ranking</th> <th>Restaurant Name</th></tr></thead> "+(_vm._ssrList((_vm.topFiveData),function(row,index){return ("<tbody><tr><td>1</td> <td>"+_vm._ssrEscape(_vm._s(row.restaurantOne))+"</td></tr> <tr><td>2</td> <td>"+_vm._ssrEscape(_vm._s(row.restaurantTwo))+"</td></tr> <tr><td>3</td> <td>"+_vm._ssrEscape(_vm._s(row.restaurantThree))+"</td></tr> <tr><td>4</td> <td>"+_vm._ssrEscape(_vm._s(row.restaurantFour))+"</td></tr> <tr><td>5</td> <td>"+_vm._ssrEscape(_vm._s(row.restaurantFive))+"</td></tr></tbody>")}))+"</table></div> "),_c('router-link',{staticClass:"button",attrs:{"to":"/EditTopFive","tag":"button"}},[_vm._v("Edit Top 5")]),_vm._ssrNode(" <button type=\"submit\" class=\"button\">Submit</button>")],2)])],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditTopFive_vue__ = __webpack_require__(13);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c1eb0ce6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_EditTopFive_vue__ = __webpack_require__(47);
function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(45),i.__inject__&&i.__inject__(ssrContext),i)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "04f646f2"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditTopFive_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c1eb0ce6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_EditTopFive_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(46);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("4ab1e656", content, true, context)
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "#editTopFive{display:flex;justify-content:center;margin-top:50px}#editTopFive table{align-self:center}#editTopFive .editTopFive{margin:20px;padding:20px}#editTopFive .card{overflow:hidden;margin:10px;flex-basis:content;align-items:stretch;flex-wrap:wrap;border:none;border-radius:5px;background-color:#fff}#editTopFive .card-header{text-align:left;font-size:30px;box-shadow:none}#editTopFive .card-main{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:15px}#editTopFive table{width:100%;border-collapse:collapse;font-size:15px;margin:10px}#editTopFive td,#editTopFive th{padding:7px;text-align:left;border-bottom:1px solid #ddd}#editTopFive tr:hover{background-color:#f5f5f5}#editTopFive .button{background-color:#008cba;border-radius:4px;border:none;padding:10px;color:#fff;text-transform:uppercase}#editTopFive .button:hover{background-color:#016e92}", ""]);

// exports


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"editTopFive"}},[_vm._ssrNode("<div class=\"card\">","</div>",[_vm._ssrNode("<div class=\"editTopFive\">","</div>",[_vm._ssrNode("<div class=\"card-header\">Edit Top Five</div> <div class=\"card-main\">"+((this.topFiveData.length)?("<table><tbody><tr><td><label id=\"choiceLabel\" for=\"firstChoice\">First Choice</label></td> <td><select id=\"firstChoice\" name=\"firstChoice\"><option value hidden=\"hidden\">"+_vm._ssrEscape(_vm._s(this.topFiveData[0].restaurantOne))+"</option> "+(_vm._ssrList((_vm.restaurantData),function(data,index){return ("<option>"+_vm._ssrEscape(_vm._s(data.restaurantName))+"</option>")}))+"</select></td></tr> <tr><td><label id=\"choiceLabel\" for=\"secondChoice\">Second Choice</label></td> <td><select id=\"secondChoice\" name=\"secondChoice\"><option value hidden=\"hidden\">"+_vm._ssrEscape(_vm._s(this.topFiveData[0].restaurantTwo))+"</option> "+(_vm._ssrList((_vm.restaurantData),function(data,index){return ("<option>"+_vm._ssrEscape(_vm._s(data.restaurantName))+"</option>")}))+"</select></td></tr> <tr><td><label id=\"choiceLabel\" for=\"thirdChoice\">Third Choice</label></td> <td><select id=\"thirdChoice\" name=\"thirdChoice\"><option value hidden=\"hidden\">"+_vm._ssrEscape(_vm._s(this.topFiveData[0].restaurantThree))+"</option> "+(_vm._ssrList((_vm.restaurantData),function(data,index){return ("<option>"+_vm._ssrEscape(_vm._s(data.restaurantName))+"</option>")}))+"</select></td></tr> <tr><td><label id=\"choiceLabel\" for=\"fourthChoice\">Fourth Choice</label></td> <td><select id=\"fourthChoice\" name=\"fourthChoice\"><option value hidden=\"hidden\">"+_vm._ssrEscape(_vm._s(this.topFiveData[0].restaurantFour))+"</option> "+(_vm._ssrList((_vm.restaurantData),function(data,index){return ("<option>"+_vm._ssrEscape(_vm._s(data.restaurantName))+"</option>")}))+"</select></td></tr> <tr><td><label id=\"choiceLabel\" for=\"fifthChoice\">Fifth Choice</label></td> <td><select id=\"fifthChoice\" name=\"fifthChoice\"><option value hidden=\"hidden\">"+_vm._ssrEscape(_vm._s(this.topFiveData[0].restaurantFive))+"</option> "+(_vm._ssrList((_vm.restaurantData),function(data,index){return ("<option>"+_vm._ssrEscape(_vm._s(data.restaurantName))+"</option>")}))+"</select></td></tr></tbody></table>"):"<!---->")+"</div> "),_c('router-link',{staticClass:"button",attrs:{"to":"/Home","tag":"button"}},[_vm._v("Back")]),_vm._ssrNode(" <button type=\"submit\" class=\"button\">Save </button>")],2)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LoadingIndicator_vue__ = __webpack_require__(14);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_78d9d4c8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LoadingIndicator_vue__ = __webpack_require__(51);
function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(49),i.__inject__&&i.__inject__(ssrContext),i)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "9a9e374e"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LoadingIndicator_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_78d9d4c8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LoadingIndicator_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(50);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(2)
module.exports.__inject__ = function (context) {
  add("80d85c8e", content, true, context)
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".loading-indicator{cursor:wait;top:0;bottom:0;background-color:#fff;color:#000;opacity:.5;position:absolute;width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:998;-webkit-transform:translateZ(0)}.loading-indicator .loading-image{width:14em;height:14em}.fade-loading-enter-active,.fade-loading-leave-active{transition:opacity .5s}.fade-loading-enter,.fade-loading-leave-to{opacity:0}", ""]);

// exports


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"fade-loading","tag":"div"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isLoading),expression:"isLoading"}],staticClass:"loading-indicator"},[_c('img',{staticClass:"loading-image",attrs:{"src":__webpack_require__(52)}})])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a09166e877485e2b54541d8fa708c123.gif";

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map