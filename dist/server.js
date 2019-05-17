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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_multer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_multer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_multer__);




var upload = __WEBPACK_IMPORTED_MODULE_3_multer___default()({
  dest: 'uploads'
}); //Creating express object host an api server

var app = __WEBPACK_IMPORTED_MODULE_1_express___default()(),
    DIST_DIR = __dirname,
    HTML_FILE = __WEBPACK_IMPORTED_MODULE_0_path___default.a.join(DIST_DIR, 'index.html');
app.use(__WEBPACK_IMPORTED_MODULE_1_express___default.a["static"](DIST_DIR));
app.use(__WEBPACK_IMPORTED_MODULE_1_express___default.a.json()); //Get Api to render UI

app.get('/', function (req, res) {
  res.sendFile(HTML_FILE);
}); //Get Api to fetch all the issues bucket wise

app.get('/fetch-data', function (req, res) {
  __WEBPACK_IMPORTED_MODULE_2__service__["a" /* service */].fetchData(req, res);
}); //Startign the server

var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log("App listening to ".concat(PORT, "...."));
  console.log('Press Ctrl+C to quit.');
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__octokit_rest__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__octokit_rest___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__octokit_rest__);


var fetchData = function fetchData(req, res) {
  var url = req.query.url || [];
  console.log("url", url);
  var org = null,
      repo = null; //get org and repo names from git url

  if (url) {
    if (url.indexOf("http") == 0) {
      var urlArr = url.split('/');
      org = urlArr.length > 3 ? urlArr[3] : null;
      repo = urlArr.length > 4 ? urlArr[4] : null;
    } else {
      var _urlArr = url.split('/');

      org = _urlArr.length > 1 ? _urlArr[1] : null;
      repo = _urlArr.length > 2 ? _urlArr[2] : null;
    }
  } //Creating Octait Object


  var octokit = new __WEBPACK_IMPORTED_MODULE_0__octokit_rest___default.a({
    userAgent: 'myApp v1.2.3',
    baseUrl: 'https://api.github.com'
  }); //getting all issues with org and repo name

  octokit.request("GET /repos/".concat(org, "/").concat(repo, "/issues")).then(function (result) {
    var totalIssues = 0;
    var noOfIssueIn24Hrs = 0;
    var noOfIssueIn7Days = 0;
    var time24HrsBack = new Date(new Date().getTime() - 60 * 60 * 24 * 1000);
    var time7DaysBack = new Date(new Date().getTime() - 7 * 60 * 60 * 24 * 1000); //Iterating the issues list and updating the issues by age bucket

    result.data.forEach(function (issue) {
      //Check if it is a issue not a pull request
      if (!issue.pull_request) {
        totalIssues = totalIssues + 1;
        var issueDate = new Date(issue.created_at);

        if (issueDate.getTime() > time24HrsBack.getTime()) {
          noOfIssueIn24Hrs = noOfIssueIn24Hrs + 1;
        } else if (issueDate.getTime() > time7DaysBack.getTime()) {
          noOfIssueIn7Days = noOfIssueIn7Days + 1;
        }
      }
    }); //sending response to frontend

    res.send({
      totalIssues: totalIssues,
      noOfIssueIn24Hrs: noOfIssueIn24Hrs,
      noOfIssueIn7Days: noOfIssueIn7Days,
      noOfIssueAfter7Days: totalIssues - (noOfIssueIn24Hrs + noOfIssueIn7Days)
    });
  })["catch"](function (e) {
    console.log("Error fetching issue from github api, ", e);
    res.status(400).json({
      message: 'Error fetching issue from github api'
    });
  });
};

var service = {
  fetchData: fetchData
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("@octokit/rest");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ })
/******/ ]);