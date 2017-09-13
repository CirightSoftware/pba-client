'use strict';

app.controller('dashboardCtrl', ["$scope", "$http", "$rootScope", "$location",
function($scope, $http, $rootScope, $location) {
	$scope.data = [];
	$scope.labels = [];
	$scope.cmbProductId = '-1';
	$http({
            method: 'GET', 
            url: $rootScope.app.api + '/Spectrum/getTopThreeProductAnalysis.htm?manufacturerId=' + $rootScope.currentUser.manufacturerId+ '&startDate='+moment('01/01/2015').format('MM/DD/YYYY') + '&endDate=' +moment().format('MM/DD/YYYY') 
        }).success(function(dataResponse) {
			if(dataResponse != ''){
				$scope.topThreeProducts = dataResponse;
				if(dataResponse != null) {
					for (var i = 0; i < dataResponse.length; i++) {
						$http({
				            method: 'GET', 
				            url: $rootScope.app.api + '/Spectrum/getLikesFavoriteChartData.htm?contentId=' + dataResponse[i].contentId + '&productName=' + dataResponse[i].contentName
				        }).success(function(chartRes) {
							if(chartRes != null) {
								$scope.createLikesFavoriteChartData(chartRes.likesArray,chartRes.favoriteArray,chartRes.contentId,chartRes.product);
							}
						});
					}
				}
			}
		});

	$http({
            method: 'GET', 
            url: $rootScope.app.api + '/Spectrum/getCheckInCount.htm?manufacturerId=' + $rootScope.currentUser.manufacturerId
        }).success(function(dataResponse) {
			if(dataResponse != ''){
				$scope.checkInCount = dataResponse.count;
			}
		});

	$scope.createLikesFavoriteChartData = function(likesArray,favoriteArray,index,productName) {
		if(likesArray != null && likesArray != '' 
			&& favoriteArray != null && favoriteArray != '' ) {
			$scope.labels[index] = [ productName ];
			$scope.series = ['Likes', 'Favorites'];
			$scope.data[index] =  [ likesArray, favoriteArray ];
			$scope.colors = [{
				fillColor: 'rgba(220,220,220,0.5)',
				highlightFill: 'rgba(220,220,220,0.75)'
			}, {
				fillColor: 'rgba(151,187,205,0.5)',
				highlightFill: 'rgba(151,187,205,0.75)'
			}, {
				fillColor: 'rgba(148,116,153,0.7)',
				highlightFill: 'rgba(148,116,153,1)'
			}];
			// Chart.js Options - complete list at http://www.chartjs.org/docs/
			$scope.options = {
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
	};

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
	 		$scope.filterProductId = $scope.cmbProductId;
			$scope.filterProductName = $("#cmbProductId option:selected").html();
	        $location.path("/app/offerDetails/"+  $scope.filterProductId + "/" + $scope.filterProductName);
		}
	};
}]);

app.controller('barChartCtrl', ["$scope", "$http", "$rootScope", "ChartJs", "$compile",
function($scope, $http, $rootScope, ChartJs, $compile) {
	var prodArray = [];
	$http({
            method: 'GET', 
            url: $rootScope.app.api + '/Spectrum/getProductAnalysisChartData.htm?manufacturerId=' + $rootScope.currentUser.manufacturerId+ '&startDate='+moment('01/01/2015').format('MM/DD/YYYY') + '&endDate=' +moment().format('MM/DD/YYYY') 
        }).success(function(dataResponse) {
			if(dataResponse != null && dataResponse != ''){

	        	for (var i in dataResponse.productArray) {
	        		var prodName = dataResponse.productArray[i];
	        		if(prodName.length > 10) {
						prodArray.push(prodName.substring(0, 10));
	        		} else {
	        			prodArray.push(prodName);
	        		}
				}
				
				$scope.labels =  prodArray;
				$scope.series = ['Likes', 'Favorites'];
				$scope.data = [ dataResponse.likesArray, dataResponse.favoriteArray ];
				$scope.timeRemain = dataResponse.timeRemainArray;
				$scope.colors = [{
					fillColor: 'rgba(148,116,153,0.7)',
					highlightFill: 'rgba(148,116,153,1)'
				}, {
					fillColor: 'rgba(127,140,141,0.7)',
					highlightFill: 'rgba(127,140,141,1)'
				}];
				// Chart.js Options - complete list at http://www.chartjs.org/docs/
				$scope.options = {
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
					/*multiTooltipTemplate: function(evt) {
						debugger;
					    return 'The value is ' + evt.value;
					}*/
				};
				/*$scope.mouseHover = function (points, evt) {
					debugger;
					return evt.dataSeries.visible;
				};*/
			}
		});
}]);

