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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.ts\");\n\nfunction debounce(callback, delay, maxIter = 3) {\n    let timeoutId;\n    let count = 0;\n    return function () {\n        clearTimeout(timeoutId);\n        count++;\n        timeoutId = setTimeout(() => {\n            if (count === maxIter) {\n                callback();\n            }\n            count = 0;\n        }, delay);\n    };\n}\nconst game = new _game__WEBPACK_IMPORTED_MODULE_0__.Game();\n\n\n//# sourceURL=webpack://catan/./src/contentScript.ts?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Game: () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _hex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hex */ \"./src/hex.ts\");\n\nclass Game {\n    constructor() {\n        // update = (page: Document) => {\n        //     this.map = page.getElementById(\"cat_map\")!;\n        //     this.parseSettledCoords();\n        //     console.log(\"updated\");\n        // };\n        // watch = () => {\n        //     const callback: MutationCallback = () => {\n        //         const page = new DOMParser().parseFromString(\n        //             htmlContent,\n        //             \"text/html\"\n        //         );\n        //         game.update(page);\n        //     };\n        //     new MutationObserver(debounce(callback, 100)).observe(this.map, {\n        //         childList: true,\n        //         subtree: true,\n        //     });\n        // };\n        this.initHexs = () => {\n            let htmlContent = document.documentElement.outerHTML;\n            const page = new DOMParser().parseFromString(htmlContent, \"text/html\");\n            const htmlHexs = page.querySelectorAll(\"[id*=cathex]\");\n            for (let htmlHex of htmlHexs) {\n                const position = _hex__WEBPACK_IMPORTED_MODULE_0__.Hex.parsePosition(htmlHex);\n                this.hexs[position] = new _hex__WEBPACK_IMPORTED_MODULE_0__.Hex(htmlHex);\n            }\n            // const callback: MutationCallback = () => {\n            //     const page = new DOMParser().parseFromString(\n            //         htmlContent,\n            //         \"text/html\"\n            //     );\n            //     game.update(page);\n            // };\n            // new MutationObserver(debounce(callback, 100)).observe(this.map, {\n            //     childList: true,\n            //     subtree: true,\n            // });\n        };\n        this.parseCityNeighbors = (cityId) => {\n            const writtenCoords = cityId.substring(9, 12);\n            const coords = [Number(cityId[9]), Number(cityId[11])];\n            coords[1] -= coords[0] % 2;\n            const orientation = cityId[13];\n            if (orientation === \"D\")\n                coords[0]++;\n            else if (orientation === \"T\")\n                coords[0]--;\n            return [\n                writtenCoords,\n                `${coords[0]}_${coords[1]}`,\n                `${coords[0]}_${coords[1] + 1}`,\n            ];\n        };\n        this.players = {};\n        this.hexs = {};\n        // this.update(page);\n        // this.watch();\n        this.initHexs();\n        console.log(\"NEW GAME VALUES:\", this.hexs);\n    }\n}\n\n\n\n//# sourceURL=webpack://catan/./src/game.ts?");

/***/ }),

/***/ "./src/hex.ts":
/*!********************!*\
  !*** ./src/hex.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Hex: () => (/* binding */ Hex)\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ \"./src/types.ts\");\n\nclass Hex {\n    constructor(htmlHex) {\n        this.refresh(htmlHex);\n    }\n    update(data = {}) {\n        Object.assign(this, data);\n    }\n    refresh(htmlHex) {\n        for (let resource of _types__WEBPACK_IMPORTED_MODULE_0__.RESOURCES) {\n            if (htmlHex.classList.contains(`cat_${resource}`)) {\n                const roll = htmlHex\n                    .querySelector(\"[id*=cat_num_token]\")\n                    .classList.item(1)\n                    .substring(8);\n                const position = htmlHex.id.substring(7);\n                const diceRoll = Number(roll);\n                this.update({\n                    position,\n                    resource,\n                    diceRoll,\n                });\n                break;\n            }\n        }\n    }\n}\nHex.parsePosition = (htmlHex) => htmlHex.id.substring(7);\n\n\n\n//# sourceURL=webpack://catan/./src/hex.ts?");

/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CITY_WEIGHT: () => (/* binding */ CITY_WEIGHT),\n/* harmony export */   HEX_ROLLS: () => (/* binding */ HEX_ROLLS),\n/* harmony export */   RESOURCES: () => (/* binding */ RESOURCES),\n/* harmony export */   ROAD_DIRECTIONS: () => (/* binding */ ROAD_DIRECTIONS),\n/* harmony export */   YIELD_VALUE: () => (/* binding */ YIELD_VALUE)\n/* harmony export */ });\nconst HEX_ROLLS = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12];\nconst RESOURCES = [\"Forest\", \"Hills\", \"Pasture\", \"Field\", \"Mountain\"];\nconst YIELD_VALUE = [1, 2, 3, 4, 5, 6];\nconst ROAD_DIRECTIONS = [\"north\", \"west\", \"south\"];\nconst CITY_WEIGHT = [1, 2];\n\n\n\n//# sourceURL=webpack://catan/./src/types.ts?");

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