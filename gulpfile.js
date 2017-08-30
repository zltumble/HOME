/**
 * Created by Administrator on 2017/8/29.
 */
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');

gulp.task('copy',function(){
   gulp.src('src/index.html')
       .pipe(gulp.dest('dist/'))
});
/*less编译，压缩*/
/*gulp.task('dist',function(){
   gulp.watch('src/index.html',['copy']);
});*/
gulp.task('style',function(){
   gulp.src(['src/styles/*.less', '!src/styles/_*.less'])

       .pipe(less())
       .pipe(cssnano())
       .pipe(gulp.dest('dist/styles'))
       .pipe(browserSync.reload());

});
/*js合并，压缩，混淆*/
gulp.task('script',function(){
   gulp.src('src/scripts/*.js')
       .pipe(concat('all.js'))
       .pipe(uglify())
       .pipe(gulp.dest('dist/scripts'))
       .pipe(browserSync.reload());

});
/*图片复制*/
/*html*/
gulp.task('html',function(){
   gulp.src('src/*.html')
       .pipe(htmlmin({collapseWhitespace:true,removeComments:true}))
       .pipe(gulp.dest('dist'))
       .pipe(browserSync.reload());
});

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: ['dist']
        }
    });
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/*.html',['html']);
});



