class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    init() {
        this.$redpackBtnclose = this.$dom.find("#redpackBtnClose");
        this.$redpackBtnSure = this.$dom.find("#redpackBtnSure");
        this.$redpackAmount = this.$dom.find("#redpackAmount");
        
        this.initBtnClose();
        this.initBtnSure();

    }
    initBtnClose() {
        this.$redpackBtnclose.on("tap", (e) => {
            this.hide();
        });
    }
    initBtnSure() {
        this.$redpackBtnSure.on("tap", (e) => {
            this.hide();
        });
    }
    initDate() {
        //测试
        this.$redpackAmount.text(Config.awardData.amount/100+"元红包");
        //测试
        
    }
    show() {
        this.initDate();
        super.show();
    }

    hide() {
        super.hide();
    }

}

module.exports = RuleClass;