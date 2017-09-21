'use strict';

/**
 * Config constant
 */
app.constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});
app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});
app.constant('USER_ROLES', {
    all: '*',
    admin: 'admin'
});
app.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Javascript Plugins
        'd3': '../../bower_components/d3/d3.min.js',

        //*** jQuery Plugins
        'chartjs': '../../bower_components/chartjs/dist/Chart.min.js',
        'ckeditor-plugin': '../../bower_components/ckeditor/ckeditor.js',
        'jquery-nestable-plugin': ['../../bower_components/jquery-nestable/jquery.nestable.js'],
        'touchspin-plugin': ['../../bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', '../../bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
        'jquery-appear-plugin': ['../../bower_components/jquery-appear/build/jquery.appear.min.js'],
        'spectrum-plugin': ['../../bower_components/spectrum/spectrum.js', '../../bower_components/spectrum/spectrum.css'],
		'jcrop-plugin': ['../../bower_components/Jcrop/js/Jcrop.min.js', '../../bower_components/Jcrop/css/Jcrop.min.css'],
		
		
        //*** Controllers
        'dashboardCtrl': 'assets/js/controllers/dashboardCtrl.js',
        'chartsCtrl': 'assets/js/controllers/chartsCtrl.js',
        'userCtrl': 'assets/js/controllers/userCtrl.js',
        'registrationCtrl': 'assets/js/controllers/registrationCtrl.js',
        'loginCtrl': 'assets/js/controllers/loginCtrl.js',
        'promotionCtrl': 'assets/js/controllers/promotionCtrl.js',
        'createNewCtrl': 'assets/js/controllers/createNewCtrl.js',
        'editCardCtrl': 'assets/js/controllers/editCardCtrl.js',
        'productAnalyticsCtrl': 'assets/js/controllers/productAnalyticsCtrl.js',
        'offerDetailsCtrl': 'assets/js/controllers/offerDetailsCtrl.js',
        'cloneCardCtrl': 'assets/js/controllers/cloneCardCtrl.js',
        'customerCtrl': 'assets/js/controllers/customerCtrl.js'
    },
    //*** angularJS Modules
    modules: [{
        name: 'toaster',
        files: ['../../bower_components/AngularJS-Toaster/toaster.js', '../../bower_components/AngularJS-Toaster/toaster.css']
    }, {
        name: 'angularBootstrapNavTree',
        files: ['../../bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js', '../../bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css']
    }, {
        name: 'ngTable',
        files: ['../../bower_components/ng-table-bundle/ng-table.min..js', '../../bower_components/ng-table-bundle/ng-table.min..css']
    }, {
        name: 'ui.mask',
        files: ['../../bower_components/angular-ui-mask/dist/mask.min.js']
    }, {
        name: 'ngImgCrop',
        files: ['../../bower_components/ngImgCrop/compile/minified/ng-img-crop.js', '../../bower_components/ngImgCrop/compile/minified/ng-img-crop.css']
    }, {
        name: 'angularFileUpload',
        files: ['../../bower_components/angular-file-upload/dist/angular-file-upload.min.js']
    }, {
        name: 'monospaced.elastic',
        files: ['../../bower_components/angular-elastic/elastic.js']
    }, {
        name: 'ngMap',
        files: ['../../bower_components/ngmap/build/scripts/ng-map.min.js']
    }, {
        name: 'chart.js',
        files: ['../..//bower_components/angular-chart.js/dist/Chart.min.js']
    }, {
        name: 'flow',
        files: ['../../bower_components/ng-flow/dist/ng-flow-standalone.min.js']
    }, {
        name: 'ckeditor',
        files: ['../../bower_components/angular-ckeditor/angular-ckeditor.min.js']
    }, {
        name: 'mwl.calendar',
        files: ['../../bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js', '../../bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css', 'assets/js/config/config-calendar.js']
    }, {
        name: 'ng-nestable',
        files: ['../../bower_components/ng-nestable/src/angular-nestable.js']
    }, {
        name: 'ngNotify',
        files: ['../../bower_components/ng-notify/dist/ng-notify.min.js', '../../bower_components/ng-notify/dist/ng-notify.min.css']
    }, {
        name: 'xeditable',
        files: ['../../bower_components/angular-xeditable/dist/js/xeditable.min.js', '../../bower_components/angular-xeditable/dist/css/xeditable.css', 'assets/js/config/config-xeditable.js']
    }, {
        name: 'checklist-model',
        files: ['../../bower_components/checklist-model/checklist-model.js']
    }, {
        name: 'ui.knob',
        files: ['../../bower_components/ng-knob/dist/ng-knob.min.js']
    }, {
        name: 'ngAppear',
        files: ['../../bower_components/angular-appear/build/angular-appear.min.js']
    }, {
        name: 'countTo',
        files: ['../../bower_components/angular-count-to-0.1.1/dist/angular-filter-count-to.min.js']
    }, {
        name: 'angularSpectrumColorpicker',
        files: ['../../bower_components/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker.min.js']
    }]
});