app.controller('pieChartCtrl', ["$scope", "$http", "$rootScope",
function($scope, $http, $rootScope) {
	$scope.likes = [];
	$scope.favorites = [];
	$scope.likesGenArray = [];
	$scope.favGenArray = [];
	$scope.chartFlag = 1;
	$http({
            method: 'GET', 
            url: $rootScope.app.api + '/Spectrum/getAllProductLikesFavPieChartData.htm?manufacturerId=' + $rootScope.currentUser.manufacturerId + '&productId=-1'
        }).success(function(dataResponse) {
			if(dataResponse != null && dataResponse != ''){
				$scope.likes = dataResponse.likesArray;
				$scope.favorites = dataResponse.favoriteArray;
				$scope.likesGenArray = dataResponse.likesGenArray;
				$scope.favGenArray = dataResponse.favGenArray;
				$scope.createPieChart();
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

    $scope.createPieChart = function () {
			if($scope.chartFlag == 1) {
 				$scope.labels = $scope.likesGenArray;
				$scope.data = $scope.likes;
			} else {
 				$scope.labels = $scope.favGenArray;
				$scope.data = $scope.favorites;
			}
			$scope.colors = ['#c877cf', '#5a9ed6'];

			// Chart.js Options
			$scope.options = {

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

}]);

app.controller('ProductsCtrl', ["$scope",
function($scope) {
	$scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$scope.series = ['Alpha', 'Omega', 'Kappa'];
	$scope.data = [[656, 594, 806, 817, 568, 557, 408, 843, 642, 1202, 1322, 847], [282, 484, 402, 194, 864, 275, 905, 1025, 123, 1455, 650, 1651], [768, 368, 253, 163, 437, 678, 1239, 1345, 1898, 1766, 1603, 2116]];
	$scope.colors = [{
		fillColor: 'rgba(90,135,112,0)',
		strokeColor: 'rgba(90,135,112,1)',
		pointColor: 'rgba(90,135,112,1)'
	}, {
		fillColor: 'rgba(127,140,141,0)',
		strokeColor: 'rgba(127,140,141,1)',
		pointColor: 'rgba(127,140,141,1)'
	}, {
		fillColor: 'rgba(148,116,153,0)',
		strokeColor: 'rgba(148,116,153,1)',
		pointColor: 'rgba(148,116,153,1)'
	}];
	// Chart.js Options - complete list at http://www.chartjs.org/docs/
	$scope.options = {
		maintainAspectRatio: false,
		responsive: true,
		scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
		scaleFontSize: 11,
		scaleFontColor: "#aaa",
		scaleShowGridLines: true,
		tooltipFontSize: 11,
		tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
		tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
		tooltipTitleFontSize: 12,
		scaleGridLineColor: 'rgba(0,0,0,.05)',
		scaleGridLineWidth: 1,
		bezierCurve: false,
		bezierCurveTension: 0.4,
		scaleLineColor: 'transparent',
		scaleShowVerticalLines: false,
		pointDot: false,
		pointDotRadius: 4,
		pointDotStrokeWidth: 1,
		pointHitDetectionRadius: 20,
		datasetStroke: true,
		tooltipXPadding: 20,
		datasetStrokeWidth: 2,
		datasetFill: true,
		animationEasing: "easeInOutExpo"
	};

}]);