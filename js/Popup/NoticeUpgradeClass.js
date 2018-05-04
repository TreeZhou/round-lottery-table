class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    init() {
        this.$noticeUpgradeBtnClose = this.$dom.find("#noticeUpgradeBtnClose");

        this.initBtnClose();


    }
    initBtnClose() {
        this.$noticeUpgradeBtnClose.on("tap", () => {
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