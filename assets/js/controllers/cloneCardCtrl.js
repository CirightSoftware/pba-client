'use strict';
app.controller('cloneCardCtrl', ["$scope", "$http", "$rootScope", "flowFactory", "toaster", "$stateParams",
	function ($scope, $http, $rootScope, flowFactory, toaster, $stateParams) {

	$scope.cloneForm = {};
	$scope.startDateParam = '';
	$scope.endDateParam = '';

	$scope.manufacturerImage = 'https://www.myciright.com/Ciright/ajaxCall-photo.htm?flag=manufactLogo&compress=0&id=' + $rootScope.currentUser.manufacturerId;

	// Editor options.
    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
    };

    // Called when the editor is completely ready.
    $scope.onReady = function () {
        // ...
    };

	$scope.startDateParam = moment().format('MM/DD/YYYY h:mm A');
	$scope.endDateParam = moment().add(7, 'days').format('MM/DD/YYYY h:mm A');
	//$scope.startEndDate = $scope.startDateParam + " - " + $scope.endDateParam;

	$('input[name="startEndDate"]').daterangepicker({
        timePicker: true,
        timePickerIncrement: 1,
        locale: {
            format: 'MM/DD/YYYY h:mm A'
        }, 
        dateLimit: {
        	days: 7
    	},
        startDate: moment(),
        endDate: moment().add(7, 'days'),
        minDate: moment().format('MM/DD/YYYY h:mm A')
    });

    $('input[name="startEndDate"]').on('apply.daterangepicker', function(ev, picker) {
		$scope.startDateParam = picker.startDate.format('MM/DD/YYYY h:mm A');
		$scope.endDateParam = picker.endDate.format('MM/DD/YYYY h:mm A');
		var startEndDate = $scope.startDateParam + " - " + $scope.endDateParam;
		$("#startEndDate").val(startEndDate);
		$scope.startEndDate = $scope.startDateParam + " - " + $scope.endDateParam;	
	});	
		
	$scope.getTags = function(val) {
		return $http.get($rootScope.app.api +'/Spectrum/getTagList.htm', {
	      params: {
	        tag: val,
	        subscriptionId:$rootScope.app.subscriptionId,
	        verticalId:$rootScope.app.verticalId
	      }
	    }).then(function(response){
	    	return response.data.map(function(item){
		        return item;
		    });
	    });
	};
		
	$scope.promotionId = $stateParams.promotionId;

    $http({
        method: 'GET', 
        url: $rootScope.app.api +'/Spectrum/getCloneCardData.htm?contentId='+ $stateParams.promotionId,
   	}).success(function(response) {
   		$scope.contentList = response;
		$scope.cloneForm.promotionalText = response[0].scopeDescription;
		$scope.cloneForm.promotionalHeadline = response[0].promoName;
		$scope.cloneForm.disclaimer = response[0].contentDisclaimer;
		for(var i=0; i < response.length; i++)  {
			$scope.cloneForm.firstTag = response[0].tag;
			$scope.cloneForm.secondTag = response[1].tag;
			$scope.cloneForm.thirdTag = response[2].tag;
        }
	});

	$http({
        method: 'GET', 
        url: $rootScope.app.api +'/Spectrum/getManufactDisciplineAndManufacture.htm?manufacturerId='+ $rootScope.currentUser.manufacturerId
   	}).success(function(disciplineList) {
		$scope.cloneForm.discipline = disciplineList.disc;
		$scope.cloneForm.manufacturer = disciplineList.manu;
		$scope.cloneForm.disciplineId = disciplineList.discId;
	});

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

	$scope.removeImage = function () {
		$scope.noImage = true;
	};

	if ($scope.promotionalImage == '') {
		$scope.noImage = true;
	}

	
	function convertFileToDataURLviaFileReader(url, callback){
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
		    var reader = new FileReader();
		    reader.onloadend = function() {
		  		callback(reader.result);
		    }
		    reader.readAsDataURL(xhr.response);
		 };
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	};

	var convertFunction = convertFileToDataURLviaFileReader;
	convertFunction('https://www.myciright.com/Ciright/ajaxCall-photo.htm?flag=manuContentImage&compress=0&id='+$stateParams.promotionId, function(base64Img) {
	    uri = base64Img;
	});

    $scope.cloneForm = {
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
	                "manufacturerId": $rootScope.currentUser.manufacturerId,
	                "productName": $scope.cloneForm.promotionalHeadline,
	                "productDescription": $scope.cloneForm.promotionalText,
	                "productContentImage": uri,
	                "productContentDescription": $scope.cloneForm.disclaimer,
	                "productContentTitle": $scope.cloneForm.promotionalHeadline,
	                "productStartTime": $scope.startDateParam,
	                "productEndTime": $scope.endDateParam,
					"employeeId": $rootScope.currentUser.employeeId,
					"createdBy": $rootScope.currentUser.employeeId,
					"firstTag" : $scope.cloneForm.firstTag,
					"secondTag" : $scope.cloneForm.secondTag,
					"thirdTag" : $scope.cloneForm.thirdTag,
					"disciplineId" : $scope.cloneForm.disciplineId,
					"campaignTypeId" : '657',
					"campaignTerritoyId" :'17628',
					"campaignPhaseId" :'60219',
					"campaignIndustyId":'30168',
					"leadId" :'29919'
				};

				$http({
						method: 'POST',
						url: $rootScope.app.api + '/Spectrum/saveProductContent.htm',
						data: JSON.stringify(dataStateObj)
					}).success(function(registResp) {
						if(registResp.success == '1') {
							toaster.pop("success", "", "Promotion Clone Successfully.");
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