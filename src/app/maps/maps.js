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

.controller( 'MapsCtrl', function MapsCtrl( $scope, $http ) {

  // This is simple a demo for UI Boostrap.
    $scope.request = $http({
      method: 'GET', 
      url: 'http://10.105.116.56:4567/getStatesByDivision', 
      params: {
        division: 'RT'
      }
    });
    $scope.request.success(function(data) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(data);
      $scope.polygons = data.json;
    });
    $scope.request.error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert('Ha habido un error');
    });


  $scope.map = {
    center: {
        latitude: 45,
        longitude: -73
    },
    zoom: 8
  };



})

;
