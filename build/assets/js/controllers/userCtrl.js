'use strict';
/** 
  * controller for User Profile Example
*/
app.controller('userCtrl', ["$scope", 
function($scope) {
    
}]);
app.controller('ManufacturerCtrl', ["$scope", '$rootScope', '$http', "toaster", 'flowFactory', function($scope, $rootScope, $http, toaster, flowFactory) {

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
    $scope.currentDate = new Date();

    $scope.editManForm = {
        promotionalImage :"https://www.myciright.com/Ciright/ajaxCall-photo.htm?flag=manufactLogo&compress=0&id="+$rootScope.currentUser.manufacturerId+"&dateTime="+$scope.currentDate
    };

    if ($scope.editManForm.promotionalImage == '') {
        $scope.noImage = true;
    }

    var data;  
    var dataStateObj = {
        "username": $rootScope.app.username,
        "password": $rootScope.app.password,
        "subscriptionId": $rootScope.app.subscriptionId,
        "verticalId": $rootScope.app.verticalId,
        "countryId": '1'
    };

    $http({
        method: 'POST',
        url: $rootScope.app.api + '/Spectrum/getStateList.htm',
        data: JSON.stringify(dataStateObj)
    }).success(function(stateList) {
        $scope.stateData = stateList;
    });

    $http({
        method: 'GET', 
        url: $rootScope.app.api +'/Spectrum/getMerchantEditData.htm?manufacturerId='+ $rootScope.currentUser.manufacturerId +'&employeeId='+$rootScope.currentUser.employeeId
    }).success(function(manuList) {
        $scope.editManForm= manuList[0];
    });

    $scope.saveManufacturerDetails = function (form) {
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
                "manufacturerId" : $rootScope.currentUser.manufacturerId,
                "employeeId": $rootScope.currentUser.employeeId,
                "firstName": $scope.editManForm.fname,
                "lastName": ' ',
                "address1": $scope.editManForm.address1,
                "address2": $scope.editManForm.address2,
                "country": '1',
                "state": $scope.editManForm.state,
                "city": $scope.editManForm.city,
                "zipCode": $scope.editManForm.zip,
                "phoneNumber": $scope.editManForm.pnumber,
                "website": $scope.editManForm.website,
                "companyLogo":uri
            };

            $http({
                    method: 'POST',
                    url: $rootScope.app.api + '/Spectrum/saveManufacturerUpdatedData.htm',
                    data: JSON.stringify(dataStateObj)
                }).success(function(registResp) {
                    if(registResp == 'success') {
                        toaster.pop("success", "", "Manufacturer Details Updated Successfully.");
                    }
            });
        }
    }
}]);

