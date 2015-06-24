module.exports = function(grunt){

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        appConfig: grunt.file.readJSON('app-config.json') || {},
        pkg: grunt.file.readJSON('package.json'),

        banner: '/* <%= appConfig.info.name %> - version <%= appConfig.info.version %> - ' +
        '<%= grunt.template.today("dd-mm-yyyy") %>\n' +
        '<%= appConfig.info.description %>\n' +
        'Authored by <%= appConfig.info.author.name %> ' +
        '- @<%= appConfig.info.author.handle %> */\n',

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
                    base: []
                }
            }
        },
        concat: {
            dist: {
                src: ['components/es6/**/*.js'],
                dest: 'components/compiled.js'
            }
        },
        copy: {
            js: {
                src: 'components/compiled.js',
                dest: 'dist/slick.js'
            },
            css: {
                src: 'sass/slick.css',
                dest: 'dist/slick.css'
            }
        },
        uglify: {
            build: {
                files: {
                    'dist/slick.min.js': 'dist/slick.js'
                }
            }
        },
        cssmin: {
            build: {
                files: {
                    'dist/slick.min.css': 'dist/slick.css'
                }
            }
        },
        usebanner: {
            build: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: 'dist/**/*'
                }
            }
        }

    });

    grunt.registerTask('serve', function (target) {

        grunt.task.run([
            'connect:livereload',
            'watch:livereload'
        ]);
    });

    grunt.registerTask('build', ['copy', 'uglify', 'cssmin', 'usebanner']);

    grunt.registerTask('default', []);
};