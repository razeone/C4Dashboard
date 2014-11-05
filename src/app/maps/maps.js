angular.module( 'ngBoilerplate.maps', [
  'ui.router',
  'ui.bootstrap',
  'google-maps'
])

.config(function config( $stateProvider, $urlRouterProvider ) {
  $stateProvider
  .state( 'maps', {
    url: '/maps',
    views: 
{      "main": {
        controller: 'MapsCtrl',
        templateUrl: 'maps/maps.tpl.html'
      }
    },
    data:{ pageTitle: 'Mapas' }
  });
})

.controller( 'MapsCtrl', function MapsCtrl( $scope, $http ) {
/*
  // This is simple a demo for UI Boostrap.

  var N = [];
  var RT = [];
  var RR = [];
  var RE = [];
  var RU = [];
  $scope.polygonArray = [];

  var getColor = function(state){
    switch(state){
      case 1:
        return '#ff0000';
        
      case 2:
        return '#00ffff';
        
      case 3:
        return '#ff0000';
    }
  };

  function sleep(millis, callback) {
    setTimeout(function()
            { callback(); }, millis);
  }

  var parseGeoJSON = function(data){// this callback will be called asynchronously 
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
                    color: '#ffffff',
                    weight: 0,
                    opacity: 1
                },
                editable: true,
                geodesic: false,
                visible: true,
                fill: {
                    color: getColor(7),
                    opacity: 0.8
                }
        });
        
    }

  function onError(error){
    alert('Ha habido un error al recuperar los estados iniciales '+error);
  }

        $scope.request = $http({
      method: 'GET', 
      url: 'http://187.217.179.36:443/quejas/divisiones/'
    });
    $scope.request.success(function(data) {
      // this callback will be called asynchronously
           for(var k = 0; k<data.length; k++){
            $scope.polygonArray.push({
              id: data[k].id,
              path: null,
              editable: true,
              geodesic: false,
              visible: true,
              fill: {
                color: getColor(data[k].status),
                opacity: 0.8
              }
            });
           }
          //console.log($scope.polygonArray);
    });

    $scope.request.error(function(data, status, headers, config, error) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert('Ha habido un error al recuperar los estados iniciales '+error);
    });


    $scope.request = $http({
      method: 'GET', 
      url: 'http://187.217.179.36/getStatesByDivision',
      params: {
        division: 'N'
      }
    });
    $scope.request.success(function(data) 
{      // this callback will be called asynchronously
     
        for(var i = 0; i<data.length; i++){
          tmp = (JSON.parse(data[i].json));
          for(var j = 0; j < tmp.coordinates[0][0].length; j++){
            N.push({
              latitude: tmp.coordinates[0][0][j][1],  
              longitude: tmp.coordinates[0][0][j][0]
              });
          }
      }


    });
    $scope.request.error(function(data, status, headers, config, error) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert('Ha habido un error al recuperar esta geografía '+error);
    });


    $scope.request = $http({
      method: 'GET', 
      url: 'http://187.217.179.36/getStatesByDivision',
      params: {
        division: 'RT'
      }
    });
    $scope.request.success(function(data) {
      // this callback will be called asynchronously
     
        for(var i = 0; i<data.length; i++){
          tmp = (JSON.parse(data[i].json));
          for(var j = 0; j < tmp.coordinates[0][0].length; j++){
            RT.push({
              latitude: tmp.coordinates[0][0][j][1],  
              longitude: tmp.coordinates[0][0][j][0]
              });
          }
      }

    });
    $scope.request.error(function(data, status, headers, config, error) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert('Ha habido un error al recuperar esta geografía '+error);
    });

 $scope.request = $http({
      method: 'GET', 
      url: 'http://187.217.179.36/getStatesByDivision',
      params: {
        division: 'RE'
      }
    });
    $scope.request.success(function(data) {
      // this callback will be called asynchronously
     
        for(var i = 0; i<data.length; i++){
          tmp = (JSON.parse(data[i].json));
          for(var j = 0; j < tmp.coordinates[0][0].length; j++){
            RE.push({
              latitude: tmp.coordinates[0][0][j][1],  
              longitude: tmp.coordinates[0][0][j][0]
              });
          }
      }

    });
    $scope.request.error(function(data, status, headers, config, error) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert('Ha habido un error al recuperar esta geografía '+error);
    });


     $scope.request = $http({
      method: 'GET', 
      url: 'http://187.217.179.36/getStatesByDivision',
      params: {
        division: 'RR'
      }
    });
    $scope.request.success(function(data) {
      // this callback will be called asynchronously
     
        for(var i = 0; i<data.length; i++){
          tmp = (JSON.parse(data[i].json));
          for(var j = 0; j < tmp.coordinates[0][0].length; j++){
            RR.push({
              latitude: tmp.coordinates[0][0][j][1],  
              longitude: tmp.coordinates[0][0][j][0]
              });
          }
      }

    });
    $scope.request.error(function(data, status, headers, config, error) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert('Ha habido un error al recuperar esta geografía '+error);
    });

         $scope.request = $http({
      method: 'GET', 
      url: 'http://187.217.179.36/getStatesByDivision',
      params: {
        division: 'RU'
      }
    });
    $scope.request.success(function(data) {
      // this callback will be called asynchronously
     
        for(var i = 0; i<data.length; i++){
          tmp = (JSON.parse(data[i].json));
          for(var j = 0; j < tmp.coordinates[0][0].length; j++){
            RU.push({
              latitude: tmp.coordinates[0][0][j][1],  
              longitude: tmp.coordinates[0][0][j][0]
              });
          }
      }

     // var cooHash = {0: RT, 1: RE, 2: RR, 3: RU, 4: N};

      //console.log(cooHash[0]);

      sleep(500, function(){
        $scope.polygons = [
            {
                id: 1,
                path: RT,
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
            },
             {
                id: 2,
                path: RE,
                stroke: {
                    color: '#ff0000',
                    weight: 0,
                    opacity: 1
                },
                editable: true,
                geodesic: false,
                visible: true,
                fill: {
                    color: '#00ff00',
                    opacity: 0.8
                }
              },
               {
                id: 3,
                path: RR,
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
            },
             {
                id: 4,
                path: RU,
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
            },
             {
                id: 5,
                path: N,
                stroke: {
                    color: '#ff0000',
                    weight: 0,
                    opacity: 1
                },
                editable: true,
                geodesic: false,
                visible: true,
                fill: {
                    color: '#ffff00',
                    opacity: 0.8
                }
            }
        ];

        //console.log($scope.polygons);

      });



      
    });
    $scope.request.error(function(data, status, headers, config, error) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert('Ha habido un error al recuperar esta geografía '+error);
    });





  $scope.map = {
    center: {
        latitude: 23.54653,
        longitude: -102.788086
    },
    zoom: 5
  };
*/

})

;
