var gulp = require("gulp"),
  pug = require("gulp-pug"),
  browserSync = require("browser-sync"),
  sass = require("gulp-sass"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify-es").default,
  autoprefixer = require("gulp-autoprefixer"),
  imagemin = require("gulp-imagemin"),
  cleancss = require("gulp-clean-css");

gulp.task("pug", function () {
  return gulp
    .src("app/*.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task('styles', function () {
  return gulp.src('app/scss/*.scss')
      .pipe(sass({
          outputStyle: 'expanded',
          includePaths: [__dirname + '/node_modules']
      }))
      .pipe(concat('styles.min.css'))
      .pipe(autoprefixer({
          grid: true,
          overrideBrowserslist: ['last 10 versions']
      }))
      .pipe(cleancss({
          level: {
              1: {
                  specialComments: 0
              }
          }
      }))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream())
});

gulp.task("scripts", function () {
  return gulp
    .src(["app/js/main.js"])
    .pipe(concat("scripts.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("compress", function () {
  gulp.src("app/img/*").pipe(imagemin()).pipe(gulp.dest("dist/img"));
});

gulp.task("browser-sync", function () {
  browserSync({
    server: {
      baseDir: "dist",
    },
    notify: true,
  });
});

gulp.task("watch", function () {
  gulp.watch("app/scss/**/*.scss", gulp.parallel("styles"));
  gulp.watch("app/*.pug", gulp.parallel("pug"));
  gulp.watch("app/js/main.js", gulp.parallel("scripts"));
  gulp.watch("app/img/*", gulp.parallel("compress"));
});

gulp.task(
  "default",
  gulp.parallel("styles", "pug", "scripts", "compress", "browser-sync", "watch")
);