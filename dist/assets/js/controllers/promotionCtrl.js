'use strict';
app.controller('promotionCtrl', ["$scope", "$filter", "ngTableParams", "$http", "$rootScope", "$uibModal", "SweetAlert",
    function ($scope, $filter, ngTableParams, $http, $rootScope, $uibModal, SweetAlert) {

	$scope.promotions = [];

	// get active companies
	$http.get($rootScope.app.api + '/Spectrum/getPromotionDataGrid.htm?manufacturerId=' + $rootScope.currentUser.manufacturerId).success(function(response) {
		$scope.promotions = response;
		angular.forEach($scope.promotions,function(item){
            if(item.startDate != null){
                item.startDate = new Date(item.startDate);
            }else{
                item.startDate ='';
            }
            if(item.endDate != null){
                item.endDate = new Date(item.endDate);
            }else{
                item.endDate ='';
            }
        });
		$scope.updateDataTable();
	});

	$scope.updateDataTable = function () {
        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 10, // count per page
            sorting: { date: 'desc' },
        }, {
            total: $scope.promotions.length, // length of data
            getData: function ($defer, params) {
                $defer.resolve($scope.promotions.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                // var orderedData = params.filter() ? $filter('filter')($scope.promotions, params.filter()) : $scope.promotions;

                var orderedData = params.sorting() ? $filter('orderBy')($scope.promotions, params.orderBy()) : $scope.promotions;
                orderedData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData;
                $scope.tableData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                params.total(orderedData.length);
                return  $scope.tableData;
            }
        });
	}

	$scope.promotionPreviewModal = function (promotionId) {
	  	var modalInstance = $uibModal.open({
            size : 'sm',
	   		templateUrl: 'promotionPreviewModalContent.html',
	   		controller: 'PromotionPreviewModalInstanceCtrl',
	   		resolve: {
	    		promotionId: function () {
	     		return promotionId;
	    		}
	   		}
	  	});
	};

	$scope.deletePromotion = function (index, promotionId, status) {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "You want to delete this promotion?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ok",
            cancelButtonText: "Cancel",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
				$http({
					method: 'POST',
					url: $rootScope.app.api + '/Spectrum/updatePromotionStatus.htm?promoId=' + promotionId + '&status=' +status
				}).success(function(response) {
					$scope.promotions.splice(index, 1);
					$scope.tableParams.reload();
					SweetAlert.swal({
	                    title: "Deleted!",
	                    text: "Promotion has been deleted.",
	                    type: "success",
	                    confirmButtonColor: "#007AFF"
                	});
			   });                
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });
    };

}]);

app.controller('PromotionPreviewModalInstanceCtrl', ["$scope", "$rootScope", "$http", "$uibModalInstance", "promotionId", 
	function ($scope, $rootScope, $http, $uibModalInstance, promotionId) {
    $scope.currentDate = new Date();
	$scope.promotionId = promotionId;
	var dataStateObj = {
			"productId": $scope.promotionId,
			"manufacturerId" : $rootScope.currentUser.manufacturerId
		};

	$http({
		method: 'POST',
		url: $rootScope.app.api + '/Spectrum/getPromotionPreviewData.htm',
		data: JSON.stringify(dataStateObj)
	}).success(function(response) {
		$scope.promotionalText = response.scopeDescription;
		$scope.promotionalHeadline = "<b>" + response.promoName + "</b>";
		$scope.disclaimer = "<i>" + response.contentDisclaimer + "</i>";
		$scope.operationalDays = response.operationalDays;
		$scope.promotionalImage = "https://www.myciright.com/Ciright/ajaxCall-photo.htm?flag=manuContentImage&compress=0&id="+$scope.promotionId+"&dateTime="+$scope.currentDate;
		$scope.manufacturerImage = 'https://www.myciright.com/Ciright/ajaxCall-photo.htm?flag=manufactLogo&compress=0&id=' + $rootScope.currentUser.manufacturerId+"&dateTime="+$scope.currentDate;
   });

}]);
app.directive('flippy', function() {
    return {
        restrict: 'EA',
        link: function($scope, $elem, $attrs) {

            var options = {
                flipDuration: ($attrs.flipDuration) ? $attrs.flipDuration : 400,
                timingFunction: 'ease-in-out',
            };

            // setting flip options
            angular.forEach(['flippy-front', 'flippy-back'], function(name) {
                var el = $elem.find(name);
                if (el.length == 1) {
                    angular.forEach(['', '-ms-', '-webkit-'], function(prefix) {
                        angular.element(el[0]).css(prefix + 'transition', 'all ' + options.flipDuration/1000 + 's ' + options.timingFunction);
                    });
                }
            });

            /**
             * behaviour for flipping effect.
             */
            $scope.flip = function() {
                $elem.toggleClass('flipped');
            }

        }
    };
});