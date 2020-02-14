var gulp = require("gulp"),
  sass = require("gulp-sass"),
  concat = require("gulp-concat"),
  prefixer = require("gulp-autoprefixer"),
  newer = require("gulp-newer"),
  cssmin = require("gulp-cssnano"),
  imagemin = require("gulp-imagemin"),
  uglifyes = require("uglify-es"),
  composer = require("gulp-uglify/composer"),
  uglify = composer(uglifyes, console),
  browserSync = require("browser-sync"),
  del = require("del"),
  babel = require("gulp-babel");

var paths = { src: "app/", dist: "dist/assets/template/" },
  src = {
    sass: paths.src + "sass/**/**/*.+(scss|sass|less|css)",
    js: paths.src + "scripts/**/*.js",
    img: paths.src + "img/**/*",
    fonts: paths.src + "fonts/**/*"
  },
  dist = {
    sass: paths.dist + "styles",
    js: paths.dist + "scripts",
    img: paths.dist + "img",
    fonts: paths.dist + "fonts"
  };

gulp.task("sass", function() {
  return gulp
    .src([
      "app/libs/simplebar.css",
      "app/libs/range.slider.min.css",
      "app/sass/app.scss"
    ])
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("profile.min.css"))
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(gulp.dest(dist.sass));
});

gulp.task(
  "js",
  gulp.series(
    function() {
      return gulp
        .src(["app/scripts/script.js"])
        .pipe(uglify())
        .pipe(
          babel({
            presets: ["@babel/preset-env"]
          })
        )
        .pipe(concat("script.babel.js"))
        .pipe(gulp.dest("app/scripts"));
    },
    function() {
      return gulp
        .src(["app/libs/*.js", "app/scripts/script.babel.js"])
        .pipe(uglify())
        .pipe(concat("profile.min.js"))
        .pipe(gulp.dest(dist.js));
    }
  )
);

gulp.task("img", function() {
  return gulp
    .src(src.img)
    .pipe(newer(dist.img))
    .pipe(imagemin())
    .pipe(gulp.dest(dist.img));
});

gulp.task("html", function() {
  return gulp
    .src("app/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("clean", function() {
  return del.sync("dist");
});

gulp.task("build", gulp.parallel("clean", "html", "sass", "js", "img"));

gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "dist"
    }
  });
});

gulp.task(
  "default",
  gulp.parallel("browser-sync", function() {
    gulp
      .watch("app/*.html", gulp.parallel("html"))
      .on("change", browserSync.reload);
    gulp
      .watch(src.sass, gulp.parallel("sass"))
      .on("change", browserSync.reload);
    gulp
      .watch("app/scripts/script.js", gulp.parallel("js"))
      .on("change", browserSync.reload);
    gulp.watch(src.img, gulp.parallel("img")).on("change", browserSync.reload);
  })
);
