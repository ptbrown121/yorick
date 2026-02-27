var gulp = require("gulp");
var htmlmin = require("gulp-html-minifier-terser");
var cleanCss = require("gulp-clean-css");
var terser = require("gulp-terser");
var replace = require("gulp-replace");
var deleteAsync = require("del").deleteAsync;
var pjson = require("./package.json");

function clean() {
    return deleteAsync(["dist"]);
}

function minifyHtml() {
    return gulp.src("./public/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("dist"));
}

function copyHtmlTemplates() {
    return gulp.src("./public/scripts/app/templates/*")
        .pipe(gulp.dest("dist/scripts/app/templates"));
}

function copyPrintTemplates() {
    return gulp.src("./public/scripts/app/templates/print/*")
        .pipe(gulp.dest("dist/scripts/app/templates/print"));
}

function copyReferendumTemplates() {
    return gulp.src("./public/scripts/app/templates/referendum/*")
        .pipe(gulp.dest("dist/scripts/app/templates/referendum"));
}

function copyCreateTemplates() {
    return gulp.src("./public/scripts/app/templates/create/*")
        .pipe(gulp.dest("dist/scripts/app/templates/create"));
}

function minifyCss() {
    return gulp.src("./public/**/*.css")
        .pipe(cleanCss())
        .pipe(gulp.dest("dist"));
}

function minifyJs() {
    return gulp.src(["./public/**/*.js", "!./public/scripts/app/siteconfig.js", "!./public/**/*.min.js"])
        .pipe(terser())
        .pipe(gulp.dest("dist"));
}

function images() {
    return gulp.src(["./public/**/*.{png,jpg,gif,svg}"])
        .pipe(gulp.dest("dist"));
}

function siteconfigPubstorm() {
    return gulp.src("./public/scripts/app/siteconfig.js")
        .pipe(replace("return ConfigGnuLorienDev;", "return ConfigPubstorm;"))
        .pipe(terser())
        .pipe(gulp.dest("dist/scripts/app"));
}

function siteconfigPatron() {
    return gulp.src("./public/scripts/app/siteconfig.js")
        .pipe(replace("return ConfigGnuLorienDev;", "return ConfigPatron;"))
        .pipe(terser())
        .pipe(gulp.dest("dist/scripts/app"));
}

function siteconfigHeroku() {
    return gulp.src("./public/scripts/app/siteconfig.js")
        .pipe(replace("return ConfigGnuLorienDev;", "return ConfigHeroku;"))
        .pipe(terser())
        .pipe(gulp.dest("dist/scripts/app"));
}

function appbust() {
    return gulp.src("./public/scripts/app.js")
        .pipe(replace("bust=010101", "bust=" + pjson.version))
        .pipe(terser())
        .pipe(gulp.dest("dist/scripts"));
}

function indexbust() {
    return gulp.src("./public/index.html")
        .pipe(replace("require.js?bust=010101", "require.js?bust=" + pjson.version))
        .pipe(replace("app.js?bust=010101", "app.js?bust=" + pjson.version))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("dist"));
}

var pubstorm = gulp.series(
    clean,
    minifyHtml,
    copyPrintTemplates,
    copyReferendumTemplates,
    copyHtmlTemplates,
    copyCreateTemplates,
    minifyCss,
    images,
    minifyJs,
    siteconfigPubstorm,
    appbust,
    indexbust
);

var patron = gulp.series(
    clean,
    minifyHtml,
    copyPrintTemplates,
    copyReferendumTemplates,
    copyHtmlTemplates,
    copyCreateTemplates,
    minifyCss,
    images,
    minifyJs,
    siteconfigPatron,
    appbust,
    indexbust
);

var heroku = gulp.series(
    clean,
    minifyHtml,
    copyPrintTemplates,
    copyReferendumTemplates,
    copyHtmlTemplates,
    copyCreateTemplates,
    minifyCss,
    images,
    minifyJs,
    siteconfigHeroku,
    appbust,
    indexbust
);

gulp.task("clean", clean);
gulp.task("minify-html", minifyHtml);
gulp.task("copy-html-templates", copyHtmlTemplates);
gulp.task("copy-print-templates", copyPrintTemplates);
gulp.task("copy-referendum-templates", copyReferendumTemplates);
gulp.task("copy-create-templates", copyCreateTemplates);
gulp.task("minify-css", minifyCss);
gulp.task("minify-js", minifyJs);
gulp.task("images", images);
gulp.task("siteconfig-pubstorm", siteconfigPubstorm);
gulp.task("siteconfig-patron", siteconfigPatron);
gulp.task("siteconfig-heroku", siteconfigHeroku);
gulp.task("appbust", appbust);
gulp.task("indexbust", indexbust);
gulp.task("pubstorm", pubstorm);
gulp.task("patron", patron);
gulp.task("heroku", heroku);
