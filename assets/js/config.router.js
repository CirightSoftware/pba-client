'use strict';

/**
 * Config for the router
 */
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES', 'USER_ROLES',
function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires, USER_ROLES) {

    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;

    // LAZY MODULES

    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: jsRequires.modules
    });

    // APPLICATION ROUTES
    // -----------------------------------
    // For any unmatched url, redirect to /login/signin
    $urlRouterProvider.otherwise("/login/signin");
    //
    // Set up the states
    $stateProvider.state('app', {
        url: "/app",
        templateUrl: "assets/views/app.html",
        resolve: loadSequence('chartjs', 'chart.js'),
        abstract: true,
        data: {}
    }).state('app.dashboard', {
        url: "/dashboard",
        templateUrl: "assets/views/dashboard.html",
        resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
        title: 'Dashboard',
        ncyBreadcrumb: {
            label: 'Dashboard'
        },
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    }).state('app.productAnalytics', {
        url: "/productAnalytics",
        templateUrl: "assets/views/productAnalytics.html",
        resolve: loadSequence('d3', 'countTo', 'productAnalyticsCtrl'),
        title: 'Dashboard',
        ncyBreadcrumb: {
            label: 'Dashboard'
        },
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    }).state('app.promotions', {
        url: "/promotions",
        templateUrl: "assets/views/promotions.html",
        resolve: loadSequence('ngTable', 'promotionCtrl'),
        title: 'Promotions',
        ncyBreadcrumb: {
            label: 'Promotions'
        },
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    }).state('app.createNew', {
        url: "/createNew",
        templateUrl: "assets/views/createNew.html",
        resolve: loadSequence('createNewCtrl', 'flow', 'ckeditor-plugin', 'ckeditor', 'touchspin-plugin'),
        title: 'Create New',
        ncyBreadcrumb: {
            label: 'Create New'
        },
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    }).state('app.editCard', {
        url: "/editCard/:promotionId",
        templateUrl: "assets/views/editCard.html",
        resolve: loadSequence('editCardCtrl', 'flow', 'ckeditor-plugin', 'ckeditor', 'touchspin-plugin'),
        title: 'Create New',
        ncyBreadcrumb: {
            label: 'Create New'
        },
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    }).state('app.cloneCard', {
        url: "/cloneCard/:promotionId",
        templateUrl: "assets/views/cloneCard.html",
        resolve: loadSequence('cloneCardCtrl', 'flow', 'ckeditor-plugin', 'ckeditor', 'touchspin-plugin'),
        title: 'Clone Card',
        ncyBreadcrumb: {
            label: 'Clone Card'
        },
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    }).state('app.pages', {
        url: '/pages',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Pages',
        ncyBreadcrumb: {
            label: 'Pages'
        },
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    }).state('app.offerDetails', {
        url: "/offerDetails/:productId/:productName",
        templateUrl: "assets/views/offerDetails.html",
        resolve: loadSequence('d3', 'ui.knob', 'offerDetailsCtrl'),
        title: 'Offer Details',
        ncyBreadcrumb: {
            label: 'Offer Details'
        },
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    }).state('app.user', {
        url: '/user',
        templateUrl: "assets/views/pages_user_profile.html",
        title: 'User Profile',
        ncyBreadcrumb: {
            label: 'User Profile'
        },
        resolve: loadSequence('userCtrl' ,'flow', 'ui.mask'),
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    }).state('error', {
        url: '/error',
        template: '<div ui-view class="fade-in-up"></div>',
        data: {}
    }).state('error.404', {
        url: '/404',
        templateUrl: "assets/views/utility_404.html",
        data: {}
    }).state('error.500', {
        url: '/500',
        templateUrl: "assets/views/utility_500.html",
        data: {}
    })

	// Login routes

	.state('login', {
	    url: '/login',
	    template: '<div ui-view class="fade-in-right-big smooth"></div>',
	    abstract: true,
        data: {}
	}).state('login.signin', {
	    url: '/signin',
	    templateUrl: "assets/views/login_login.html",
        resolve: loadSequence('loginCtrl'),        
        data: {}
	}).state('login.forgot', {
	    url: '/forgot',
	    templateUrl: "assets/views/login_forgot.html",
        data: {}
	}).state('login.registration', {
	    url: '/merchantregistration',
	    templateUrl: "assets/views/login_registration.html",
        resolve: loadSequence('registrationCtrl', 'ngNotify', 'flow', 'ui.mask', 'touchspin-plugin'),
        data: {}
	}).state('login.customer', {
        url: '/merchantcustomer',
        templateUrl: "assets/views/login_customer.html",
        resolve: loadSequence('customerCtrl', 'ngNotify', 'flow', 'ui.mask', 'touchspin-plugin'),
        data: {}
    })

	// Landing Page route
	.state('landing', {
	    url: '/landing-page',
	    template: '<div ui-view class="fade-in-right-big smooth"></div>',
	    abstract: true,
	    resolve: loadSequence('jquery-appear-plugin', 'ngAppear', 'countTo'),
        data: {}
	}).state('landing.welcome', {
	    url: '/welcome',
	    templateUrl: "assets/views/landing_page.html",
        data: {}
	}).state('landing.recommendation', {
        url: '/recommendation',
        templateUrl: "assets/views/recommendation.html",
        data: {}
    }).state('landing.support', {
        url: '/support',
        templateUrl: "assets/views/support.html",
        data: {}
    });
    // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
    function loadSequence() {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q',
			function ($ocLL, $q) {
			    var promise = $q.when(1);
			    for (var i = 0, len = _args.length; i < len; i++) {
			        promise = promiseThen(_args[i]);
			    }
			    return promise;

			    function promiseThen(_arg) {
			        if (typeof _arg == 'function')
			            return promise.then(_arg);
			        else
			            return promise.then(function () {
			                var nowLoad = requiredData(_arg);
			                if (!nowLoad)
			                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
			                return $ocLL.load(nowLoad);
			            });
			    }

			    function requiredData(name) {
			        if (jsRequires.modules)
			            for (var m in jsRequires.modules)
			                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
			                    return jsRequires.modules[m];
			        return jsRequires.scripts && jsRequires.scripts[name];
			    }
			}]
        };
    }
}]);