angular.module( 'ngBoilerplate.intelligence', [
  'ui.router',
  'ui.bootstrap',
  'google-maps',
  'btford.socket-io'
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

.factory('mySocket', function (socketFactory) {
  var myIoSocket = io.connect('http://localhost:3000');
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  return mySocket;
})

.controller('IntelligenceCtrl', function IntelligenceCtrl($scope,$http, mySocket, ngProgress){
  ngProgress.color('#428BCA');
  ngProgress.height('5px');

  $scope.map = {
    center: {
        latitude: 19.493098,
        longitude: -99.128609
    },
    zoom: 12
  };

  $scope.$watch('quejas', function(newValue, oldValue){
    if($scope.quejas){
      ngProgress.start();
      if($scope.polygons.length > 1){
        for(var i in $scope.polygons){
        $scope.polygons[i].visible = true;
        }
        ngProgress.set(100);
        ngProgress.complete();
      }
      else{
        $scope.request = $http({
          method: 'GET', 
          url: 'http://187.217.179.36/getDistricts',
          params: {
            area: 'LINDAVISTA'
          }
        });
        $scope.request.success(parseGeoJSON);
        $scope.request.error(errorRequesting);
      }
    }
    else{
      for(var k in $scope.polygons){
        $scope.polygons[k].visible = false;
      }
    }
  });

  console.log("Quejas " + $scope.quejas);

  $scope.polygons = [];

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
                    color: '#ffffff',
                    opacity: 0.8
                }
        });
        
    }
    //console.log(i);
    ngProgress.set(100);
    ngProgress.complete();
  };

  var errorRequesting = function(){
    alert('Ha habido un error al recuperar la geografía solicitada');
  };

mySocket.on('connect', function(){
  //mySocket.emit('filtros', )
  var filters = {
    endpoint: 'os'
  };
  mySocket.emit('filtros', filters);
});
  //console.log(districts);

})

;
