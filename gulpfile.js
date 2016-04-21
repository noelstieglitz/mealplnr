var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var supertest = require('supertest');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('public/tsconfig.json');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');


var tsPaths = ['public/**/*.ts'];

gulp.task('default', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8081
        },
        ignore: ['./node_modules/**']
    })
        .on('restart', function () {
            console.log('Restarting');
        });
});

gulp.task('compile', function () {
    var tsResult = gulp.src(tsPaths)
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated 
        .pipe(ts(tsProject))
        .pipe(uglify())
        .pipe(sourcemaps.write('/', {
            sourceRoot: '/app/'
        })) // Now the sourcemaps are added to the .js file 
        .pipe(gulp.dest('public/release/'));
});

gulp.task('test', function () {
    env({
        vars: {
            ENV: 'Test'
        }
    });

    gulp.src('Tests/*.js', { read: false })
        .pipe(gulpMocha({ reporter: 'nyan' }));
});


// gulp.watch(tsPaths, ['compile']);