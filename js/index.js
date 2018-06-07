"use strict"

// 确保 finally 函数有效（jquery使用finally时，记得先用Promise包装一层）
Promise.prototype.finally = Promise.prototype.finally || function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {
            throw reason
        })
    );
};
// 全局引入基类文件
global.BaseClass = require('./BaseClass');
global.BasePopupClass = require('./BasePopupClass');
// 全局引入配置文件以及公共函数
global.Config = window._config || {};
global.Api = window._config && window._config.api || {};
global.Util = require('./util');
// 全局引入弹窗提示管理类以及视窗适配函数
global.TipManager = require('./TipManager');
global.viewAdapt = require('./viewAdapt');

// 全局的普通页面容器
global.View = {};

// 全局的弹出页面容器
global.Popup = {};

// 引入普通页面类
const Home = require('./Page/HomeClass');
const Regist = require('./Page/RegistClass');
const RegistInfo = require('./Page/RegistInfoClass');


// 引入弹出页面类
const Rule = require('./Popup/RuleClass');
const Subscribe = require('./Popup/SubscribeClass');
const Hobby = require('./Popup/HobbyClass');
const Kid = require('./Popup/KidClass');
const NoticeUpgrade = require('./Popup/NoticeUpgradeClass');
const NoticeActEnd = require('./Popup/NoticeActEndClass');
const Share = require('./Popup/ShareClass');
const Desney = require('./Popup/DesneyClass');
const DesneyMyawardList = require('./Popup/DesneyMyawardListClass');
const SameCity = require('./Popup/SameCityClass');
const Toothpaste = require('./Popup/ToothpasteClass');
const Redpack = require('./Popup/RedpackClass');
const Jifen100 = require('./Popup/Jifen100Class');
const Jifen50 = require('./Popup/Jifen50Class');
const Jifen20 = require('./Popup/Jifen20Class');
const Jifen10 = require('./Popup/Jifen10Class');

const ToothpasteAddressInfo = require('./Popup/ToothpasteAddressInfoClass');
const ShareThree = require('./Popup/ShareThreeClass');
const LimitLottery = require('./Popup/LimitLotteryClass');
const ShareSuc = require('./Popup/ShareSucClass');
const SameCityInfo = require('./Popup/SameCityInfoClass');


// 引入项目加载提示类
const Loading = require('./Loading');

// 字体大小初始化函数
let initFontSize = function () {
    //可以适配的比例
    var wRatio = Config.winWidth / Config.winHeight;
    $('html').css({
        'font-size': 18 * Config.ratio / wRatio + 'px'
    });
}

// 页面初始化函数
let initUI = function () {
    // 加载页面
    View.loading = new Loading('.loading');

    // 普通页面
    View.home = new Home('.home');
    View.regist = new Regist('.regist');
    View.registInfo = new RegistInfo('.regist-info');


    // 弹窗页面
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


}

let init = function () {
    Config.initFeiboAndShare(); // 创建斐波
    Config.initShareConfig(); // 注册分享事件
    // initFontSize();
    initUI();
    $('.main').show();
    View.loading.show();
    View.loading.preload((loaded, total) => {
        const percent = parseInt(loaded / total * 100);
        Loading.loading(percent);
        if (loaded === total) {
            // 完全加载完图片后的操作
            View.loading.hide();
            Util.getSystemStarus().then(() => { //获取活动状态
                initShowPage();
            });
        }
    });
}

function initShowPage() {

    // //测试
    // $('.zhanxian-box').show();
    // $('.xiaxian-box').show();
    // View.regist.show();
    // View.registInfo.show();
    // View.home.show();
    // Popup.subscribe.show();
    // Popup.desneyMyawardList.show();
    // Popup.hobby.show();
    // Popup.kid.show();
    // Popup.noticeUpgrade.show();
    // Popup.noticeActEnd.show();
    // Popup.share.show();
    // Popup.toothpasteAddressInfo.show();
    // Popup.desney.show();
    // Popup.sameCity.show();
    // Popup.toothpaste.show();
    // Popup.redpack.show();
    // Popup.jifen100.show();
    // Popup.jifen50.show();
    // Popup.jifen20.show();
    // Popup.jifen10.show();
    // Popup.shareThree.show();
    // Popup.limitLottery.show();
    // Popup.rule.show();
    // Popup.shareSuc.show();
    // Popup.sameCityInfo.show();

    // 测试

    // 正式

    //下线页面
    if (!Config.systemStatus.is_active) {
        $('.xiaxian-box').show();
        return;
    }
    //占线页面
    if (Config.systemStatus.is_warn) {
        $('.zhanxian-box').show();
        return;
    }
    //活动结束页面
    if (Config.systemStatusMyself.activeEnd) {
        View.regist.show();
        Popup.noticeActEnd.show();
        return;
    }
    //活动升级页面
    if (Config.systemStatusMyself.upgrade) {
        View.regist.show();
        Popup.noticeUpgrade.show();
        return;
    }

    // // 非第一次进入页面（超过1次进入页面）
    // if (window.localStorage.getItem("moreOneEnter")) {
    //     if (!Config.subscribe) {
    //         View.regist.show();
    //         return;
    //     }
    //     if (!Config.userInfo.subscribe) {
    //         View.regist.show();
    //         return;
    //     }
    //     View.home.show();
    // } else { //第一次进入页面
    //     window.localStorage.setItem("moreOneEnter", "yes");
    //     View.regist.show();
    // }

    if (!Config.userInfo.mobile || !Config.subscribe) {
        View.regist.show();
    } else {
        View.home.show();
    }

    if (Config.urlSearchObj['debug']) {
        return;
    }
}


