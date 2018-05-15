let loading = $('.tip.uploading');
let uploaded = $('.tip.uploaded');

class TipManager{

    static show(text, delay){
        delay = delay || 2500;
        const $dom = $(`<div class="info">${text}</div>`);
        $(".info").remove();
        $('body').append($dom);
        $dom.show();
        setTimeout(function(){
            $dom.hide();
        }, delay);
    }

    static loading(percent, text){
        loading.find('.progress-bar').css({width: percent + '%'});
        loading.find('.text').html(text);
    }

    static loadingShow(){
        loading.fadeIn();
        loading.find('.progress-bar').css({width: '0%'});
    }

    static loadingHide(){
        loading.hide();
    }

    static uploadedShow(){
        uploaded.fadeIn();
    }

    static uploadedHide(){
        uploaded.fadeOut();
    }

}

module.exports = TipManager;