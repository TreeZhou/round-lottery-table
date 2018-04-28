# To start

这是一个由 Gulp 构建工具搭建的项目模板，适用于简单的H5展示网页开发，包含了 Loading页面、普通页面、弹窗页面等。

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