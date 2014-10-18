angular.module( 'ngBoilerplate.intelligence', [
  'ui.router',
  'ui.bootstrap',
  'google-maps'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'intelligence', {
    url: '/intelligence',
    views: {
      "main": {
        controller: 'IntelligenceCtrl',
        templateUrl: 'intelligence/intelligence.tpl.html'
      }
    },
    data:{ pageTitle: 'Inteligencia' }
  });
})

.controller('IntelligenceCtrl', function IntelligenceCtrl($scope,$http){
  // This is simple a demo for UI Boostrap.
  $scope.map = {
    center: {
        latitude: 19.493098,
        longitude: -99.128609
    },
    zoom: 12
  };

 $scope.request = $http({
    method: 'GET', 
    url: 'http://172.16.1.128/getDistricts',
    params: {
      area: 'LINDAVISTA'
    }
  });

  $scope.polygons = [];
  $scope.request.success(function(data) 
  {// this callback will be called asynchronously 

      for(var i = 0; i<data.length; i++){
        tmp = (JSON.parse(data[i].json));
        var aux = [];  
        for(var j = 0; j < tmp.coordinates[0][0].length; j++){
          aux.push({
            latitude: tmp.coordinates[0][0][j][1],  
            longitude: tmp.coordinates[0][0][j][0]
            });
        }

        $scope.polygons.push({
          id: i,
          path: aux,
          stroke: {
                    color: '#ff0000',
                    weight: 0,
                    opacity: 1
                },
                editable: true,
                geodesic: false,
                visible: true,
                fill: {
                    color: '#ff0000',
                    opacity: 0.8
                }
        });
        
    }

    console.log($scope.polygons);

  });

  //console.log(districts);

})

;
