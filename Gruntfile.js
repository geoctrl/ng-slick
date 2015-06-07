module.exports = function(grunt){

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            livereload: {
                options: {livereload: true},
                files: [
                    'components/**/*',
                    'sass/ng-slick.css',
                    'index.html'
                ]
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
        }

    });

    grunt.registerTask('serve', function (target) {

        grunt.task.run([
            'connect:livereload',
            'watch'
        ]);
    });


    grunt.registerTask('default', []);
};