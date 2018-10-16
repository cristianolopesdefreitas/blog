(function() {
    'use strict';

    var gulp = require( 'gulp' ),
        liveServer = require( 'gulp-live-server' ),
        uglify = require( 'gulp-uglify' ),
        jshint = require( 'gulp-jshint' ),
        concat = require( 'gulp-concat' ),
        sass = require( 'gulp-sass' ),
        cleanCSS = require( 'gulp-clean-css' ),
        copy = require( 'gulp-copy' ),
        rename = require( 'gulp-rename' ),
        fileInclude = require( 'gulp-file-include' ),
        htmlBuild = require( 'gulp-htmlbuild' ),
        htmlmin = require( 'gulp-htmlmin' ),
        files = {
            // js
            vendorJS: [
                'bower_components/jquery/dist/jquery.min.js'
            ],
            defaultJS: [
                'app/js/scripts.js'
            ],
            vendorCSS: [],
            defaultCSS: [
                'app/css/styles.css'
            ],
            defaultFonts: [
                'app/fonts/*'
            ]
        },
        buildPath = null;

    gulp.task( 'uglify', [ 'jshint' ], function() {
        return gulp
            .src( files.vendorJS.concat( files.defaultJS ) )
            .pipe( concat( 'scripts.js' ) )
            .pipe( uglify() )
            .pipe( rename({
                suffix: '.min'
            }))
            .pipe( gulp.dest( 'dist/js' ) );
    });

    gulp.task( 'sass', function() {
        return gulp
            .src( 'app/css/styles.scss' )
            .pipe( sass().on( 'error', sass.logError ) )
            .pipe( gulp.dest( 'app/css' ) );
    });

    gulp.task( 'cleanCSS', [ 'sass' ], function() {
        return gulp
            .src( files.vendorCSS.concat( files.defaultCSS ) )
            .pipe( concat( 'styles.css' ) )
            .pipe( cleanCSS({
                specialComments: 0
            }) )
            .pipe( rename({
                suffix: '.min'
            }) )
            .pipe( gulp.dest( 'dist/css' ) );
    });

    gulp.task( 'concatJs', [ 'jshint' ], function() {
        return gulp
            .src( files.vendorJS.concat( files.defaultJS ) )
            .pipe( concat( 'scripts.js' ) )
            .pipe( gulp.dest( 'preview/js' ) );
    });

    gulp.task( 'concatCss', [ 'sass' ], function() {
        return gulp
            .src( files.vendorCSS.concat( files.defaultCSS ) )
            .pipe( concat( 'styles.css' ) )
            .pipe( gulp.dest( 'preview/css' ) );
    });

    gulp.task( 'jshint', function() {
        return gulp
            .src( files.defaultJS )
            .pipe( jshint() )
            .pipe( jshint.reporter() );
    });

    gulp.task( 'fileInclude', function() {
        return gulp
            .src([ 'app/**/*.html', '!app/includes/**' ])
            .pipe( fileInclude({
                prefix: '@@',
                basepath: 'app/includes/'
            }) )
            .pipe( gulp.dest( buildPath ) );
    });

    gulp.task( 'htmlbuild', [ 'fileInclude' ], function() {
        return gulp
            .src( 'dist/*.html' )
            .pipe( htmlBuild({
                js: htmlBuild.preprocess.js(function( block ) {
                    block.write( '/js/scripts.min.js' );
                    block.end();
                }),
                css: htmlBuild.preprocess.css(function( block ) {
                    block.write( '/css/styles.min.css' );
                    block.end();
                }),
                remove: function( block ) {
                    block.end();
                }
            }) )
            .pipe( gulp.dest( 'dist/' ) );
    });

    gulp.task( 'htmlmin', [ 'htmlbuild' ], function() {
        return gulp
            .src([ 'dist/**/*.html' ])
            .pipe( htmlmin({collapseWhitespace: true}) )
            .pipe( gulp.dest( 'dist' ) );
    });

    gulp.task( 'copyFonts', function() {
        return gulp
            .src( files.defaultFonts )
            .pipe( copy( buildPath + '/fonts', { prefix: 4 }) );
    });

    gulp.task( 'copyImages', function() {
        return gulp
            .src([ 'app/images/*' ])
            .pipe( copy( buildPath + '/images', { prefix: 4 }) );
    });

    gulp.task( 'watch', function() {
        gulp.watch( 'app/**/*.html', [ 'fileInclude' ]);
        gulp.watch( 'app/js/**/*.js', [ 'jshint', 'concatJs' ]);
        gulp.watch( 'app/css/**/*.scss', [ 'sass', 'concatCss' ]);
        gulp.watch( 'app/images/*', [ 'copyImages' ]);
        gulp.watch( 'app/fonts/*', [ 'copyFonts' ]);
    });

    gulp.task( 'server', function() {
        var server = liveServer.static([ 'preview' ]);
        buildPath = 'preview';

        server.start();
        gulp.start( 'copyFonts', 'copyImages', 'sass', 'concatCss', 'jshint', 'concatJs', 'fileInclude' );

        gulp.watch( 'preview/**/*.html', function( file ) {
            server.notify.apply( server, [ file ]);
        });

        gulp.watch( 'preview/js/**/*.js', function( file ) {
            server.notify.apply( server, [ file ]);
        });

        gulp.watch( 'preview/css/**/*.css', function( file ) {
            server.notify.apply( server, [ file ]);
        });

        gulp.watch( 'preview/images/*', function( file ) {
            server.notify.apply( server, [ file ]);
        });

        gulp.watch( 'preview/fonts/*', function( file ) {
            server.notify.apply( server, [ file ]);
        });
    });

    gulp.task( 'default', function() {
        gulp.start( 'server', 'watch' );
    });

    gulp.task( 'dist', function() {
        buildPath = 'dist';

        gulp.start(
            'jshint',
            'uglify',
            'sass',
            'cleanCSS',
            'copyFonts',
            'copyImages',
            'fileInclude',
            'htmlbuild',
            'htmlmin'
        );
    });
}());
