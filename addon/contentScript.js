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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Game: () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _hex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hex */ \"./src/hex.ts\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ \"./src/types.ts\");\n\n\nclass Game {\n    constructor() {\n        this.initHexs = () => {\n            const hexEntries = _types__WEBPACK_IMPORTED_MODULE_1__.POSITIONS.map((position) => [\n                position,\n                new _hex__WEBPACK_IMPORTED_MODULE_0__.Hex(position),\n            ]);\n            this.hexs = Object.fromEntries(hexEntries);\n        };\n        this.parseCityNeighbors = (cityId) => {\n            const writtenCoords = cityId.substring(9, 12);\n            const coords = [Number(cityId[9]), Number(cityId[11])];\n            coords[1] -= coords[0] % 2;\n            const orientation = cityId[13];\n            if (orientation === \"D\")\n                coords[0]++;\n            else if (orientation === \"T\")\n                coords[0]--;\n            return [\n                writtenCoords,\n                `${coords[0]}_${coords[1]}`,\n                `${coords[0]}_${coords[1] + 1}`,\n            ];\n        };\n        console.time(\"construct Game representation\");\n        this.players = {};\n        this.initHexs();\n        console.timeEnd(\"construct Game representation\");\n        console.log(\"game values:\", this.hexs);\n    }\n}\n\n\n\n//# sourceURL=webpack://catan/./src/game.ts?");

/***/ }),

/***/ "./src/hex.ts":
/*!********************!*\
  !*** ./src/hex.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Hex: () => (/* binding */ Hex)\n/* harmony export */ });\nclass Hex {\n    constructor(position) {\n        this.position = position;\n        this.htmlHex = document.getElementById(`cathex_${position}`);\n        this.parseResources();\n        this.parsePlayerActions();\n        this.watch();\n    }\n    parseResources() {\n        if (this.htmlHex.classList.length !== 4)\n            return;\n        let resource;\n        let diceRoll;\n        resource = this.htmlHex.classList.item(3).substring(4);\n        diceRoll = Number(document\n            .getElementById(`cat_num_token_${this.position}`)\n            .classList.item(1)\n            .substring(8));\n        this.assign({ resource, diceRoll });\n    }\n    _parseRoads() {\n        for (const code of [\"N\", \"W\", \"S\"]) {\n            const road = document.getElementById(`cat_place_road_${this.position}_${code}`);\n            if (road.classList.length === 4) {\n                this[`route${code}`] = road.classList.item(3).substring(9);\n            }\n            else {\n                delete this[`route${code}`]; // TODO: cant remove road, so we can remove this line\n            }\n        }\n    }\n    _parseCities() {\n        for (const code of [\"T\", \"D\"]) {\n            const city = document.getElementById(`cat_city_${this.position}_${code}`);\n            if (city) {\n                this[`city${code}`] = city.classList.item(2).substring(10);\n            }\n            else {\n                delete this[`city${code}`]; // TODO: cant remove city, so we can remove this line\n            }\n        }\n    }\n    _searchForRobber() {\n        const robber = document.getElementById(\"cat_robber\");\n        if (Hex.parsePosition(robber.parentElement) === this.position) {\n            this.isBlocked = true;\n        }\n        else {\n            delete this.isBlocked;\n        }\n    }\n    parsePlayerActions() {\n        this._parseRoads();\n        this._parseCities();\n        this._searchForRobber();\n    }\n    assign(data = {}) {\n        Object.assign(this, data);\n    }\n    watch() {\n        new MutationObserver(() => this.parsePlayerActions()).observe(this.htmlHex, {\n            childList: true,\n            subtree: true,\n        });\n    }\n}\nHex.parsePosition = (htmlHex) => htmlHex.id.substring(7);\n// function debounce(callback: Function, delay: number, maxIter: number = 3) {\n//     let timeoutId: ReturnType<typeof setTimeout>;\n//     let count = 0;\n//     return function () {\n//         clearTimeout(timeoutId);\n//         count++;\n//         timeoutId = setTimeout(() => {\n//             if (count === maxIter) {\n//                 callback();\n//             }\n//             count = 0;\n//         }, delay);\n//     };\n// }\n\n\n\n//# sourceURL=webpack://catan/./src/hex.ts?");

/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CITY_WEIGHT: () => (/* binding */ CITY_WEIGHT),\n/* harmony export */   HEX_ROLLS: () => (/* binding */ HEX_ROLLS),\n/* harmony export */   POSITIONS: () => (/* binding */ POSITIONS),\n/* harmony export */   RESOURCES: () => (/* binding */ RESOURCES),\n/* harmony export */   ROAD_DIRECTIONS: () => (/* binding */ ROAD_DIRECTIONS),\n/* harmony export */   YIELD_VALUE: () => (/* binding */ YIELD_VALUE)\n/* harmony export */ });\nconst HEX_ROLLS = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12];\nconst RESOURCES = [\"Forest\", \"Hills\", \"Pasture\", \"Field\", \"Mountain\"];\nconst POSITIONS = [\n    \"0_1\",\n    \"0_2\",\n    \"0_3\",\n    \"0_4\",\n    \"1_1\",\n    \"1_2\",\n    \"1_3\",\n    \"1_4\",\n    \"1_5\",\n    \"2_0\",\n    \"2_1\",\n    \"2_2\",\n    \"2_3\",\n    \"2_4\",\n    \"2_5\",\n    \"3_0\",\n    \"3_1\",\n    \"3_2\",\n    \"3_3\",\n    \"3_4\",\n    \"3_5\",\n    \"3_6\",\n    \"4_0\",\n    \"4_1\",\n    \"4_2\",\n    \"4_3\",\n    \"4_4\",\n    \"4_5\",\n    \"5_1\",\n    \"5_2\",\n    \"5_3\",\n    \"5_4\",\n    \"5_5\",\n    \"6_1\",\n    \"6_2\",\n    \"6_3\",\n    \"6_4\",\n];\nconst YIELD_VALUE = [1, 2, 3, 4, 5, 6];\nconst ROAD_DIRECTIONS = [\"north\", \"west\", \"south\"];\nconst CITY_WEIGHT = [1, 2];\n\n\n\n//# sourceURL=webpack://catan/./src/types.ts?");

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