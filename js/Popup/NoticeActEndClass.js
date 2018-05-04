class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    
    init() {
        this.$noticeActEndBtnClose = this.$dom.find("#noticeActEndBtnClose");

        this.initBtnClose();


    }
    initBtnClose() {
        this.$noticeActEndBtnClose.on("tap", () => {
            this.hide();
        });
    }
    hide() {
        super.hide();
    }

}

module.exports = RuleClass;