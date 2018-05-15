class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    init() {
        this.$jifen50BtnClose = this.$dom.find("#jifen50BtnClose");
        this.$jifen50BtnSure = this.$dom.find("#jifen50BtnSure");
        this.$jifen50BtnJumpUrl = this.$dom.find("#jifen50BtnJumpUrl");


        this.initBtnClose();
        this.initBtnSure();
        this.initBtnJumpUrl();

    }
    initBtnClose() {
        this.$jifen50BtnClose.on("tap", (e) => {
            this.hide();
            try {
                fiboSDK.btnClick('jifen50-btn-close', '中奖50积分-关闭');
            } catch (e) {}
        });
    }
    initBtnSure() {
        this.$jifen50BtnSure.on("tap", (e) => {
            this.hide();
            if (Config.userInfo.chance == 0) {
                Popup.shareThree.show();
                
            }
            try {
                fiboSDK.btnClick('jifen50-btn-again', '中奖50积分-再来一次');
            } catch (e) {}
        });
    }
    initBtnJumpUrl() {
        this.$jifen50BtnJumpUrl.on("tap", (e) => {
          
            window.location.href = Config.jumpUrlObj.Jifen50Btn;
            try {
                fiboSDK.btnClick('jifen50-btn-go-now', '中奖50积分-直接兑换');
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