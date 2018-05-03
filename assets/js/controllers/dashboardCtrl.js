'use strict';
/**
 * controllers used for the dashboard
 */

app.controller('DashboardCtrl', ["$scope","$rootScope", "$http", "ChartJs", "$compile", "$filter", "$uibModal", 
	function($scope,$rootScope,$http,ChartJs,$compile,$filter,$uibModal) {
	if($rootScope.currentUser == null){
		window.location = '#/appUser/userType';
	}

	$scope.startDateParam ='';
	$scope.endDateParam = '';

	$scope.dates = {
        startDate: moment().subtract(14, 'day'),
        endDate: new Date()
    };

	var dataStateObj = {
		"fromDate": $filter('date')(new Date($scope.dates.startDate),'MM/dd/yyyy'),
		"toDate": $filter('date')($scope.dates.endDate ,'MM/dd/yyyy'),
		"subscriptionId": $rootScope.app.subscriptionId,
		"verticalId": $rootScope.app.verticalId,
	};

	$('input[name="dates"]').on('apply.daterangepicker', function(ev, picker) {
		$scope.startDateParam = picker.startDate.format('MM/DD/YYYY h:mm:ss A');
		$scope.endDateParam = picker.endDate.format('MM/DD/YYYY h:mm:ss A');
		var dataStateObj = {
			"fromDate": $scope.startDateParam,
			"toDate": $scope.endDateParam,
			"subscriptionId": $rootScope.app.subscriptionId,
			"verticalId": $rootScope.app.verticalId,
		};

		$http({
			method: 'POST', 
			url: $rootScope.app.api + 'fingenix/getRegistrationByDayOfWeekChartData.htm',
			data: JSON.stringify(dataStateObj)
		}).success(function(dataResponse) {
			if(dataResponse != '' && dataResponse.weekArray != '' && dataResponse.valueArray != '') {
				$rootScope.performanceWeekArray = dataResponse.weekArray;
				$rootScope.performanceValueArray = dataResponse.valueArray;
				$rootScope.performanceByWeekFlag = true;
			} else {
				$rootScope.performanceByWeekFlag = false;
			}
		});	
	});

	$scope.updateRegistrationByDayOfWeekChart = function() {
		var isDestroy = false;
   		var charts = ChartJs.Chart.instances;
       	for (var key in charts) { 
            if (!charts.hasOwnProperty(key)) {
                continue;
            } else {
             	var chartAux = ChartJs.Chart.instances[key]; 
	            if (chartAux.chart.ctx.canvas.id == "canvasRegistrationByWeekId") { 
	                ChartJs.Chart.instances[key].destroy(); 
	                isDestroy = true;
	            }
            }
        }

		$scope.labels = '';
		$scope.series = [];
		$scope.data = [];

		if($rootScope.performanceWeekArray != null 
			&& $rootScope.performanceWeekArray != ''
			&& $rootScope.performanceWeekArray.length > 0 
			&& $rootScope.performanceValueArray != null 
			&& $rootScope.performanceValueArray != ''
			&& $rootScope.performanceValueArray.length > 0) {
			if(isDestroy) {
				$scope.chartData = {
				 	type : 'bar',
					labels : $rootScope.performanceWeekArray,
					series : ['RegistrationByDayOfWeek'],
					data : [ $rootScope.performanceValueArray ],
					colors : [{
						fillColor : 'rgba(7,91,60,0.6)',
						highlightFill : 'rgba(127,140,141,1)'
					}],
					// Chart.js Options - complete list at http://www.chartjs.org/docs/
					options : {
						maintainAspectRatio : false,
						showTooltips : true,
						tooltipFontSize : 11,
						tooltipFontFamily : "'Helvetica', 'Arial', sans-serif",
						responsive : true,
						scaleFontFamily : "'Helvetica', 'Arial', sans-serif",
						scaleFontSize : 11,
						scaleFontColor : "#aaa",
						scaleBeginAtZero : true,
						tooltipTitleFontFamily : "'Helvetica', 'Arial', sans-serif",
						tooltipTitleFontSize : 12,
						scaleShowGridLines : true,
						scaleLineColor : 'transparent',
						scaleShowVerticalLines : false,
						scaleGridLineColor : "rgba(0,0,0,.05)",
						scaleGridLineWidth : 1,
						barShowStroke : false,
						barStrokeWidth : 2,
						barValueSpacing : 5,
						barDatasetSpacing : 1,
						tooltipFillColor: "rgba(0,0,0,0.8)",
						tooltipFontStyle: "normal",
						tooltipFontColor: "#fff",
						tooltipTitleFontSize: 12,
						tooltipTitleFontStyle: "bold",
						tooltipTitleFontColor: "#fff",
						tooltipYPadding: 6,
						tooltipXPadding: 6,
						tooltipCaretSize: 8,
						tooltipCornerRadius: 6,
						tooltipXOffset: 10,
						tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>"
					}
				};

				var chartContent = document.getElementById('divRegistrationByWeekId');
				chartContent.innerHTML = '&nbsp;';
			    var canvas_html = '<canvas class="chart chart-bar height-250" id="canvasRegistrationByWeekId" '
								 + 'chart-data="chartData.data" chart-options="chartData.options" chart-labels="chartData.labels" chart-click="getRegistrationDataByDay" chart-colours="chartData.colors" chart-series="chartData.series"></canvas>';
			    var element = angular.element(canvas_html);
			    $compile(element)($scope);
			    angular.element('#divRegistrationByWeekId').append(element);
			    
			    var ctx = document.getElementById('canvasRegistrationByWeekId').getContext('2d');
			    var myLineChart = new Chart(ctx).Bar($scope.chartData);
			    $scope.getRegistrationDataByDay = function (event) {
					var modalInstance = $uibModal.open({
						templateUrl : 'viewEmployeeModel.html',
						controller : 'ViewEmployeeInstanceCtrl',
						size : 'lg',
						resolve : {
							day : function() {
								return event[0].label;
							},
							startDateParam : function() {
								return $filter('date')(new Date($scope.dates.startDate),'MM/dd/yyyy');
							},
							endDateParam : function() {
								return $filter('date')($scope.dates.endDate ,'MM/dd/yyyy');
							}
						}
					});
				};
			} else{
				$scope.labels = $rootScope.performanceWeekArray;
				$scope.series = ['RegistrationByDayOfWeek'];
				$scope.data = [ $rootScope.performanceValueArray ];
				$scope.colors = [{
					fillColor : 'rgba(7,91,60,0.6)',
					highlightFill : 'rgba(127,140,141,1)'
				}];

				$scope.getRegistrationDataByDay = function (event) {
					var modalInstance = $uibModal.open({
						templateUrl : 'viewEmployeeModel.html',
						controller : 'ViewEmployeeInstanceCtrl',
						size : 'lg',
						resolve : {
							day : function() {
								return event[0].label;
							},
							startDateParam : function() {
								return $filter('date')(new Date($scope.dates.startDate),'MM/dd/yyyy');
							},
							endDateParam : function() {
								return $filter('date')($scope.dates.endDate ,'MM/dd/yyyy');
							}
						}
					});
				};
				// Chart.js Options - complete list at http://www.chartjs.org/docs/
				$scope.options = {
					maintainAspectRatio : false,
					showTooltips : true,
					tooltipFontSize : 11,
					tooltipFontFamily : "'Helvetica', 'Arial', sans-serif",
					responsive : true,
					scaleFontFamily : "'Helvetica', 'Arial', sans-serif",
					scaleFontSize : 11,
					scaleFontColor : "#aaa",
					scaleBeginAtZero : true,
					tooltipTitleFontFamily : "'Helvetica', 'Arial', sans-serif",
					tooltipTitleFontSize : 12,
					scaleShowGridLines : true,
					scaleLineColor : 'transparent',
					scaleShowVerticalLines : false,
					scaleGridLineColor : "rgba(0,0,0,.05)",
					scaleGridLineWidth : 1,
					barShowStroke : false,
					barStrokeWidth : 2,
					barValueSpacing : 5,
					barDatasetSpacing : 1
				};
			}
		}
	};
	$http({
		method: 'POST', 
		url: $rootScope.app.api + 'fingenix/getRegistrationByDayOfWeekChartData.htm',
		data: JSON.stringify(dataStateObj)
	}).success(function(dataResponse) {
		if(dataResponse != '' && dataResponse.weekArray != '' && dataResponse.valueArray != '') {
			$rootScope.performanceWeekArray = dataResponse.weekArray;
			$rootScope.performanceValueArray = dataResponse.valueArray;
			$rootScope.performanceByWeekFlag = true;
			$scope.updateRegistrationByDayOfWeekChart();
		} else {
			$rootScope.performanceByWeekFlag = false;
		}
	});

	$scope.$watchCollection('performanceWeekArray', $scope.updateRegistrationByDayOfWeekChart);
	$scope.$watchCollection('performanceValueArray', $scope.updateRegistrationByDayOfWeekChart);
}]);

