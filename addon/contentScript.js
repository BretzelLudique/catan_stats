/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/contentScript.ts":
/*!******************************!*\
  !*** ./src/contentScript.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.ts\");\n\nnew _game__WEBPACK_IMPORTED_MODULE_0__.Game();\n\n\n//# sourceURL=webpack://catan/./src/contentScript.ts?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Game: () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.ts\");\n/* harmony import */ var _hex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hex */ \"./src/hex.ts\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ \"./src/types.ts\");\n\n\n\nconst rgb2hex = (rgb) => `#${rgb\n    .match(/^rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)$/)\n    .slice(1)\n    .map((n) => parseInt(n, 10).toString(16).padStart(2, \"0\"))\n    .join(\"\")}`;\nclass Game {\n    constructor() {\n        this.parsePlayerName = (logMessage) => {\n            for (const playerName in this.players) {\n                if (logMessage.startsWith(playerName))\n                    return playerName;\n            }\n        };\n        this.initHexs = () => {\n            const hexEntries = _types__WEBPACK_IMPORTED_MODULE_2__.POSITIONS.map((position) => [\n                position,\n                new _hex__WEBPACK_IMPORTED_MODULE_1__.Hex(position),\n            ]);\n            this.hexs = Object.fromEntries(hexEntries);\n        };\n        console.time(\"construct Game representation\");\n        this.players = {};\n        for (let players of document.querySelectorAll(\"div[id*=player_name]\")) {\n            const color = rgb2hex(players.querySelector(\"a\")[\"style\"][\"color\"]);\n            const name = players.querySelector(\"a\").textContent;\n            this.players[name] = new _player__WEBPACK_IMPORTED_MODULE_0__.Player({ color, name });\n        }\n        // console.log(this.players);\n        this.initHexs();\n        console.timeEnd(\"construct Game representation\");\n        const onLogsChange = (logMutations) => {\n            for (const logMutation of logMutations) {\n                for (const logMessage of logMutation.addedNodes) {\n                    if (!(logMessage instanceof HTMLElement))\n                        continue;\n                    let message = logMessage.textContent;\n                    const playerName = this.parsePlayerName(message);\n                    if (playerName === undefined) {\n                        // console.log(\n                        //     \"New log:\",\n                        //     message,\n                        //     \"(todo: handle when playerName is undefined)\"\n                        // );\n                        continue;\n                    }\n                    const player = this.players[playerName];\n                    message = message.replace(`${playerName} `, \"\");\n                    const actions = {\n                        \"Vous perdez \": \"\",\n                        \"Vous obtenez \": \"\",\n                        \"obtient \": \"\",\n                        \"construit une colonie pour \": \"\",\n                        \"construit une route pour \": \"\",\n                    };\n                    for (const actionExpr in actions) {\n                        if (message.startsWith(actionExpr)) {\n                            message = message.replace(actionExpr, \"\");\n                            const resourceValue = Number(message);\n                            console.log(\"New log:\", playerName, message, resourceValue);\n                            const resource = logMessage\n                                .querySelector(\"div.cat_log_token\")\n                                .classList.item(1)\n                                .replace(\"icon_\", \"\");\n                            player.resources[resource] += resourceValue;\n                            break;\n                        }\n                    }\n                }\n            }\n        };\n        new MutationObserver(onLogsChange).observe(document.getElementById(\"logs\"), {\n            childList: true,\n        });\n    }\n}\n\n\n\n//# sourceURL=webpack://catan/./src/game.ts?");

/***/ }),

