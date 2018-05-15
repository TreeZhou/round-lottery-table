class RuleClass extends BasePopupClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".rule .box", config.ratio);
    }

    init() {

        //声明变量
        this.submitData = {
            id: null, //测试，什么ID
            openid: null,
            mobile: null,
            active: null,
        }
        this.submitting = false;
        this.$sameCityInfoInput = this.$dom.find("#sameCityInfoInput");
        this.$sameCityInfoBtnSure = this.$dom.find("#sameCityInfoBtnSure");
        this.$sameCityInfoOptionsBox = this.$dom.find("#sameCityInfoOptionsBox");

        this.initInputEvent();
        this.initBtnSubmitEvent();
        this.initSelectContainerEvent();
        this.initObserversubmitData();

    }
    initObserversubmitData() {
        Config.observer.on("initSameCityInfoSubmitData", () => {
            this.submitData.id = Config.awardData.id;
            this.submitData.openid = Config.userInfo.openid
        })
    }
    initSelectContainerEvent() {
        this.$sameCityInfoOptionsBox.on('tap', (event) => {
            let $target = $(event.target);
            this.$sameCityInfoOptionsBox.find(".option-act").hide();
            $target.find(".option-act").show();
            this.activeType($target.data("index"));
        });
    }
    activeType(index) {
        let activeType = "";
        switch (index) {
            case 1:
                activeType = "育儿沙龙"
                break;
            case 2:
                activeType = "美食类"
                break;
            case 3:
                activeType = "插花"
                break;
            case 4:
                activeType = "运动健身"
                break;
            default:
                break;
        }
        this.submitData.active = activeType;
    }
    initInputEvent() {
        this.$sameCityInfoInput.on('input', (event) => {
            this.submitData.mobile = event.target.value;
        });
    }
    initBtnSubmitEvent() {
        this.$sameCityInfoBtnSure.on('tap', () => {
 
            if (this.submitting) {
                TipManager.show("正在提交数据，请稍等...");
                return;
            }
            if (!this.checkSubmitData()) {
                return;
            }
            try {
                fiboSDK.btnClick('same-city-info-btn-submit', '同城活动类别选择页面-确定');
            } catch (e) {}

            this.goToSubmit();
        });
    }
    //检查手机号码格式
    checkPhone() {
        if (!this.submitData.mobile) {
            TipManager.show("请先输入手机号码");
            return false;
        }
        if (!/^1[23456789]\d{9}$/i.test(this.submitData.mobile)) {
            TipManager.show("你输入的不是手机号码");
            return false;
        }
        return true;
    }
    checkSubmitData() {
        if (!this.submitData.active) {
            TipManager.show("请选择活动类别");
            return;
        }
        if (!this.checkPhone()) {
            return false;
        }

        return true;
    }

    goToSubmit() {
        let params = {
            data: this.submitData
        }
        try {
            const fForm = {
                '奖品类型': this.submitData.id,
                '收件手机': this.submitData.mobile,
                '活动类别': this.submitData.active,
            }
            fiboSDK.saveFormInfo(fForm, '同城活动类别选择页面-表单信息');
        } catch (e) {}
        this.submitting = true;
        Promise.resolve(Api.putActive(params)).then((res) => {
            if (!res.success) {
                TipManager.show(res.msg)
                return ;
            }
            TipManager.show("提交成功");
            this.hide();
        }).catch((err) => {
            let errMsg = typeof err === 'string' ? err : (err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString());
            try {
                Raven.captureMessage(`<提交同城活动类别信息>失败`, {
                    level: 'error',
                    extra: {
                        data: errMsg
                    }
                });
            } catch (e) {}
            // return alert(errMsg);
        }).finally(() => {
            this.submitting = false;
        });
    }
    show() {
        Config.observer.emit("initSameCityInfoSubmitData");
        super.show();
    }

    hide() {
        View.home.initMyPrizeList(1); //渲染列表--我的奖品
        super.hide();
    }

}

module.exports = RuleClass;