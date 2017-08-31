module.exports = function (grunt) {
  grunt.registerTask('build', ['clean', 'less', 'cssmin', 'browserify', 'uglify', 'processhtml', 'htmlmin'])
  grunt.registerTask('dev', ['build', 'watch'])
  grunt.registerTask('test', ['mochaTest:test'])
  grunt.registerTask('default', ['build', 'test'])

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      browserify: {
        options: {
          browserifyOptions: {
            debug: true
          },
          transform: [
            'stringify'
          ],
          external: [
            'jquery'
          ]
        },
        dist: {
          files: {
            'dist/chat.js': ['client/index.js']
          },
          options: {
            browserifyOptions: {
              debug: true
            },
            transform: [
              'babelify'
            ],
            watch: true
          }
        }
      },

      uglify: {
        minify: {
          files: {
            'dist/chat.min.js': ['dist/chat.js']
          }
        }
      },

      less: {
        dist: {
          files: {
            'dist/chat.css': 'client/view/chat.less'
          }
        }
      },

      clean: {
        all: ['dist/*']
      },

      eslint: {
        options: {
          config: '.eslintrc'
        },
        files: ['client/**/*.js']
      },

      watch: {
        files: ['client/*.less', 'client/*.js', 'test/*.js'],
        tasks: ['build', 'test'],
        options: {
          spawn: false,
          debounceDelay: 0,
          livereload: true
        }
      },

      cssmin: {
        dist: {
          expand: true,
          src: './dist/chat.css',
          ext: '.min.css'
        }
      },

      processhtml: {
        dev: {
          options: {
            process: true,
            strip: true
          },
          files: [{
            'dist/chat.html': ['client/index.html']
          }]
        },
        dist: {
          options: {
            process: true,
            strip: true
          },
          files: [{
            'dist/chat.min.html': ['client/index.html']
          }]
        }
      },

      htmlmin: {
        dist: {
          options: {
            removeComments: true,
            collapseWhitespace: true
          },
          files: [{
            'dist/chat.min.html': 'dist/chat.min.html'
          }]
        }
      },

      mochaTest: {
        test: {
          options: {
            reporter: 'spec',
            grep: grunt.option('grep')
          },
          src: ['./test/*.js']
        }
      }
    }
  )

  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-processhtml')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-eslint')
  grunt.loadNpmTasks('grunt-mocha-test')

}
