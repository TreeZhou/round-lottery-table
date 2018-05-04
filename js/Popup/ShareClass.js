class RuleClass extends BasePopupClass{

    constructor(str){
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

      
    init() {
        this.$box = this.$dom.find(".box");
        this.initBtnClose();
    }
    initBtnClose() {
        this.$box.on("tap", () => {
            this.hide();
        });
    }
    show(){
        super.show();
    }

    hide(){
        super.hide();
    }

}

module.exports = RuleClass;