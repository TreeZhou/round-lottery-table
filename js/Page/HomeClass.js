class HomeClass extends BaseClass {
    constructor(str) { //通过css选择器来构建zepto对象
        super(str);
    }
    init() {
        //声明变量

        this.timerSpin = null;
        this.spinangle = 0;
        this.spinSpeed = 15; //空转的转圈速度，数值越高转的越慢
        this.addSpinangle = 10; //固定参数请勿调动
        this.duration = 3000; //真转的转圈时长，数值越高转的越慢
        this.hasGetAwardDate = false;
        this.stopSpinLottery = false;
        //转盘
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

        //声明控件
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


        //初始化事件
        this.initBtnRuleEvent();
        this.initTimes();
        this.initBtnStart(); //抽奖开始按键
        this.initBtnListEvent(); //初始化中奖名单、我的邀请、我的奖品3个列表的的按键

        this.initObserverWinnerListEvent(); //渲染的观察者事件事件--中奖名单
        this.initWinnerList(1); //渲染中奖者列表--中奖名单

        this.initObserverMyFrendsListEvent(); //注册渲染列表的观察者事件事件--我的邀请
        this.initMyFrendsList(1); //渲染列表--我的邀请

        this.initObserverMyPrizeListEvent(); //注册渲染列表的观察者事件事件--我的奖品
        this.initMyPrizeList(1); //渲染列表--我的奖品

        this.initScrollListEvent();
    }
    initBtnRuleEvent() {
        this.$btnRule.on("tap", (e) => {
            Popup.rule.show();
            try {
                fiboSDK.btnClick('home-btn-rule', '抽奖页-活动规则');
            } catch (e) {}
        });
    }
    initTimes() {
        this.$lotteryTimes.text(Config.userInfo.chance);
    }
    initBtnStart() {

        this.$btnStart.on("tap", this.lottery.bind(this));
        try {
            fiboSDK.btnClick('home-btn-Start', '抽奖页-开始抽奖');
        } catch (e) {}
    }
    lottery() {
        //测试
        //  Popup.shareThree.show();
        //  return;
        //测试
        //测试
        // var key = 7;
        // this.rotateFunc(this.tablePosition[key - 1], key);
        // return;
        //测试
        //正式


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
            this.spinLottery(); //空转
            let params = {
                data: {
                    openid: Config.userInfo.openid
                }
            }
            Promise.resolve(Api.lottery(params)).then((res) => {
                if (res.error_code == -1100) {
                    Popup.limitLottery.show();
                    this.stopSpinLottery = true;
                    this.rotating = false;
                    return;
                }
                if (res.error_code == -1008) {
                    TipManager.show("网络繁忙");
                    this.stopSpinLottery = true;
                    this.rotating = false;
                    return;
                }
                if (!res.success) {
                    TipManager.show(res.msg);
                    this.stopSpinLottery = true;
                    this.rotating = false;
                    return;
                }
                Config.awardData = res.result;
                this.hasGetAwardDate = true;
                this.$lotteryTimes.text(--Config.userInfo.chance);
            }).catch((err) => {
                this.stopSpinLottery = true;
                this.rotating = false;
                let errMsg = typeof err === 'string' ? err : (err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString());
                try {
                    Raven.captureMessage(`<抽奖>失败`, {
                        level: 'error',
                        extra: {
                            data: errMsg
                        }
                    });
                } catch (e) {}
                // return alert(errMsg);
            }).finally(() => {

            })
        }
        //正式

    }
    //转盘转动方法
    //mun为tablePosition位置，type为中奖的奖品
    rotateFunc(num, type) {
        this.$turntableContent.rotate({
            angle: 0,
            duration: this.duration,
            animateTo: num + 360 + 22.5, //1440是我要让指针旋转4圈
            callback: () => {
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
                this.rotating = false;
                this.hasGetAwardDate = false;
                this.initMyPrizeList(1); //渲染列表--我的奖品
            }
        });
    }
    isPositiveInteger(s) { //是否为正整数
        var re = /^[1-9]+$/;
        return re.test(s)
    }
    spinLottery() {
        this.timerSpin = setInterval(() => {
            debugger;
            if (this.isPositiveInteger(this.spinangle / 360) && this.hasGetAwardDate) {
                this.spinangle = 0;
                clearInterval(this.timerSpin);
                let award_id = Config.awardData.award_id;
                this.rotateFunc(this.tablePosition[award_id - 1], award_id);
                return;
            }
            if (this.isPositiveInteger(this.spinangle / 360) && this.stopSpinLottery) {
                this.spinangle = 0;
                clearInterval(this.timerSpin);
                this.stopSpinLottery = false;
                return;
            }
            this.spinangle = this.spinangle + this.addSpinangle;
            this.$turntableContent.css({
                "transform": `rotate(${this.spinangle}deg)`
            })
        }, this.spinSpeed);

    }

    initScrollListEvent() {
        Util.scrollAtBottom($("#listScrollBox")[0], () => {
            if (this.loadListData) {
                return;
            }
            if (!this.timeout) {
                return;
            }
            this.timeout = false;
            this.timer = setTimeout(() => {
                this.timeout = true;
                clearTimeout(this.timer)
            }, 3000);
            let jiazai = `<div class="jiazai">加载更多数据中...</div>`;
            this.$ranklist.append(jiazai);

            if (this.$btnWinnerList.hasClass("redbottom")) {
                this.initWinnerList(this.myPrizePage++);
                return;
            }
            if (this.$btnMyinvite.hasClass("redbottom")) {
                this.initMyFrendsList(this.myPrizePage++);
                return;
            }
            if (this.$btnMyprize.hasClass("redbottom")) {
                this.initMyPrizeList(this.myPrizePage++);
                return;
            }
        })
    }


    initObserverWinnerListEvent() {
        Config.observer.on("winnerList", (data) => {
            let html = ejs.render(this.winnerListTemplate, {
                list: data
            });
            this.$tab1.append(html);
        })

    }
    initWinnerList(page) {
        // debugger;
        page == 1 && this.$tab1.empty();
        //正式       
        let params = {
            data: {
                page: page,
            }
        }
        this.loadListData = true;
        Promise.resolve(Api.winnerList(params)).then((res) => {
                if (!res.success) {
                    return Promise.reject();
                }
                Config.allprize = res.result;
                return Promise.resolve();
            }).then(() => {
                if (Config.allprize.length == 0 && page == 1) {
                    let demo = `<div class="warp">
                                        <div class="nonepeople">暂无会员中奖</div>
                                    </div>`;
                    this.$tab1.append(demo);
                } else if (Config.allprize.length != 0) {
                    Config.observer.emit("winnerList", Config.allprize);
                }

            })
            .catch((err) => {
                let errMsg = typeof err === 'string' ? err : (err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString());
                try {
                    Raven.captureMessage(`<获取所有中奖者列表>失败`, {
                        level: 'error',
                        extra: {
                            data: errMsg
                        }
                    });
                } catch (e) {}
                // return alert(errMsg);
            }).finally(() => {
                this.loadListData = false;
                $('.jiazai').remove();
            })
        //正式        


    }

    initObserverMyFrendsListEvent() {
        Config.observer.on("myFrendsList", (data) => {
            let html = ejs.render(this.myFrendsListTemplate, {
                list: data
            });
            this.$tab2.append(html);
        })

    }
    initMyFrendsList(page) {
        // debugger;
        page == 1 && this.$tab2.empty();
        //正式       
        let params = {
            data: {
                openid: Config.userInfo.openid,
            }
        }
        this.loadListData = true;

        Promise.resolve(Api.myFrendsList(params)).then((res) => {
            if (!res.success) {
                return Promise.reject();
            }
            Config.myfriends = res.result;
            return Promise.resolve();
        }).then(() => {
            if (Config.myfriends.length == 0 && page == 1) {
                let demo = `<div class="warp">
                                        <div class="nonepeople">暂无邀请好友</div>
                                    </div>`;
                this.$tab2.append(demo);
            } else if (Config.myfriends.length != 0) {
                Config.observer.emit("myFrendsList", Config.myfriends);
            }
        }).catch((err) => {
            try {
                let errMsg = typeof err === 'string' ? err : (err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString());

                Raven.captureMessage(`<获取我的邀请列表>失败`, {
                    level: 'error',
                    extra: {
                        data: errMsg
                    }
                });
                // return alert(errMsg);
            } catch (e) {}
        }).finally(() => {
            this.loadListData = false;
            $('.jiazai').remove();
        })
        //正式        


    }

    initObserverMyPrizeListEvent() {
        Config.observer.on("myPrizeList", (data) => {
            let html = ejs.render(this.myPrizeListTemplate, {
                list: data
            });
            this.$tab3.append(html);
        })

    }
    initMyPrizeList(page) {
        // debugger;
        page == 1 && this.$tab3.empty();
        //正式       
        let params = {
            data: {
                page: page,
                openid: Config.userInfo.openid
            }
        }
        this.loadListData = true;

        Promise.resolve(Api.winnerList(params)).then((res) => {
                if (!res.success) {
                    return Promise.reject();
                }
                Config.myprize = res.result;
                return Promise.resolve();
            }).then(() => {
                if (Config.myprize.length == 0 && page == 1) {
                    let demo = `<div class="warp">
                                        <div class="nonepeople">暂无奖品</div>
                                    </div>`;
                    this.$tab3.append(demo);
                } else if (Config.myprize.length != 0) {
                    // debugger;
                    Config.observer.emit("myPrizeList", Config.myprize);
                }
                this.initBtnMyPrize() //我的奖品列表点击事件

            })
            .catch((err) => {
                let errMsg = typeof err === 'string' ? err : (err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString());
                try {
                    Raven.captureMessage(`<获取我的奖品列表>失败`, {
                        level: 'error',
                        extra: {
                            data: errMsg
                        }
                    });
                } catch (e) {}
                // return alert(errMsg);
            }).finally(() => {
                this.loadListData = false;
                $('.jiazai').remove();
            })
        //正式        
    }

    initBtnListEvent() {
        this.$weuiNavbar.on("tap", (e) => {
            let index = $(e.target).data("index");
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
        })

        function addClassRedbottom(select) {
            // if ($(select).hasClass('redbottom')) {
            //     return;
            // }
            $('#btnWinnerList').removeClass('redbottom');
            $('#btnMyinvite').removeClass('redbottom');
            $('#btnMyprize').removeClass('redbottom');
            // $('.weui-navbar__item').css("background-color", "white");
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
    initBtnMyPrize() {
        $(".turntable-right").off().on('tap', (e) => {
            let $target = $(e.target);

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
                case 8: //积分
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
        })
        $(".award-list--toothpast-btn").off().on("tap", (e) => {
            if (Config.jumpUrlObj.awardListToothpastBtn) {
                window.location.href = Config.jumpUrlObj.awardListToothpastBtn;
            }
            try {
                fiboSDK.btnClick('home-list-btn-toothpaste-detail', '首页我的奖品列表-牙膏详情按键');
            } catch (e) {}
        })

    }


    show() {
        this.initTimes();
        this.$dom.show();
        this.initBtnMyPrize() //我的奖品列表点击事件
    }
    hide() {
        this.$dom.hide();
    }

}

module.exports = HomeClass;