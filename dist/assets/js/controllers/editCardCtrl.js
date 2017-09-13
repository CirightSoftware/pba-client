'use strict';
app.controller('editCardCtrl', ["$scope", "$http", "$rootScope", "flowFactory", "toaster", "$stateParams",
	function ($scope, $http, $rootScope, flowFactory, toaster, $stateParams) {

	var dataStateObj = {
			"productId": $stateParams.promotionId
		};

	$http({
		method: 'POST',
		url: $rootScope.app.api + '/Spectrum/getPromotionEditData.htm',
		data: JSON.stringify(dataStateObj)
	}).success(function(editCardData) {
		$scope.editCardFrom.promotionalText = editCardData[0].scopeDescription;
		$scope.editCardFrom.promotionalHeadline = editCardData[0].promoName;
		$scope.editCardFrom.disclaimer = editCardData[0].contentDisclaimer;
		if( editCardData[0].isImage != '' &&  editCardData[0].isImage == 1) {
			$scope.promotionalImage = "https://www.myciright.com/Ciright/ajaxCall-photo.htm?flag=manuContentImage&compress=0&id="+$stateParams.promotionId;
		} else {
			$scope.promotionalImage = "https://placeholdit.imgix.net/~text?txtsize=30&bg=efefef&txtclr=aaaaaa%26text%3Dno%2Bimage&txt=no+image";
		}
   });

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

	if ($scope.promotionalImage == '') {
		$scope.noImage = true;
	}

	$scope.manufacturerImage = 'https://www.myciright.com/Ciright/ajaxCall-photo.htm?flag=manufactLogo&compress=0&id=' + $rootScope.currentUser.manufacturerId;

    $scope.editCardFrom = {
    	submit: function (form) {
    		var firstError = null;
	    	if (form.$invalid) {
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
					"username": $rootScope.app.username,
					"password": $rootScope.app.password,
					"subscriptionId": $rootScope.app.subscriptionId,
					"verticalId": $rootScope.app.verticalId,
					"productId" : $stateParams.promotionId,
	                "manufacturerId": $rootScope.currentUser.manufacturerId,
	                "productName": $scope.editCardFrom.promotionalHeadline,
	                "productDescription": $scope.editCardFrom.promotionalText,
	                "productContentImage": uri,
	                "productContentDescription": $scope.editCardFrom.disclaimer,
	                "productContentTitle": $scope.editCardFrom.promotionalHeadline,
					"employeeId": $rootScope.currentUser.employeeId,
					"createdBy": $rootScope.currentUser.employeeId,
					"campaignTypeId" : '657',
					"campaignTerritoyId" :'17628',
					"campaignPhaseId" :'60219',
					"campaignIndustyId":'30168',
					"leadId" :'29919'
				};

				$http({
						method: 'POST',
						url: $rootScope.app.api + '/Spectrum/saveProductContentUpdatedData.htm',
						data: JSON.stringify(dataStateObj)
					}).success(function(registResp) {
						if(registResp.success == '1') {
							toaster.pop("success", "", "Promotion Updated Successfully.");
	         				window.location = '#/app/promotions';
						}
				});
			}
    	}
	}
}]);
app.directive('wmBlock', function ($parse) {
    return {
        scope: {
          wmBlockLength: '='
        },
        link: function (scope, elm, attrs) {
         
          elm.bind('keypress', function(e){
           
            if(elm[0].value.length > scope.wmBlockLength){
              e.preventDefault();
              return false;
            }
          });
        }
    }   
});