app.controller('OfficeCtrl', ["$scope", '$rootScope', '$http', "toaster", "$filter",
function($scope, $rootScope, $http, toaster, $filter) {
    
    $scope.editOfficeForm = {
        chkOpentime1: 0,
        chkOpentime2: 0,
        chkOpentime3: 0,
        chkOpentime4: 0,
        chkOpentime5: 0,
        chkOpentime6: 0,
        chkOpentime7: 0
    };

    if ($scope.editOfficeForm.promotionalImage == '') {
        $scope.noImage = true;
    } 

    $http({
            method: 'GET', 
            url: $rootScope.app.api +'/Spectrum/getOfficeEditData.htm?manufacturerId='+ $rootScope.currentUser.manufacturerId
        }).success(function(officeList) {
            $scope.editOfficeForm.officeId = officeList[0].officeId;
            $scope.editOfficeForm.manuOfficeId = officeList[0].manuOfficeId;
            $scope.editOfficeForm.officeName = officeList[0].officeName;

            if(officeList[0].sundayOpenTime != null && officeList[0].sundayOpenTime != '') {
                var openDate = officeList[0].sundayOpenTime.split(" ");
                var openTime = openDate[3];
                var openTimeArr = openTime.split(":");
                var openTimeDate = new Date();
                openTimeDate.setHours(openTimeArr[0]);
                openTimeDate.setMinutes(openTimeArr[1]);
                $scope.editOfficeForm.openTime1 = openTimeDate;
            }
            if(officeList[0].sundayCloseTime != null && officeList[0].sundayCloseTime != '') {
                var closeDate = officeList[0].sundayCloseTime.split(" ");
                var closeTime = closeDate[3];
                var closeTimeArr = closeTime.split(":");
                var closeTimeDate = new Date();
                closeTimeDate.setHours(closeTimeArr[0]);
                closeTimeDate.setMinutes(closeTimeArr[1]);
                $scope.editOfficeForm.closeTime1 = closeTimeDate;
            }
            if(officeList[0].mondayOpenTime != null && officeList[0].mondayOpenTime != '') {
                var openDate = officeList[0].mondayOpenTime.split(" ");
                var openTime = openDate[3];
                var openTimeArr = openTime.split(":");
                var openTimeDate = new Date();
                openTimeDate.setHours(openTimeArr[0]);
                openTimeDate.setMinutes(openTimeArr[1]);
                $scope.editOfficeForm.openTime2 = openTimeDate;
            }
            if(officeList[0].mondayCloseTime != null && officeList[0].mondayCloseTime != '') {
                var closeDate = officeList[0].mondayCloseTime.split(" ");
                var closeTime = closeDate[3];
                var closeTimeArr = closeTime.split(":");
                var closeTimeDate = new Date();
                closeTimeDate.setHours(closeTimeArr[0]);
                closeTimeDate.setMinutes(closeTimeArr[1]);
                $scope.editOfficeForm.closeTime2 = closeTimeDate;
            }
            if(officeList[0].tuesdayOpenTime != null && officeList[0].tuesdayOpenTime != '') {
                var openDate = officeList[0].tuesdayOpenTime.split(" ");
                var openTime = openDate[3];
                var openTimeArr = openTime.split(":");
                var openTimeDate = new Date();
                openTimeDate.setHours(openTimeArr[0]);
                openTimeDate.setMinutes(openTimeArr[1]);
                $scope.editOfficeForm.openTime3 = openTimeDate;
            }
            if(officeList[0].tuesdayCloseTime != null && officeList[0].tuesdayCloseTime != '') {
                var closeDate = officeList[0].tuesdayCloseTime.split(" ");
                var closeTime = closeDate[3];
                var closeTimeArr = closeTime.split(":");
                var closeTimeDate = new Date();
                closeTimeDate.setHours(closeTimeArr[0]);
                closeTimeDate.setMinutes(closeTimeArr[1]);
                $scope.editOfficeForm.closeTime3 = closeTimeDate;
            }
            if(officeList[0].wednesdayOpenTime != null && officeList[0].wednesdayOpenTime != '') {
                var openDate = officeList[0].wednesdayOpenTime.split(" ");
                var openTime = openDate[3];
                var openTimeArr = openTime.split(":");
                var openTimeDate = new Date();
                openTimeDate.setHours(openTimeArr[0]);
                openTimeDate.setMinutes(openTimeArr[1]);
                $scope.editOfficeForm.openTime4 = openTimeDate;
            }
            if(officeList[0].wednesdayCloseTime != null && officeList[0].wednesdayCloseTime != '') {
                var closeDate = officeList[0].wednesdayCloseTime.split(" ");
                var closeTime = closeDate[3];
                var closeTimeArr = closeTime.split(":");
                var closeTimeDate = new Date();
                closeTimeDate.setHours(closeTimeArr[0]);
                closeTimeDate.setMinutes(closeTimeArr[1]);
                $scope.editOfficeForm.closeTime4 = closeTimeDate;
            }
            if(officeList[0].thursdayOpenTime != null && officeList[0].thursdayOpenTime != '') {
                var openDate = officeList[0].thursdayOpenTime.split(" ");
                var openTime = openDate[3];
                var openTimeArr = openTime.split(":");
                var openTimeDate = new Date();
                openTimeDate.setHours(openTimeArr[0]);
                openTimeDate.setMinutes(openTimeArr[1]);
                $scope.editOfficeForm.openTime5 = openTimeDate;
            }
            if(officeList[0].thursdayCloseTime != null && officeList[0].thursdayCloseTime != '') {
                var closeDate = officeList[0].thursdayCloseTime.split(" ");
                var closeTime = closeDate[3];
                var closeTimeArr = closeTime.split(":");
                var closeTimeDate = new Date();
                closeTimeDate.setHours(closeTimeArr[0]);
                closeTimeDate.setMinutes(closeTimeArr[1]);
                $scope.editOfficeForm.closeTime5 = closeTimeDate;
            }
            if(officeList[0].fridayOpenTime != null && officeList[0].fridayOpenTime != '') {
                var openDate = officeList[0].fridayOpenTime.split(" ");
                var openTime = openDate[3];
                var openTimeArr = openTime.split(":");
                var openTimeDate = new Date();
                openTimeDate.setHours(openTimeArr[0]);
                openTimeDate.setMinutes(openTimeArr[1]);
                $scope.editOfficeForm.openTime6 = openTimeDate;
            }
            if(officeList[0].fridayCloseTime != null && officeList[0].fridayCloseTime != '') {
                var closeDate = officeList[0].fridayCloseTime.split(" ");
                var closeTime = closeDate[3];
                var closeTimeArr = closeTime.split(":");
                var closeTimeDate = new Date();
                closeTimeDate.setHours(closeTimeArr[0]);
                closeTimeDate.setMinutes(closeTimeArr[1]);
                $scope.editOfficeForm.closeTime6 = closeTimeDate;
            }
            if(officeList[0].saturdayOpenTime != null && officeList[0].saturdayOpenTime != '') {
                var openDate = officeList[0].saturdayOpenTime.split(" ");
                var openTime = openDate[3];
                var openTimeArr = openTime.split(":");
                var openTimeDate = new Date();
                openTimeDate.setHours(openTimeArr[0]);
                openTimeDate.setMinutes(openTimeArr[1]);
                $scope.editOfficeForm.openTime7 = openTimeDate;
            }
            if(officeList[0].saturdayCloseTime != null && officeList[0].saturdayCloseTime != '') {
                var closeDate = officeList[0].saturdayCloseTime.split(" ");
                var closeTime = closeDate[3];
                var closeTimeArr = closeTime.split(":");
                var closeTimeDate = new Date();
                closeTimeDate.setHours(closeTimeArr[0]);
                closeTimeDate.setMinutes(closeTimeArr[1]);
                $scope.editOfficeForm.closeTime7 = closeTimeDate;
            }

            if(officeList[0].sundayOpenTime != '' && officeList[0].sundayCloseTime != '') {
                $scope.editOfficeForm.chkOpentime1 = 1;
            }
            if(officeList[0].mondayOpenTime != '' && officeList[0].mondayCloseTime != '') {
                $scope.editOfficeForm.chkOpentime2 = 1;
            }
            if(officeList[0].tuesdayOpenTime != '' && officeList[0].tuesdayCloseTime != '') {
                $scope.editOfficeForm.chkOpentime3 = 1;
            }
            if(officeList[0].wednesdayOpenTime != '' && officeList[0].wednesdayCloseTime != '') {
                $scope.editOfficeForm.chkOpentime4 = 1;
            }
            if(officeList[0].thursdayOpenTime != '' && officeList[0].thursdayCloseTime != '') {
                $scope.editOfficeForm.chkOpentime5 = 1;
            }
            if(officeList[0].fridayOpenTime != '' && officeList[0].fridayCloseTime != '') {
                $scope.editOfficeForm.chkOpentime6 = 1;
            }
            if(officeList[0].saturdayOpenTime != '' && officeList[0].saturdayCloseTime != '') {
                $scope.editOfficeForm.chkOpentime7 = 1;
            }
        });

    $scope.saveOfficeDetails = function (form) {
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
                var o1 = $scope.editOfficeForm.openTime1 != null && $scope.editOfficeForm.openTime1 != '' ? $filter('date')($scope.editOfficeForm.openTime1, 'hh:mm a') : null;
                var c1 = $scope.editOfficeForm.closeTime1 != null && $scope.editOfficeForm.closeTime1 != '' ? $filter('date')($scope.editOfficeForm.closeTime1, 'hh:mm a') : null;
                var o2 = $scope.editOfficeForm.openTime2 != null && $scope.editOfficeForm.openTime2 != '' ? $filter('date')($scope.editOfficeForm.openTime2, 'hh:mm a') : null;
                var c2 = $scope.editOfficeForm.closeTime2 != null && $scope.editOfficeForm.closeTime2 != '' ? $filter('date')($scope.editOfficeForm.closeTime2, 'hh:mm a') : null;
                var o3 = $scope.editOfficeForm.openTime3 != null && $scope.editOfficeForm.openTime3 != '' ? $filter('date')($scope.editOfficeForm.openTime3, 'hh:mm a') : null;
                var c3 = $scope.editOfficeForm.closeTime3 != null && $scope.editOfficeForm.closeTime3 != '' ? $filter('date')($scope.editOfficeForm.closeTime3, 'hh:mm a') : null;
                var o4 = $scope.editOfficeForm.openTime4 != null && $scope.editOfficeForm.openTime4 != '' ? $filter('date')($scope.editOfficeForm.openTime4, 'hh:mm a') : null;
                var c4 = $scope.editOfficeForm.closeTime4 != null && $scope.editOfficeForm.closeTime4 != '' ? $filter('date')($scope.editOfficeForm.closeTime4, 'hh:mm a') : null;
                var o5 = $scope.editOfficeForm.openTime5 != null && $scope.editOfficeForm.openTime5 != '' ? $filter('date')($scope.editOfficeForm.openTime5, 'hh:mm a') : null;
                var c5 = $scope.editOfficeForm.closeTime5 != null && $scope.editOfficeForm.closeTime5 != '' ? $filter('date')($scope.editOfficeForm.closeTime5, 'hh:mm a') : null;
                var o6 = $scope.editOfficeForm.openTime6 != null && $scope.editOfficeForm.openTime6 != '' ? $filter('date')($scope.editOfficeForm.openTime6, 'hh:mm a') : null;
                var c6 = $scope.editOfficeForm.closeTime6 != null && $scope.editOfficeForm.closeTime6 != '' ? $filter('date')($scope.editOfficeForm.closeTime6, 'hh:mm a') : null;
                var o7 = $scope.editOfficeForm.openTime7 != null && $scope.editOfficeForm.openTime7 != '' ? $filter('date')($scope.editOfficeForm.openTime7, 'hh:mm a') : null;
                var c7 = $scope.editOfficeForm.closeTime7 != null && $scope.editOfficeForm.closeTime7 != '' ? $filter('date')($scope.editOfficeForm.closeTime7, 'hh:mm a') : null;
                
            var dataStateObj = {
                "manufacturerId" : $rootScope.currentUser.manufacturerId,
                "employeeId": $rootScope.currentUser.employeeId,
                "officeId": $scope.editOfficeForm.officeId,
                "manuOfficeId" : $scope.editOfficeForm.manuOfficeId,
                "sundayTime": o1 != null && c1 != null ? o1 + "," + c1 : '',
                "mondayTime": o2 != null && c2 != null ? o2 + "," + c2 : '',
                "tuesdayTime": o3 != null && c3 != null ? o3 + "," + c3 : '',
                "wednesdayTime": o4 != null && c4 != null ? o4 + "," + c4 : '',
                "thursdayTime": o5 != null && c5 != null ? o5 + "," + c5 : '',
                "fridayTime": o6 != null && c6 != null ? o6 + "," + c6 : '',
                "saturdayTime": o7 != null && c7 != null ? o7 + "," + c7 : ''
            };
            $http({
                    method: 'POST',
                    url: $rootScope.app.api + '/Spectrum/saveOfficeUpdatedData.htm',
                    data: JSON.stringify(dataStateObj)
                }).success(function(registResp) {
                    if(registResp == 'success') {
                        toaster.pop("success", "", "Office Details Updated Successfully.");
                    }
            });
        }
    }
}]);


