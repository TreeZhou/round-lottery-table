class RuleClass extends BasePopupClass{

    constructor(str){
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    init() {
        this.$Jifen10BtnClose = this.$dom.find("#jifen10BtnClose");
        this.$Jifen10BtnSure = this.$dom.find("#jifen10BtnSure");
        this.$Jifen10BtnJumpUrl = this.$dom.find("#jifen10BtnJumpUrl");

        this.initBtnClose();
        this.initBtnSure();
        this.initBtnJumpUrl();

    }
    initBtnClose() {
        this.$Jifen10BtnClose.on("tap", (e) => {
            this.hide();
            try {
                fiboSDK.btnClick('jifen10-btn-close', '中奖10积分-关闭');
            } catch (e) {}
        });
    }
    initBtnSure() {
        this.$Jifen10BtnSure.on("tap", (e) => {
            this.hide();
            try {
                fiboSDK.btnClick('jifen10-btn-again', '中奖10积分-再来一次');
            } catch (e) {}
        });
    }
    initBtnJumpUrl() {
        this.$Jifen10BtnJumpUrl.on("tap", (e) => {
            window.location.href = Config.jumpUrlObj.Jifen10Btn;
            try {
                fiboSDK.btnClick('jifen10-btn-go-now', '中奖10积分-直接兑换');
            } catch (e) {}
        });

    }
    show(){
        super.show();
    }

    hide(){
        super.hide();
    }

}

module.exports = RuleClass;