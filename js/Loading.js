let loadingBar = $(".loading").find(".progress-bar"),
loadingText = $(".loading").find(".text");

class Loading extends BaseClass {
	constructor(str) {
		super(str);
	}

	init() {
		this.$bar = this.$dom.find(".progress-bar");
		this.$text = this.$dom.find(".text");

	}

	beforePreLoad(cd) {
		this.imgBeforePreLoadArray = this.$dom.find('img');
		let loadLoadIngPage = 0;
		let totalLoadIngPage = this.imgBeforePreLoadArray.length;
		$.each(this.imgBeforePreLoadArray, function (index, item) { //Loading页图片的状态
			if (this.complete) {
				loadLoadIngPage++;
				if (loadLoadIngPage === totalLoadIngPage) {
					cd()
				}
			} else {
				this.onload = function () {
					loadLoadIngPage++;
					if (loadLoadIngPage === totalLoadIngPage) {
						cd()
					}
					this.onload = null;
				}
			}
		})
	}

	preload(cb) {
		this.transImgURL();
		var $imgs = $("img");
		// var $imgs = $("img").slice(0, 40);//取前40个元素
		var loaded = 0;
		var total = $imgs.length;
		$imgs.each(function (i) {
			if (this.complete) {
				loaded++;
				cb(loaded, total);
			} else {
				this.onload = function () {
					loaded++;
					cb(loaded, total);
					this.onload = null;
				}
			}
		});
		if (!total) {
			cb(loaded, total);
		}
	}

	transImgURL() {
		let $imgs = $('img');
		$imgs.each(function (index, element) {
			let $element = $(element);
			if ($element.data('src')) {
				element.src = $element.data('src');
			}
		})
	}


	hide() {
		this.$dom.hide();
	}
	// static loading(percent, text) {
	// 	this.$bar.css({
	// 		width: percent + '%'
	// 	});
	// 	if (!text) {
	// 		return;
	// 	}
	// 	this.$text.html(text);
	// }

	static loading(percent, text) {
		loadingBar.css({
			width: percent + '%'
		});
		if (!text) {
			return;
		}
		loadingText.html(text);
	}
	static loadingShow() {
		loading.fadeIn();
		loading.find('.progress-bar').css({
			width: '0%'
		});
	}
}

module.exports = Loading;