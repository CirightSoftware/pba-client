module.exports = {
	production: {
		files: {
			'spectrum/assets/js/app.min.js': 'spectrum/assets/js/app.src.js'
		},
		options: {
			mangle: false
		},
	}
};
