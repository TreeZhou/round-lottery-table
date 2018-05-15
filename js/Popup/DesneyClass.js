class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    init() {
        this.$desneyBtnClose = this.$dom.find("#desneyBtnClose");
        this.$desneyBtnSure = this.$dom.find("#desneyBtnSure");
        this.initBtnClose();
        this.initBtnSure();

    }
    initBtnClose() {
        this.$desneyBtnClose.on("tap", (e) => {
            this.hide();
        });
    }
    initBtnSure() {
        this.$desneyBtnSure.on("tap", (e) => {
            this.hide();
            if (Config.userInfo.chance == 0) {
                Popup.shareThree.show();

            }
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