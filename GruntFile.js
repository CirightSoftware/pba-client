module.exports = function(grunt) {
	var gtx = require('gruntfile-gtx').wrap(grunt);

    gtx.loadAuto();

    var gruntConfig = require('./grunt');
    gruntConfig.package = require('./package.json');

    gtx.config(gruntConfig);

    // We need our bower components in order to develop
	gtx.alias('build:dist', ['compass:production', 'clean:production', 'copy:production', 'string-replace:production', 'concat:production', 'cssmin:production', 'uglify:production']);
	gtx.alias('build:production', ['compass:production', 'clean:production', 'copy:production', 'string-replace:production', 'concat:production', 'cssmin:production', 'uglify:production', 'compress:production']);

    gtx.finalise();
};
