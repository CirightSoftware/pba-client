module.exports = {
    production: {
        files: [
            {expand: true, src: "**", cwd: 'bower_components/bootstrap/fonts', dest: "dist/assets/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/font-awesome/fonts', dest: "dist/assets/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/themify-icons/fonts', dest: "dist/assets/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/slick-carousel/slick/fonts', dest: "dist/assets/css/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/flag-icon-css/flags', dest: "dist/assets/flags"},
            {expand: true, src: "**", cwd: 'templates',     dest: "dist/templates"},
            {expand: true, src: "**", cwd: 'assets/api',     dest: "dist/assets/api"},
            {expand: true, src: "**", cwd: 'assets/i18n',    dest: "dist/assets/i18n"},
            {expand: true, src: "**", cwd: 'assets/images',     dest: "dist/assets/images"},
            {expand: true, src: "**", cwd: 'assets/js/config',      dest: "dist/assets/js/config"},
            {expand: true, src: "**", cwd: 'assets/js/directives',      dest: "dist/assets/js/directives"},
            {expand: true, src: "**", cwd: 'assets/js/controllers',      dest: "dist/assets/js/controllers"},
            {expand: true, src: "**", cwd: 'assets/js/filters',      dest: "dist/assets/js/filters"},
            {expand: true, src: "**", cwd: 'assets/views',     dest: "dist/assets/views"},
            {expand: true, src: "**", cwd: 'assets/css/themes',     dest: "dist/assets/css/themes"},
            {src: 'bower_components/slick-carousel/slick/ajax-loader.gif', dest : 'dist/assets/css/ajax-loader.gif'},
            {src: 'master/_index.min.html', dest : 'dist/index.html'},
            {src: 'favicon.ico', dest : 'dist/favicon.ico'}
        ]
    }
};
