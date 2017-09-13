'use strict';

app.controller('offerDetailsCtrl', ["$scope", "$http", "$rootScope", "$stateParams", "$location",
function($scope, $http, $rootScope, $stateParams, $location) {
	
	$scope.cmbProductId = '-1';
	$scope.barLabels =  '';
	$scope.barSeries = [];
	$scope.barData = [];
	$scope.barColors = [];
	$scope.barOptions = {};
	$scope.pieLabels = [];
	$scope.pieData = [];
	$scope.pieColors = [];
	$scope.pieOptions = {};
	$scope.zipCodeLabels =  '';
	$scope.zipCodeSeries = [];
	$scope.zipCodeData = [];
	$scope.zipCodeColors = [];
	$scope.zipCodeOptions = {};
	$scope.ageGroupLabels =  '';
	$scope.ageGroupSeries = [];
	$scope.ageGroupData = [];
	$scope.ageGroupColors = [];
	$scope.ageGroupOptions  = {};
	$scope.likes = [];
	$scope.favorites = [];
	$scope.likesGenArray = [];
	$scope.favGenArray = [];
	$scope.likesColorArray = [];
	$scope.favColorArray = [];
	$scope.chartFlag = 1;

	$scope.productId = $stateParams.productId;
	$scope.productName = $stateParams.productName;

	$http({
        method: 'GET', 
        url: $rootScope.app.api + '/Spectrum/getTotalLikeFavoriteTimeRamain.htm?productId=' + $scope.productId
    }).success(function(dataResponse) {
		$scope.totalLikesFavObj = dataResponse;
	});

    $http({
        method: 'GET', 
        url: $rootScope.app.api + '/Spectrum/getProductList.htm?manufacturerId=' + $rootScope.currentUser.manufacturerId
    }).success(function(dataResponse) {
		if(dataResponse != ''){
			$scope.productList = dataResponse;
		}
	});

	$scope.getPromotionalData = function() {
		if($scope.cmbProductId != null && $scope.cmbProductId != '') {
			$scope.productId = $scope.cmbProductId;
			$scope.productName = $("#cmbProductId option:selected").html();
	        $location.path("/app/offerDetails/"+  $scope.productId + "/" + $scope.productName);
		}
	};

	$http({
        method: 'GET', 
        url: $rootScope.app.api + '/Spectrum/getLikeFavoriteBarChartData.htm?productId=' + $scope.productId
    }).success(function(dataResponse) {
    	if(dataResponse != null && dataResponse != '') {
    		$scope.barLabels =  dataResponse.createdDateArray;
			$scope.barSeries = ['Likes', 'Favorites'];
			$scope.barData = [ dataResponse.likesArray, dataResponse.favoriteArray ];
			$scope.barColors = [{
				fillColor: 'rgba(148,116,153,0.7)',
				highlightFill: 'rgba(148,116,153,1)'
			}, {
				fillColor: 'rgba(127,140,141,0.7)',
				highlightFill: 'rgba(127,140,141,1)'
			}];
			// Chart.js Options - complete list at http://www.chartjs.org/docs/
			$scope.barOptions = {
				maintainAspectRatio: false,
				tooltipFontSize: 11,
				tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
				responsive: true,
				scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
				scaleFontSize: 11,
				scaleFontColor: "#aaa",
				scaleBeginAtZero: true,
				tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
				tooltipTitleFontSize: 12,
				scaleShowGridLines: true,
				scaleLineColor: 'transparent',
				scaleShowVerticalLines: false,
				scaleGridLineColor: "rgba(0,0,0,.05)",
				scaleGridLineWidth: 1,
				barShowStroke: false,
				barStrokeWidth: 2,
				barValueSpacing: 5,
				barDatasetSpacing: 1
			};
    	}
	});

	$scope.getProductPieChart = function (likeFavFlag) {
 		if(likeFavFlag == 1) {
	 		$("#btnFavorite").removeClass("active");
	     	$("#btnLike").addClass( "active" );
 		} else {
 			$("#btnLike").removeClass("active");
	     	$("#btnFavorite").addClass( "active" );
 		}
        $scope.chartFlag = likeFavFlag;
		$scope.createPieChart();
    }

	$http({
        method: 'GET', 
        url: $rootScope.app.api + '/Spectrum/getAllProductLikesFavPieChartData.htm?manufacturerId=' + $rootScope.currentUser.manufacturerId + '&productId=' + $scope.productId
        //url: $rootScope.app.api + '/Spectrum/getLikesFavoritesPieChartData.htm?productId=' + $scope.productId
    }).success(function(dataResponse) {
    	if(dataResponse != null && dataResponse != ''){
			$scope.likes = dataResponse.likesArray;
			$scope.favorites = dataResponse.favoriteArray;
			$scope.likesGenArray = dataResponse.likesGenArray;
			$scope.favGenArray = dataResponse.favGenArray;
			$scope.likesColorArray = dataResponse.likesColorArray;
			$scope.favColorArray = dataResponse.favColorArray;
			$scope.createPieChart();
		}
	});

     $scope.createPieChart = function () {
		if($scope.chartFlag == 1) {
			$scope.pieLabels = $scope.likesGenArray;
			$scope.pieData = $scope.likes;
			$scope.pieColors = $scope.likesColorArray;
		} else {
			$scope.pieLabels = $scope.favGenArray;
			$scope.pieData = $scope.favorites;
			$scope.pieColors = $scope.favColorArray;
		}

		// Chart.js Options
		$scope.pieOptions = {

			// Sets the chart to be responsive
			responsive: false,

			//Boolean - Whether we should show a stroke on each segment
			segmentShowStroke: true,

			//String - The colour of each segment stroke
			segmentStrokeColor: '#fff',

			//Number - The width of each segment stroke
			segmentStrokeWidth: 2,

			//Number - The percentage of the chart that we cut out of the middle
			percentageInnerCutout: 0, // This is 0 for Pie charts

			//Number - Amount of animation steps
			animationSteps: 100,

			//String - Animation easing effect
			animationEasing: 'easeOutBounce',

			//Boolean - Whether we animate the rotation of the Doughnut
			animateRotate: true,

			//Boolean - Whether we animate scaling the Doughnut from the centre
			animateScale: false

		};
	}

	$http({
        method: 'GET', 
        url: $rootScope.app.api + '/Spectrum/getLikeFavoriteAgeGroupChartData.htm?productId=' + $scope.productId
    }).success(function(dataResponse) {
		if(dataResponse != null && dataResponse != '') {
    		$scope.ageGroupLabels =  dataResponse.ageGroupArray;
			$scope.ageGroupSeries = ['Likes', 'Favorites'];
			$scope.ageGroupData = [ dataResponse.likesArray, dataResponse.favoriteArray ];
			$scope.ageGroupColors = [{
				fillColor: 'rgba(148,116,153,0.7)',
				highlightFill: 'rgba(148,116,153,1)'
			}, {
				fillColor: 'rgba(127,140,141,0.7)',
				highlightFill: 'rgba(127,140,141,1)'
			}];
			// Chart.js Options - complete list at http://www.chartjs.org/docs/
			$scope.ageGroupOptions = {
				maintainAspectRatio: false,
				tooltipFontSize: 11,
				tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
				responsive: true,
				scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
				scaleFontSize: 11,
				scaleFontColor: "#aaa",
				scaleBeginAtZero: true,
				tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
				tooltipTitleFontSize: 12,
				scaleShowGridLines: true,
				scaleLineColor: 'transparent',
				scaleShowVerticalLines: false,
				scaleGridLineColor: "rgba(0,0,0,.05)",
				scaleGridLineWidth: 1,
				barShowStroke: false,
				barStrokeWidth: 2,
				barValueSpacing: 5,
				barDatasetSpacing: 1
			};
    	}
	});

	$http({
        method: 'GET', 
        url: $rootScope.app.api + '/Spectrum/getZipCodeWiseLikesFavorites.htm?productId=' + $scope.productId
    }).success(function(dataResponse) {
    	if(dataResponse != null && dataResponse != '') {
    		$scope.zipCodeLabels =  dataResponse.zipCodeArrray;
			$scope.zipCodeSeries = ['Likes', 'Favorites'];
			$scope.zipCodeData = [ dataResponse.likesArray, dataResponse.favoriteArray ];
			$scope.zipCodeColors = [{
				fillColor: 'rgba(148,116,153,0.7)',
				highlightFill: 'rgba(148,116,153,1)'
			}, {
				fillColor: 'rgba(127,140,141,0.7)',
				highlightFill: 'rgba(127,140,141,1)'
			}];
			// Chart.js Options - complete list at http://www.chartjs.org/docs/
			$scope.zipCodeOptions = {
				maintainAspectRatio: false,
				tooltipFontSize: 11,
				tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
				responsive: true,
				scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
				scaleFontSize: 11,
				scaleFontColor: "#aaa",
				scaleBeginAtZero: true,
				tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
				tooltipTitleFontSize: 12,
				scaleShowGridLines: true,
				scaleLineColor: 'transparent',
				scaleShowVerticalLines: false,
				scaleGridLineColor: "rgba(0,0,0,.05)",
				scaleGridLineWidth: 1,
				barShowStroke: false,
				barStrokeWidth: 2,
				barValueSpacing: 5,
				barDatasetSpacing: 1
			};
    	}
	});

}]);
