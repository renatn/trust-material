var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;


module.exports = function(grunt) {

  var loadTasks = require('load-grunt-tasks'),
      loadConfs = require('load-grunt-configs');

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({

      connect: {
        server: {
          options: {
            port: 9001,
            base: 'src',
            middleware : function(connect) {
                return [
                  proxySnippet,
                  connect().use('/node_modules', connect.static('./node_modules')),
                  connect.static('dist'),
                  connect.static('src'),
                ];
            }
          },
          proxies: [
            {
              context: ['/api/v1'],
              host: 'online.trust.ru',
              port: 443,
              https: true,
              changeOrigin: false
            }
          ]
        }
      },

      browserify: {
        options: {
            debug: false,
            transform: [
                ['babelify']
            ]
        },
        app: {
            src: ['src/**/*.jsx'],
            dest: 'dist/js/app.built.js'
        }
      },

      watch: {
        react: {
            files: ['src/**/*.jsx'],
            tasks: ['browserify'],
            options: {
                spawn: true
            }
        }
      }

    });

    grunt.registerTask('server', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'configureProxies:server', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'configureProxies:server',
            'connect:server',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'browserify'
    ]);


};