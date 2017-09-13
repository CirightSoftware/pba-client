module.exports = {
	production: {
		options: {
			archive: 'dist/pba-client-dist.zip'
		},
		files: [
		  {src: ['build/**'], dest: '/'},
		  {src: ['bower_components/**'], dest: '/'},
		]
	}
};
