class HomeClass extends BaseClass {

    constructor(str) {
        super(str);
        // viewAdapt.push(".home .container", config.ratio);
    }

    init() {
        //声明变量
        this.submitData = {
            hobby: null,
            kid: null,
            mobile: null,
            code: null,
        }
        //测试
        // this.submitData = {
        //     hobby: null,
        //     kid: null,
        //     mobile: 13631297822,
        //     code: null,
        // }
        //测试
        this.submitting = false;
        //声明控件
        this.$btnHobby = this.$dom.find("#btnHobby");
        this.$btnKid = this.$dom.find("#btnKid");
        this.$inputMobile = this.$dom.find("#inputMobile");
        this.$inputCode = this.$dom.find("#inputCode");
        this.$btnSend = this.$dom.find("#btnSecdCode");
        this.$sendText = this.$dom.find("#sendText");
        this.$btnSubmit = this.$dom.find("#btnSubmit");


        //初始化事件
        this.initBtnHobby();
        this.initBtnKid();
        this.initMobileInputEvent();
        this.initCodeInputEvent();
        this.initBtnSubmitEvent();
        this.initBtnSendEvent();

    }
    initBtnHobby() {
        this.$btnHobby.on("tap", () => {
            Popup.hobby.$hobbyOptionsBox.find('span').removeClass("hobby__hobby-active");
            Popup.hobby.hobbysArray.forEach(element => {
                Popup.hobby.$hobbyOptionsBox.find(`[data-index="${element}"]`).addClass("hobby__hobby-active")
            });
            Popup.hobby.show();
        });
    }
    initBtnKid() {
        this.$btnKid.on("tap", () => {
            Popup.kid.$kidOptionsBox.find('span').removeClass("kid__kid-active");
            Popup.kid.$kidOptionsBox.find(`[data-index="${Popup.kid.kidArray[0]}"]`).addClass("kid__kid-active")
            Popup.kid.show();
        });
    }
    initMobileInputEvent() {
        this.$inputMobile.on('input', (event) => {
            this.submitData.mobile = event.target.value;
        });
    }
    initCodeInputEvent() {
        this.$inputCode.on('input', (event) => {
            this.submitData.code = event.target.value;
        });
    }

    initBtnSendEvent() {
        this.$btnSend.on('tap', () => {
            if (this.sendTime > 0) { // 秒数大于0，不能获取验证码
                return;
            }
            if (this.sending) {
                TipManager.show("正在向您的手机发送验证码，请稍候...");
                return;
            }
            if (this.submitting) {
                TipManager.show("提交数据中，暂时不能获取验证码...");
                return;
            }
            if (!this.checkPhone()) {
                return;
            }
            this.fetchCode();
        });
    }
    fetchCode() {
        this.sendTime = Config.sendCodeTime || 60;
        let sourceText = this.$sendText.text();
        let timer = setInterval(() => {
            this.sendTime -= 1;
            if (this.sendTime > 0) {
                this.$sendText.text(this.sendTime);
                return;
            }
            clearInterval(timer);
            this.$sendText.text(sourceText); // 文本复原
        }, 1000);
        let params = {
            data: {
                mobile: this.submitData.mobile,
                openid: Config.userInfo.openid
            }

        }
        this.sending = true;
        Promise.resolve(Api.getCode(params)).then((res) => {
            if (res.result) {
                TipManager.show('成功发送短信验证码，如果未收到短信验证码，请60秒后重试');
            } else if (res.error_code == -1) {
                TipManager.show(res.msg);
                this.sendTime = 0;
            } else {
                TipManager.show('一小时内只能获取三次验证码');
                this.sendTime = 0;
            }
        }).catch((err) => {
            let errMsg = typeof err === 'string' ? err : (err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString());
            try {
                Raven.captureMessage(`<获取验证码>失败`, {
                    level: 'error',
                    extra: {
                        data: errMsg
                    }
                });
            } catch (e) {}
            // return alert(errMsg);
        }).finally(() => {
            this.sending = false;
        });
    }

    initBtnSubmitEvent() {
        this.$btnSubmit.on('tap', () => {
            if (this.submitting) {
                TipManager.show("正在提交数据，请稍等...");
                return;
            }
            if (!this.checkSubmitData()) {
                return;
            }
            try {
                fiboSDK.btnClick('regist-info-btn-submit', '完善会员资料-提交抽大奖');
            } catch (e) {}
            this.goToSubmit();
        });
    }
    checkHobby() {
        // debugger;
        if (!this.submitData.hobby) {
            TipManager.show("请选择您的喜好");
            return false;
        }
        return true;

    }
    checkKid() {
        if (this.submitData.kid == null) {
            TipManager.show("请选择您的情况");
            return false;
        }
        return true;

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
        if (!this.checkHobby()) {
            return;
        }
        if (!this.checkKid()) {
            return;
        }
        if (!this.checkPhone()) {
            return false;
        }
        if (!this.submitData.code) {
            TipManager.show("请先输入验证码");
            return false;
        }
        if (!/^\d{6}$/i.test(this.submitData.code)) {
            TipManager.show("请输入正确的验证码");
            return false;
        }
        return true;
    }

    goToSubmit() {
        let params = {
            data: {
                code: this.submitData.code,
                hobby: this.submitData.hobby,
                child: this.submitData.kid,
                other_openid: Config.urlSearchObj['other_openid'],
                cnl: Config.urlSearchObj['cnl'],
                openid: Config.userInfo.openid,
                mobile: this.submitData.mobile,
            }
        }

        try {
            const fForm = {
                '姓名': config.userInfo.nickname,
                '性别': config.userInfo.sex,
                '城市': config.userInfo.city,
                '手机': this.submitData.mobile,
                '喜好': this.submitData.hobby,
                '小孩': this.submitData.kid,
            }
            fiboSDK.saveFormInfo(fForm, '完善会员资料-提交抽大奖的表单信息');
        } catch (e) {}
        this.submitting = true;
        Promise.resolve(Api.register(params)).then((res) => {
            if (!res.success) {
                alert(res.msg);
                return Promise.reject(res);
            }
            TipManager.show("注册成功");
            this.hide();
            Util.addFrend();
            return Util.getInfo();
        }).then(() => {
            View.home.show();
        }).catch((err) => {
            let errMsg = typeof err === 'string' ? err : (err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString());
            try {
                Raven.captureMessage(`<提交验证码并更新审核列表>失败`, {
                    level: 'error',
                    extra: {
                        data: errMsg
                    }
                });
            } catch (e) {}
            // return console.log(errMsg);
        }).finally(() => {
            this.submitting = false;
        });
    }
    // recoverPage() {
    //     this.submitData = {
    //         hobby: null,
    //         kid: null,
    //         mobile: null,
    //         code: null,
    //     };

    // }
    show() {
        super.show();
    }

    hide() {
        super.hide();
    }

}

module.exports = HomeClass;