// 系统进行初始化
if (Config.debug && Config.urlSearchObj['debug']) { //当前处于调试模式
  
    init();
} else if (window.localStorage.getItem(Config.userInfoStorageName)) {
    Config.userInfo = JSON.parse(window.localStorage.getItem(Config.userInfoStorageName));
    Util.getInfo().then(() => {
            if (Config.urlSearchObj['from_openid']) {
                window.localStorage.setItem(Config.hasFromOpenidStorageName, Config.urlSearchObj['from_openid']);
            }
            return Promise.resolve(Util.getSubscribe())
        }).then((res) => {
            init();
        })
        .catch((res) => {
            console.log("获取信息发生错误：" + res)
        })
} else if (Config.wechat.getQuery('send_openid') && Config.wechat.getQuery('code')) { //项目链接来自于授权完成后的跳转
    let params = {
        data: {
            code: Config.urlSearchObj['code'],
            cnl: Config.urlSearchObj['cnl'],
            send_openid: Config.urlSearchObj['send_openid']
        }
    }
    Promise.resolve(Api.login(params)).then((res) => {
        if (!res.success) {
            Config.wechat.goAuth('snsapi_userinfo', 'STATE', Config.wechat.filter(['code']));
            return;
        }
        window.localStorage.setItem(Config.userInfoStorageName, JSON.stringify(res.result));
        Config.userInfo = res.result;
        if (Config.urlSearchObj['from_openid']) {
            window.localStorage.setItem(Config.hasFromOpenidStorageName, Config.urlSearchObj['from_openid']);
        }
        return Promise.resolve(Util.getSubscribe())
    }).then(() => {
        init();
    }).catch((err) => {
        let errMsg = typeof err === 'string' ? err : (err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString());
        try {
            Raven.captureMessage(`<登陆>失败`, {
                level: 'error',
                extra: {
                    data: errMsg
                }
            });
        } catch (e) {}
        return alert(errMsg);
    })
} else if (Config.wechat.getQuery('code')) { //用户首次打开该项目需要完成授权
    Config.wechatForRedpack.getOpenid(function (err, res) {
        if (err) {
            Config.wechatForRedpack.goAuth('snsapi_base', 'STATE', Config.wechatForRedpack.filter(["code"]));
            return;
        }
        let openid = res;
        Config.wechat.goAuth('snsapi_userinfo', 'STATE', Config.wechat.filter(["code"], {
            "send_openid": openid
        }))
    });
} else { //静默授权
    Config.wechatForRedpack.goAuth('snsapi_base', 'STATE', Config.wechatForRedpack.filter());
}

$(function () {
    // 页面全屏
    $('html, body, .main, .panel, .page').css({
        height: window.innerHeight
    });
    // 在iphone中，如果不是当前触摸点不在input上,那么都失去焦点并隐藏软键盘
    function objBlur(sdom, time) {
        if (sdom) {
            sdom.addEventListener("focus", function () {
                document.addEventListener("touchend", docTouchend, false);
            }, false);

        } else {
            throw new Error("objBlur()没有找到元素");
        }
        var docTouchend = function (event) {
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
        //判断是否为苹果
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
    // 禁止body滚动并给class为.scrollable的元素加上自定义的滚动事件
    var overscroll = function (els) {
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
                //if the content is actually scrollable, i.e. the content is long enough
                //that scrolling can occur
                if (this.offsetHeight < this.scrollHeight)
                    evt._isScroller = true;
            });
        }
    };
    document.body.addEventListener('touchmove', function (evt) {
        //In this case, the default behavior is scrolling the body, which
        //would result in an overflow.  Since we don't want that, we preventDefault.
        if (!evt._isScroller) {
            // evt.preventDefault();
        }
    });
    overscroll(document.querySelectorAll('.scrollable'));
});
Util.bgFullPage([".regist__bg", ".regist__box", , ".regist-info__bg", ".regist-info__box"]);