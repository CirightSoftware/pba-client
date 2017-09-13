module.exports = {
	production: {
		options: {
			archive: 'final/pba-client-dist.zip'
		},
		files: [
		  {src: ['dist/**'], dest: '/'}
		]
	}
};
