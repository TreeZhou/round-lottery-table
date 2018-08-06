/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	Promise.prototype.finally = Promise.prototype.finally || function (callback) {
	    var P = this.constructor;
	    return this.then(function (value) {
	        return P.resolve(callback()).then(function () {
	            return value;
	        });
	    }, function (reason) {
	        return P.resolve(callback()).then(function () {
	            throw reason;
	        });
	    });
	};
	
	global.BaseClass = __webpack_require__(1);
	global.BasePopupClass = __webpack_require__(2);
	
	global.Config = window._config || {};
	global.Api = window._config && window._config.api || {};
	global.Util = __webpack_require__(3);
	
	global.TipManager = __webpack_require__(4);
	global.viewAdapt = __webpack_require__(5);
	
	global.View = {};
	
	global.Popup = {};
	
	var Home = __webpack_require__(6);
	var Regist = __webpack_require__(7);
	var RegistInfo = __webpack_require__(8);
	
	var Rule = __webpack_require__(9);
	var Subscribe = __webpack_require__(10);
	var Hobby = __webpack_require__(11);
	var Kid = __webpack_require__(12);
	var NoticeUpgrade = __webpack_require__(13);
	var NoticeActEnd = __webpack_require__(14);
	var Share = __webpack_require__(15);
	var Desney = __webpack_require__(16);
	var DesneyMyawardList = __webpack_require__(17);
	var SameCity = __webpack_require__(18);
	var Toothpaste = __webpack_require__(19);
	var Redpack = __webpack_require__(20);
	var Jifen100 = __webpack_require__(21);
	var Jifen50 = __webpack_require__(22);
	var Jifen20 = __webpack_require__(23);
	var Jifen10 = __webpack_require__(24);
	
	var ToothpasteAddressInfo = __webpack_require__(25);
	var ShareThree = __webpack_require__(26);
	var LimitLottery = __webpack_require__(27);
	var ShareSuc = __webpack_require__(28);
	var SameCityInfo = __webpack_require__(29);
	
	var Loading = __webpack_require__(30);
	
	var initFontSize = function initFontSize() {
	    var wRatio = Config.winWidth / Config.winHeight;
	    $('html').css({
	        'font-size': 18 * Config.ratio / wRatio + 'px'
	    });
	};
	
	var initUI = function initUI() {
	    View.loading = new Loading('.loading');
	
	    View.home = new Home('.home');
	    View.regist = new Regist('.regist');
	    View.registInfo = new RegistInfo('.regist-info');
	
	    Popup.rule = new Rule('.rule');
	    Popup.subscribe = new Subscribe('.subscribe');
	    Popup.desneyMyawardList = new DesneyMyawardList('.desney--myaward-list');
	
	    Popup.hobby = new Hobby('.hobby');
	    Popup.kid = new Kid('.kid');
	    Popup.noticeUpgrade = new NoticeUpgrade('.notice-upgrade');
	    Popup.noticeActEnd = new NoticeActEnd('.notice-act-end');
	    Popup.share = new Share('.share');
	    Popup.desney = new Desney('.desney');
	    Popup.sameCity = new SameCity('.same-city');
	    Popup.toothpaste = new Toothpaste('.toothpaste');
	    Popup.redpack = new Redpack('.redpack');
	    Popup.jifen100 = new Jifen100('.jifen100');
	    Popup.jifen50 = new Jifen50('.jifen50');
	    Popup.jifen20 = new Jifen20('.jifen20');
	
	    Popup.jifen10 = new Jifen10('.jifen10');
	    Popup.shareThree = new ShareThree('.share-three');
	    Popup.limitLottery = new LimitLottery('.limit-lottery');
	    Popup.shareSuc = new ShareSuc('.share-suc');
	    Popup.sameCityInfo = new SameCityInfo('.same-city-info');
	
	    Popup.toothpasteAddressInfo = new ToothpasteAddressInfo('.toothpaste-addressInfo');
	};
	
	var init = function init() {
	    Config.initFeiboAndShare();
	    Config.initShareConfig();
	    initUI();
	    $('.main').show();
	    View.loading.show();
	    View.loading.preload(function (loaded, total) {
	        var percent = parseInt(loaded / total * 100);
	        Loading.loading(percent);
	        if (loaded === total) {
	            View.loading.hide();
	            Util.getSystemStarus().then(function () {
	                initShowPage();
	            });
	        }
	    });
	};
	
	function initShowPage() {
	    View.home.show();
	}
	
	if (Config.debug && Config.urlSearchObj['debug']) {
	
	    init();
	} else if (window.localStorage.getItem(Config.userInfoStorageName)) {
	    Config.userInfo = JSON.parse(window.localStorage.getItem(Config.userInfoStorageName));
	    Util.getInfo().then(function () {
	        if (Config.urlSearchObj['from_openid']) {
	            window.localStorage.setItem(Config.hasFromOpenidStorageName, Config.urlSearchObj['from_openid']);
	        }
	        return Promise.resolve(Util.getSubscribe());
	    }).then(function (res) {
	        init();
	    }).catch(function (res) {
	        console.log("获取信息发生错误：" + res);
	    });
	} else if (Config.wechat.getQuery('send_openid') && Config.wechat.getQuery('code')) {
	    var params = {
	        data: {
	            code: Config.urlSearchObj['code'],
	            cnl: Config.urlSearchObj['cnl'],
	            send_openid: Config.urlSearchObj['send_openid']
	        }
	    };
	    Promise.resolve(Api.login(params)).then(function (res) {
	        if (!res.success) {
	            Config.wechat.goAuth('snsapi_userinfo', 'STATE', Config.wechat.filter(['code']));
	            return;
	        }
	        window.localStorage.setItem(Config.userInfoStorageName, JSON.stringify(res.result));
	        Config.userInfo = res.result;
	        if (Config.urlSearchObj['from_openid']) {
	            window.localStorage.setItem(Config.hasFromOpenidStorageName, Config.urlSearchObj['from_openid']);
	        }
	        return Promise.resolve(Util.getSubscribe());
	    }).then(function () {
	        init();
	    }).catch(function (err) {
	        var errMsg = typeof err === 'string' ? err : err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString();
	        try {
	            Raven.captureMessage('<\u767B\u9646>\u5931\u8D25', {
	                level: 'error',
	                extra: {
	                    data: errMsg
	                }
	            });
	        } catch (e) {}
	        return alert(errMsg);
	    });
	} else if (Config.wechat.getQuery('code')) {
	    Config.wechatForRedpack.getOpenid(function (err, res) {
	        if (err) {
	            Config.wechatForRedpack.goAuth('snsapi_base', 'STATE', Config.wechatForRedpack.filter(["code"]));
	            return;
	        }
	        var openid = res;
	        Config.wechat.goAuth('snsapi_userinfo', 'STATE', Config.wechat.filter(["code"], {
	            "send_openid": openid
	        }));
	    });
	} else {
	    Config.wechatForRedpack.goAuth('snsapi_base', 'STATE', Config.wechatForRedpack.filter());
	}
	
	$(function () {
	    $('html, body, .main, .panel, .page').css({
	        height: window.innerHeight
	    });
	
	    function objBlur(sdom, time) {
	        if (sdom) {
	            sdom.addEventListener("focus", function () {
	                document.addEventListener("touchend", docTouchend, false);
	            }, false);
	        } else {
	            throw new Error("objBlur()没有找到元素");
	        }
	        var docTouchend = function docTouchend(event) {
	            if (event.target != sdom) {
	                setTimeout(function () {
	                    sdom.blur();
	                    document.removeEventListener('touchend', docTouchend, false);
	                }, time);
	            }
	        };
	    }
	
	    function objBlurFun(sDom, time) {
	        var time = time || 300;
	
	        var isIPHONE = navigator.userAgent.toUpperCase().indexOf("IPHONE") != -1;
	        if (isIPHONE) {
	            var obj = document.querySelectorAll(sDom);
	            for (var i = 0; i < obj.length; i++) {
	                objBlur(obj[i], time);
	            }
	        }
	    }
	    objBlurFun("input");
	    objBlurFun("textarea");
	
	    var overscroll = function overscroll(els) {
	        for (var i = 0; i < els.length; ++i) {
	            var el = els[i];
	            el.addEventListener('touchstart', function () {
	                var top = this.scrollTop;
	                var totalScroll = this.scrollHeight;
	                var currentScroll = top + this.offsetHeight;
	                if (top === 0) {
	                    this.scrollTop = 1;
	                } else if (currentScroll === totalScroll) {
	                    this.scrollTop = top - 10;
	                }
	            });
	            el.addEventListener('touchmove', function (evt) {
	                if (this.offsetHeight < this.scrollHeight) evt._isScroller = true;
	            });
	        }
	    };
	    document.body.addEventListener('touchmove', function (evt) {
	        if (!evt._isScroller) {}
	    });
	    overscroll(document.querySelectorAll('.scrollable'));
	});
	Util.bgFullPage([".regist__bg", ".regist__box",, ".regist-info__bg", ".regist-info__box"]);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BaseClass = function () {
		function BaseClass(str) {
			_classCallCheck(this, BaseClass);
	
			this.$dom = $(str);
			this.$dom.hide();
			this.init();
		}
	
		_createClass(BaseClass, [{
			key: "init",
			value: function init() {}
		}, {
			key: "show",
			value: function show() {
				this.$dom.show();
			}
		}, {
			key: "hide",
			value: function hide() {
				this.$dom.hide();
			}
		}]);
	
		return BaseClass;
	}();
	
	module.exports = BaseClass;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BasePopupClass = function (_BaseClass) {
		_inherits(BasePopupClass, _BaseClass);
	
		function BasePopupClass(str) {
			_classCallCheck(this, BasePopupClass);
	
			return _possibleConstructorReturn(this, (BasePopupClass.__proto__ || Object.getPrototypeOf(BasePopupClass)).call(this, str));
		}
	
		_createClass(BasePopupClass, [{
			key: "init",
			value: function init() {}
		}, {
			key: "show",
			value: function show() {
				_get(BasePopupClass.prototype.__proto__ || Object.getPrototypeOf(BasePopupClass.prototype), "show", this).call(this);
			}
		}, {
			key: "hide",
			value: function hide(cb) {
				_get(BasePopupClass.prototype.__proto__ || Object.getPrototypeOf(BasePopupClass.prototype), "hide", this).call(this);
			}
		}]);
	
		return BasePopupClass;
	}(BaseClass);
	
	module.exports = BasePopupClass;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	
	"use strict";
	
	exports.versions = function () {
		var u = navigator.userAgent,
		    app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1,
			presto: u.indexOf('Presto') > -1,
			webKit: u.indexOf('AppleWebkit') > -1,
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
			mobile: !!u.match(/AppleWebKit.*Mobile.*/),
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
			iPhone: u.indexOf('iPhone') > -1,
			iPad: u.indexOf('iPad') > -1,
			webApp: u.indexOf('Safari') == -1,
			weixin: u.indexOf('MicroMessenger') > -1,
			qq: u.match(/\sQQ/i) == " qq" };
	}();
	
	exports.randomNum = function (Min, Max) {
		var Range = Max - Min;
		var Rand = Math.random();
		return Min + Math.round(Rand * Range);
	};
	
	exports.getOption = function (key) {
		var search = location.search;
		if (search == '') return '';
		search = search.slice(1);
		var searchArr = search.split('&');
		for (var i = 0, len = searchArr.length; i < len; i++) {
			var arr = searchArr[i].split('=');
			if (arr[0] == key) {
				return arr[1];
			}
		}
		return '';
	};
	
	exports.changeURL = function (searchArr, hashStr) {
		if (history.pushState) {
			history.pushState({}, 0, wechat.filter(searchArr));
		}
		window.location.hash = hashStr;
	};
	
	if (typeof Object.assign != 'function') {
		Object.assign = function (target) {
			"use strict";
	
			if (target == null) {
				throw new TypeError('Cannot convert undefined or null to object');
			}
			target = Object(target);
			for (var index = 1; index < arguments.length; index++) {
				var source = arguments[index];
				if (source != null) {
					for (var key in source) {
						if (Object.prototype.hasOwnProperty.call(source, key)) {
							target[key] = source[key];
						}
					}
				}
			}
			return target;
		};
	}
	
	exports.scrollAtBottom = function (node, cb) {
		function getScrollTop(dom) {
			return dom ? dom.scrollTop : 0;
		}
	
		function getScrollHeight(dom) {
			return dom ? dom.scrollHeight : 0;
		}
	
		function getDomHeight(dom) {
			return dom ? dom.offsetHeight : 0;
		}
		node.onscroll = function () {
			if (getScrollTop(this) + getDomHeight(this) >= getScrollHeight(this)) {
				cb && cb();
			}
		};
	};
	
	$.fn.extend({
		animateCss: function animateCss(animationName, cb) {
			var _this = this;
	
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			this.off(animationEnd).addClass('animated ' + animationName).one(animationEnd, function () {
				_this.removeClass('animated ' + animationName);
				if (cb) cb();
			});
			return this;
		},
		fadeIn: function fadeIn() {
			this.show();
			this.animateCss('fadeIn');
		},
		fadeOut: function fadeOut() {
			var _this2 = this;
	
			this.animateCss('fadeOut', function () {
				_this2.hide();
			});
		},
		fadeInUp: function fadeInUp() {
			this.show();
			this.find('.mask').animateCss('fadeIn').next().animateCss('fadeInUpBig');
		},
		fadeOutDown: function fadeOutDown(cb) {
			var _this3 = this;
	
			this.find('.mask').animateCss('fadeOut').next().animateCss('fadeOutDownBig', function () {
				_this3.hide();
				if (cb) cb();
			});
		},
		showInfo: function showInfo() {
			this.show().animateCss('fadeInDown');
		},
		hideInfo: function hideInfo() {
			var _this4 = this;
	
			this.animateCss('fadeOutUp', function () {
				_this4.html('');
				_this4.hide();
			});
		}
	});
	
	exports.bgFullPage = function (selectors, ratio) {
		var ratio = ratio || 640 / 1008;
		var wW = window.innerWidth,
		    wH = window.innerHeight;
		if (wW / ratio < wH) {
			selectors.forEach(function (element) {
				$(element).css({
					"height": "100%"
				});
			});
		}
	};
	
	exports.transYmdDate = function (time) {
		return time.replace(/(\d+)-(\d+)-(\d+)/, '$1年$2月$3日');
	};
	
	exports.transNormalDate = function (time) {
		return time.replace(/-/g, '/');
	};
	
	exports.transDate = function (time) {
		function add0(m) {
			return m < 10 ? '0' + m : m;
		}
	
		function formatDate(needTime) {
			var time = new Date(needTime);
			var y = time.getFullYear();
			var m = time.getMonth() + 1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds();
			return y + '年' + add0(m) + '月' + add0(d) + '日 ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
		}
		return formatDate(time);
	};
	
	exports.sectionToChinese = function (section) {
		var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
		var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
		var chnUnitChar = ["", "十", "百", "千"];
		var strIns = '',
		    chnStr = '';
		var unitPos = 0;
		var zero = true;
		while (section > 0) {
			var v = section % 10;
			if (v === 0) {
				if (!zero) {
					zero = true;
					chnStr = chnNumChar[v] + chnStr;
				}
			} else {
				zero = false;
				strIns = chnNumChar[v];
				strIns += chnUnitChar[unitPos];
				chnStr = strIns + chnStr;
			}
			unitPos++;
			section = Math.floor(section / 10);
		}
		return chnStr;
	};
	
	exports.chineseToNumber = function (chnStr) {
		var chnNumChar = {
			零: 0,
			一: 1,
			二: 2,
			三: 3,
			四: 4,
			五: 5,
			六: 6,
			七: 7,
			八: 8,
			九: 9
		};
	
		var chnNameValue = {
			十: {
				value: 10,
				secUnit: false
			},
			百: {
				value: 100,
				secUnit: false
			},
			千: {
				value: 1000,
				secUnit: false
			},
			万: {
				value: 10000,
				secUnit: true
			},
			亿: {
				value: 100000000,
				secUnit: true
			}
		};
		var rtn = 0;
		var section = 0;
		var number = 0;
		var secUnit = false;
		var str = chnStr.split('');
	
		for (var i = 0; i < str.length; i++) {
			var num = chnNumChar[str[i]];
			if (typeof num !== 'undefined') {
				number = num;
				if (i === str.length - 1) {
					section += number;
				}
			} else {
				var unit = chnNameValue[str[i]].value;
				secUnit = chnNameValue[str[i]].secUnit;
				if (secUnit) {
					section = (section + number) * unit;
					rtn += section;
					section = 0;
				} else {
					section += number * unit;
				}
				number = 0;
			}
		}
		return rtn + section;
	};
	
	exports.getRequestParam = function (url, deleteParam, linkParam) {
		var localURL = url;
		var index = url.indexOf("?");
		var singleArray = [];
		var deleteParams = deleteParam ? deleteParam.join() : "";
		var linkParams = linkParam ? linkParam : 0;
		var paramStr = "";
		if (index != -1) {
			var afterurl = url.substr(index + 1);
			var strs = afterurl.split("&");
			for (var i = 0; i < strs.length; i++) {
	
				if (singleArray.indexOf(strs[i]) == -1) {
					singleArray.push(strs[i]);
				}
			}
			for (var j = 0; j < singleArray.length; j++) {
	
				var paramsName = singleArray[j].split("=")[0];
				var paramsValue = singleArray[j].split("=")[1];
				if (deleteParams.indexOf(paramsName) == -1) {
					paramStr += paramsName + "=" + paramsValue + "&";
				}
			}
			if (linkParams) {
	
				for (var _i = 0; _i < linkParams.length; _i++) {
					paramStr += linkParams[_i].name + "=" + linkParams[_i].value + "&";
				}
			}
			paramStr = paramStr.substring(0, paramStr.length - 1);
		}
		if (index == -1) {
			if (linkParams) {
				for (var _i2 = 0; _i2 < linkParams.length; _i2++) {
					paramStr += linkParams[_i2].name + "=" + linkParams[_i2].value + "&";
				}
			}
			paramStr = paramStr.substring(0, paramStr.length - 1);
		}
	
		return paramStr;
	};
	
	exports.getSubscribe = function () {
		return new Promise(function (resolve, reject) {
			Config.wechat.getSubscribe(Config.userInfo.openid, function (err, res) {
				if (err) {
					reject(err);
					return;
				}
				Config.subscribe = res.subscribe;
				resolve();
			});
		});
	};
	
	exports.getInfo = function () {
		var params = {
			data: {
				openid: Config.userInfo.openid
			}
		};
		return new Promise(function (resolve, reject) {
			Promise.resolve(Api.getInfo(params)).then(function (res) {
				if (!res.success) {
					reject(res);
					return;
				}
				Config.userInfo = res.result;
	
				resolve();
			});
		});
	};
	exports.getSystemStarus = function () {
		if (Config.urlSearchObj['debug']) {
	
			return Promise.resolve();
		}
		return Promise.resolve(Api.config()).then(function (res) {
			if (!res.success) {
				return;
			}
			Config.systemStatus = res.result;
		}).catch(function (err) {
			var errMsg = typeof err === 'string' ? err : err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString();
			try {
				Raven.captureMessage('<\u83B7\u53D6\u7CFB\u7EDF\u72B6\u6001>\u5931\u8D25', {
					level: 'error',
					extra: {
						data: errMsg
					}
				});
			} catch (e) {}
		});
	};
	exports.addFrend = function () {
		var params = {
			data: {
				openid: Config.userInfo.openid,
				from_openid: null
			}
		};
		if (Config.urlSearchObj['from_openid']) {
			params.data.from_openid = Config.urlSearchObj['from_openid'];
		} else if (window.localStorage.getItem(Config.hasFromOpenidStorageName)) {
			params.data.from_openid = window.localStorage.getItem(Config.hasFromOpenidStorageName);
		}
		if (!params.data.from_openid) {
			return;
		}
		if (window.localStorage.getItem("hasSendFriend")) {
			return;
		}
		Promise.resolve(Api.addFriend(params)).then(function (res) {
			if (!res.success) {
				return;
			}
			window.localStorage.setItem("hasSendFriend", "yes");
			console.log("增加朋友：", res);
		});
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _loading = $('.tip.uploading');
	var uploaded = $('.tip.uploaded');
	
	var TipManager = function () {
	    function TipManager() {
	        _classCallCheck(this, TipManager);
	    }
	
	    _createClass(TipManager, null, [{
	        key: 'show',
	        value: function show(text, delay) {
	            delay = delay || 2500;
	            var $dom = $('<div class="info">' + text + '</div>');
	            $(".info").remove();
	            $('body').append($dom);
	            $dom.show();
	            setTimeout(function () {
	                $dom.hide();
	            }, delay);
	        }
	    }, {
	        key: 'loading',
	        value: function loading(percent, text) {
	            _loading.find('.progress-bar').css({ width: percent + '%' });
	            _loading.find('.text').html(text);
	        }
	    }, {
	        key: 'loadingShow',
	        value: function loadingShow() {
	            _loading.fadeIn();
	            _loading.find('.progress-bar').css({ width: '0%' });
	        }
	    }, {
	        key: 'loadingHide',
	        value: function loadingHide() {
	            _loading.hide();
	        }
	    }, {
	        key: 'uploadedShow',
	        value: function uploadedShow() {
	            uploaded.fadeIn();
	        }
	    }, {
	        key: 'uploadedHide',
	        value: function uploadedHide() {
	            uploaded.fadeOut();
	        }
	    }]);
	
	    return TipManager;
	}();
	
	module.exports = TipManager;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	var arr = [];
	
	exports.push = function (str, needRatio) {
		arr.push([str, needRatio]);
		resize();
	};
	
	function resize() {
		var wW = window.innerWidth;
		var wH = window.innerHeight;
	
		var wRatio = wW / wH;
		arr.forEach(function (item) {
			if (wRatio > item[1]) {
				var w = item[1] * wH;
				var marginL = (wW - w) / 2;
				$(item[0]).width(w);
				$(item[0]).css({ "marginLeft": marginL });
			}
		});
	}
	
	window.onresize = function () {
		if (Config.debug && Config.urlSearchObj['debug']) {
			return;
		}
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var HomeClass = function (_BaseClass) {
	    _inherits(HomeClass, _BaseClass);
	
	    function HomeClass(str) {
	        _classCallCheck(this, HomeClass);
	
	        return _possibleConstructorReturn(this, (HomeClass.__proto__ || Object.getPrototypeOf(HomeClass)).call(this, str));
	    }
	
	    _createClass(HomeClass, [{
	        key: "init",
	        value: function init() {
	
	            this.timerSpin = null;
	            this.spinangle = 0;
	            this.spinSpeed = 15;
	            this.addSpinangle = 10;
	            this.duration = 3000;
	            this.hasGetAwardDate = false;
	            this.stopSpinLottery = false;
	
	            this.tablePosition = [90, 180, 0, 135, 225, 315, 270, 45];
	            this.rotating = false;
	            this.winnerListTemplate = $("#winnerListTemplate").html();
	            this.myPrizeListTemplate = $("#myPrizeListTemplate").html();
	            this.myFrendsListTemplate = $("#myFrendsListTemplate").html();
	
	            this.allPrizePage = 2;
	            this.myPrizePage = 2;
	            this.myFriendsPage = 2;
	            this.loadListData = false;
	            this.timer = null;
	            this.timeout = true;
	
	            this.$btnRule = this.$dom.find("#home__rule");
	            this.$turntableContent = this.$dom.find("#turntable-content");
	            this.$btnStart = this.$dom.find("#turntable-start");
	            this.$lotteryTimes = this.$dom.find("#lotteryTimes");
	            this.$tab1 = this.$dom.find("#tab1");
	            this.$tab2 = this.$dom.find("#tab2");
	            this.$tab3 = this.$dom.find("#tab3");
	            this.$weuiNavbar = this.$dom.find("#weuiNavbar");
	            this.$ranklist = this.$dom.find("#ranklist");
	
	            this.$btnWinnerList = this.$dom.find("#btnWinnerList");
	            this.$btnMyinvite = this.$dom.find("#btnMyinvite");
	            this.$btnMyprize = this.$dom.find("#btnMyprize");
	
	            this.initBtnRuleEvent();
	            this.initTimes();
	            this.initBtnStart();
	            this.initBtnListEvent();
	
	            this.initObserverWinnerListEvent();
	            this.initWinnerList(1);
	
	            this.initObserverMyFrendsListEvent();
	            this.initMyFrendsList(1);
	
	            this.initObserverMyPrizeListEvent();
	            this.initMyPrizeList(1);
	
	            this.initScrollListEvent();
	        }
	    }, {
	        key: "initBtnRuleEvent",
	        value: function initBtnRuleEvent() {
	            this.$btnRule.on("tap", function (e) {
	                Popup.rule.show();
	                try {
	                    fiboSDK.btnClick('home-btn-rule', '抽奖页-活动规则');
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: "initTimes",
	        value: function initTimes() {
	            this.$lotteryTimes.text(Config.userInfo.chance);
	        }
	    }, {
	        key: "initBtnStart",
	        value: function initBtnStart() {
	
	            this.$btnStart.on("tap", this.lottery.bind(this));
	            try {
	                fiboSDK.btnClick('home-btn-Start', '抽奖页-开始抽奖');
	            } catch (e) {}
	        }
	    }, {
	        key: "lottery",
	        value: function lottery() {
	            var _this2 = this;
	
	            if (Config.userInfo.chance == 0) {
	                this.$lotteryTimes.text(Config.userInfo.chance);
	                Popup.shareThree.show();
	                return;
	            }
	
	            if (this.rotating) {
	                return;
	            }
	            this.rotating = true;
	
	            if (Config.userInfo.chance > 0) {
	                this.hasGetAwardDate = false;
	                this.spinLottery();
	                var params = {
	                    data: {
	                        openid: Config.userInfo.openid
	                    }
	                };
	                if (Config.urlSearchObj['debug']) {
	                    var randomNum = function randomNum(Min, Max) {
	                        var Range = Max - Min;
	                        var Rand = Math.random();
	
	                        var num = Min + Math.round(Rand * Range);
	                        return num;
	                    };
	                    Config.awardData = {
	                        award_id: randomNum(1, 8)
	                    };
	                    this.hasGetAwardDate = true;
	                    this.$lotteryTimes.text(--Config.userInfo.chance);
	                    return;
	                }
	                Promise.resolve(Api.lottery(params)).then(function (res) {
	                    if (res.error_code == -1100) {
	                        Popup.limitLottery.show();
	                        _this2.stopSpinLottery = true;
	                        _this2.rotating = false;
	                        return;
	                    }
	                    if (res.error_code == -1008) {
	                        TipManager.show("网络繁忙");
	                        _this2.stopSpinLottery = true;
	                        _this2.rotating = false;
	                        return;
	                    }
	                    if (!res.success) {
	                        TipManager.show(res.msg);
	                        _this2.stopSpinLottery = true;
	                        _this2.rotating = false;
	                        return;
	                    }
	                    Config.awardData = res.result;
	                    _this2.hasGetAwardDate = true;
	                    _this2.$lotteryTimes.text(--Config.userInfo.chance);
	                }).catch(function (err) {
	                    _this2.stopSpinLottery = true;
	                    _this2.rotating = false;
	                    var errMsg = typeof err === 'string' ? err : err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString();
	                    try {
	                        Raven.captureMessage("<\u62BD\u5956>\u5931\u8D25", {
	                            level: 'error',
	                            extra: {
	                                data: errMsg
	                            }
	                        });
	                    } catch (e) {}
	                }).finally(function () {});
	            }
	        }
	    }, {
	        key: "rotateFunc",
	        value: function rotateFunc(num, type) {
	            var _this3 = this;
	
	            this.$turntableContent.rotate({
	                angle: 0,
	                duration: this.duration,
	                animateTo: num + 360 + 22.5,
	                callback: function callback() {
	                    $('html, body').animate({
	                        scrollTop: 0
	                    }, 2000);
	                    if (type == 1) {
	                        Popup.desney.show();
	                    } else if (type == 2) {
	                        if (Config.awardData.status == 1) {
	                            Popup.redpack.show();
	                        } else {
	                            TipManager.show("红包发放失败");
	                        }
	                    } else if (type == 3) {
	                        Popup.toothpaste.show();
	                    } else if (type == 4) {
	                        Popup.jifen100.show();
	                    } else if (type == 5) {
	                        Popup.jifen50.show();
	                    } else if (type == 6) {
	                        Popup.jifen20.show();
	                    } else if (type == 7) {
	                        Popup.sameCity.show();
	                    } else if (type == 8) {
	                        Popup.jifen10.show();
	                    }
	                    _this3.rotating = false;
	                    _this3.hasGetAwardDate = false;
	                    _this3.initMyPrizeList(1);
	                }
	            });
	        }
	    }, {
	        key: "isPositiveInteger",
	        value: function isPositiveInteger(s) {
	            var re = /^[1-9]+$/;
	            return re.test(s);
	        }
	    }, {
	        key: "spinLottery",
	        value: function spinLottery() {
	            var _this4 = this;
	
	            this.timerSpin = setInterval(function () {
	                if (_this4.isPositiveInteger(_this4.spinangle / 360) && _this4.hasGetAwardDate) {
	                    _this4.spinangle = 0;
	                    clearInterval(_this4.timerSpin);
	                    var award_id = Config.awardData.award_id;
	                    _this4.rotateFunc(_this4.tablePosition[award_id - 1], award_id);
	                    return;
	                }
	                if (_this4.isPositiveInteger(_this4.spinangle / 360) && _this4.stopSpinLottery) {
	                    _this4.spinangle = 0;
	                    clearInterval(_this4.timerSpin);
	                    _this4.stopSpinLottery = false;
	                    return;
	                }
	                _this4.spinangle = _this4.spinangle + _this4.addSpinangle;
	                _this4.$turntableContent.css({
	                    "transform": "rotate(" + _this4.spinangle + "deg)"
	                });
	            }, this.spinSpeed);
	        }
	    }, {
	        key: "initScrollListEvent",
	        value: function initScrollListEvent() {
	            var _this5 = this;
	
	            Util.scrollAtBottom($("#listScrollBox")[0], function () {
	                if (_this5.loadListData) {
	                    return;
	                }
	                if (!_this5.timeout) {
	                    return;
	                }
	                _this5.timeout = false;
	                _this5.timer = setTimeout(function () {
	                    _this5.timeout = true;
	                    clearTimeout(_this5.timer);
	                }, 3000);
	                var jiazai = "<div class=\"jiazai\">\u52A0\u8F7D\u66F4\u591A\u6570\u636E\u4E2D...</div>";
	                _this5.$ranklist.append(jiazai);
	
	                if (_this5.$btnWinnerList.hasClass("redbottom")) {
	                    _this5.initWinnerList(_this5.myPrizePage++);
	                    return;
	                }
	                if (_this5.$btnMyinvite.hasClass("redbottom")) {
	                    _this5.initMyFrendsList(_this5.myPrizePage++);
	                    return;
	                }
	                if (_this5.$btnMyprize.hasClass("redbottom")) {
	                    _this5.initMyPrizeList(_this5.myPrizePage++);
	                    return;
	                }
	            });
	        }
	    }, {
	        key: "initObserverWinnerListEvent",
	        value: function initObserverWinnerListEvent() {
	            var _this6 = this;
	
	            Config.observer.on("winnerList", function (data) {
	                var html = ejs.render(_this6.winnerListTemplate, {
	                    list: data
	                });
	                _this6.$tab1.append(html);
	            });
	        }
	    }, {
	        key: "initWinnerList",
	        value: function initWinnerList(page) {
	            var _this7 = this;
	
	            if (Config.urlSearchObj['debug']) {
	
	                return;
	            }
	
	            page == 1 && this.$tab1.empty();
	
	            var params = {
	                data: {
	                    page: page
	                }
	            };
	            this.loadListData = true;
	            Promise.resolve(Api.winnerList(params)).then(function (res) {
	                if (!res.success) {
	                    return Promise.reject();
	                }
	                Config.allprize = res.result;
	                return Promise.resolve();
	            }).then(function () {
	                if (Config.allprize.length == 0 && page == 1) {
	                    var demo = "<div class=\"warp\">\n                                        <div class=\"nonepeople\">\u6682\u65E0\u4F1A\u5458\u4E2D\u5956</div>\n                                    </div>";
	                    _this7.$tab1.append(demo);
	                } else if (Config.allprize.length != 0) {
	                    Config.observer.emit("winnerList", Config.allprize);
	                }
	            }).catch(function (err) {
	                var errMsg = typeof err === 'string' ? err : err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString();
	                try {
	                    Raven.captureMessage("<\u83B7\u53D6\u6240\u6709\u4E2D\u5956\u8005\u5217\u8868>\u5931\u8D25", {
	                        level: 'error',
	                        extra: {
	                            data: errMsg
	                        }
	                    });
	                } catch (e) {}
	            }).finally(function () {
	                _this7.loadListData = false;
	                $('.jiazai').remove();
	            });
	        }
	    }, {
	        key: "initObserverMyFrendsListEvent",
	        value: function initObserverMyFrendsListEvent() {
	            var _this8 = this;
	
	            Config.observer.on("myFrendsList", function (data) {
	                var html = ejs.render(_this8.myFrendsListTemplate, {
	                    list: data
	                });
	                _this8.$tab2.append(html);
	            });
	        }
	    }, {
	        key: "initMyFrendsList",
	        value: function initMyFrendsList(page) {
	            var _this9 = this;
	
	            if (Config.urlSearchObj['debug']) {
	
	                return;
	            }
	            page == 1 && this.$tab2.empty();
	
	            var params = {
	                data: {
	                    openid: Config.userInfo.openid
	                }
	            };
	            this.loadListData = true;
	
	            Promise.resolve(Api.myFrendsList(params)).then(function (res) {
	                if (!res.success) {
	                    return Promise.reject();
	                }
	                Config.myfriends = res.result;
	                return Promise.resolve();
	            }).then(function () {
	                if (Config.myfriends.length == 0 && page == 1) {
	                    var demo = "<div class=\"warp\">\n                                        <div class=\"nonepeople\">\u6682\u65E0\u9080\u8BF7\u597D\u53CB</div>\n                                    </div>";
	                    _this9.$tab2.append(demo);
	                } else if (Config.myfriends.length != 0) {
	                    Config.observer.emit("myFrendsList", Config.myfriends);
	                }
	            }).catch(function (err) {
	                try {
	                    var errMsg = typeof err === 'string' ? err : err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString();
	
	                    Raven.captureMessage("<\u83B7\u53D6\u6211\u7684\u9080\u8BF7\u5217\u8868>\u5931\u8D25", {
	                        level: 'error',
	                        extra: {
	                            data: errMsg
	                        }
	                    });
	                } catch (e) {}
	            }).finally(function () {
	                _this9.loadListData = false;
	                $('.jiazai').remove();
	            });
	        }
	    }, {
	        key: "initObserverMyPrizeListEvent",
	        value: function initObserverMyPrizeListEvent() {
	            var _this10 = this;
	
	            Config.observer.on("myPrizeList", function (data) {
	                var html = ejs.render(_this10.myPrizeListTemplate, {
	                    list: data
	                });
	                _this10.$tab3.append(html);
	            });
	        }
	    }, {
	        key: "initMyPrizeList",
	        value: function initMyPrizeList(page) {
	            var _this11 = this;
	
	            if (Config.urlSearchObj['debug']) {
	                return;
	            }
	            page == 1 && this.$tab3.empty();
	
	            var params = {
	                data: {
	                    page: page,
	                    openid: Config.userInfo.openid
	                }
	            };
	            this.loadListData = true;
	
	            Promise.resolve(Api.winnerList(params)).then(function (res) {
	                if (!res.success) {
	                    return Promise.reject();
	                }
	                Config.myprize = res.result;
	                return Promise.resolve();
	            }).then(function () {
	                if (Config.myprize.length == 0 && page == 1) {
	                    var demo = "<div class=\"warp\">\n                                        <div class=\"nonepeople\">\u6682\u65E0\u5956\u54C1</div>\n                                    </div>";
	                    _this11.$tab3.append(demo);
	                } else if (Config.myprize.length != 0) {
	                    Config.observer.emit("myPrizeList", Config.myprize);
	                }
	                _this11.initBtnMyPrize();
	            }).catch(function (err) {
	                var errMsg = typeof err === 'string' ? err : err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString();
	                try {
	                    Raven.captureMessage("<\u83B7\u53D6\u6211\u7684\u5956\u54C1\u5217\u8868>\u5931\u8D25", {
	                        level: 'error',
	                        extra: {
	                            data: errMsg
	                        }
	                    });
	                } catch (e) {}
	            }).finally(function () {
	                _this11.loadListData = false;
	                $('.jiazai').remove();
	            });
	        }
	    }, {
	        key: "initBtnListEvent",
	        value: function initBtnListEvent() {
	            this.$weuiNavbar.on("tap", function (e) {
	                var index = $(e.target).data("index");
	                switch (index) {
	                    case 1:
	                        addClassRedbottom(1);
	                        try {
	                            fiboSDK.btnClick('home-btn-tab1', '抽奖页-中奖名单');
	                        } catch (e) {}
	
	                        break;
	                    case 2:
	                        addClassRedbottom(2);
	                        try {
	                            fiboSDK.btnClick('home-btn-tab2', '抽奖页-我的邀请');
	                        } catch (e) {}
	                        break;
	                    case 3:
	                        addClassRedbottom(3);
	                        try {
	                            fiboSDK.btnClick('home-btn-tab3', '抽奖页-我的奖品');
	                        } catch (e) {}
	                        break;
	                    default:
	                        break;
	                }
	            });
	
	            function addClassRedbottom(select) {
	                $('#btnWinnerList').removeClass('redbottom');
	                $('#btnMyinvite').removeClass('redbottom');
	                $('#btnMyprize').removeClass('redbottom');
	
	                $('#tab1').addClass("no-active");
	                $('#tab2').addClass("no-active");
	                $('#tab3').addClass("no-active");
	
	                switch (select) {
	                    case 1:
	                        $('#btnWinnerList').addClass('redbottom');
	                        $('#tab1').removeClass("no-active");
	                        break;
	                    case 2:
	                        $('#btnMyinvite').addClass('redbottom');
	                        $('#tab2').removeClass("no-active");
	                        break;
	                    case 3:
	                        $('#btnMyprize').addClass('redbottom');
	                        $('#tab3').removeClass("no-active");
	                        break;
	                    default:
	                        break;
	                }
	            }
	        }
	    }, {
	        key: "initBtnMyPrize",
	        value: function initBtnMyPrize() {
	            $(".turntable-right").off().on('tap', function (e) {
	                var $target = $(e.target);
	
	                switch ($target.data("awardtype")) {
	                    case 7:
	                        Popup.sameCity.show();
	                        try {
	                            fiboSDK.btnClick('home-list-btn-same-city', '首页我的奖品列表-同城活动按键');
	                        } catch (e) {}
	                        break;
	                    case 3:
	                        Popup.toothpaste.show();
	                        try {
	                            fiboSDK.btnClick('home-list-btn-toothpaste', '首页我的奖品列表-填写牙膏收件信息按键');
	                        } catch (e) {}
	                        break;
	                    case 1:
	                        Popup.desneyMyawardList.show();
	                        try {
	                            fiboSDK.btnClick('home-list-btn-desney', '首页我的奖品列表-迪士尼按键');
	                        } catch (e) {}
	                        break;
	                    case 8:
	                        window.location.href = Config.jumpUrlObj.awardListJifenBtn;
	                        try {
	                            fiboSDK.btnClick('home-list-btn-jifen', '首页我的奖品列表-积分按键');
	                        } catch (e) {}
	                        break;
	                    default:
	                        return;
	                        break;
	                }
	                Config.awardData.id = $target.data("id");
	            });
	            $(".award-list--toothpast-btn").off().on("tap", function (e) {
	                if (Config.jumpUrlObj.awardListToothpastBtn) {
	                    window.location.href = Config.jumpUrlObj.awardListToothpastBtn;
	                }
	                try {
	                    fiboSDK.btnClick('home-list-btn-toothpaste-detail', '首页我的奖品列表-牙膏详情按键');
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            this.initTimes();
	            this.$dom.show();
	            this.initBtnMyPrize();
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            this.$dom.hide();
	        }
	    }]);
	
	    return HomeClass;
	}(BaseClass);
	
	module.exports = HomeClass;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var HomeClass = function (_BaseClass) {
	    _inherits(HomeClass, _BaseClass);
	
	    function HomeClass(str) {
	        _classCallCheck(this, HomeClass);
	
	        return _possibleConstructorReturn(this, (HomeClass.__proto__ || Object.getPrototypeOf(HomeClass)).call(this, str));
	    }
	
	    _createClass(HomeClass, [{
	        key: "init",
	        value: function init() {
	            this.$btnRegist = this.$dom.find("#btnRegist");
	
	            this.initBtnRegist();
	        }
	    }, {
	        key: "initBtnRegist",
	        value: function initBtnRegist() {
	            var _this2 = this;
	
	            this.$btnRegist.on("tap", function () {
	                if (!Config.subscribe) {
	                    Popup.subscribe.show();
	                    return;
	                }
	                if (Config.userInfo.mobile) {
	                    _this2.hide();
	                    View.home.show();
	                    return;
	                }
	                View.registInfo.show();
	                _this2.hide();
	                try {
	                    fiboSDK.btnClick('regist-btn-regist', '首页-立即注册');
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            _get(HomeClass.prototype.__proto__ || Object.getPrototypeOf(HomeClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(HomeClass.prototype.__proto__ || Object.getPrototypeOf(HomeClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return HomeClass;
	}(BaseClass);
	
	module.exports = HomeClass;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var HomeClass = function (_BaseClass) {
	    _inherits(HomeClass, _BaseClass);
	
	    function HomeClass(str) {
	        _classCallCheck(this, HomeClass);
	
	        return _possibleConstructorReturn(this, (HomeClass.__proto__ || Object.getPrototypeOf(HomeClass)).call(this, str));
	    }
	
	    _createClass(HomeClass, [{
	        key: "init",
	        value: function init() {
	            this.submitData = {
	                hobby: null,
	                kid: null,
	                mobile: null,
	                code: null
	            };
	
	            this.submitting = false;
	
	            this.$btnHobby = this.$dom.find("#btnHobby");
	            this.$btnKid = this.$dom.find("#btnKid");
	            this.$inputMobile = this.$dom.find("#inputMobile");
	            this.$inputCode = this.$dom.find("#inputCode");
	            this.$btnSend = this.$dom.find("#btnSecdCode");
	            this.$sendText = this.$dom.find("#sendText");
	            this.$btnSubmit = this.$dom.find("#btnSubmit");
	
	            this.initBtnHobby();
	            this.initBtnKid();
	            this.initMobileInputEvent();
	            this.initCodeInputEvent();
	            this.initBtnSubmitEvent();
	            this.initBtnSendEvent();
	        }
	    }, {
	        key: "initBtnHobby",
	        value: function initBtnHobby() {
	            this.$btnHobby.on("tap", function () {
	                Popup.hobby.$hobbyOptionsBox.find('span').removeClass("hobby__hobby-active");
	                Popup.hobby.hobbysArray.forEach(function (element) {
	                    Popup.hobby.$hobbyOptionsBox.find("[data-index=\"" + element + "\"]").addClass("hobby__hobby-active");
	                });
	                Popup.hobby.show();
	            });
	        }
	    }, {
	        key: "initBtnKid",
	        value: function initBtnKid() {
	            this.$btnKid.on("tap", function () {
	                Popup.kid.$kidOptionsBox.find('span').removeClass("kid__kid-active");
	                Popup.kid.$kidOptionsBox.find("[data-index=\"" + Popup.kid.kidArray[0] + "\"]").addClass("kid__kid-active");
	                Popup.kid.show();
	            });
	        }
	    }, {
	        key: "initMobileInputEvent",
	        value: function initMobileInputEvent() {
	            var _this2 = this;
	
	            this.$inputMobile.on('input', function (event) {
	                _this2.submitData.mobile = event.target.value;
	            });
	        }
	    }, {
	        key: "initCodeInputEvent",
	        value: function initCodeInputEvent() {
	            var _this3 = this;
	
	            this.$inputCode.on('input', function (event) {
	                _this3.submitData.code = event.target.value;
	            });
	        }
	    }, {
	        key: "initBtnSendEvent",
	        value: function initBtnSendEvent() {
	            var _this4 = this;
	
	            this.$btnSend.on('tap', function () {
	                if (_this4.sendTime > 0) {
	                    return;
	                }
	                if (_this4.sending) {
	                    TipManager.show("正在向您的手机发送验证码，请稍候...");
	                    return;
	                }
	                if (_this4.submitting) {
	                    TipManager.show("提交数据中，暂时不能获取验证码...");
	                    return;
	                }
	                if (!_this4.checkPhone()) {
	                    return;
	                }
	                _this4.fetchCode();
	            });
	        }
	    }, {
	        key: "fetchCode",
	        value: function fetchCode() {
	            var _this5 = this;
	
	            this.sendTime = Config.sendCodeTime || 60;
	            var sourceText = this.$sendText.text();
	            var timer = setInterval(function () {
	                _this5.sendTime -= 1;
	                if (_this5.sendTime > 0) {
	                    _this5.$sendText.text(_this5.sendTime);
	                    return;
	                }
	                clearInterval(timer);
	                _this5.$sendText.text(sourceText);
	            }, 1000);
	            var params = {
	                data: {
	                    mobile: this.submitData.mobile,
	                    openid: Config.userInfo.openid
	                }
	
	            };
	            this.sending = true;
	            Promise.resolve(Api.getCode(params)).then(function (res) {
	                if (res.result) {
	                    TipManager.show('成功发送短信验证码，如果未收到短信验证码，请60秒后重试');
	                } else if (res.error_code == -1) {
	                    TipManager.show(res.msg);
	                    _this5.sendTime = 0;
	                } else {
	                    TipManager.show('一小时内只能获取三次验证码');
	                    _this5.sendTime = 0;
	                }
	            }).catch(function (err) {
	                var errMsg = typeof err === 'string' ? err : err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString();
	                try {
	                    Raven.captureMessage("<\u83B7\u53D6\u9A8C\u8BC1\u7801>\u5931\u8D25", {
	                        level: 'error',
	                        extra: {
	                            data: errMsg
	                        }
	                    });
	                } catch (e) {}
	            }).finally(function () {
	                _this5.sending = false;
	            });
	        }
	    }, {
	        key: "initBtnSubmitEvent",
	        value: function initBtnSubmitEvent() {
	            var _this6 = this;
	
	            this.$btnSubmit.on('tap', function () {
	                if (_this6.submitting) {
	                    TipManager.show("正在提交数据，请稍等...");
	                    return;
	                }
	                if (!_this6.checkSubmitData()) {
	                    return;
	                }
	                try {
	                    fiboSDK.btnClick('regist-info-btn-submit', '完善会员资料-提交抽大奖');
	                } catch (e) {}
	                _this6.goToSubmit();
	            });
	        }
	    }, {
	        key: "checkHobby",
	        value: function checkHobby() {
	            if (!this.submitData.hobby) {
	                TipManager.show("请选择您的喜好");
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: "checkKid",
	        value: function checkKid() {
	            if (this.submitData.kid == null) {
	                TipManager.show("请选择您的情况");
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: "checkPhone",
	        value: function checkPhone() {
	            if (!this.submitData.mobile) {
	                TipManager.show("请先输入手机号码");
	                return false;
	            }
	            if (!/^1[23456789]\d{9}$/i.test(this.submitData.mobile)) {
	                TipManager.show("你输入的不是手机号码");
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: "checkSubmitData",
	        value: function checkSubmitData() {
	            if (!this.checkHobby()) {
	                return;
	            }
	            if (!this.checkKid()) {
	                return;
	            }
	            if (!this.checkPhone()) {
	                return false;
	            }
	            if (!this.submitData.code) {
	                TipManager.show("请先输入验证码");
	                return false;
	            }
	            if (!/^\d{6}$/i.test(this.submitData.code)) {
	                TipManager.show("请输入正确的验证码");
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: "goToSubmit",
	        value: function goToSubmit() {
	            var _this7 = this;
	
	            var params = {
	                data: {
	                    code: this.submitData.code,
	                    hobby: this.submitData.hobby,
	                    child: this.submitData.kid,
	                    other_openid: Config.urlSearchObj['other_openid'],
	                    cnl: Config.urlSearchObj['cnl'],
	                    openid: Config.userInfo.openid,
	                    mobile: this.submitData.mobile
	                }
	            };
	
	            try {
	                var fForm = {
	                    '姓名': config.userInfo.nickname,
	                    '性别': config.userInfo.sex,
	                    '城市': config.userInfo.city,
	                    '手机': this.submitData.mobile,
	                    '喜好': this.submitData.hobby,
	                    '小孩': this.submitData.kid
	                };
	                fiboSDK.saveFormInfo(fForm, '完善会员资料-提交抽大奖的表单信息');
	            } catch (e) {}
	            this.submitting = true;
	            Promise.resolve(Api.register(params)).then(function (res) {
	                if (!res.success) {
	                    alert(res.msg);
	                    return Promise.reject(res);
	                }
	                TipManager.show("注册成功");
	                _this7.hide();
	                Util.addFrend();
	                return Util.getInfo();
	            }).then(function () {
	                View.home.show();
	            }).catch(function (err) {
	                var errMsg = typeof err === 'string' ? err : err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString();
	                try {
	                    Raven.captureMessage("<\u63D0\u4EA4\u9A8C\u8BC1\u7801\u5E76\u66F4\u65B0\u5BA1\u6838\u5217\u8868>\u5931\u8D25", {
	                        level: 'error',
	                        extra: {
	                            data: errMsg
	                        }
	                    });
	                } catch (e) {}
	            }).finally(function () {
	                _this7.submitting = false;
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            _get(HomeClass.prototype.__proto__ || Object.getPrototypeOf(HomeClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(HomeClass.prototype.__proto__ || Object.getPrototypeOf(HomeClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return HomeClass;
	}(BaseClass);
	
	module.exports = HomeClass;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.$ruleCommomText = this.$dom.find("#ruleCommomText");
	
	            this.$rulSeeMore = this.$dom.find("#rulSeeMore");
	            this.$ruleBtnSure = this.$dom.find("#ruleBtnSure");
	            this.initBtnSure();
	            this.initScrollAtBottomRuleEvent();
	        }
	    }, {
	        key: "initBtnSure",
	        value: function initBtnSure() {
	            var _this2 = this;
	
	            this.$ruleBtnSure.on("tap", function (e) {
	                _this2.hide();
	            });
	        }
	    }, {
	        key: "initScrollAtBottomRuleEvent",
	        value: function initScrollAtBottomRuleEvent() {
	            var _this3 = this;
	
	            Util.scrollAtBottom(this.$ruleCommomText[0], function () {
	                console.log("dddd");
	                _this3.$rulSeeMore.hide();
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: 'init',
	        value: function init() {
	            this.$box = this.$dom.find('.box');
	            this.initBoxEvent();
	        }
	    }, {
	        key: 'initBoxEvent',
	        value: function initBoxEvent() {
	            var _this2 = this;
	
	            this.$box.on('tap', function (event) {
	                if (event.target !== _this2.$box[0]) {
	                    return;
	                }
	                _this2.hide();
	                Util.getSubscribe();
	            });
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), 'show', this).call(this);
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), 'hide', this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.$hobbyOptionsBox = this.$dom.find("#hobbyOptionsBox");
	            this.$hobbyBtnSure = this.$dom.find("#hobbyBtnSure");
	            this.$hobbyBtnClose = this.$dom.find("#hobbyBtnClose");
	
	            this.hobbysArray = [];
	
	            this.initBtnClose();
	            this.initBtnSure();
	            this.initSelectContainerEvent();
	        }
	    }, {
	        key: "initBtnClose",
	        value: function initBtnClose() {
	            var _this2 = this;
	
	            this.$hobbyBtnClose.on("tap", function () {
	                _this2.hide();
	            });
	        }
	    }, {
	        key: "initBtnSure",
	        value: function initBtnSure() {
	            var _this3 = this;
	
	            this.$hobbyBtnSure.on("tap", function () {
	                _this3.hobbysArray = [];
	                var array = _this3.$hobbyOptionsBox.find("[class='hobby__hobby-active']");
	                var hobbyStr = "";
	                $.each(array, function (index, ele) {
	                    hobbyStr = hobbyStr + ";" + $(ele).text();
	                    _this3.hobbysArray.push($(ele).data('index'));
	                });
	                hobbyStr = hobbyStr.replace(/\;/, "");
	                if (!hobbyStr) {
	                    $("#hobbyText").text("请选择");
	                    View.registInfo.submitData.hobby = null;
	                } else {
	                    View.registInfo.submitData.hobby = hobbyStr;
	                    $("#hobbyText").text(hobbyStr);
	                }
	                _this3.hide();
	            });
	        }
	    }, {
	        key: "initSelectContainerEvent",
	        value: function initSelectContainerEvent() {
	            this.$hobbyOptionsBox.on('tap', function (event) {
	                var $target = $(event.target);
	                if ($target.hasClass("hobby__hobby-active")) {
	                    $target.removeClass("hobby__hobby-active");
	                } else {
	                    $target.addClass("hobby__hobby-active");
	                }
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.kidArray = [];
	
	            this.$kidOptionsBox = this.$dom.find("#kidOptionsBox");
	            this.$kidBtnSure = this.$dom.find("#kidBtnSure");
	            this.$kidBtnClose = this.$dom.find("#kidBtnClose");
	
	            this.initBtnClose();
	            this.initBtnSure();
	            this.initSelectContainerEvent();
	        }
	    }, {
	        key: "initBtnClose",
	        value: function initBtnClose() {
	            var _this2 = this;
	
	            this.$kidBtnClose.on("tap", function () {
	                _this2.hide();
	            });
	        }
	    }, {
	        key: "initBtnSure",
	        value: function initBtnSure() {
	            var _this3 = this;
	
	            this.$kidBtnSure.on("tap", function () {
	                _this3.kidArray = [];
	                var kid = _this3.$kidOptionsBox.find("[class='kid__kid-active']").text();
	                if (!kid) {
	                    View.registInfo.submitData.kid = null;
	                    $("#kidType").text("请选择");
	                } else {
	                    _this3.kidArray.push(_this3.$kidOptionsBox.find("[class='kid__kid-active']").data('index'));
	                    View.registInfo.submitData.kid = kid;
	                    $("#kidType").text(kid);
	                }
	
	                _this3.hide();
	            });
	        }
	    }, {
	        key: "initSelectContainerEvent",
	        value: function initSelectContainerEvent() {
	            var _this4 = this;
	
	            this.$kidOptionsBox.on('tap', function (event) {
	                var $target = $(event.target);
	                if ($target.hasClass("kid__kid-active")) {
	                    return;
	                }
	                _this4.$kidOptionsBox.find("span").removeClass("kid__kid-active");
	                $target.addClass("kid__kid-active");
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.$noticeUpgradeBtnClose = this.$dom.find("#noticeUpgradeBtnClose");
	
	            this.initBtnClose();
	        }
	    }, {
	        key: "initBtnClose",
	        value: function initBtnClose() {
	            var _this2 = this;
	
	            this.$noticeUpgradeBtnClose.on("tap", function () {
	                _this2.hide();
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.$noticeActEndBtnClose = this.$dom.find("#noticeActEndBtnClose");
	
	            this.initBtnClose();
	        }
	    }, {
	        key: "initBtnClose",
	        value: function initBtnClose() {
	            var _this2 = this;
	
	            this.$noticeActEndBtnClose.on("tap", function () {
	                _this2.hide();
	            });
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.$box = this.$dom.find(".box");
	            this.initBtnClose();
	        }
	    }, {
	        key: "initBtnClose",
	        value: function initBtnClose() {
	            var _this2 = this;
	
	            this.$box.on("tap", function () {
	                _this2.hide();
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.$desneyBtnClose = this.$dom.find("#desneyBtnClose");
	            this.$desneyBtnSure = this.$dom.find("#desneyBtnSure");
	            this.initBtnClose();
	            this.initBtnSure();
	        }
	    }, {
	        key: "initBtnClose",
	        value: function initBtnClose() {
	            var _this2 = this;
	
	            this.$desneyBtnClose.on("tap", function (e) {
	                _this2.hide();
	            });
	        }
	    }, {
	        key: "initBtnSure",
	        value: function initBtnSure() {
	            var _this3 = this;
	
	            this.$desneyBtnSure.on("tap", function (e) {
	                _this3.hide();
	                if (Config.userInfo.chance == 0) {
	                    Popup.shareThree.show();
	                }
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.$btnClose = this.$dom.find('.box');
	            this.btnCloseEvent();
	        }
	    }, {
	        key: "btnCloseEvent",
	        value: function btnCloseEvent() {
	            var _this2 = this;
	
	            this.$btnClose.on("tap", function (e) {
	                if (e.target == _this2.$btnClose[0]) {
	                    _this2.hide();
	                }
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.$sameCityBtnClose = this.$dom.find("#sameCityBtnClose");
	            this.$sameCityBtnSure = this.$dom.find("#sameCityBtnSure");
	            this.$sameCityBtnJump = this.$dom.find("#sameCityBtnJump");
	
	            this.initBtnClose();
	            this.initBtnSure();
	            this.initBtnJumpUrl();
	        }
	    }, {
	        key: "initBtnClose",
	        value: function initBtnClose() {
	            var _this2 = this;
	
	            this.$sameCityBtnClose.on("tap", function (e) {
	                _this2.hide();
	            });
	        }
	    }, {
	        key: "initBtnSure",
	        value: function initBtnSure() {
	            var _this3 = this;
	
	            this.$sameCityBtnSure.on("tap", function (e) {
	                _this3.hide();
	                if (Config.userInfo.chance == 0) {
	                    Popup.shareThree.show();
	                }
	            });
	        }
	    }, {
	        key: "initBtnJumpUrl",
	        value: function initBtnJumpUrl() {
	            var _this4 = this;
	
	            this.$sameCityBtnJump.on("tap", function (e) {
	                Popup.sameCityInfo.show();
	                _this4.hide();
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.$toothpasteBtnClose = this.$dom.find("#toothpasteBtnClose");
	            this.$toothpasteBtnSure = this.$dom.find("#toothpasteBtnSure");
	            this.$toothpasteBtnAddr = this.$dom.find("#toothpasteBtnAddr");
	
	            this.initBtnClose();
	            this.initBtnSure();
	            this.initBtnAddr();
	        }
	    }, {
	        key: "initBtnClose",
	        value: function initBtnClose() {
	            var _this2 = this;
	
	            this.$toothpasteBtnClose.on("tap", function (e) {
	                _this2.hide();
	            });
	        }
	    }, {
	        key: "initBtnSure",
	        value: function initBtnSure() {
	            var _this3 = this;
	
	            this.$toothpasteBtnSure.on("tap", function (e) {
	                _this3.hide();
	                if (Config.userInfo.chance == 0) {
	                    Popup.shareThree.show();
	                }
	            });
	        }
	    }, {
	        key: "initBtnAddr",
	        value: function initBtnAddr() {
	            var _this4 = this;
	
	            this.$toothpasteBtnAddr.on("tap", function (e) {
	                Popup.toothpasteAddressInfo.show();
	                _this4.hide();
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.$redpackBtnclose = this.$dom.find("#redpackBtnClose");
	            this.$redpackBtnSure = this.$dom.find("#redpackBtnSure");
	            this.$redpackAmount = this.$dom.find("#redpackAmount");
	
	            this.initBtnClose();
	            this.initBtnSure();
	        }
	    }, {
	        key: "initBtnClose",
	        value: function initBtnClose() {
	            var _this2 = this;
	
	            this.$redpackBtnclose.on("tap", function (e) {
	                _this2.hide();
	            });
	        }
	    }, {
	        key: "initBtnSure",
	        value: function initBtnSure() {
	            var _this3 = this;
	
	            this.$redpackBtnSure.on("tap", function (e) {
	                _this3.hide();
	                if (Config.userInfo.chance == 0) {
	                    Popup.shareThree.show();
	                }
	            });
	        }
	    }, {
	        key: "initDate",
	        value: function initDate() {
	            this.$redpackAmount.text(Config.awardData.amount / 100 + "元红包");
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            this.initDate();
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.$jifen100BtnClose = this.$dom.find("#jifen100BtnClose");
	            this.$jifen100BtnSure = this.$dom.find("#jifen100BtnSure");
	            this.$jifen100BtnJumpUrl = this.$dom.find("#jifen100BtnJumpUrl");
	
	            this.initBtnClose();
	            this.initBtnSure();
	            this.initBtnJumpUrl();
	        }
	    }, {
	        key: "initBtnClose",
	        value: function initBtnClose() {
	            var _this2 = this;
	
	            this.$jifen100BtnClose.on("tap", function (e) {
	                _this2.hide();
	                try {
	                    fiboSDK.btnClick('jifen100-btn-close', '中奖100积分-关闭');
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: "initBtnSure",
	        value: function initBtnSure() {
	            var _this3 = this;
	
	            this.$jifen100BtnSure.on("tap", function (e) {
	                _this3.hide();
	                if (Config.userInfo.chance == 0) {
	                    Popup.shareThree.show();
	                }
	                try {
	                    fiboSDK.btnClick('jifen100-btn-again', '中奖100积分-再来一次');
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: "initBtnJumpUrl",
	        value: function initBtnJumpUrl() {
	            this.$jifen100BtnJumpUrl.on("tap", function (e) {
	
	                window.location.href = Config.jumpUrlObj.Jifen100Btn;
	                try {
	                    fiboSDK.btnClick('jifen100-btn-go-now', '中奖100积分-直接兑换');
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.$jifen50BtnClose = this.$dom.find("#jifen50BtnClose");
	            this.$jifen50BtnSure = this.$dom.find("#jifen50BtnSure");
	            this.$jifen50BtnJumpUrl = this.$dom.find("#jifen50BtnJumpUrl");
	
	            this.initBtnClose();
	            this.initBtnSure();
	            this.initBtnJumpUrl();
	        }
	    }, {
	        key: "initBtnClose",
	        value: function initBtnClose() {
	            var _this2 = this;
	
	            this.$jifen50BtnClose.on("tap", function (e) {
	                _this2.hide();
	                try {
	                    fiboSDK.btnClick('jifen50-btn-close', '中奖50积分-关闭');
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: "initBtnSure",
	        value: function initBtnSure() {
	            var _this3 = this;
	
	            this.$jifen50BtnSure.on("tap", function (e) {
	                _this3.hide();
	                if (Config.userInfo.chance == 0) {
	                    Popup.shareThree.show();
	                }
	                try {
	                    fiboSDK.btnClick('jifen50-btn-again', '中奖50积分-再来一次');
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: "initBtnJumpUrl",
	        value: function initBtnJumpUrl() {
	            this.$jifen50BtnJumpUrl.on("tap", function (e) {
	
	                window.location.href = Config.jumpUrlObj.Jifen50Btn;
	                try {
	                    fiboSDK.btnClick('jifen50-btn-go-now', '中奖50积分-直接兑换');
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.$jifen20BtnClose = this.$dom.find("#jifen20BtnClose");
	            this.$jifen20BtnSure = this.$dom.find("#jifen20BtnSure");
	            this.$jifen20BtnJumpUrl = this.$dom.find("#jifen20BtnJumpUrl");
	
	            this.initBtnClose();
	            this.initBtnSure();
	            this.initBtnJumpUrl();
	        }
	    }, {
	        key: "initBtnClose",
	        value: function initBtnClose() {
	            var _this2 = this;
	
	            this.$jifen20BtnClose.on("tap", function (e) {
	                _this2.hide();
	                try {
	                    fiboSDK.btnClick('jifen20-btn-close', '中奖20积分-关闭');
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: "initBtnSure",
	        value: function initBtnSure() {
	            var _this3 = this;
	
	            this.$jifen20BtnSure.on("tap", function (e) {
	                _this3.hide();
	                if (Config.userInfo.chance == 0) {
	                    Popup.shareThree.show();
	                }
	                try {
	                    fiboSDK.btnClick('jifen20-btn-again', '中奖20积分-再来一次');
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: "initBtnJumpUrl",
	        value: function initBtnJumpUrl() {
	            this.$jifen20BtnJumpUrl.on("tap", function (e) {
	
	                window.location.href = Config.jumpUrlObj.Jifen20Btn;
	
	                try {
	                    fiboSDK.btnClick('jifen20-btn-go-now', '中奖20积分-直接兑换');
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.$Jifen10BtnClose = this.$dom.find("#jifen10BtnClose");
	            this.$Jifen10BtnSure = this.$dom.find("#jifen10BtnSure");
	            this.$Jifen10BtnJumpUrl = this.$dom.find("#jifen10BtnJumpUrl");
	
	            this.initBtnClose();
	            this.initBtnSure();
	            this.initBtnJumpUrl();
	        }
	    }, {
	        key: "initBtnClose",
	        value: function initBtnClose() {
	            var _this2 = this;
	
	            this.$Jifen10BtnClose.on("tap", function (e) {
	                _this2.hide();
	                try {
	                    fiboSDK.btnClick('jifen10-btn-close', '中奖10积分-关闭');
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: "initBtnSure",
	        value: function initBtnSure() {
	            var _this3 = this;
	
	            this.$Jifen10BtnSure.on("tap", function (e) {
	                _this3.hide();
	                if (Config.userInfo.chance == 0) {
	                    Popup.shareThree.show();
	                }
	                try {
	                    fiboSDK.btnClick('jifen10-btn-again', '中奖10积分-再来一次');
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: "initBtnJumpUrl",
	        value: function initBtnJumpUrl() {
	            this.$Jifen10BtnJumpUrl.on("tap", function (e) {
	
	                window.location.href = Config.jumpUrlObj.Jifen10Btn;
	                try {
	                    fiboSDK.btnClick('jifen10-btn-go-now', '中奖10积分-直接兑换');
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.submitData = {
	                id: null,
	                openid: null,
	                mobile: null,
	                address: null,
	                username: null
	            };
	            this.submitting = false;
	
	            this.$toothpasteUsername = this.$dom.find("#toothpasteUsername");
	            this.$toothpasteMobile = this.$dom.find("#toothpasteMobile");
	            this.$toothpasteAddress = this.$dom.find("#toothpasteAddress");
	            this.$toothpasteAddressInfoBtnSure = this.$dom.find("#toothpasteAddressInfoBtnSure");
	
	            this.initInputEvent();
	            this.initBtnSubmitEvent();
	            this.initObserversubmitData();
	        }
	    }, {
	        key: "initObserversubmitData",
	        value: function initObserversubmitData() {
	            var _this2 = this;
	
	            Config.observer.on("initToothPasteSubmitData", function () {
	                _this2.submitData.id = Config.awardData.id;
	                _this2.submitData.openid = Config.userInfo.openid;
	            });
	        }
	    }, {
	        key: "initInputEvent",
	        value: function initInputEvent() {
	            var _this3 = this;
	
	            this.$toothpasteUsername.on('input', function (event) {
	                _this3.submitData.username = event.target.value;
	            });
	            this.$toothpasteMobile.on('input', function (event) {
	                _this3.submitData.mobile = event.target.value;
	            });
	            this.$toothpasteAddress.on('input', function (event) {
	                _this3.submitData.address = event.target.value;
	            });
	        }
	    }, {
	        key: "initBtnSubmitEvent",
	        value: function initBtnSubmitEvent() {
	            var _this4 = this;
	
	            this.$toothpasteAddressInfoBtnSure.on('tap', function () {
	                try {
	                    fiboSDK.btnClick('toothpaste-addr-btn-submit', '提交牙膏收件人信息页--提交信息');
	                } catch (e) {}
	
	                if (_this4.submitting) {
	                    TipManager.show("正在提交数据，请稍等...");
	                    return;
	                }
	                if (!_this4.checkSubmitData()) {
	                    return;
	                }
	                _this4.goToSubmit();
	            });
	        }
	    }, {
	        key: "checkPhone",
	        value: function checkPhone() {
	            if (!this.submitData.mobile) {
	                TipManager.show("请先输入手机号码");
	                return false;
	            }
	            if (!/^1[23456789]\d{9}$/i.test(this.submitData.mobile)) {
	                TipManager.show("你输入的不是手机号码");
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: "checkSubmitData",
	        value: function checkSubmitData() {
	            if (!this.submitData.username) {
	                TipManager.show("请先输入联系人姓名");
	                return;
	            }
	            if (!this.checkPhone()) {
	                return false;
	            }
	            if (!this.submitData.address) {
	                TipManager.show("请先输入收货地址");
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: "goToSubmit",
	        value: function goToSubmit() {
	            var _this5 = this;
	
	            var params = {
	                data: this.submitData
	            };
	            try {
	                var fForm = {
	                    '奖品类型': this.submitData.id,
	                    '收件人': this.submitData.username,
	                    '收件手机': this.submitData.mobile,
	                    '地址': this.submitData.address
	                };
	
	                fiboSDK.saveFormInfo(fForm, '提交牙膏收件人信息页--表单信息');
	            } catch (e) {}
	            this.submitting = true;
	            Promise.resolve(Api.putAddress(params)).then(function (res) {
	                if (!res.success) {
	                    TipManager.show(res.msg);
	                    return;
	                }
	                TipManager.show("提交成功");
	                _this5.hide();
	            }).catch(function (err) {
	                var errMsg = typeof err === 'string' ? err : err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString();
	                try {
	                    Raven.captureMessage("<\u63D0\u4EA4\u7259\u818F\u6536\u8D27\u4FE1\u606F>\u5931\u8D25", {
	                        level: 'error',
	                        extra: {
	                            data: errMsg
	                        }
	                    });
	                } catch (e) {}
	            }).finally(function () {
	                _this5.submitting = false;
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            Config.observer.emit("initToothPasteSubmitData");
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            View.home.initMyPrizeList(1);
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.$shareThreeBtnSure = this.$dom.find("#shareThreeBtnSure");
	
	            this.initBtnClose();
	        }
	    }, {
	        key: "initBtnClose",
	        value: function initBtnClose() {
	            var _this2 = this;
	
	            this.$shareThreeBtnSure.on("tap", function () {
	                Popup.share.show();
	                _this2.hide();
	                try {
	                    fiboSDK.btnClick('share-three-btn', '分享指引提示-确定');
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.$limitLotteryBtnClose = this.$dom.find("#limitLotteryBtnClose");
	
	            this.initBtnClose();
	        }
	    }, {
	        key: "initBtnClose",
	        value: function initBtnClose() {
	            var _this2 = this;
	
	            this.$limitLotteryBtnClose.on("tap", function () {
	                _this2.hide();
	            });
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.$shareSucBtnClose = this.$dom.find("#shareSucBtnClose");
	            this.initBtnClose();
	        }
	    }, {
	        key: "initBtnClose",
	        value: function initBtnClose() {
	            var _this2 = this;
	
	            this.$shareSucBtnClose.on("tap", function (e) {
	                _this2.hide();
	                try {
	                    fiboSDK.btnClick('share-suc-btn-close', '已经发送链接-关闭');
	                } catch (e) {}
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RuleClass = function (_BasePopupClass) {
	    _inherits(RuleClass, _BasePopupClass);
	
	    function RuleClass(str) {
	        _classCallCheck(this, RuleClass);
	
	        return _possibleConstructorReturn(this, (RuleClass.__proto__ || Object.getPrototypeOf(RuleClass)).call(this, str));
	    }
	
	    _createClass(RuleClass, [{
	        key: "init",
	        value: function init() {
	            this.submitData = {
	                id: null,
	                openid: null,
	                mobile: null,
	                active: null
	            };
	            this.submitting = false;
	            this.$sameCityInfoInput = this.$dom.find("#sameCityInfoInput");
	            this.$sameCityInfoBtnSure = this.$dom.find("#sameCityInfoBtnSure");
	            this.$sameCityInfoOptionsBox = this.$dom.find("#sameCityInfoOptionsBox");
	
	            this.initInputEvent();
	            this.initBtnSubmitEvent();
	            this.initSelectContainerEvent();
	            this.initObserversubmitData();
	        }
	    }, {
	        key: "initObserversubmitData",
	        value: function initObserversubmitData() {
	            var _this2 = this;
	
	            Config.observer.on("initSameCityInfoSubmitData", function () {
	                _this2.submitData.id = Config.awardData.id;
	                _this2.submitData.openid = Config.userInfo.openid;
	            });
	        }
	    }, {
	        key: "initSelectContainerEvent",
	        value: function initSelectContainerEvent() {
	            var _this3 = this;
	
	            this.$sameCityInfoOptionsBox.on('tap', function (event) {
	                var $target = $(event.target);
	                _this3.$sameCityInfoOptionsBox.find(".option-act").hide();
	                $target.find(".option-act").show();
	                _this3.activeType($target.data("index"));
	            });
	        }
	    }, {
	        key: "activeType",
	        value: function activeType(index) {
	            var activeType = "";
	            switch (index) {
	                case 1:
	                    activeType = "育儿沙龙";
	                    break;
	                case 2:
	                    activeType = "美食类";
	                    break;
	                case 3:
	                    activeType = "插花";
	                    break;
	                case 4:
	                    activeType = "运动健身";
	                    break;
	                default:
	                    break;
	            }
	            this.submitData.active = activeType;
	        }
	    }, {
	        key: "initInputEvent",
	        value: function initInputEvent() {
	            var _this4 = this;
	
	            this.$sameCityInfoInput.on('input', function (event) {
	                _this4.submitData.mobile = event.target.value;
	            });
	        }
	    }, {
	        key: "initBtnSubmitEvent",
	        value: function initBtnSubmitEvent() {
	            var _this5 = this;
	
	            this.$sameCityInfoBtnSure.on('tap', function () {
	
	                if (_this5.submitting) {
	                    TipManager.show("正在提交数据，请稍等...");
	                    return;
	                }
	                if (!_this5.checkSubmitData()) {
	                    return;
	                }
	                try {
	                    fiboSDK.btnClick('same-city-info-btn-submit', '同城活动类别选择页面-确定');
	                } catch (e) {}
	
	                _this5.goToSubmit();
	            });
	        }
	    }, {
	        key: "checkPhone",
	        value: function checkPhone() {
	            if (!this.submitData.mobile) {
	                TipManager.show("请先输入手机号码");
	                return false;
	            }
	            if (!/^1[23456789]\d{9}$/i.test(this.submitData.mobile)) {
	                TipManager.show("你输入的不是手机号码");
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: "checkSubmitData",
	        value: function checkSubmitData() {
	            if (!this.submitData.active) {
	                TipManager.show("请选择活动类别");
	                return;
	            }
	            if (!this.checkPhone()) {
	                return false;
	            }
	
	            return true;
	        }
	    }, {
	        key: "goToSubmit",
	        value: function goToSubmit() {
	            var _this6 = this;
	
	            var params = {
	                data: this.submitData
	            };
	            try {
	                var fForm = {
	                    '奖品类型': this.submitData.id,
	                    '收件手机': this.submitData.mobile,
	                    '活动类别': this.submitData.active
	                };
	                fiboSDK.saveFormInfo(fForm, '同城活动类别选择页面-表单信息');
	            } catch (e) {}
	            this.submitting = true;
	            Promise.resolve(Api.putActive(params)).then(function (res) {
	                if (!res.success) {
	                    TipManager.show(res.msg);
	                    return;
	                }
	                TipManager.show("提交成功");
	                _this6.hide();
	            }).catch(function (err) {
	                var errMsg = typeof err === 'string' ? err : err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString();
	                try {
	                    Raven.captureMessage("<\u63D0\u4EA4\u540C\u57CE\u6D3B\u52A8\u7C7B\u522B\u4FE1\u606F>\u5931\u8D25", {
	                        level: 'error',
	                        extra: {
	                            data: errMsg
	                        }
	                    });
	                } catch (e) {}
	            }).finally(function () {
	                _this6.submitting = false;
	            });
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            Config.observer.emit("initSameCityInfoSubmitData");
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "show", this).call(this);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            View.home.initMyPrizeList(1);
	            _get(RuleClass.prototype.__proto__ || Object.getPrototypeOf(RuleClass.prototype), "hide", this).call(this);
	        }
	    }]);
	
	    return RuleClass;
	}(BasePopupClass);
	
	module.exports = RuleClass;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var loadingBar = $(".loading").find(".progress-bar"),
	    loadingText = $(".loading").find(".text");
	
	var Loading = function (_BaseClass) {
		_inherits(Loading, _BaseClass);
	
		function Loading(str) {
			_classCallCheck(this, Loading);
	
			return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).call(this, str));
		}
	
		_createClass(Loading, [{
			key: "init",
			value: function init() {
				this.$bar = this.$dom.find(".progress-bar");
				this.$text = this.$dom.find(".text");
			}
		}, {
			key: "beforePreLoad",
			value: function beforePreLoad(cd) {
				this.imgBeforePreLoadArray = this.$dom.find('img');
				var loadLoadIngPage = 0;
				var totalLoadIngPage = this.imgBeforePreLoadArray.length;
				$.each(this.imgBeforePreLoadArray, function (index, item) {
					if (this.complete) {
						loadLoadIngPage++;
						if (loadLoadIngPage === totalLoadIngPage) {
							cd();
						}
					} else {
						this.onload = function () {
							loadLoadIngPage++;
							if (loadLoadIngPage === totalLoadIngPage) {
								cd();
							}
							this.onload = null;
						};
					}
				});
			}
		}, {
			key: "preload",
			value: function preload(cb) {
				this.transImgURL();
				var $imgs = $("img");
	
				var loaded = 0;
				var total = $imgs.length;
				$imgs.each(function (i) {
					if (this.complete) {
						loaded++;
						cb(loaded, total);
					} else {
						this.onload = function () {
							loaded++;
							cb(loaded, total);
							this.onload = null;
						};
					}
				});
				if (!total) {
					cb(loaded, total);
				}
			}
		}, {
			key: "transImgURL",
			value: function transImgURL() {
				var $imgs = $('img');
				$imgs.each(function (index, element) {
					var $element = $(element);
					if ($element.data('src')) {
						element.src = $element.data('src');
					}
				});
			}
		}, {
			key: "hide",
			value: function hide() {
				this.$dom.hide();
			}
		}], [{
			key: "loading",
			value: function loading(percent, text) {
				loadingBar.css({
					width: percent + '%'
				});
				if (!text) {
					return;
				}
				loadingText.html(text);
			}
		}, {
			key: "loadingShow",
			value: function loadingShow() {
				loading.fadeIn();
				loading.find('.progress-bar').css({
					width: '0%'
				});
			}
		}]);
	
		return Loading;
	}(BaseClass);
	
	module.exports = Loading;

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map