class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    init() {
        this.$limitLotteryBtnClose = this.$dom.find("#limitLotteryBtnClose");

        this.initBtnClose();


    }
    initBtnClose() {
        this.$limitLotteryBtnClose.on("tap", () => {
            this.hide();
        });
    }
    hide() {
        super.hide();
    }

}

module.exports = RuleClass;