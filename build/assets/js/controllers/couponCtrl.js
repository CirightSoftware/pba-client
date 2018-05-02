'use strict';
app.controller('CouponCtrl', ["$scope", "$filter", "$http", "$rootScope", "$uibModal", "SweetAlert", "ngTableParams", "toaster", "mkBlocker",
    function ($scope, $filter, $http, $rootScope, $uibModal, SweetAlert, ngTableParams,toaster, mkBlocker) {

    $scope.displayForm=false;  
    $scope.cardFrom={}; 
	$scope.coupons = [];
    $scope.noImage = true;
    $scope.isEdit = true;
    mkBlocker.blockUI();

    $scope.removeImage = function() {
        $scope.noImage = true;
    };

    $scope.currDate = new Date();

    $scope.obj = new Flow();
    var iconImage;
    $scope.imageStrings = [];
    $scope.processFiles = function(files) {
        angular.forEach(files, function(flowFile, i) {
            var fileReader = new FileReader();
            fileReader.onload = function(event) {
                iconImage = event.target.result;
                $scope.imageStrings[i] = iconImage;
            };
            fileReader.readAsDataURL(flowFile.file);
        });
    };
    if ($scope.promotionalImage == '') {
        $scope.noImage = true;
    }
    $scope.manufacturerImage = 'https://www.myciright.com/Ciright/ajaxCall-photo.htm?flag=manufactLogo&compress=0&id=' + $rootScope.currentUser.manufacturerId;

	$http({
        method: 'GET',
        url: $rootScope.app.api + '/getCouponList/' + $rootScope.currentUser.manufacturerId
    }).then(function successCallback(response) {
		$scope.coupons = response.data;
		angular.forEach($scope.coupons,function(item){
            if(item.couponStartDate != null){
                item.couponStartDate = new Date(item.couponStartDate);
            }else{
                item.couponStartDate ='';
            }
            if(item.couponEndDate != null){
                item.couponEndDate = new Date(item.couponEndDate);
            }else{
                item.couponEndDate ='';
            }
        });
        mkBlocker.unblockUI();
		$scope.updateDataTable();
	}, function errorCallback(response) {
        mkBlocker.unblockUI();
        console.log(response);
    });
    
	$scope.updateDataTable = function () {
        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 10 // count per page
        }, {
            total: $scope.coupons.length, // length of data
            getData: function ($defer, params) {
                $defer.resolve($scope.coupons.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                var orderedData = params.sorting() ? $filter('orderBy')($scope.coupons, params.orderBy()) : $scope.coupons;
                orderedData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData;
                $scope.tableData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                params.total(orderedData.length);
                return  $scope.tableData;
            }
        });
    };

	$scope.promotionPreviewModal = function (contentId) {
	  	var modalInstance = $uibModal.open({
            size : 'sm',
	   		templateUrl: 'couponPreviewModal.html',
	   		controller: 'couponPreviewModalCtrl',
	   		resolve: {
	    		contentId: function () {
	     		return contentId;
	    		}
	   		}
	  	});
	};

    $scope.openCreateCouponModel = function(wObj,indexId) {
        $scope.displayForm=true;
        if(wObj!=null){
            $scope.cardFrom={};
            $scope.cardFrom.contentId = wObj.contentId;
            $scope.cardFrom.promotionalHeadline = wObj.promotionalHeadline;
            $scope.cardFrom.promotionalText = wObj.promotionalText;
            $scope.cardFrom.disclaimer = wObj.disclaimer;
            $scope.cardFrom.firstTag = wObj.firstTag;
            $scope.cardFrom.secondTag = wObj.secondTag;
            $scope.cardFrom.thirdTag = wObj.thirdTag;
            $scope.startEndDate = wObj.startEndDate;
            $scope.cardFrom.indexId = indexId;
        }else{
            $scope.cardFrom={};
            $scope.cardFrom.contentId="-1";
            $scope.Form.$setPristine();
            $scope.Form.$setUntouched();
            $scope.Form.$submitted = false;
        }
    }; 

    $scope.cancel = function() {
        $scope.displayForm=false;
        $scope.isEdit = true;
        $scope.cardFrom={};
        $scope.cardFrom.contentId="";
        iconImage='';
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
        return $http.get($rootScope.app.api +'/getTagData/'+ $rootScope.app.subscriptionId + '/' + $rootScope.app.verticalId + '/' + val).then(function(response){
            return response.data.map(function(item){
                return item;
            });
        });
    }; 

	$scope.deleteCoupon = function (index, productId, status) {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "You want to delete this coupon?",
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
					method: 'PUT',
					url: $rootScope.app.api + '/updateCouponStatus/' + productId + '/' +status
				}).then(function successCallback(response) {
					$scope.coupons.splice(index, 1);
					$scope.tableParams.reload();
					SweetAlert.swal({
	                    title: "Deleted!",
	                    text: "Coupon has been deleted.",
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

    $scope.saveCouponData=function(form){
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
            mkBlocker.blockUI();
            var dataObj = {
                "subscriptionId": $rootScope.app.subscriptionId,
                "verticalId": $rootScope.app.verticalId,
                "manufacturerId": $rootScope.currentUser.manufacturerId,
                "content": $scope.cardFrom.promotionalText,
                "contentImage": iconImage,
                "contentDisclaimer": $scope.cardFrom.disclaimer,
                "contentHeadLine": $scope.cardFrom.promotionalHeadline,
                "couponStartDate": $scope.startDateParam,
                "couponEndDate": $scope.endDateParam,
                "employeeId": $rootScope.currentUser.employeeId,
                "firstTag" : $scope.cardFrom.firstTag,
                "secondTag" : $scope.cardFrom.secondTag,
                "thirdTag" : $scope.cardFrom.thirdTag,
                }; 

            if($scope.cardFrom.contentId!=null && $scope.cardFrom.contentId!='-1' && $scope.cardFrom.contentId!=''){
                $http({
                    method: 'PUT',
                    url: $rootScope.app.api+'/updateCoupon/'+$scope.cardFrom.contentId,
                    data: JSON.stringify(dataObj)
                }).then(function successCallback(response) {
                     mkBlocker.unblockUI(); 
                    response=response.data; 
                    if(response.success=='1'){  
                        toaster.pop("success", "","Coupon Updated Successfully");
                        $http({
                            method: 'GET',
                            url: $rootScope.app.api + '/getCouponList/' + $rootScope.currentUser.manufacturerId
                        }).then(function successCallback(response) {
                            $scope.coupons = response.data;
                            angular.forEach($scope.coupons,function(item){
                                if(item.couponStartDate != null){
                                    item.couponStartDate = new Date(item.couponStartDate);
                                }else{
                                    item.couponStartDate ='';
                                }
                                if(item.couponEndDate != null){
                                    item.couponEndDate = new Date(item.couponEndDate);
                                }else{
                                    item.couponEndDate ='';
                                }
                            });
                            $scope.updateDataTable();
                        }, function errorCallback(response) {
                                console.log(response);
                        });
                        $scope.updateDataTable(); 
                        $scope.currDate = new Date();                       
                        $scope.cancel();
                        $scope.isEdit = true;
                    }else{
                        toaster.pop("error", "", "PLease try again..");
                        mkBlocker.unblockUI();
                        $scope.cancel();
                    }
                }, function errorCallback(response) {
                    mkBlocker.unblockUI();
                });
            }else{
                if($scope.cardFrom.firstTag == null || $scope.cardFrom.firstTag == ''){
                    toaster.pop("error", "","Plese Enter First Tag");
                    return false;
                }

                if($scope.cardFrom.secondTag == null || $scope.cardFrom.secondTag == ''){
                    toaster.pop("error", "","Plese Enter Second Tag");
                    return false;
                }

                if($scope.cardFrom.thirdTag == null || $scope.cardFrom.thirdTag == ''){
                    toaster.pop("error", "","Plese Enter Third Tag");
                    return false;
                }
                $http({
                    method: 'POST',
                    url: $rootScope.app.api + '/createCoupon',
                    data: JSON.stringify(dataObj)
                }).then(function successCallback(response) {
                    mkBlocker.unblockUI(); 
                    response=response.data;  
                    if(response.success=='1'){
                        toaster.pop("success", "","Coupon Created Successfully");
                        $http({
                            method: 'GET',
                            url: $rootScope.app.api + '/getCouponList/' + $rootScope.currentUser.manufacturerId
                        }).then(function successCallback(response) {
                            $scope.coupons = response.data;
                            angular.forEach($scope.coupons,function(item){
                                if(item.couponStartDate != null){
                                    item.couponStartDate = new Date(item.couponStartDate);
                                }else{
                                    item.couponStartDate ='';
                                }
                                if(item.couponEndDate != null){
                                    item.couponEndDate = new Date(item.couponEndDate);
                                }else{
                                    item.couponEndDate ='';
                                }
                            });
                            $scope.updateDataTable();
                        }, function errorCallback(response) {
                                console.log(response);
                        });
                        $scope.updateDataTable(); 
                        $scope.currDate = new Date();   
                        $scope.cancel();   
                    }else{
                        toaster.pop("error", "", "Please try again..");
                        mkBlocker.unblockUI(); 
                        $scope.cancel();
                    }
                }, function errorCallback(response) {
                    mkBlocker.unblockUI();
                });
            }
        }
    };

    $scope.openUpdateCouponModel = function(wObj,indexId) {
        $scope.displayForm=true;
        $scope.isEdit = false;
        if(wObj!=null){
            $scope.cardFrom.contentId = wObj.contentId;
            $scope.cardFrom.indexId = indexId;
            mkBlocker.blockUI();
            if($scope.cardFrom.contentId != null && $scope.cardFrom.contentId != '' && $scope.cardFrom.contentId != '-1'){
                $http({
                    method: 'GET',
                    url: $rootScope.app.api + '/getContentPreviewData/' + $rootScope.currentUser.manufacturerId + '/' + $scope.cardFrom.contentId
                }).then(function successCallback(response) {
                    mkBlocker.unblockUI(); 
                    var previewData = response.data;
                    $scope.cardFrom.promotionalText = previewData.scopeDescription;
                    $scope.cardFrom.promotionalHeadline =  previewData.content;
                    $scope.cardFrom.disclaimer = previewData.contentDisclaimer;
                    if(previewData.isImage != '' &&  previewData.isImage == 1) {
                        $scope.promotionalImage = "https://www.myciright.com/Ciright/ajaxCall-photo.htm?flag=manuContentImage&compress=0&id="+$scope.cardFrom.contentId+"&dateTime="+$scope.currDate;
                    } else {
                        $scope.promotionalImage = "https://placeholdit.imgix.net/~text?txtsize=30&bg=efefef&txtclr=aaaaaa%26text%3Dno%2Bimage&txt=no+image";
                    }
                }, function errorCallback(response) {
                        console.log(response);
                });
            }
        }else{
            $scope.cardFrom={};
            $scope.cardFrom.contentId="-1";
            $scope.Form.$setPristine();
            $scope.Form.$setUntouched();
            $scope.Form.$submitted = false;
        }
    };

}]);

app.controller('couponPreviewModalCtrl', ["$scope", "$rootScope", "$http", "$uibModalInstance", "contentId", 
	function ($scope, $rootScope, $http, $uibModalInstance, contentId) {
    $scope.currentDate = new Date();

    $http({
        method: 'GET',
        url: $rootScope.app.api + '/getContentPreviewData/' + $rootScope.currentUser.manufacturerId + '/' + contentId
    }).then(function successCallback(response) {
        var previewData = response.data;
        $scope.promotionalText = previewData.scopeDescription;
        $scope.promotionalHeadline = "<b>" + previewData.content + "</b>";
        $scope.disclaimer = "<i>" + previewData.contentDisclaimer + "</i>";
        $scope.operationalDays = previewData.operationalDays;
        $scope.promotionalImage = "https://www.myciright.com/Ciright/ajaxCall-photo.htm?flag=manuContentImage&compress=0&id="+ contentId+"&dateTime="+$scope.currentDate;
        $scope.manufacturerImage = 'https://www.myciright.com/Ciright/ajaxCall-photo.htm?flag=manufactLogo&compress=0&id=' + $rootScope.currentUser.manufacturerId+"&dateTime="+$scope.currentDate;
    }, function errorCallback(response) {
            console.log(response);
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

            angular.forEach(['flippy-front', 'flippy-back'], function(name) {
                var el = $elem.find(name);
                if (el.length == 1) {
                    angular.forEach(['', '-ms-', '-webkit-'], function(prefix) {
                        angular.element(el[0]).css(prefix + 'transition', 'all ' + options.flipDuration/1000 + 's ' + options.timingFunction);
                    });
                }
            });
            $scope.flip = function() {
                $elem.toggleClass('flipped');
            }
        }
    };
});