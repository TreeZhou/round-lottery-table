class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    init() {
        this.$kidOptionsBox = this.$dom.find("#kidOptionsBox");
        this.$kidBtnSure = this.$dom.find("#kidBtnSure");
        this.$kidBtnClose = this.$dom.find("#kidBtnClose");

        this.initBtnClose();
        this.initBtnSure();
        this.initSelectContainerEvent();


    }
    initBtnClose() {
        this.$kidBtnClose.on("tap", () => {
            this.hide();
        });
    }
    initBtnSure() {
        this.$kidBtnSure.on("tap", () => {
            let kid = this.$kidOptionsBox.find("[class='kid__kid-active']").data("index");
            View.registInfo.submitData.kid = kid;
            $("#kidType").val(kid);
            this.hide();
        });
    }
    initSelectContainerEvent() {
        this.$kidOptionsBox.on('tap', (event) => {
            let $target = $(event.target);
            if ($target.hasClass("kid__kid-active")) {
                return;
            }
            this.$kidOptionsBox.find("span").removeClass("kid__kid-active");
            $target.addClass("kid__kid-active");
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