class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }


    init() {
        this.$ruleCommomText = this.$dom.find("#ruleCommomText");

        this.$rulSeeMore = this.$dom.find("#rulSeeMore");
        this.$ruleBtnSure = this.$dom.find("#ruleBtnSure");
        this.initBtnSure();
        this.initScrollAtBottomRuleEvent();
    }
    initBtnSure() {
        this.$ruleBtnSure.on("tap", (e) => {
            this.hide();
        });
    }

    initScrollAtBottomRuleEvent() {
      
        Util.scrollAtBottom(this.$ruleCommomText[0], () => {
            console.log("dddd");
            this.$rulSeeMore.hide();
        })
    }
    show() {
        super.show();
    }

    hide() {
        super.hide();
    }

}

module.exports = RuleClass;