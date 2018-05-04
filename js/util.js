/**
 * Created by Zhongyi Chen on 2017/10/18.
 */
"use strict";
//获取当前系统的版本
exports.versions = function () {
	var u = navigator.userAgent,
		app = navigator.appVersion;
	return {
		trident: u.indexOf('Trident') > -1, //检测是否为IE内核
		presto: u.indexOf('Presto') > -1, //是否为opera内核
		webKit: u.indexOf('AppleWebkit') > -1, //是否为苹果的谷歌内核
		gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
		mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
		ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
		iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
		iPad: u.indexOf('iPad') > -1, //是否iPad
		webApp: u.indexOf('Safari') == -1, //是否web应用程序，没有头部与底部
		weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
		qq: u.match(/\sQQ/i) == " qq" //是否QQ
	};
}()
//获取某个范围内的随机数
exports.randomNum = function (Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	return (Min + Math.round(Rand * Range));
}
//获取url中的某个参数值(返回的是转码)
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
}
//改变页面的url
exports.changeURL = function (searchArr, hashStr) {
	if (history.pushState) { //如果用户手机支持不刷新页面改变url
		history.pushState({}, 0, wechat.filter(searchArr));
	}
	window.location.hash = hashStr;
}
//安卓微信的assign方法的polyfill
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
//判断某结点的内容滑动到了底部
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
	}
}
//弹窗自定义动画
$.fn.extend({
	animateCss: function (animationName, cb) {
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		this.off(animationEnd).addClass('animated ' + animationName).one(animationEnd, () => {
			this.removeClass('animated ' + animationName);
			if (cb) cb();
		});
		return this;
	},
	fadeIn: function () {
		this.show();
		this.animateCss('fadeIn');
	},
	fadeOut: function () {
		this.animateCss('fadeOut', () => {
			this.hide();
		});
	},
	fadeInUp: function () {
		this.show();
		this.find('.mask').animateCss('fadeIn').next().animateCss('fadeInUpBig');
	},
	fadeOutDown: function (cb) {
		this.find('.mask').animateCss('fadeOut').next().animateCss('fadeOutDownBig', () => {
			this.hide();
			if (cb) cb();
		});
	},
	showInfo: function () {
		this.show().animateCss('fadeInDown');
	},
	hideInfo: function () {
		this.animateCss('fadeOutUp', () => {
			this.html('');
			this.hide();
		});
	}
})


//当背景图片无法填满页面时，将页面铺满
// bgFullPage([DomEle],0.6)
exports.bgFullPage = function (selectors, ratio) {
	var ratio = ratio || 640 / 1008;
	let wW = window.innerWidth,
		wH = window.innerHeight;
	if ((wW / ratio) < wH) {
		selectors.forEach((element) => {
			$(element).css({
				"height": "100%",
			})
		});
	}
}



//将"2017-02-08 11:00:00"转换成"2017年02月08日 11:00:00"
exports.transYmdDate = function (time) {
	return time.replace(/(\d+)-(\d+)-(\d+)/, '$1年$2月$3日')
}
//将"2017-02-08 11:00:00"转换成"2017/02/08 11:00:00"
exports.transNormalDate = function (time) {
	return time.replace(/-/g, '/');
}
//将"2017/02/08 11:00:00"转换成"2017年02月08日 11:00:00"
exports.transDate = function (time) {
	function add0(m) {
		return m < 10 ? '0' + m : m
	}

	function formatDate(needTime) {
		//needTime是整数，否则要parseInt转换
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

}




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
}



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
	}
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
				section += (number * unit);
			}
			number = 0;
		}
	}
	return rtn + section;
}


/**
 * url : string 带有参数的链接
 * deleteParam： 数组 ["friend"] 过滤掉friend名字的参数以及参数值，输入需要过滤的参数名
 * linkParam： 数组 [name:"friend",value:"1111"] 所需要增加 拼接的参数及参数值
 * 最终返回的是需要拼接在URL？后面的的参数字符串
 */