app.controller('CardCtrl', ["$scope", '$rootScope', '$http', "toaster",
function($scope, $rootScope, $http, toaster) {
    $scope.editCardForm={};
    $scope.editAddressForm={};

    $http({
        method: 'GET', 
        url: $rootScope.app.api +'/Spectrum/getCardEditData.htm?manufacturerId='+ $rootScope.currentUser.manufacturerId
    }).success(function(cardList) {
        $scope.editCardForm = cardList[0];
    });

    
    $http({
        method: 'GET', 
        url: $rootScope.app.api +'/Spectrum/getAddressEditData.htm?manufacturerId='+ $rootScope.currentUser.manufacturerId
    }).success(function(cardDetail) {
        $scope.editAddressForm = cardDetail[0];
    });

    var data;  
    var dataObj = {
        "username": $rootScope.app.username,
        "password": $rootScope.app.password,
        "subscriptionId": $rootScope.app.subscriptionId,
        "verticalId": $rootScope.app.verticalId,
        "countryId": '1'
    };
    
    $http({
        method: 'POST',
        url: $rootScope.app.api + '/Spectrum/getStateList.htm',
        data: JSON.stringify(dataObj)
    }).success(function(stateList) {
        $scope.stateData = stateList;
    });

    $scope.updateCardDetails = function (form) {
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
                "manufacturerCardId" : $scope.editCardForm.manufacturerCardId,
                "manufacturerId" : $rootScope.currentUser.manufacturerId,
                "employeeId": $rootScope.currentUser.employeeId,
                "nameOnCard": $scope.editCardForm.nameOnCard,
                "cardNo": $scope.editCardForm.cardNum,
                "cardExpMonth": $scope.editCardForm.cardMonth,
                "cardExpYear": $scope.editCardForm.cardYear,
                "bAddress1":  $scope.editAddressForm.billingAddress,
                "bAddress2":  $scope.editAddressForm.billingAddress2,
                "bCity":  $scope.editAddressForm.cardCity,
                "bCountryId": '1',
                "bStateId":  $scope.editAddressForm.cardState,
                "bzipCode":  $scope.editAddressForm.cardZip,
                "manufacturerAddressId" : $scope.editAddressForm.manufacturerAddressId
            };

            $http({
                method: 'POST',
                url: $rootScope.app.api + '/Spectrum/saveManufacturerCardUpdatedData.htm',
                data: JSON.stringify(dataStateObj)
            }).success(function(cardResp) {
                if(cardResp == 'success') {
                    toaster.pop("success", "", "Card Details Updated Successfully.");
                }
            });
        }
    }
}]);