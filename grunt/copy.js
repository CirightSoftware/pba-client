module.exports = {
    production: {
        files: [
            {expand: true, src: "**", cwd: 'bower_components/bootstrap/fonts', dest: "spectrum/assets/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/font-awesome/fonts', dest: "spectrum/assets/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/themify-icons/fonts', dest: "spectrum/assets/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/slick-carousel/slick/fonts', dest: "spectrum/assets/css/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/flag-icon-css/flags', dest: "spectrum/assets/flags"},
            {expand: true, src: "**", cwd: 'templates',     dest: "spectrum/templates"},
            {expand: true, src: "**", cwd: 'assets/api',     dest: "spectrum/assets/api"},
            {expand: true, src: "**", cwd: 'assets/i18n',    dest: "spectrum/assets/i18n"},
            {expand: true, src: "**", cwd: 'assets/images',     dest: "spectrum/assets/images"},
            {expand: true, src: "**", cwd: 'assets/js/config',      dest: "spectrum/assets/js/config"},
            {expand: true, src: "**", cwd: 'assets/js/directives',      dest: "spectrum/assets/js/directives"},
            {expand: true, src: "**", cwd: 'assets/js/controllers',      dest: "spectrum/assets/js/controllers"},
            {expand: true, src: "**", cwd: 'assets/js/filters',      dest: "spectrum/assets/js/filters"},
            {expand: true, src: "**", cwd: 'assets/views',     dest: "spectrum/assets/views"},
            {expand: true, src: "**", cwd: 'assets/css/themes',     dest: "spectrum/assets/css/themes"},
            {src: 'bower_components/slick-carousel/slick/ajax-loader.gif', dest : 'spectrum/assets/css/ajax-loader.gif'},
            {src: 'master/_index.min.html', dest : 'spectrum/index.html'},
            {src: 'favicon.ico', dest : 'spectrum/favicon.ico'}
        ]
    }
};
