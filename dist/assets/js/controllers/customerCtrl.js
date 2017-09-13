'use strict';
/** 
  * controller for registration Form example
*/
app.controller('customerCtrl', ['$scope', 'ngNotify', 'flowFactory', '$rootScope', '$http', '$uibModal', '$filter', 'AuthService', 'toaster',
function ($scope, ngNotify, flowFactory, $rootScope, $http, $uibModal, $filter, AuthService, toaster) {
	$scope.notificationSuccess = 0;

	$http({
		method: 'GET',
		url: $rootScope.app.api + '/validateSubscription/'+$rootScope.app.subscriptionId + '/' + $rootScope.app.verticalId,
	}).then(function successCallback(response) {
		if(response.data == null || response.data == ""){
			$scope.submited = 1;
			$scope.notificationSuccess = 0;
            $scope.notificationMessage = 'Customer Link is Wrong! Please Conatct Administartor';
		}else{
			$scope.submited = 0;
			$scope.myModel = {
				state: '-1'
			};
			
			// Initial Value
			$scope.submit = function (form) {
				$scope.toTheTop();
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
					var dataStateObj = {
					    "password" : $scope.myModel.password,
						"subscriptionId": $rootScope.app.subscriptionId,
						"verticalId": $rootScope.app.verticalId,
						"website": $scope.myModel.website,
						"customerName": $scope.myModel.companyName,
						"contactModel" : {
							"firstName": $scope.myModel.firstName,
							"lastName": $scope.myModel.lastName,
							"phone": $scope.myModel.phoneNumber,
							"email": $scope.myModel.email,
						},
					    "addressModel" : {
					  	    	"address1": $scope.myModel.address1,
								"address2": $scope.myModel.address2,
								"countryId": '1',
								"stateId": $scope.myModel.state,
					      		"city" : $scope.myModel.city,
					      		"zip" : $scope.myModel.zipCode
						}
					};

					$http({
						method: 'POST',
						url: $rootScope.app.api + '/registerCustomer',
						data: JSON.stringify(dataStateObj)
					}).then(function successCallback(response) {
						$scope.toTheTop();
						$scope.submited = 1;
	                    if (response.status == '200') {
	                    	$scope.notificationSuccess = 1;
							$scope.notificationMessage = "Customer Registered Suceessfully";
	                    } else {
	                        $scope.submited = 1;
	                        $scope.notificationSuccess = 0;
							$scope.notificationMessage = response.data.error;
	                    }
	                }, function errorCallback(response) {
	                	$scope.submited = 1;
                        $scope.notificationSuccess = 0;
						$scope.notificationMessage = response.data.error;
                    });
				}
			};

			$scope.reset = function(form){
				form.$setPristine(false);
			};

			$http({
				method: 'GET',
				url: $rootScope.app.api + '/getStateList/1'
			}).then(function successCallback(stateList) {
				$scope.stateData = stateList.data;
			});			
		}
	});
}]);
