# 技术要点
圆形抽奖转盘工具    
 relevant file: lotteryClass.js
- 适用于8个奖品的圆形转盘的
- 需要引入以下2个文件jquery-3.1.1.min.js,,jQueryRotate
- 引入lotteryClass类文件
- 定义空转函数和结束函数
- 实例化同时传入参数
- 参数：
selectorStartBtn, selectorContent, spinFunc, endFunc, [spinSpeed], [turnDuration]   
开始按键选择器，转动的转盘选择器，空转函数，结束函数，空转速度(默认为25ms)，真转持续时间（默认3000ms）

```
 const lotteryClass = require("../lotteryClass")
 function spinFunc() {
     if (0) {
         lottery.stopSpinMethod(); 停止空转
         return;
     }
     lottery.startTrueRotateMethod(1); 开始真转，参数为转盘停止的位置,转盘上中线为起点，左边第一个为1
 }
 function endFunc() {
     console.log("转盘结束")
 }
 let lottery = new lotteryClass("#turntable-start","#turntable-content",spinFunc, endFunc,25,3000);

```
# To start 

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
gulp

# build for production with minification
gulp release

```

# Folder structure
* app - Temporary server files
* css - The scss/less/css files associate with the structure of index.html
    * common - Some utilizations for other stylesheets
    * page - Stylesheets for normal pages
    * popup - Stylesheets for popup pages
    * main.scss - Access for all stylesheets
* js - The js class files associate with the module of index.html
    * Page - Class files for normal page modules
    * Popup - Class files for popup page modules
    * BaseClass.js - Parent of all Class files
    * BasePopupClass.js - Parent of all Popup Class files
    * index.js - The access of this app
    * Loading.js - Module about loading page
    * TipManager.js - Modules about notify or message page
    * util.js - Common functions for other js files
    * viewAdapt.js - A plugin for adapting page for all screens
* resources - The static files you want to import to this app
    * font - Font Family you want
    * img - Images for this app
    * lib - Js or Css files you need to include
* .babelrc - Configurations for Babel Compiler
* .gitignore - Filetypes you don't want to push to git server
* gulpfile.js - The core of the Gulp Server
* index.html - The Dom Structure about this app
* package.json - The normal configurations for this app

# License
[MIT](http://opensource.org/licenses/MIT)