// Импортируем необходимые модули
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Для компиляции Sass
const sourcemaps = require('gulp-sourcemaps'); // Для карт исходников

// Задача для компиляции Sass в CSS
gulp.task('sass', function () {
  return gulp.src('src/styles/scss/*.scss') // Путь к вашим Sass-файлам
    .pipe(sourcemaps.init()) // Инициализация карты исходников
    .pipe(sass().on('error', sass.logError)) // Компиляция Sass в CSS
    .pipe(sourcemaps.write('./maps')) // Запись карт исходников в папку 'maps'
    .pipe(gulp.dest('src/styles/css')); // Выводим результат в папку dist/css
});

// Задача для наблюдения за изменениями файлов
gulp.task('watch', function () {
  gulp.watch('src/styles/scss/**/*.scss', gulp.series('sass')); // Наблюдаем за изменениями в файлах .scss
});

// Задача по умолчанию
gulp.task('default', gulp.series('sass', 'watch'));
