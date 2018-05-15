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
            address: null,
            username: null
        }
        this.submitting = false;
        //声明控件
        this.$toothpasteUsername = this.$dom.find("#toothpasteUsername");
        this.$toothpasteMobile = this.$dom.find("#toothpasteMobile");
        this.$toothpasteAddress = this.$dom.find("#toothpasteAddress");
        this.$toothpasteAddressInfoBtnSure = this.$dom.find("#toothpasteAddressInfoBtnSure");
        //声明事件
        this.initInputEvent();
        this.initBtnSubmitEvent();
        this.initObserversubmitData();

    }
    initObserversubmitData() {
        Config.observer.on("initToothPasteSubmitData", () => {
            this.submitData.id = Config.awardData.id;
            this.submitData.openid = Config.userInfo.openid
        })
    }
    initInputEvent() {
        this.$toothpasteUsername.on('input', (event) => {
            this.submitData.username = event.target.value;
        });
        this.$toothpasteMobile.on('input', (event) => {
            this.submitData.mobile = event.target.value;
        });
        this.$toothpasteAddress.on('input', (event) => {
            this.submitData.address = event.target.value;
        });
    }

    initBtnSubmitEvent() {
        this.$toothpasteAddressInfoBtnSure.on('tap', () => {
            try {
                fiboSDK.btnClick('toothpaste-addr-btn-submit', '提交牙膏收件人信息页--提交信息');
            } catch (e) {}

            if (this.submitting) {
                TipManager.show("正在提交数据，请稍等...");
                return;
            }
            if (!this.checkSubmitData()) {
                return;
            }
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
        if (!this.submitData.username) {
            TipManager.show("请先输入联系人姓名");
            return;
        }
        if (!this.checkPhone()) {
            return false;
        }
        if (!this.submitData.address) {
            TipManager.show("请先输入收货地址");
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
                '收件人': this.submitData.username,
                '收件手机': this.submitData.mobile,
                '地址': this.submitData.address,
            }

            fiboSDK.saveFormInfo(fForm, '提交牙膏收件人信息页--表单信息');
        } catch (e) {}
        this.submitting = true;
        Promise.resolve(Api.putAddress(params)).then((res) => {
            if (!res.success) {
                TipManager.show(res.msg)
                return;
            }
            TipManager.show("提交成功");
            this.hide();
        }).catch((err) => {
            let errMsg = typeof err === 'string' ? err : (err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString());
            try {
                Raven.captureMessage(`<提交牙膏收货信息>失败`, {
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
        Config.observer.emit("initToothPasteSubmitData");
        super.show();
    }

    hide() {
        View.home.initMyPrizeList(1); //渲染列表--我的奖品
        super.hide();
    }

}

module.exports = RuleClass;