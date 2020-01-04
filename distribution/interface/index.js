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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../application-server/dist/actions/definitions.js":
/*!*********************************************************!*\
  !*** ../application-server/dist/actions/definitions.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar ACTIONS;\n(function (ACTIONS) {\n    ACTIONS[\"START_PING\"] = \"start-ping\";\n    ACTIONS[\"STOP_PING\"] = \"stop-ping\";\n    ACTIONS[\"PING_STATUS\"] = \"ping-status\";\n    ACTIONS[\"SAMPLE_ACTION\"] = \"sample-action\";\n})(ACTIONS = exports.ACTIONS || (exports.ACTIONS = {}));\n\n\n//# sourceURL=webpack:///../application-server/dist/actions/definitions.js?");

/***/ }),

/***/ "../application-server/dist/actions/index.js":
/*!***************************************************!*\
  !*** ../application-server/dist/actions/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar sample_action_1 = __webpack_require__(/*! ./sample-action */ \"../application-server/dist/actions/sample-action.js\");\nexports.listenSampleAction = sample_action_1.listenSampleAction;\nexports.sendSampleAction = sample_action_1.sendSampleAction;\nvar ping_1 = __webpack_require__(/*! ./ping */ \"../application-server/dist/actions/ping.js\");\nexports.listenPing = ping_1.listenPing;\nexports.sendStartPing = ping_1.sendStartPing;\nexports.sendStopPing = ping_1.sendStopPing;\nexports.listenForPingStatus = ping_1.listenForPingStatus;\nexports.removeListenForPingStatus = ping_1.removeListenForPingStatus;\n\n\n//# sourceURL=webpack:///../application-server/dist/actions/index.js?");

/***/ }),

/***/ "../application-server/dist/actions/ping.js":
/*!**************************************************!*\
  !*** ../application-server/dist/actions/ping.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst electron_1 = __webpack_require__(/*! electron */ \"electron\");\nconst definitions_1 = __webpack_require__(/*! ./definitions */ \"../application-server/dist/actions/definitions.js\");\nconst PING_STATUS = {\n    isPinging: false\n};\nfunction listenPing() {\n    electron_1.ipcMain.on(definitions_1.ACTIONS.START_PING, event => {\n        PING_STATUS.isPinging = true;\n        event.sender.send(definitions_1.ACTIONS.PING_STATUS, PING_STATUS);\n    });\n    electron_1.ipcMain.on(definitions_1.ACTIONS.STOP_PING, event => {\n        PING_STATUS.isPinging = false;\n        event.sender.send(definitions_1.ACTIONS.PING_STATUS, PING_STATUS);\n    });\n}\nexports.listenPing = listenPing;\nfunction sendStartPing(args) {\n    electron_1.ipcRenderer.send(definitions_1.ACTIONS.START_PING, args);\n}\nexports.sendStartPing = sendStartPing;\nfunction sendStopPing(args) {\n    electron_1.ipcRenderer.send(definitions_1.ACTIONS.STOP_PING, args);\n}\nexports.sendStopPing = sendStopPing;\nfunction listenForPingStatus(callback) {\n    electron_1.ipcRenderer.on(definitions_1.ACTIONS.PING_STATUS, callback);\n}\nexports.listenForPingStatus = listenForPingStatus;\nfunction removeListenForPingStatus(callback) {\n    electron_1.ipcRenderer.removeListener(definitions_1.ACTIONS.PING_STATUS, callback);\n}\nexports.removeListenForPingStatus = removeListenForPingStatus;\n\n\n//# sourceURL=webpack:///../application-server/dist/actions/ping.js?");

/***/ }),

/***/ "../application-server/dist/actions/sample-action.js":
/*!***********************************************************!*\
  !*** ../application-server/dist/actions/sample-action.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst electron_1 = __webpack_require__(/*! electron */ \"electron\");\nconst definitions_1 = __webpack_require__(/*! ./definitions */ \"../application-server/dist/actions/definitions.js\");\nfunction listenSampleAction() {\n    electron_1.ipcMain.on(definitions_1.ACTIONS.SAMPLE_ACTION, (_, args) => {\n        // eslint-disable-next-line no-console\n        console.log(\"Received sample actions with args:\", args);\n    });\n}\nexports.listenSampleAction = listenSampleAction;\nfunction sendSampleAction(args) {\n    electron_1.ipcRenderer.send(definitions_1.ACTIONS.SAMPLE_ACTION, args);\n}\nexports.sendSampleAction = sendSampleAction;\n\n\n//# sourceURL=webpack:///../application-server/dist/actions/sample-action.js?");

