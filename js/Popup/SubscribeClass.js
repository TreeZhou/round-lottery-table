class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    init() {
        // 控件声明
        this.$box = this.$dom.find('.box');
        this.initBoxEvent();

    }
    initBoxEvent() {
        this.$box.on('tap', (event) => {
            if (event.target !== this.$box[0]) {
                return;
            }
            this.hide();
            Util.getSubscribe();

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