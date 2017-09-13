module.exports = {
    production: {
        files: [
            {expand: true, src: "**", cwd: 'bower_components/bootstrap/fonts', dest: "build/assets/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/font-awesome/fonts', dest: "build/assets/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/themify-icons/fonts', dest: "build/assets/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/slick-carousel/slick/fonts', dest: "build/assets/css/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/flag-icon-css/flags', dest: "build/assets/flags"},
            {expand: true, src: "**", cwd: 'templates',     dest: "build/templates"},
            {expand: true, src: "**", cwd: 'assets/api',     dest: "build/assets/api"},
            {expand: true, src: "**", cwd: 'assets/i18n',    dest: "build/assets/i18n"},
            {expand: true, src: "**", cwd: 'assets/images',     dest: "build/assets/images"},
            {expand: true, src: "**", cwd: 'assets/js/config',      dest: "build/assets/js/config"},
            {expand: true, src: "**", cwd: 'assets/js/directives',      dest: "build/assets/js/directives"},
            {expand: true, src: "**", cwd: 'assets/js/controllers',      dest: "build/assets/js/controllers"},
            {expand: true, src: "**", cwd: 'assets/js/filters',      dest: "build/assets/js/filters"},
            {expand: true, src: "**", cwd: 'assets/views',     dest: "build/assets/views"},
            {expand: true, src: "**", cwd: 'assets/css/themes',     dest: "build/assets/css/themes"},
            {src: 'bower_components/slick-carousel/slick/ajax-loader.gif', dest : 'build/assets/css/ajax-loader.gif'},
            {src: 'master/_index.min.html', dest : 'build/index.html'},
            {src: 'favicon.ico', dest : 'build/favicon.ico'}
        ]
    }
};
