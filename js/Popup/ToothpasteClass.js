class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    init() {
        this.$toothpasteBtnClose = this.$dom.find("#toothpasteBtnClose");
        this.$toothpasteBtnSure = this.$dom.find("#toothpasteBtnSure");
        this.$toothpasteBtnAddr = this.$dom.find("#toothpasteBtnAddr");

        this.initBtnClose();
        this.initBtnSure();
        this.initBtnAddr();

    }
    initBtnClose() {
        this.$toothpasteBtnClose.on("tap", (e) => {
            this.hide();
        });
    }
    initBtnSure() {
        this.$toothpasteBtnSure.on("tap", (e) => {
            this.hide();
        });
    }
    initBtnAddr() {
        this.$toothpasteBtnAddr.on("tap", (e) => {
            Popup.toothpasteAddressInfo.show();
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