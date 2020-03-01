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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/App.js":
/*!***********************!*\
  !*** ./client/App.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return App; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Item */ \"./client/Item.js\");\n\n\nfunction App() {\n  const [state, updateState] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(1);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    updateState(2);\n  }, []);\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    onClick: () => {\n      updateState(2);\n    }\n  }, \"\\u6309\\u94AE\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, state), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Item__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Item__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Item__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Item__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null));\n}\n\n//# sourceURL=webpack:///./client/App.js?");

/***/ }),

/***/ "./client/Item.js":
/*!************************!*\
  !*** ./client/Item.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Item; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction Item(props) {\n  const {\n    content = \"123123\"\n  } = props;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    onClick: () => {\n      console.log(1);\n    }\n  }, content);\n}\n\n//# sourceURL=webpack:///./client/Item.js?");

/***/ }),

/***/ "./dist/manifest.json":
/*!****************************!*\
  !*** ./dist/manifest.json ***!
  \****************************/
/*! exports provided: main.js, main.js.map, index.html, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"main.js\\\":\\\"js/client.bundle.eb27eff4.js\\\",\\\"main.js.map\\\":\\\"js/client.bundle.eb27eff4.js.map\\\",\\\"index.html\\\":\\\"index.html\\\"}\");\n\n//# sourceURL=webpack:///./dist/manifest.json?");

/***/ }),

/***/ "./server/app.ts":
/*!***********************!*\
  !*** ./server/app.ts ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa */ \"koa\");\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! koa-static */ \"koa-static\");\n/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(koa_static__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router */ \"./server/router/index.ts\");\n\n\n\nconst app = new koa__WEBPACK_IMPORTED_MODULE_0___default.a();\napp.use(_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"].routes());\napp.use(koa_static__WEBPACK_IMPORTED_MODULE_1___default()('./dist'));\napp.listen(8080, () => {\n  console.log('the server is running at localhost:8080');\n});\n\n//# sourceURL=webpack:///./server/app.ts?");

/***/ }),

/***/ "./server/controller/api/base.ts":
/*!***************************************!*\
  !*** ./server/controller/api/base.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _client_App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../client/App */ \"./client/App.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst manifest = __webpack_require__(/*! ../../../dist/manifest.json */ \"./dist/manifest.json\");\n\nconst base = async function (ctx) {\n  const string = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_2__[\"renderToString\"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_client_App__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n  ctx.body = `\n  <!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n      <meta charset=\"UTF-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n      <title>react</title>\n    </head>\n    <body>\n      <div id=\"app\">\n        ${string}\n      </div>\n    </body>\n    <script src=\"./${manifest['main.js']}\"></script>\n    </html>\n  `;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (base);\n\n//# sourceURL=webpack:///./server/controller/api/base.ts?");

/***/ }),

/***/ "./server/router/index.ts":
/*!********************************!*\
  !*** ./server/router/index.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controller_api_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/api/base */ \"./server/controller/api/base.ts\");\n\n\nconst router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a();\nrouter.get('/app', _controller_api_base__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./server/router/index.ts?");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa\");\n\n//# sourceURL=webpack:///external_%22koa%22?");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-router\");\n\n//# sourceURL=webpack:///external_%22koa-router%22?");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-static\");\n\n//# sourceURL=webpack:///external_%22koa-static%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ })

/******/ });