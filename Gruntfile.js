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
                command: isPlatform('darwin') ? 'open -n -a node-webkit ""' :
                         isPlatform('linux') ? 'LD_LIBRARY_PATH=nw:$LD_LIBRARY_PATH nw/nw ./' :
                         isPlatform('win64') || isPlatform('win32') ? 'nodewebkit' : ''
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-shell');

    // Default task(s).
    grunt.registerTask('build', ['sass', 'jshint', 'nodewebkit']);
//    grunt.registerTask('server', 'Start the web server', function() {
//        grunt.log.writeln('Started web server');
//        require('./scripts/can/multiply.js');
//    });
    grunt.registerTask('default', ['sass', 'jshint', 'shell:nodeWebkitDev', 'watch']);

};
