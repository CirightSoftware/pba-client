'use strict';
/** 
  * controller for registration Form example
*/
app.controller('registrationCtrl', ['$scope', 'ngNotify', 'flowFactory', '$rootScope', '$http', '$uibModal', '$filter', 'AuthService',
function ($scope, ngNotify, flowFactory, $rootScope, $http, $uibModal, $filter, AuthService) {
	$scope.notificationSuccess = 0;

	$http({
		method: 'GET',
		url: $rootScope.app.api + '/validateSubscription/'+$rootScope.app.subscriptionId + '/' + $rootScope.app.verticalId,
	}).then(function successCallback(response) {
		if(response.data == null || response.data == ""){
			$scope.submited = 1;
			$scope.notificationSuccess = 0;
            $scope.notificationMessage = 'Registration Link is Wrong! Please Conatct Administartor';
		}else{
			$scope.currentStep = 1;
			$scope.submited = 0;
			$scope.selectedStateName = '';
			$scope.selectedBillingStateName = '';
			$scope.selectedBusinessCategory = '';
			$scope.selectedCardMonth = '';
			$scope.selectedCardYear = '';

			$scope.removeImage = function () {
				$scope.noImage = true;
			};

			$scope.obj = new Flow();
			var uri;
			$scope.imageStrings = [];
				$scope.processFiles = function(files){
				angular.forEach(files, function(flowFile, i){
				   var fileReader = new FileReader();
					  fileReader.onload = function (event) {
						 uri = event.target.result;
						  $scope.imageStrings[i] = uri;  
					  };
					  fileReader.readAsDataURL(flowFile.file);
				});
			  };

			$scope.regFrom = {
				state: '-1',
				//bStateId: '-1',
				// disciplineStr: '-1',
				promotionalImage: 'https://placeholdit.imgix.net/~text?txtsize=30&bg=efefef&txtclr=aaaaaa%26text%3Dno%2Bimage&txt=no+image',
				chkOpentime1: 0,
				chkOpentime2: 0,
				chkOpentime3: 0,
				chkOpentime4: 0,
				chkOpentime5: 0,
				chkOpentime6: 0,
				chkOpentime7: 0,
			};

			$scope.disabled = true;
			$scope.disabledAll = function(){
				if($scope.isBilling == 0){
					$scope.disabled = true;
					$scope.regFrom.nameOnCard = null;
					$scope.regFrom.cardNo = null;
					$scope.regFrom.cardExpMonth=null;
					$scope.regFrom.cardExpYear=null;
					$scope.regFrom.bAddress1=null;
					$scope.regFrom.bAddress2=null;
				    $scope.regFrom.bStateId=null;
					$scope.regFrom.bCity=null;
					$scope.regFrom.bzipCode=null;
				}else{
					$scope.disabled = false;
				}
			}

			$scope.changed1 = function() {
				if($scope.regFrom.chkOpentime1 == 1){
					var d = new Date();
					d.setHours(0);
					d.setMinutes(0);
					$scope.regFrom.openTime1 = d;
					$scope.regFrom.closeTime1 = d;
				}
			}

			$scope.changed2 = function() {
				if($scope.regFrom.chkOpentime2 == 1){
					var d = new Date();
					d.setHours(0);
					d.setMinutes(0);
					$scope.regFrom.openTime2 = d;
					$scope.regFrom.closeTime2 = d;
				}
			}

			$scope.changed3 = function() {
				if($scope.regFrom.chkOpentime3 == 1){
					var d = new Date();
					d.setHours(0);
					d.setMinutes(0);
					$scope.regFrom.openTime3 = d;
					$scope.regFrom.closeTime3 = d;
				}
			}

			$scope.changed4 = function() {
				if($scope.regFrom.chkOpentime4 == 1){
					var d = new Date();
					d.setHours(0);
					d.setMinutes(0);
					$scope.regFrom.openTime4 = d;
					$scope.regFrom.closeTime4 = d;
				}
			}

			$scope.changed5 = function() {
				if($scope.regFrom.chkOpentime5 == 1){
					var d = new Date();
					d.setHours(0);
					d.setMinutes(0);
					$scope.regFrom.openTime5 = d;
					$scope.regFrom.closeTime5 = d;
				}
			}

			$scope.changed6 = function() {
				if($scope.regFrom.chkOpentime6 == 1){
					var d = new Date();
					d.setHours(0);
					d.setMinutes(0);
					$scope.regFrom.openTime6 = d;
					$scope.regFrom.closeTime6 = d;
				}
			}

			$scope.changed7 = function() {
				if($scope.regFrom.chkOpentime7 == 1){
					var d = new Date();
					d.setHours(0);
					d.setMinutes(0);
					$scope.regFrom.openTime7 = d;
					$scope.regFrom.closeTime7 = d;
				}
			}

			if ($scope.regFrom.promotionalImage == '') {
				$scope.noImage = true;
			} 

			// Initial Value
			$scope.form = {

				next: function (form) {

					$scope.toTheTop();

					if (form.$valid) {
						if($scope.currentStep == 3) {
							$scope.selectedStateName = $("#state option:selected").html();
							$scope.selectedBillingStateName = $("#bStateId option:selected").html();
							$scope.selectedBusinessCategory = $("#disciplineStr option:selected").html();
							$scope.selectedCardMonth = $("#cardExpMonth option:selected").html();
							$scope.selectedCardYear = $("#cardExpYear option:selected").html();
						}
						form.$setPristine();
						nextStep();
					} else {
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
						errorMessage();
					}
				},
				prev: function (form) {
					$scope.toTheTop();
					prevStep();
				},
				goTo: function (form, i) {
					if (parseInt($scope.currentStep) > parseInt(i)) {
						$scope.toTheTop();
						goToStep(i);

					} else {
						if (form.$valid) {
							$scope.toTheTop();
							goToStep(i);

						} else
							errorMessage();
					}
				},
				submit: function (form) {
					if (form.$valid) {
						var o1 = $scope.regFrom.openTime1 != null && $scope.regFrom.openTime1 != '' ? $filter('date')($scope.regFrom.openTime1, 'hh:mm a') : null;
						var c1 = $scope.regFrom.closeTime1 != null && $scope.regFrom.closeTime1 != '' ? $filter('date')($scope.regFrom.closeTime1, 'hh:mm a') : null;
						var o2 = $scope.regFrom.openTime2 != null && $scope.regFrom.openTime2 != '' ? $filter('date')($scope.regFrom.openTime2, 'hh:mm a') : null;
						var c2 = $scope.regFrom.closeTime2 != null && $scope.regFrom.closeTime2 != '' ? $filter('date')($scope.regFrom.closeTime2, 'hh:mm a') : null;
						var o3 = $scope.regFrom.openTime3 != null && $scope.regFrom.openTime3 != '' ? $filter('date')($scope.regFrom.openTime3, 'hh:mm a') : null;
						var c3 = $scope.regFrom.closeTime3 != null && $scope.regFrom.closeTime3 != '' ? $filter('date')($scope.regFrom.closeTime3, 'hh:mm a') : null;
						var o4 = $scope.regFrom.openTime4 != null && $scope.regFrom.openTime4 != '' ? $filter('date')($scope.regFrom.openTime4, 'hh:mm a') : null;
						var c4 = $scope.regFrom.closeTime4 != null && $scope.regFrom.closeTime4 != '' ? $filter('date')($scope.regFrom.closeTime4, 'hh:mm a') : null;
						var o5 = $scope.regFrom.openTime5 != null && $scope.regFrom.openTime5 != '' ? $filter('date')($scope.regFrom.openTime5, 'hh:mm a') : null;
						var c5 = $scope.regFrom.closeTime5 != null && $scope.regFrom.closeTime5 != '' ? $filter('date')($scope.regFrom.closeTime5, 'hh:mm a') : null;
						var o6 = $scope.regFrom.openTime6 != null && $scope.regFrom.openTime6 != '' ? $filter('date')($scope.regFrom.openTime6, 'hh:mm a') : null;
						var c6 = $scope.regFrom.closeTime6 != null && $scope.regFrom.closeTime6 != '' ? $filter('date')($scope.regFrom.closeTime6, 'hh:mm a') : null;
						var o7 = $scope.regFrom.openTime7 != null && $scope.regFrom.openTime7 != '' ? $filter('date')($scope.regFrom.openTime7, 'hh:mm a') : null;
						var c7 = $scope.regFrom.closeTime7 != null && $scope.regFrom.closeTime7 != '' ? $filter('date')($scope.regFrom.closeTime7, 'hh:mm a') : null;
						var dataStateObj = {
						    "password" : $scope.regFrom.password1,
							"subscriptionId": $rootScope.app.subscriptionId,
							"verticalId": $rootScope.app.verticalId,
							"manufacturer": $scope.regFrom.manufacturerName,
							"website": $scope.regFrom.website,
							"disciplineId": $scope.regFrom.disciplineStr,
							"contactModel" : {
								"firstName": $scope.regFrom.firstName,
								"lastName": $scope.regFrom.lastName,
								"phone": $scope.regFrom.phoneNumber,
								"email": $scope.regFrom.emailAddress,
							},
						    "addressModel" : {
						  	    	"address1": $scope.regFrom.address1,
									"address2": $scope.regFrom.address2,
									"countryId": '1',
									"stateId": $scope.regFrom.state,
						      		"city" : $scope.regFrom.city,
						      		"zip" : $scope.regFrom.zipCode
							},
							"officeModel" : {
								"companyLogo": uri,
								"sundayTime": o1 != null && c1 != null ? o1 + "," + c1 : '',
								"mondayTime": o2 != null && c2 != null ? o2 + "," + c2 : '',
								"tuesdayTime": o3 != null && c3 != null ? o3 + "," + c3 : '',
								"wednesdayTime": o4 != null && c4 != null ? o4 + "," + c4 : '',
								"thursdayTime": o5 != null && c5 != null ? o5 + "," + c5 : '',
								"fridayTime": o6 != null && c6 != null ? o6 + "," + c6 : '',
								"saturdayTime": o7 != null && c7 != null ? o7 + "," + c7 : ''
							},
							"cardDetailModel" : $scope.isBilling == 1 ? {
								"nameOnCard": $scope.regFrom.nameOnCard,
								"cardNo": $scope.regFrom.cardNo,
								"cardExpMonth": $scope.regFrom.cardExpMonth,
								"cardExpYear": $scope.regFrom.cardExpYear,
								"addressModel" : {
						  	    	"address1": $scope.regFrom.bAddress1,
									"address2": $scope.regFrom.bAddress2,
									"countryId": '1',
									"stateId": $scope.regFrom.bStateId,
						      		"city" : $scope.regFrom.bCity,
						      		"zip" : $scope.regFrom.bzipCode
								}
							} : null
						};

						$http({
							method: 'POST',
							url: $rootScope.app.api + '/manufacturerRegistration',
							data: JSON.stringify(dataStateObj)
						}).then(function successCallback(response) {
							$scope.toTheTop();
							$scope.submited = 1;
		                    if (response.status == '200') {
		                        $scope.notificationSuccess = 1;
								$scope.notificationMessage = "Manufacturer Registered Suceessfully";
		                    } else {
		                        $scope.notificationSuccess = 0;
								$scope.notificationMessage = response.data.error;
		                    }
		                }, function errorCallback(response) {
		                	$scope.submited = 1;
	                        $scope.notificationSuccess = 0;
							$scope.notificationMessage = response.data.error;
	                    });
					}
				},
				reset: function () {
				}
			};

			var nextStep = function () {
				$scope.currentStep++;
			};
			var prevStep = function () {
				$scope.currentStep--;
			};
			var goToStep = function (i) {
				$scope.currentStep = i;
			};
			var errorMessage = function (i) {

				ngNotify.set('please complete the form in this step before proceeding', {
					theme: 'pure',
					position: 'top',
					type: 'error',
					button: 'true',
					sticky: 'false',
				});
			}; 

			$http({
				method: 'GET',
				url: $rootScope.app.api + '/getStateList/1'
			}).then(function successCallback(stateList) {
				$scope.stateData = stateList.data;
			});
			
			$http({
				method: 'GET',
				url: $rootScope.app.api + '/getManufacturerDisciplines/'+$rootScope.app.subscriptionId + '/' + $rootScope.app.verticalId,
			}).then(function successCallback(disciplineList) {
				$scope.disciplineData = disciplineList.data;
			});

			$scope.handlePatternBillingState = (function() {
			  var regex = /^[0-9]{1,7}$/;
			  return {
			    test: function(value) {
			      if ($scope.currentStep == 3) {
			        return true;
			      } else {
			        return regex.test(value);
			      }
			    }
			  };
			})();

			$scope.handlePatternBusinessCategory = (function() {
			  var regex = /^[0-9]{1,7}$/;
			  return {
			    test: function(value) {
			      if ($scope.currentStep == 2) {
			        return true;
			      } else {
			        return regex.test(value);
			      }
			    }
			  };
			})();
			$scope.goToLogIn = function(){
				window.location = '#/login/login';
			};
		}
	});

	
}]);
