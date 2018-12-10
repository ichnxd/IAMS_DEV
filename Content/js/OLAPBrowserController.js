app.controller('OLAPBrowserController', ['$scope', '$timeout', 'JSDataService', function ($scope, $timeout, JSDataService) {
    $scope.pivotGridOptions = {
        allowSortingBySummary: true,
        allowSorting: true,
        allowFiltering: true,
        allowExpandAll: true,
        height: 440,
        "export": {
            enabled: true,
            fileName: "Adventure Works"
        },
        scrolling: {
            mode: "virtual"
        },
        dataSource: {
            fields: [],
            store: {
                type: "xmla",
                url: "http://192.168.27.88/OLAP/msmdpump.dll",
                catalog: "SalesPipeLine",
                cube: "OpportunityCube"
            }
        }
    };
}]);