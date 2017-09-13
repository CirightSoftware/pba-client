module.exports = {
	production: {
		files: {
			'dist/assets/js/app.min.js': 'dist/assets/js/app.src.js'
		},
		options: {
			mangle: false
		},
	}
};
