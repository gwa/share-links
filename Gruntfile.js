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
			require: {
				options: {
					vendor: [
						// 'bower_components/requirejs/require.js'
					],
					specs: [
						'tests/ShareLinks.test.js'
					],
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						requireConfig: {
							baseUrl: './',
							paths: {
								'jquery' : 'bower_components/jquery/dist/jquery',
								'Gwa.ShareLinks' : 'src/ShareLinks'
							}
						}
					}
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
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask(
		'default',
		[
			'jshint:src',
			'jasmine',
			'copy',
			'uglify'
		]
	);

};
