function isPlatform(platform) {
    return require('os').platform() === platform;
}

module.exports = function(grunt) {

    grunt.initConfig({
        nodewebkit: {
            options: {
                build_dir: 'webkitbuilds',

                // Select opperating
                mac: isPlatform('darwin'),
                win: isPlatform('win64'),
                linux32: false,
                linux64: isPlatform('linux')
            },
            src: ['./**/*'] // Include everything
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/main.css': 'sass/main.scss'
                }
            }
        },
        jshint: {
            files: ['scripts/**/*.js'],
            options: {
                ignores: ['scripts/external/**/*.js'],
                '-W030': true
            }
        },
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['scripts/**/*.js'],
                tasks: ['jshint']
            },
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['sass']
            }
        },
        shell: {
            nodeWebkitDev: {
                command: isPlatform('darwin') ? 'NODE_ENV=' + (grunt.option('nodeEnv') || 'development') + ' open -n -a /Applications/node-webkit.app ""' :
                         isPlatform('linux') ? 'export NODE_ENV=' + (grunt.option('nodeEnv') || 'development') + ' && sudo ./nw/nw .' :
                         isPlatform('win64') || isPlatform('win32') ? 'set NODE_ENV=development&&start nw/nw.exe .' : ''
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('build', ['sass', 'jshint', 'nodewebkit']);
    grunt.registerTask('default', ['sass', 'jshint', 'shell:nodeWebkitDev', 'watch']);

};
