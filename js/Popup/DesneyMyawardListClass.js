class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    init() {
        this.$btnClose = this.$dom.find('.box')
        this.btnCloseEvent();
    }
    btnCloseEvent() {
        this.$btnClose.on("tap", (e) => {
            if (e.target == this.$btnClose[0]) {
                this.hide();

            }

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