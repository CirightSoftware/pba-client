'use strict';
app.controller('loginCtrl', ["$scope", "$state", "$rootScope", "$window", "AUTH_EVENTS", "AuthService", function ($scope, $state, $rootScope, $window, AUTH_EVENTS, AuthService) {

	$scope.credentials = {};
	$scope.loginForm = {};
	$scope.error = false;

	//when the form is submitted
	$scope.submit = function(form) {
		$scope.submitted = true;
		var firstError = null;
		if (form.$invalid) {
			$scope.error = true;
			var field = null, firstError = null;
			for (field in form) {
				if (field[0] != '$') {
					if (firstError === null && !form[field].$valid) {
						firstError = form[field].$name;
					}

					if (form[field].$pristine) {
						form[field].$dirty = true;
					}
				}
			}

			angular.element('.ng-invalid[name=' + firstError + ']').focus();
			return;
		} else {
			$scope.login($scope.credentials);
		}
	};

	$scope.login = function(credentials, url) {
		$scope.error = false;
		credentials.subscriptionId = $rootScope.app.subscriptionId;
		credentials.verticalId = $rootScope.app.verticalId;
		AuthService.login(credentials, function(user) {
			if(user != null){
				$state.go('app.coupon');
			}else{
            	$state.go('error.500');
			}
        }, function(err) {
            $scope.error = true;
            $state.go('error.500');
        });
	};

	if ($window.sessionStorage["userInfo"]) {
		var credentials = JSON.parse($window.sessionStorage["userInfo"]);
		$scope.login(credentials, $window.location.hash);
	}
}]);
