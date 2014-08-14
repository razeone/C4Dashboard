angular.module( 'ngBoilerplate.reports', [
  'ui.router',
  'ui.bootstrap',
  'angularCharts'])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'reports', {
    url: '/reports',
    views: {
      "main": {
        controller: 'reportsCtrl',
        templateUrl: 'reports/reports.tpl.html'
      }
    },
    data:{ pageTitle: 'Reportes' }
  });
})

.controller( 'reportsCtrl', function reportsCtrl( $scope ) {
  // This is simple a demo for UI Boostrap.
  $scope.config = {
  title: '',
  tooltips: true,
  labels: false,
  mouseover: function() {},
  mouseout: function() {},
  click: function() {},
  legend: {
    display: true,
    //could be 'left, right'
    position: 'left'
  },
  innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
  lineLegend: 'lineEnd' // can be also 'traditional'
};
})

;
