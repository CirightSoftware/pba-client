module.exports = {
	production: {
		files: {
			'master/_config.constant.js': 'assets/js/config.constant.js'

		},
		options: {
			replacements: [{
				pattern: /\.\.\/\.\.\//g,
        		replacement: '../'
			}]
		}
	}
};

