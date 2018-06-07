class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }


    init() {
        this.$hobbyOptionsBox = this.$dom.find("#hobbyOptionsBox");
        this.$hobbyBtnSure = this.$dom.find("#hobbyBtnSure");
        this.$hobbyBtnClose = this.$dom.find("#hobbyBtnClose");

        this.hobbysArray = [];

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
            this.hobbysArray = [];
            let array = this.$hobbyOptionsBox.find("[class='hobby__hobby-active']");
            let hobbyStr = "";
            $.each(array, (index, ele) => {
                hobbyStr = hobbyStr + ";" + $(ele).text();
                this.hobbysArray.push($(ele).data('index'));
            })
            hobbyStr = hobbyStr.replace(/\;/, "");
            if (!hobbyStr) {
                $("#hobbyText").text("请选择");
                View.registInfo.submitData.hobby = null;
            } else {
                View.registInfo.submitData.hobby = hobbyStr;
                $("#hobbyText").text(hobbyStr);

            }
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