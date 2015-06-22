module.exports = function(grunt){

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        babel: {
            dev: {
                files: {
                    'components/compiled.js': 'components/compiled.js'
                }
            }
        },

        watch: {
            livereload: {
                files: [
                    'components/es6/slick-helpers.js',
                    'components/es6/slick-input.js',
                    'sass/slick.css',
                    'index.html'
                ],
                tasks: ['concat','babel'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        ''
                    ]
                }
            }
        },
        concat: {
            options: {
                separator: ';\n'
            },
            dist: {
                src: ['components/es6/**/*.js'],
                dest: 'components/compiled.js'
            }
        }

    });

    grunt.registerTask('serve', function (target) {

        grunt.task.run([
            'connect:livereload',
            'watch:livereload'
        ]);
    });


    grunt.registerTask('default', []);
};