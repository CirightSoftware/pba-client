module.exports = {
	production: {
		files: {
			'build/assets/js/app.min.js': 'build/assets/js/app.src.js'
		},
		options: {
			mangle: false
		},
	}
};
