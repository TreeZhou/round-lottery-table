class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    init() {
        this.$shareThreeBtnSure = this.$dom.find("#shareThreeBtnSure");

        this.initBtnClose();


    }
    initBtnClose() {
        this.$shareThreeBtnSure.on("tap", () => {
            Popup.share.show();
            this.hide();
            try {
                fiboSDK.btnClick('share-three-btn', '分享指引提示-确定');
            } catch (e) {}
        });
    }
    hide() {
        super.hide();
    }

}

module.exports = RuleClass;