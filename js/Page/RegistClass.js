class HomeClass extends BaseClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".home .container", config.ratio);
    }

    init() {

        //声明变量

        //声明控件
        this.$btnRegist = this.$dom.find("#btnRegist");

        //初始化事件
        this.initBtnRegist();
    }
    initBtnRegist() {
        this.$btnRegist.on("tap", () => {
            if (!Config.subscribe) {
                Popup.subscribe.show();
                return;
            }
            if (!Config.userInfo.subscribe) {
                View.registInfo.show();
                this.hide();
                try {
                    fiboSDK.btnClick('regist-btn-regist', '首页-立即注册');
                } catch (e) {}
                return;
            }
            View.home.show();
            this.hide();
        });
    }
    show() {
        super.show();
    }

    hide() {
        super.hide();
    }

}

module.exports = HomeClass;