app.controller('ViewEmployeeInstanceCtrl', ["$scope", "$http" , "$rootScope" , "$uibModalInstance", "day", "startDateParam", "endDateParam", "ngTableParams", "$filter",
  function($scope, $http, $rootScope, $uibModalInstance, day,startDateParam,endDateParam,ngTableParams,$filter) {

  	$scope.registrationData =[];

	var dataStateObj = {
		"fromDate": startDateParam,
		"toDate": endDateParam,
		"subscriptionId": $rootScope.app.subscriptionId,
		"verticalId": $rootScope.app.verticalId,
		"day" : day
	};

	$http({
		method: 'POST', 
		url: $rootScope.app.api + 'fingenix/getRegistrationDataByDayChartData.htm',
		data: JSON.stringify(dataStateObj)
	}).success(function(dataResponse) {
		$scope.registrationData = dataResponse;
		$scope.updateDataTable();
	});

	$scope.updateDataTable = function () {
		$scope.tableParams = new ngTableParams({
			page: 1, // show first page
			count: 10 // count per page
		}, {
			total: $scope.registrationData.length, // length of data
			getData: function ($defer, params) {
				$defer.resolve($scope.registrationData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				var orderedData = params.sorting() ? $filter('orderBy')($scope.registrationData, params.orderBy()) : $scope.registrationData;
				orderedData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData;
				$scope.tableData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
				params.total(orderedData.length);
				return  $scope.tableData;
			}
		});
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
	
}]);