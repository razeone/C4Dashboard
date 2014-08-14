angular.module( 'ngBoilerplate.maps', [
  'ui.router',
  'ui.bootstrap',
  'google-maps'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'maps', {
    url: '/maps',
    views: {
      "main": {
        controller: 'MapsCtrl',
        templateUrl: 'maps/maps.tpl.html'
      }
    },
    data:{ pageTitle: 'Mapas' }
  });
})

.controller( 'MapsCtrl', function MapsCtrl( $scope ) {
  // This is simple a demo for UI Boostrap.
  $scope.map = {
    center: {
        latitude: 45,
        longitude: -73
    },
    zoom: 8
};
})

;
