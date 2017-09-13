'use strict';
app.controller('createNewCtrl', ["$scope", "$http", "$rootScope", "flowFactory", "toaster", 
	function ($scope, $http, $rootScope, flowFactory, toaster) {
	$scope.cardFrom = {
		firstTag : ''
	};
	$scope.startDateParam = '';
	$scope.endDateParam = '';
	$scope.noImage = true;
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

	
	//$scope.promotionalImage = 'https://placeholdit.imgix.net/~text?txtsize=30&bg=efefef&txtclr=aaaaaa%26text%3Dno%2Bimage&txt=add+image';
	

	if ($scope.promotionalImage == '') {
		$scope.noImage = true;
	}

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
	$scope.startEndDate = $scope.startDateParam + " - " + $scope.endDateParam;

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

    $http({
            method: 'GET', 
            url: $rootScope.app.api +'/Spectrum/getManufactDisciplineAndManufacture.htm?manufacturerId='+ $rootScope.currentUser.manufacturerId
       	}).success(function(disciplineList) {
			$scope.cardFrom.discipline = disciplineList.disc;
			$scope.cardFrom.manufacturer = disciplineList.manu;
			$scope.cardFrom.disciplineId = disciplineList.discId;
    	});


    $scope.cardFrom = {
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
	                "productName": $scope.cardFrom.promotionalHeadline,
	                "productDescription": $scope.cardFrom.promotionalText,
	                "productContentImage": uri,
	                "productContentDescription": $scope.cardFrom.disclaimer,
	                "productContentTitle": $scope.cardFrom.promotionalHeadline,
	                "productStartTime": $scope.startDateParam,
	                "productEndTime": $scope.endDateParam,
					"employeeId": $rootScope.currentUser.employeeId,
					"createdBy": $rootScope.currentUser.employeeId,
					"firstTag" : $scope.cardFrom.firstTag,
					"secondTag" : $scope.cardFrom.secondTag,
					"thirdTag" : $scope.cardFrom.thirdTag,
					"disciplineId" : $scope.cardFrom.disciplineId,
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
							toaster.pop("success", "", "Promotion Created Successfully.");
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
