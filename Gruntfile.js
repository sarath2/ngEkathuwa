'use strict';

module.exports = function(grunt) {

  // Configurable paths
  var yoConfig = {
    livereload: 35729,
    src: 'src',
    dist: 'dist'
  };

  // Livereload setup
  var lrSnippet = require('connect-livereload')({port: yoConfig.livereload});
  var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
  };

  // Load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    yo: yoConfig,
    meta: {
      banner: '/**\n' +
      ' * <%= pkg.name %>\n' +
      ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
      ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
      ' */\n'
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yo.dist %>/*',
            '!<%= yo.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      app: {
        files: [
          '{.tmp,<%= yo.src %>}/{,*/}*.js'
        ],
        options: {
          livereload: yoConfig.livereload
        }
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0' // Change this to '0.0.0.0' to access the server from outside.
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yoConfig.src)
            ];
          }
        }
      }
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['<%= yo.src %>/{,*/}*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    karma: {
      options: {
        configFile: 'test/karma.conf.js',
        browsers: ['PhantomJS']
      },
      unit: {
        singleRun: true
      },
      server: {
        autoWatch: true
      }
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      banner: {
        files: {
          '<%= Object.keys(ngmin.dist.files)[0] %>': '<%= Object.keys(ngmin.dist.files)[0] %>'
        }
      },
      dist: {
        options: {
          // Replace all 'use strict' statements in the code with a single one at the top
          banner: '(function(window, document, undefined) {\n\'use strict\';\n',
          footer: '\n})(window, document);\n',
          process: function(src, filepath) {
            return '// Source: ' + filepath + '\n' +
              src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
          }
        },
        files: {
          '<%= yo.dist %>/<%= pkg.name %>.js': [
            '<%= yo.src %>/scripts/module.js',
            '<%= yo.src %>/scripts/{,*/}*.js'
          ]
        }
      }
    },
    ngmin: {
      options: {
        banner: '<%= meta.banner %>',
        expand: true
      },
      dist: {
        files: {
          '<%= yo.dist %>/<%= pkg.name %>.js': ['<%= yo.dist %>/<%= pkg.name %>.js']
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: {
          '<%= yo.dist %>/<%= pkg.name %>.min.js': ['<%= Object.keys(ngmin.dist.files)[0] %>']
        }
      }
    }
  });

  grunt.registerTask('test', [
    'jshint',
    'karma:unit'
  ]);

  grunt.registerTask('dist', [
    'clean:dist',
    'concat:dist',
    'ngmin:dist',
    'uglify:dist',
    'concat:banner'
  ]);

  grunt.registerTask('release', [
    'test',
    'bump-only',
    'dist',
    'bump-commit'
  ]);

  grunt.registerTask('build', ['dist']);
  grunt.registerTask('default', ['dist']);

};
