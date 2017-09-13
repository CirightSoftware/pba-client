'use strict';

app.controller('productAnalyticsCtrl', ["$scope", "$http", "$rootScope",
function($scope, $http, $rootScope) {
	$scope.data = [];
	$scope.labels = [];
	$http({
            method: 'GET', 
            url: $rootScope.app.api + '/Spectrum/getAllProductAnalysis.htm?manufacturerId=' + $rootScope.currentUser.manufacturerId+ '&startDate='+moment('01/01/2015').format('MM/DD/YYYY') + '&endDate=' +moment().format('MM/DD/YYYY') 
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
}]);