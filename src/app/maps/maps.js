angular.module( 'ngBoilerplate.maps', [
  'ui.router',
  'ui.bootstrap'
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
  $scope.dropdownDemoItems = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];
})

;
