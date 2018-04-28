class BasePopupClass extends BaseClass{
	constructor(str){
		super(str);
	}
	init(){
		
	}
	show(){
		super.show();
		this.$dom.fadeInUp();
	}
	hide(cb){
		// super.hide();
		this.$dom.fadeOutDown(cb);
	}
}

module.exports = BasePopupClass;