exports.getRequestParam = function (url, deleteParam, linkParam) {  
	let localURL = url;  
	let index = url.indexOf("?");  
	let singleArray = [];  
	let deleteParams = deleteParam ? deleteParam.join() : "";  
	let linkParams = linkParam ? linkParam : 0;  
	let paramStr = "";  
	if (index != -1) {  
		let afterurl = url.substr(index + 1);  
		let strs = afterurl.split("&");  
		for (let i = 0; i < strs.length; i++) { //去重
			    
			if (singleArray.indexOf(strs[i]) == -1) {    
				singleArray.push(strs[i]);    
			}  
		}  
		for (let j = 0; j < singleArray.length; j++) { //删除不需要的参数
			    
			let paramsName = singleArray[j].split("=")[0];    
			let paramsValue = singleArray[j].split("=")[1];    
			if (deleteParams.indexOf(paramsName) == -1) {    
				paramStr += paramsName + "=" + paramsValue + "&";    
			}  
		}  
		if (linkParams) { //增加参数
			    
			for (let i = 0; i < linkParams.length; i++) {    
				paramStr += linkParams[i].name + "=" + linkParams[i].value + "&"    
			}  
		}  
		paramStr = paramStr.substring(0, paramStr.length - 1);  
	}  
	if (index == -1) {
		if (linkParams) { //增加参数
			for (let i = 0; i < linkParams.length; i++) {    
				paramStr += linkParams[i].name + "=" + linkParams[i].value + "&"    
			}  
		}  
		paramStr = paramStr.substring(0, paramStr.length - 1);  
	}  

	return paramStr;
}

//获取是否关注公众号
exports.getSubscribe = function () {
	return new Promise((resolve, reject) => {
		Config.wechat.getSubscribe(Config.userInfo.openid, function (err, res) { //根据用户的微信个人信息获取用户是否已关注公众号
			if (err) {
				return ;
				// return alert(err);
				
			}
			Config.subscribe = res.subscribe;
			resolve();
		})
	})
}
//获取是用户最近信息
exports.getInfo = function () {
	let params = {
		data: {
			openid: Config.userInfo.openid,
		}
	}
	return Promise.resolve(Api.getInfo(params)).then((res) => {
			if (!res.success) {
				return Promise.reject(res);
			}
			Config.userInfo = res.result;

		})
		.catch((err) => {
			let errMsg = typeof err === 'string' ? err : (err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString());
			try {
				Raven.captureMessage(`<更新用户信息>失败`, {
					level: 'error',
					extra: {
						data: errMsg
					}
				});
			} catch (e) {}
			// return alert(errMsg);
		})
}
exports.getSystemStarus = function () {
	return Promise.resolve(Api.config()).then((res) => {
		if (!res.success) {
			return ;
		}
		Config.systemStatus = res.result;
	}).catch((err) => {
		let errMsg = typeof err === 'string' ? err : (err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString());
		try {
			Raven.captureMessage(`<获取系统状态>失败`, {
				level: 'error',
				extra: {
					data: errMsg
				}
			});
		} catch (e) {}
		// return alert(errMsg);
	})
}
exports.addFrend = function () {

	if (!Config.urlSearchObj['from_openid']) {
		return;
	}
	if (window.localStorage.getItem("firstEnter")) {
		return;
	}
	let params = {
		data: {
			openid: Config.userInfo.openid,
			from_openid: Config.urlSearchObj['from_openid']
		}
	}
	Promise.resolve(Api.addFriend(params)).then((res) => {
		if (!res.success) {
			return ;
		}
		console.log("增加朋友：", res)
	}).catch((err) => {
		let errMsg = typeof err === 'string' ? err : (err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString());
		try {
			Raven.captureMessage(`<添加好友>失败`, {
				level: 'error',
				extra: {
					data: errMsg
				}
			});
		} catch (e) {}
		// return alert(errMsg);
	})
}