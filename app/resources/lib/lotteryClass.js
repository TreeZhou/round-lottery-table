//此类适用于8个奖品的圆形转盘的
//需要引入以下2个文件jquery-3.1.1.min.js,,jQueryRotate
//引入lotteryClass类文件
//定义空转函数和结束函数
//实例化同时传入参数
//参数：
//selectorStartBtn, selectorContent, spinFunc, endFunc, [spinSpeed], [turnDuration]
//开始按键选择器，转动的转盘选择器，空转函数，结束函数，空转速度(默认为25ms)，真转持续时间（默认3000ms）

{
    /* <script src="./resources/js/jquery-3.1.1.min.js"></script>
    <script src="./resources/js/jQueryRotate.2.2.js"></script> */
}

// const lotteryClass = require("../lotteryClass")
// function spinFunc() {
//     if (0) {
//         lottery.stopSpinMethod(); //停止空转
//         return;
//     }
//     lottery.startTrueRotateMethod(1); //开始真转，参数为转盘停止的位置,转盘上中线为起点，左边第一个为1
// }
// function endFunc() {
//     console.log("转盘结束")
// }
// let lottery = new lotteryClass("#turntable-start","#turntable-content",spinFunc, endFunc,25,3000);


class lotteryClass {
    constructor(selectorStartBtn, selectorContent, spinFunc, endFunc, spinSpeed, turnDuration) {

        //声明变量
        this.timerSpin = null; //空转的定时器
        this.spinAngle = 0; //空转的当前角度
        this.spinSpeed = spinSpeed || 25; //空转的速度，单位毫秒，数值越高转的越慢
        this.addSpinAngle = 10; //每次转动增加角度，固定参数无需请勿调动
        this.turnDuration = turnDuration || 3000; //真转的动画持续时间，数值越高转的越慢
        this.startTrueRotate = false; //是否开始真转
        this.stopSpin = false; //是否要停止空转
        this.rotating = false; //转盘是否正在转动中
        this.stopPosition = null; //数值1-8，转盘最后要停止的位置，转盘上中线为起点，左边第一个为1
        this.awardPosition = [0, 45, 90, 135, 180, 225, 270, 315]; //停止位置stopPosition对应的角度
        this.spinFunc = spinFunc || null; //存储传入的空转函数
        this.endFunc = endFunc || null; //存储传入的转动结束函数
        //声明控件
        this.$turntableContent = $(selectorContent);
        this.$btnStart = $(selectorStartBtn);
        //初始化事件
        this.initBtnStart(); //抽奖开始按键
        console.log(this.spinSpeed, this.turnDuration);
    }

    initBtnStart() {
        this.$btnStart.on("click", this.lottery.bind(this));
    }
    lottery() {
        if (this.rotating) { //检查是否在转动中
            return;
        }
        this.rotating = true;
        this.spinLottery(); //开始空转

        if (this.spinFunc) {
            this.spinFunc(); //空转中要执行的函数
        } else {
            alert("请传入空转中要执行的函数");
        }

    }

    //mun为awardPosition里面的数值,对应this.stopPosition数值的1-8;
    rotateFunc(num) {
        this.$turntableContent.rotate({
            angle: 0, //转盘起始位置
            duration: this.turnDuration,
            animateTo: num + 360 + 22.5, //360是我要让指针旋转1圈,num+22.5为停止的位置,22.5为中间位置
            callback: () => {
                if (this.endFunc) {
                    this.endFunc(); //真转结束后要执行的函数
                } else {
                    alert("请传入真转结束后要执行的函数");
                }
                this.rotating = false;
            }
        });
    }
    isPositiveInteger(s) { //是否为正整数
        var re = /^[1-9]+$/;
        return re.test(s)
    }
    spinLottery() {
        this.timerSpin = setInterval(() => {
            if (this.isPositiveInteger(this.spinAngle / 360) && this.startTrueRotate) { //开始真转
                this.spinAngle = 0;
                clearInterval(this.timerSpin);
                this.rotateFunc(this.awardPosition[this.stopPosition - 1]);
                this.startTrueRotate = false;
                return;
            }
            if (this.isPositiveInteger(this.spinAngle / 360) && this.stopSpin) { //停止空转
                this.spinAngle = 0;
                clearInterval(this.timerSpin);
                this.stopSpin = false;
                this.rotating = false;
                return;
            }
            this.spinAngle = this.spinAngle + this.addSpinAngle;
            this.$turntableContent.css({
                "transform": `rotate(${this.spinAngle}deg)`
            })
        }, this.spinSpeed);
    }
    stopSpinMethod() {
        this.stopSpin = true;
    }
    startTrueRotateMethod(stopPosition) {
        this.stopPosition = stopPosition;
        if (this.stopPosition >= 1 && this.stopPosition <= 8) {
            this.startTrueRotate = true;
            return;
        }
        alert("传入的中奖位置必须为数字1-8");
        this.stopSpinMethod();
    }
}

module.exports = lotteryClass;