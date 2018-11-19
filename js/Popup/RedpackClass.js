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
            if (Config.userInfo.chance == 0) {
                Popup.shareThree.show();

            }
        });
    }
    initDate() {
        // this.$redpackAmount.text(Config.awardData.amount / 100 + "元红包");

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