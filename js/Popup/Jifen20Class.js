class RuleClass extends BasePopupClass{

    constructor(str){
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    init() {
        this.$jifen20BtnClose = this.$dom.find("#jifen20BtnClose");
        this.$jifen20BtnSure = this.$dom.find("#jifen20BtnSure");
        this.$jifen20BtnJumpUrl = this.$dom.find("#jifen20BtnJumpUrl");


        this.initBtnClose();
        this.initBtnSure();
        this.initBtnJumpUrl();

    }
    initBtnClose() {
        this.$jifen20BtnClose.on("tap", (e) => {
            this.hide();
            try {
                fiboSDK.btnClick('jifen20-btn-close', '中奖20积分-关闭');
            } catch (e) {}
        });
    }
    initBtnSure() {
        this.$jifen20BtnSure.on("tap", (e) => {
            this.hide();
            if (Config.userInfo.chance == 0) {
                Popup.shareThree.show();
                
            }
            try {
                fiboSDK.btnClick('jifen20-btn-again', '中奖20积分-再来一次');
            } catch (e) {}
        });
    }
    initBtnJumpUrl() {
        this.$jifen20BtnJumpUrl.on("tap", (e) => {
            
            // window.location.href = Config.jumpUrlObj.Jifen20Btn;
         
            try {
                fiboSDK.btnClick('jifen20-btn-go-now', '中奖20积分-直接兑换');
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