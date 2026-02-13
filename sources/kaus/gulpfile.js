var gulp          = require('gulp'),
    gutil         = require('gulp-util' ),
    del           = require('del'),
    sass          = require('gulp-sass'),
    csscomb       = require('gulp-csscomb'),
    pug           = require('gulp-pug'),
    browserSync   = require('browser-sync'),
    watch         = require('gulp-watch'),
    concat        = require('gulp-concat'),
	uglify        = require('gulp-uglify'),
    autoprefixer  = require('gulp-autoprefixer'),
    plumber       = require('gulp-plumber'),
    errorHandler  = require('./util/handle-errors.js'),
    notify        = require("gulp-notify");

/* Task to js */
gulp.task('js', function() {
    return gulp.src([
        'src/libs/jquery.min.js',
        'src/libs/jquery.fancybox.min.js',
        'src/libs/jquery.mask.min.js',
        'src/libs/jquery.validate.min.js',
        'src/libs/messages_ru.js',
        'src/libs/jquery.matchHeight.min.js',
        'src/libs/collapse.min.js',
        'src/libs/tippy.min.js'
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify()) // Минимизировать весь js (на выбор)
    .pipe(gulp.dest('build/src/js'))
    .pipe(browserSync.reload({stream: true}));
});

/* Task to browser-sync */
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'build'
        },
        notify: false,
        // tunnel: true,
        // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
    });
});

/* Task to compile sass */
gulp.task('sass', function() {  
  return gulp.src('./src/sass/style.sass')
    .pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(csscomb())
    .pipe(gulp.dest('./build/src/css/'))
    .pipe(browserSync.reload({stream: true}));
});

/* Task to watch sass changes */
gulp.task('sass-watch', function () {
  gulp.watch('./src/sass/**/*.s+(ass|css)', {
    readDelay: 250
  }, ['sass']);
});

gulp.task('html', function buildHTML() {
  return gulp.src('src/templates/pages/*.pug')
  .pipe(plumber({ errorHandler: errorHandler }))
  .pipe(pug({
    pretty: true,
  }))
  .pipe(gulp.dest('./build/'))
  .pipe(browserSync.reload({stream: true}));
});

/* Task to watch templates changes */
gulp.task('watch-templates', function() {  
 gulp.watch('./src/templates/**/*.pug' , ['html']);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['sass', 'sass-watch', 'html', 'watch-templates', 'js', 'browser-sync']);

/* Task when running `gulp` from server's terminal (build only)  */
gulp.task('build', ['sass', 'html']);