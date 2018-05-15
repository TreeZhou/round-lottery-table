class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    init() {
        this.$jifen100BtnClose = this.$dom.find("#jifen100BtnClose");
        this.$jifen100BtnSure = this.$dom.find("#jifen100BtnSure");
        this.$jifen100BtnJumpUrl = this.$dom.find("#jifen100BtnJumpUrl");


        this.initBtnClose();
        this.initBtnSure();
        this.initBtnJumpUrl();

    }
    initBtnClose() {
        this.$jifen100BtnClose.on("tap", (e) => {
            this.hide();
            try {
                fiboSDK.btnClick('jifen100-btn-close', '中奖100积分-关闭');
            } catch (e) {}
        });
    }
    initBtnSure() {
        this.$jifen100BtnSure.on("tap", (e) => {
            this.hide();
            if (Config.userInfo.chance == 0) {
                Popup.shareThree.show();
            }
            try {
                fiboSDK.btnClick('jifen100-btn-again', '中奖100积分-再来一次');
            } catch (e) {}
        });
    }
    initBtnJumpUrl() {
        this.$jifen100BtnJumpUrl.on("tap", (e) => {

            window.location.href = Config.jumpUrlObj.Jifen100Btn;
            try {
                fiboSDK.btnClick('jifen100-btn-go-now', '中奖100积分-直接兑换');
            } catch (e) {}
        });

    }
    show() {
        super.show();
    }

    hide() {
        super.hide();
    }

}

module.exports = RuleClass;