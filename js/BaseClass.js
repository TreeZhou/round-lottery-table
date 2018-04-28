class BaseClass{
	constructor(str){
		this.$dom = $(str);
		this.$dom.hide();
		this.init();
	}
	init(){
		
	}
	show(){
		this.$dom.show();
	}
	hide(){
		this.$dom.hide();
	}
}

module.exports = BaseClass;