/***/ }),

/***/ "../application-server/dist/index.js":
/*!*******************************************!*\
  !*** ../application-server/dist/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar renderer_1 = __webpack_require__(/*! ./renderer */ \"../application-server/dist/renderer.js\");\nexports.IpcActions = renderer_1.IpcActions;\nvar main_1 = __webpack_require__(/*! ./main */ \"../application-server/dist/main.js\");\nexports.instantiateListeners = main_1.instantiateListeners;\n\n\n//# sourceURL=webpack:///../application-server/dist/index.js?");

/***/ }),

/***/ "../application-server/dist/main.js":
/*!******************************************!*\
  !*** ../application-server/dist/main.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst actions_1 = __webpack_require__(/*! ./actions */ \"../application-server/dist/actions/index.js\");\nfunction instantiateListeners() {\n    actions_1.listenPing();\n    actions_1.listenSampleAction();\n}\nexports.instantiateListeners = instantiateListeners;\n\n\n//# sourceURL=webpack:///../application-server/dist/main.js?");

/***/ }),

/***/ "../application-server/dist/renderer.js":
/*!**********************************************!*\
  !*** ../application-server/dist/renderer.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst actions_1 = __webpack_require__(/*! ./actions */ \"../application-server/dist/actions/index.js\");\nexports.IpcActions = {\n    listenForPingStatus: actions_1.listenForPingStatus,\n    removeListenForPingStatus: actions_1.removeListenForPingStatus,\n    sendStartPing: actions_1.sendStartPing,\n    sendStopPing: actions_1.sendStopPing,\n    sendSampleAction: actions_1.sendSampleAction\n};\n\n\n//# sourceURL=webpack:///../application-server/dist/renderer.js?");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/index.scss?");

/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_1 = __importDefault(__webpack_require__(/*! react */ \"react\"));\nconst react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ \"react-dom\"));\n__webpack_require__(/*! ./index.scss */ \"./src/index.scss\");\nconst application_server_1 = __webpack_require__(/*! @looking-glass/application-server */ \"../application-server/dist/index.js\");\nclass LookingGlass extends react_1.default.PureComponent {\n    constructor() {\n        super(...arguments);\n        this.state = {\n            pingingStatus: undefined\n        };\n        this.startPing = () => application_server_1.IpcActions.sendStartPing({});\n        this.stopPing = () => application_server_1.IpcActions.sendStopPing({});\n        this.setPingStatus = (_, pingingStatus) => this.setState({ pingingStatus });\n    }\n    componentDidMount() {\n        application_server_1.IpcActions.listenForPingStatus(this.setPingStatus);\n    }\n    componentWillUnmount() {\n        application_server_1.IpcActions.removeListenForPingStatus(this.setPingStatus);\n    }\n    render() {\n        return (react_1.default.createElement(\"div\", { className: \"main\" },\n            \"Current pinging state: \",\n            this.maybeRenderStatus(),\n            react_1.default.createElement(\"button\", { onClick: this.startPing, type: \"button\" }, \"Start ping\"),\n            react_1.default.createElement(\"button\", { onClick: this.stopPing, type: \"button\" }, \"Stop ping\")));\n    }\n    maybeRenderStatus() {\n        const { pingingStatus } = this.state;\n        if (pingingStatus === undefined) {\n            return \"No status\";\n        }\n        return pingingStatus.isPinging ? \"Pinging\" : \"Not started\";\n    }\n}\nreact_dom_1.default.render(react_1.default.createElement(LookingGlass, null), document.getElementById(\"main-app\"));\n\n void function register() { /* react-hot-loader/webpack */ var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (!webpackExports) { return; } if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', \"/Users/Kadhir/Desktop/Folders/CS Side Projects/looking-glass/packages/interface/src/index.tsx\"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, \"/Users/Kadhir/Desktop/Folders/CS Side Projects/looking-glass/packages/interface/src/index.tsx\"); } }(); \n\n//# sourceURL=webpack:///./src/index.tsx?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");\n\n//# sourceURL=webpack:///external_%22electron%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = React;\n\n//# sourceURL=webpack:///external_%22React%22?");

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ReactDOM;\n\n//# sourceURL=webpack:///external_%22ReactDOM%22?");

/***/ })

/******/ });