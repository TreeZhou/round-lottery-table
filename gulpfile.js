const path = require('path');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const babel = require('gulp-babel');
const tap = require('gulp-tap');
const webpack = require('gulp-webpack');
const es2015 = require('babel-preset-es2015');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const proxyMiddleware = require('http-proxy-middleware');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
//配置请求的地址
const proxyTable = {
	// '/??': {
	// 	target: 'http://100jc.net/??',
	// 	changeOrigin: true,
	// 	logLevel: 'debug'
	// }
}

const proxyArr = [];
Object.keys(proxyTable).forEach(function(context){
	var options = proxyTable[context];
	if(typeof options === 'string'){
		options = {
			target: options
		}
	}
	proxyArr.push(proxyMiddleware(context, options));
});

gulp.task('browser-sync', ['html', 'resources', 'sass', 'script'], function(){
	browserSync.init({
		server: {
			middleware: proxyArr
		},
		startPath: 'app/?debug=true'	//打开的位置
	});
	//监听文件的变化
	gulp.watch("index.html", ['html']);
	gulp.watch("resources/**/*", ['resources']);
	gulp.watch("css/**/*.scss", ['sass']);
	gulp.watch("js/**/*.js", ['script']);
});

//编译html
gulp.task('html', function(){
	return gulp.src('index.html')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(gulp.dest('app'))
		.pipe(browserSync.stream());
});
//编译resources
gulp.task('resources', function(){
	return gulp.src('./resources/**/*')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(gulp.dest('./app/resources/'))
		.pipe(browserSync.stream());
});
//编译sass
gulp.task('sass', function(){
	return gulp.src('css/main.scss')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
});
//编译js
gulp.task('script', function(){
	return gulp.src('./js/**/*.js')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(sourcemaps.init())
		.pipe(webpack({
			devtool: "source-map",
			entry: {
				app: './js/index.js'
			},
			output: {
				filename: 'main.js'
			},
			module: {
				loaders: [
					{
						test: /\.js$/,
						loader: 'babel-loader'
					}
				]
			},
			plugins: []
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./app/js'))
		.pipe(browserSync.stream());
});

//构建上线版本
gulp.task('release', ['moveresource', 'minihtml', 'minicss', 'minijs'], function(){
	return notify({message: '代码已完成压缩！'});
});
//压缩js
gulp.task('minijs', function(){
	return gulp.src('./app/js/main.js')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(uglify())
		.pipe(gulp.dest('./release/js'));
});
//压缩css
gulp.task('minicss', function(){
	return gulp.src('./app/css/main.css')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(cssnano())
		.pipe(gulp.dest('./release/css'))
});
//压缩html
gulp.task('minihtml', function(){
	var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
	return gulp.src('./*.html')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(htmlmin(options))
		.pipe(gulp.dest('./release/'));
});
//搬移资源文件
gulp.task('moveresource', function(){
	return gulp.src('./resources/**/*')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(gulp.dest('./release/resources/'));
});

gulp.task('default', ['browser-sync']);