/***/ "./src/hex.ts":
/*!********************!*\
  !*** ./src/hex.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Hex: () => (/* binding */ Hex)\n/* harmony export */ });\nclass Hex {\n    constructor(position) {\n        this.position = position;\n        this.htmlHex = document.getElementById(`cathex_${position}`);\n        this.parseLands();\n        this.parsePlayerActions();\n        // this.watch();\n    }\n    parseLands() {\n        const classes = this.htmlHex.classList;\n        if (classes.length !== 4 || classes.item(3) === \"cat_undefined\")\n            return;\n        let land;\n        let diceRoll;\n        land = this.htmlHex.classList.item(3).replace(\"cat_\", \"\");\n        diceRoll = Number(document\n            .getElementById(`cat_num_token_${this.position}`)\n            .classList.item(1)\n            .replace(\"cat_num_\", \"\"));\n        this.assign({ land, diceRoll });\n    }\n    _parseRoads() {\n        for (const code of [\"N\", \"W\", \"S\"]) {\n            const road = document.getElementById(`cat_place_road_${this.position}_${code}`);\n            if (road.classList.length === 4) {\n                this[`route${code}`] = road.classList\n                    .item(3)\n                    .replace(\"cat_road_\", \"\");\n            }\n            else {\n                delete this[`route${code}`]; // TODO: cant remove road, so we can remove this line\n            }\n        }\n    }\n    _parseCities() {\n        for (const code of [\"T\", \"D\"]) {\n            const city = document.getElementById(`cat_city_${this.position}_${code}`);\n            if (city) {\n                this[`city${code}`] = city.classList\n                    .item(2)\n                    .replace(\"cat_color_\", \"\");\n            }\n            else {\n                delete this[`city${code}`]; // TODO: cant remove city, so we can remove this line\n            }\n        }\n    }\n    _searchForRobber() {\n        const robber = document.getElementById(\"cat_robber\");\n        if (Hex.parsePosition(robber.parentElement) === this.position) {\n            this.isBlocked = true;\n        }\n        else {\n            delete this.isBlocked;\n        }\n    }\n    parsePlayerActions() {\n        this._parseRoads();\n        this._parseCities();\n        this._searchForRobber();\n    }\n    assign(data = {}) {\n        Object.assign(this, data);\n    }\n    watch() {\n        new MutationObserver(() => this.parsePlayerActions()).observe(this.htmlHex, {\n            childList: true,\n            subtree: true,\n        });\n    }\n}\nHex.parsePosition = (htmlHex) => htmlHex.id.replace(\"cathex_\", \"\");\n// function debounce(callback: Function, delay: number, maxIter: number = 3) {\n//     let timeoutId: ReturnType<typeof setTimeout>;\n//     let count = 0;\n//     return function () {\n//         clearTimeout(timeoutId);\n//         count++;\n//         timeoutId = setTimeout(() => {\n//             if (count === maxIter) {\n//                 callback();\n//             }\n//             count = 0;\n//         }, delay);\n//     };\n// }\n\n\n\n//# sourceURL=webpack://catan/./src/hex.ts?");

/***/ }),

/***/ "./src/player.ts":
/*!***********************!*\
  !*** ./src/player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\nclass Player {\n    constructor(initialData = {}) {\n        this.assign(initialData);\n    }\n    assign(data = {}) {\n        Object.assign(this, data);\n    }\n}\n\n\n\n//# sourceURL=webpack://catan/./src/player.ts?");

/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CITY_WEIGHT: () => (/* binding */ CITY_WEIGHT),\n/* harmony export */   HEX_ROLLS: () => (/* binding */ HEX_ROLLS),\n/* harmony export */   LANDS: () => (/* binding */ LANDS),\n/* harmony export */   POSITIONS: () => (/* binding */ POSITIONS),\n/* harmony export */   ROAD_DIRECTIONS: () => (/* binding */ ROAD_DIRECTIONS),\n/* harmony export */   YIELD_VALUE: () => (/* binding */ YIELD_VALUE)\n/* harmony export */ });\nconst HEX_ROLLS = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12];\nconst LANDS = [\"Forest\", \"Hills\", \"Pasture\", \"Field\", \"Mountain\"];\nconst RESOURCES = [\"lumber\", \"brick\", \"wool\", \"grain\", \"ore\"];\nconst POSITIONS = [\n    \"0_1\",\n    \"0_2\",\n    \"0_3\",\n    \"0_4\",\n    \"1_1\",\n    \"1_2\",\n    \"1_3\",\n    \"1_4\",\n    \"1_5\",\n    \"2_0\",\n    \"2_1\",\n    \"2_2\",\n    \"2_3\",\n    \"2_4\",\n    \"2_5\",\n    \"3_0\",\n    \"3_1\",\n    \"3_2\",\n    \"3_3\",\n    \"3_4\",\n    \"3_5\",\n    \"3_6\",\n    \"4_0\",\n    \"4_1\",\n    \"4_2\",\n    \"4_3\",\n    \"4_4\",\n    \"4_5\",\n    \"5_1\",\n    \"5_2\",\n    \"5_3\",\n    \"5_4\",\n    \"5_5\",\n    \"6_1\",\n    \"6_2\",\n    \"6_3\",\n    \"6_4\",\n];\nconst YIELD_VALUE = [1, 2, 3, 4, 5, 6];\nconst ROAD_DIRECTIONS = [\"north\", \"west\", \"south\"];\nconst CITY_WEIGHT = [1, 2];\n\n\n\n//# sourceURL=webpack://catan/./src/types.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/contentScript.ts");
/******/ 	
/******/ })()
;