class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    init() {
        this.$shareSucBtnClose = this.$dom.find("#shareSucBtnClose");
        this.initBtnClose();

    }
    initBtnClose() {
        this.$shareSucBtnClose.on("tap", (e) => {
            this.hide();
            try {
                fiboSDK.btnClick('share-suc-btn-close', '已经发送链接-关闭');
            } catch (e) {}
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