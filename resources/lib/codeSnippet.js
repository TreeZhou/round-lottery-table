//监听input框的改变
function initInputEvent() {
    $input.on("input", (event) => {
        formData = event.target.value;
    });
}

//检查手机号码格式
function checkPhone() {
    if (!this.submitData.mobile) {
        TipManager.show("请先输入手机号码");
        return false;
    }
    if (!/^1[345678]\d{9}$/i.test(this.submitData.mobile)) {
        TipManager.show("你输入的不是手机号码");
        return false;
    }
    return true;
}

//错误抛出片段
then().catch((err) => {
    let errMsg = typeof err === 'string' ? err : (err.toString() == '[object Object]' ? JSON.stringify(err) : err.toString());
    try {
        Raven.captureMessage(`<获取验证码>失败`, {
            level: 'error',
            extra: {
                data: errMsg
            }
        });
    } catch (e) {}
    return alert(errMsg);
})


//视频倒数
function videoConnt() {
    let count = Math.round(this.tvcVideo.duration) - Math.round(this.tvcVideo.currentTime);
    isNaN(count) && (count = "");
    this.$count.text(`${count}跳过`);
}
//监听视频的开始播放和结束播放时间，onpause暂停事件
function initSetInterval() {
    this.tvcVideo.onplay = () => {
        this.Interval = setInterval(() => {
            this.initVideoConnt();
        }, 1000)
    };
    this.tvcVideo.onended = () => {
        clearInterval(this.Interval);
        this.hide();
        this.$count.text("跳过");
    }
}