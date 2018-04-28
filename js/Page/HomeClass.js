class HomeClass extends BaseClass {
    constructor(str) { //通过css选择器来构建zepto对象
        super(str);
    }
    init() {
        this.$dom.find('.question').on("tap", () => {
            Popup.rule.show();
        })
        this.$dom.find('.share').on("tap", () => {
            Popup.showprize.show(1);
        })
        this.$dom.find('.gift').on("tap", () => {
            Popup.showprize.show(2);
        })

        this.$dom.find('.btn_share').on("tap", () => {
            try {
                fiboSDK.btnClick('share', '分享');
            } catch (e) {

            }
            Popup.share.show();

        })
        this.$dom.find('.tousubtn').on('tap', () => {
            View.toususelect.show();
        });
        this.$dom.find('.tousubtn').on('tap', () => {
            View.toususelect.show();
        });



        //抽奖



        //转盘
        var dataObj = [45, 0, 225, 135, 315, 90, 270, 180];
        var rotating = false;
        var rotateFunc = function (num, type) {
            $(".turntable-content").rotate({
                angle: 0,
                duration: 4000,
                animateTo: num + 1440 + 22.5, //1440是我要让指针旋转4圈
                callback: function () {
                    console.log('333333333')
                    rotating = false;
                    $('html, body').animate({
                        scrollTop: 0
                    }, 2000);
                    //TurnTableClass.initdata();
                    // if (type == 1) {
                    //     Popup.traval.show(config.awarddata.id);
                    //     //alert("迪士尼亲子家庭游"); 
                    // } else if (type == 2) {
                    //     // Popup.hongbao.initdate();
                    //     Popup.vitamin.show(config.awarddata.id);
                    //     //alert("随机微信红包");
                    // } else if (type == 3) {
                    //     Popup.gaipian.show(config.awarddata.id);
                    //     console.log(config.awarddata.id);
                    //     //alert("微商店20元抵用券");
                    // } else if (type == 4) {
                    //     Popup.liquid.show(config.awarddata);
                    //     //alert("快乐家100积分");
                    // } else if (type == 5) {
                    //     // Popup.didi.initdate();
                    //     if (config.awarddata.status == 1) {
                    //         Popup.redpack.show();
                    //     } else {
                    //         Popup.redpackfail.show();
                    //     }
                    //     // Popup.redpack.show();
                    //     //alert("滴滴快车出行券");
                    // } else if (type == 6) {
                    //     // Popup.hongbao.initdate50();
                    //     Popup.jifen100.show();
                    //     //alert("50元微信红包");
                    // } else if (type == 7) {
                    //     Popup.jifen50.show();
                    //     //alert("微商城10元抵用券");
                    // } else if (type == 8) {
                    //     Popup.quan10.show();
                    //     //alert("快乐家50积分");
                    // }
                    $(".turntable-start").one("tap", lottery);
                }
            });
        };

        this.$dom.find(".turntable-start").one("tap", lottery);



        function lottery() {
            // if (config.userInfo.subscribe == 0) {
            //     Popup.erweima.show();
            //     return;
            // } //关注页面是否弹出
            // else if (config.userInfo.chance == 0) {
            //     //              $('html, body').animate({ scrollTop: 0 }, 10);
            //     // TipManager.show("抽奖机会已用完");
            //     Popup.share.show();
            //     $(".turntable-start").one("tap", lottery);
            //     return;
            // } else {
            //     // if (config.userInfo.chance > 0) {
            //     //     try {
            //     //         fiboSDK.btnClick('lottery-success', '抽奖成功');
            //     //     } catch (e) {

            //     //     }
            //     //     API.getPrize().then((res) => {
            //     //         if (res.code == 0) {
            //     //             console.log("操作成功")
            //     //             config.userInfo.chance--;
            //     //             // $('.count').html(`<b>您还有${config.userInfo.chance}次抽奖机会</b>`);
            //     //             // $('.count').text(`剩余${config.userInfo.chance}次`);
            //     //             // this.$dom.find('.count').html('剩余'+config.userInfo.chance+'次');
            //     //             View.home.$dom.find('.count').html('剩余' + config.userInfo.chance + '次');

            //     //             var key = res.data.award_id;
            //     //             config.money = res.data.amount / 100;
            //     //             config.redemptionCode = res.data.code;
            //     //             config.awarddata = res.data;
            //     //             console.log('dhasfha');
            //     //             !rotating && rotateFunc(dataObj[key - 1], key);
            //     //             console.log('dhasfha2222222222');

            //     //         } else {
            //     //             alert(res.msg);
            //     //             // TipManager.show(res.msg);
            //     //             $(".turntable-start").off('tap').one("tap", lottery);
            //     //         }
            //     //     })
            //     // }



            //     // else if (config.userInfo.chance == 0) {
            //     //     $('html, body').animate({
            //     //         scrollTop: 0
            //     //     }, 10);
            //     //     TipManager.show("抽奖机会已用完");
            //     //     Popup.share.show();
            //     //     $(".turntable-start").one("click", lottery);

            //     // }



            // }



            // }


            //     config.userInfo.chance--;
            //     $('.turntable-numcontent').html(`<b>您还有${config.userInfo.chance}次抽奖机会</b>`);
            //     // var key = res.data.award_id;
            //     // config.money = res.data.amount / 100;
            //     // config.redemptionCode = res.data.code;
            //     // console.log('dhasfha')
                var key = 4;
            //     console.log(rotating);
                !rotating && rotateFunc(dataObj[key - 1], key);
            //     console.log('dhasfha2222222222');
            //     console.log(rotating);
            // } else {
            //     $('html, body').animate({
            //         scrollTop: 0
            //     }, 10);
            //     TipManager.show("抽奖机会已用完");
            //     Popup.share.show();
            //     $(".turntable-start").one("click", lottery);

            // }
        }



    }






    show() {
        this.$dom.show();
        // this.$dom.find('.count').html('剩余' + config.userInfo.chance + '次');
    }
    hide() {
        this.$dom.hide();
    }


}
module.exports = HomeClass;