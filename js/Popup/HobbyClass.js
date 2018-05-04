class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    
    init() {
        this.$hobbyOptionsBox = this.$dom.find("#hobbyOptionsBox");
        this.$hobbyBtnSure = this.$dom.find("#hobbyBtnSure");
        this.$hobbyBtnClose = this.$dom.find("#hobbyBtnClose");

        this.initBtnClose();
        this.initBtnSure();
        this.initSelectContainerEvent();

    }
    initBtnClose() {
        this.$hobbyBtnClose.on("tap", () => {
            this.hide();
        });
    }
    initBtnSure() {
        this.$hobbyBtnSure.on("tap", () => {
            let array = this.$hobbyOptionsBox.find("[class='hobby__hobby-active']");
            let hobbyStr = "";
            $.each(array, (index, ele) => {
                hobbyStr = hobbyStr + "、" + $(ele).text();
            })
            hobbyStr = hobbyStr.replace(/\、/, "")
            View.registInfo.submitData.hobby = hobbyStr
            $("#hobbyText").text(hobbyStr);
            this.hide();
        });
    }
    initSelectContainerEvent() {
        this.$hobbyOptionsBox.on('tap', (event) => {
            let $target = $(event.target);
            if ($target.hasClass("hobby__hobby-active")) {
                $target.removeClass("hobby__hobby-active");
            } else {
                $target.addClass("hobby__hobby-active");
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