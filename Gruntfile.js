module.exports = function(grunt) {

  grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),

	clean: ["dist", '.tmp', "public/src/js/annotated"],
	
    // JS TASKS ================================================================
    // check all js files for errors
    jshint: {
      all: ['public/src/js/**/*.js'] 
    },
	
	// concat and annotate the js file directories. 
	ngAnnotate: {
        build: {
            files: {
				'public/dist/js/annotated/app-annotated.js': ['public/src/js/app.js','public/src/js/**/*.js']
			}
		}
	},
		
    // take all the annotated js files and minify them into app.min.js
    uglify: {
      build: {
		options: {
			beautify: true,
			mangle: false
		},
		files: {
			'public/dist/js/app.min.js': 'public/dist/js/annotated/app-annotated.js'
		}
      }
    },

    // CSS TASKS ===============================================================
    // process the less file to style.css
    less: {
      build: {
        files: {
          'public/dist/css/style.css': 'public/src/css/style.less'
        }
      }
    },

    // take the processed style.css file and minify
    cssmin: {
      build: {
        files: {
          'public/dist/css/style.min.css': 'public/dist/css/style.css'
        }
      }
    },

	
	copy: {
	  build: {
		files: [
		  { cwd: 'public/src/css/fonts/', src:"*", dest:"public/dist/css/fonts/", expand: true, flatten: true, filter: 'isFile'}
		]
	  }
	},
	
    // COOL TASKS ==============================================================
    // watch css and js files and process the above tasks
    watch: {
      css: {
        files: ['public/src/css/**/*.less'],
        tasks: ['less', 'cssmin']
      },
      js: {
        files: ['public/src/js/**/*.js'],
        tasks: ['jshint', 'ngAnnotate','uglify']
      }
    },

    // watch our node server for changes
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }   

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  
  grunt.registerTask('default', ['less', 'cssmin', 'copy', 'jshint', 'ngAnnotate', 'uglify', 'concurrent']);

};