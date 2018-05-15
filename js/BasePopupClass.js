class BasePopupClass extends BaseClass{
	constructor(str){
		super(str);
	}
	init(){
		
	}
	show(){
		super.show();
		// this.$dom.show();
	}
	hide(cb){
		super.hide();
		// this.$dom.show(cb);
	}
}

module.exports = BasePopupClass;