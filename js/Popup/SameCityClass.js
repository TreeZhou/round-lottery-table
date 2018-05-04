class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    init() {
        this.$sameCityBtnClose = this.$dom.find("#sameCityBtnClose");
        this.$sameCityBtnSure = this.$dom.find("#sameCityBtnSure");
        this.$sameCityBtnJump = this.$dom.find("#sameCityBtnJump");


        this.initBtnClose();
        this.initBtnSure();
        this.initBtnJumpUrl();

    }
    initBtnClose() {
        this.$sameCityBtnClose.on("tap", (e) => {
            this.hide();
        });
    }
    initBtnSure() {
        this.$sameCityBtnSure.on("tap", (e) => {
            this.hide();
        });
    }
    initBtnJumpUrl() {
        this.$sameCityBtnJump.on("tap", (e) => {
            Popup.sameCityInfo.show();
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

module.exports = RuleClass;