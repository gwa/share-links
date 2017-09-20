module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// tasks

		jshint: {
			options: {
				jshintrc: 'bower_components/gwa-codestyle/rc/.jshintrc'
			},
			src: [
				'src/ShareLinks.js'
			]
		},

		jasmine: {
			default: {
				src: 'src/ShareLinks.js',
				options: {
					vendor: [
						'bower_components/jquery/dist/jquery.js'
					],
					specs: [
						'tests/ShareLinks.test.js'
					]
				}
			}
		},

		copy: {
			main: {
				files: [
					{src:'src/ShareLinks.js', dest:'dist/ShareLinks.js'}
				]
			}
		},

		uglify: {
			main: {
				files: {
					'dist/ShareLinks.min.js': ['src/ShareLinks.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask(
		'default',
		[
			'test',
			'copy',
			'uglify'
		]
	);
	grunt.registerTask(
		'test',
		[
			'jshint:src',
			'jasmine'
		]
	);

};
