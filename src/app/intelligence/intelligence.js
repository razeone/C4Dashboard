angular.module( 'ngBoilerplate.intelligence', [
  'ui.router',
  'ui.bootstrap',
  'google-maps',
  'btford.socket-io',
  'ngCookies'
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
  var myIoSocket = io.connect('http://187.217.179.36:443');
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  return mySocket;
})

.controller('IntelligenceCtrl', function IntelligenceCtrl($scope,$http, mySocket, ngProgress, $cookieStore){
  
  //Retrive permissions from cookie
  $scope.permissions = $cookieStore.get('permissions');
  $scope.competition = $cookieStore.get('competition');
  $scope.realTime = $cookieStore.get('realTime');
  $scope.cMap = $cookieStore.get('cMap');

  //console.log('Cookie: ' + $scope.permissions);

  ngProgress.color('#428BCA');
  ngProgress.height('5px');
  $scope.polygons = [];
  $scope.index = 0;
  var N = [];
  var RT = [];
  var RR = [];
  var RE = [];
  var RU = [];
  $scope.layerMap = {
    ftth: [],
    ipdslam: [],
    tba: [],
    cablevision: [],
    maxcom: [],
    axtel: [],
    total: [],
    divisiones: {}
  };
  $scope.map = {
    center: {
        latitude: 19.493098,
        longitude: -99.128609
    },
    zoom: 12
  };

  //Functions for this controller

  function sleep(millis, callback) {
    setTimeout(function()
            { callback(); }, millis);
  }

  var getGeoJSON = function(tipo, layer, color, params){
    var config;
    switch(tipo){
      case 'infra':
        config = {
          metodo : 'GET',
          endpoint: 'http://187.217.179.36/getInfrastructure'
        };
        break;
      case 'divisiones':
        config = {
          metodo : 'GET',
          endpoint: 'http://187.217.179.36/getGeoDivisions'
        };
        break;
      case 'competencia':
        config = {
          metodo : 'GET',
          endpoint: 'http://187.217.179.36/getCompetition'
        };
        break;
      case 'distritos':
        config = {
          metodo : 'GET',
          endpoint: 'http://187.217.179.36/getDistricts'
        };
        break;
    }

    $scope.geomRequest = $http({
      method: config.metodo,
      url: config.endpoint,
      params: params
    });

    $scope.geomRequest.success(function(data){
      drawGeoJSON(data, layer, color);
      return true;
    });

    $scope.geomRequest.error(function(e){
      console.log('Error: '+ e);
    });

  };

  var getColor = function(state){
    //state = Math.floor((Math.random() * 3) + 1); 
    //console.log(state);
    switch(state){
      case 1:
        return '#00ff00';
        
      case 2:
        return '#ffff00';
        
      case 3:
        return '#ff0000';

    }
  };

  var drawGeoJSON = function(data, layer, color){// this callback will be called asynchronously 
      
      for(var i = 0; i< data.length; i++){
        var tmp = (JSON.parse(data[i].json));
        var aux = [];  
        for(var j = 0; j < tmp.coordinates[0][0].length; j++){
          aux.push({
            latitude: tmp.coordinates[0][0][j][1],  
            longitude: tmp.coordinates[0][0][j][0]
            });
        }

        $scope.polygons.push({
          id: layer + i,
          path: aux,
          stroke: {
                    color: '#585858',
                    weight: 0,
                    opacity: 1
                },
                editable: true,
                geodesic: false,
                visible: true,
                fill: {
                    color: color,
                    opacity: 0.8
                }
        });

        $scope.layerMap[layer].push(layer + i);

    }

    $scope.index += i;

    ngProgress.set(100);
    ngProgress.complete();
    return $scope.index;
  };

  var errorRequesting = function(){
    alert('Ha habido un error al recuperar la geografía solicitada');
  };

  $scope.$watch('ftth', function(newValue, oldValue){
    
    if(newValue === true){
      if($scope.layerMap.ftth.length > 0){
        ngProgress.start();
        //console.log($scope.layerMap['ftth']);
        for(var j in $scope.layerMap['ftth']){
          $scope.polygons[j].visible = true;
        }
        ngProgress.complete();
      }
      else{
        ngProgress.start();
        var params = {
          area : 'LINDAVISTA',
          tecnologia: 'ftth'
        };
      ftth = getGeoJSON('infra', 'ftth', '#5858FA', params);
      }
    }
    else{
      if($scope.layerMap.ftth.length > 0){
        ngProgress.start();
        console.log($scope.layerMap['ftth']);
        for(var i in $scope.layerMap['ftth']){
          $scope.polygons[i].visible = false;
        }
        ngProgress.complete();
      }
    }
    //console.log($scope.layerMap);
    
    //console.log('Chido: ' +newValue + ' ' + oldValue);
  });

  $scope.$watch('ipdslam', function(newValue, oldValue){


    if(newValue === true){
      if($scope.layerMap.ipdslam.length > 0){
        ngProgress.start();
        console.log($scope.layerMap['ipdslam']);
        for(var j in $scope.layerMap['ipdslam']){
          $scope.polygons[j].visible = true;
        }
        ngProgress.complete();
      }
      else{
        ngProgress.start();
        var params = {
          area : 'LINDAVISTA',
          tecnologia: 'ipdslam'
        };
      ipdslam = getGeoJSON('infra', 'ipdslam', '#40FF00', params);
      }
    }
    else{
      if($scope.layerMap.ipdslam.length > 0){
        ngProgress.start();
        console.log($scope.layerMap['ipdslam']);
        for(var i in $scope.layerMap['ipdslam']){
          $scope.polygons[i].visible = false;
        }
        ngProgress.complete();
      }
    }

   // console.log($scope.layerMap);

  });

  $scope.$watch('tba', function(newValue, oldValue){

    if(newValue === true){
      if($scope.layerMap.tba.length > 0){
        ngProgress.start();
        console.log($scope.layerMap['tba']);
        for(var j in $scope.layerMap['tba']){
          $scope.polygons[j].visible = true;
        }
        ngProgress.complete();
      }
      else{
        ngProgress.start();
        var params = {
          area : 'LINDAVISTA',
          tecnologia: 'tba'
        };
      tba = getGeoJSON('infra', 'tba', '#0040FF', params);
      }
    }
    else{
      if($scope.layerMap.tba.length > 0){
        ngProgress.start();
        console.log($scope.layerMap['tba']);
        for(var i in $scope.layerMap['tba']){
          console.log($scope.polygons[i]);
          $scope.polygons[i].visible = false;
        }
        ngProgress.complete();
      }
    }

    //console.log($scope.layerMap);

  });

  $scope.$watch('cablevision', function(newValue, oldValue){

    if(newValue === true){
      if($scope.layerMap.cablevision.length > 0){
        ngProgress.start();
        console.log($scope.layerMap['cablevision']);
        for(var j in $scope.layerMap['cablevision']){
          $scope.polygons[j].visible = true;
        }
        ngProgress.complete();
      }
      else{
        ngProgress.start();
        var params = {
          vendor: 'CABLEVISION'
        };
      cablevision = getGeoJSON('competencia', 'cablevision', '#ff5800', params);
      }
    }
    else{
      if($scope.layerMap.cablevision.length > 0){
        ngProgress.start();
        console.log($scope.layerMap['cablevision']);
        for(var i in $scope.layerMap['cablevision']){
          console.log($scope.polygons[i]);
          $scope.polygons[i].visible = false;
        }
        ngProgress.complete();
      }
    }

    //console.log($scope.layerMap);

  });

  $scope.$watch('maxcom', function(newValue, oldValue){

    if(newValue === true){
      if($scope.layerMap.maxcom.length > 0){
        ngProgress.start();
        console.log($scope.layerMap['maxcom']);
        for(var j in $scope.layerMap['maxcom']){
          $scope.polygons[j].visible = true;
        }
        ngProgress.complete();
      }
      else{
        ngProgress.start();
        var params = {
          vendor: 'MAXCOM'
        };
      maxcom = getGeoJSON('competencia', 'maxcom', '#ca0040', params);
      }
    }
    else{
      if($scope.layerMap.maxcom.length > 0){
        ngProgress.start();
        console.log($scope.layerMap['maxcom']);
        for(var i in $scope.layerMap['maxcom']){
          console.log($scope.polygons[i]);
          $scope.polygons[i].visible = false;
        }
        ngProgress.complete();
      }
    }

    //console.log($scope.layerMap);

  });

  $scope.$watch('axtel', function(newValue, oldValue){

    if(newValue === true){
      if($scope.layerMap.axtel.length > 0){
        ngProgress.start();
        console.log($scope.layerMap['axtel']);
        for(var j in $scope.layerMap['axtel']){
          $scope.polygons[j].visible = true;
        }
        ngProgress.complete();
      }
      else{
        ngProgress.start();
        var params = {
          vendor: 'AXTEL'
        };
      axtel = getGeoJSON('competencia', 'axtel', '#0B610B', params);
      }
    }
    else{
      if($scope.layerMap.axtel.length > 0){
        ngProgress.start();
        console.log($scope.layerMap['axtel']);
        for(var i in $scope.layerMap['axtel']){
          console.log($scope.polygons[i]);
          $scope.polygons[i].visible = false;
        }
        ngProgress.complete();
      }
    }

    //console.log($scope.layerMap);

  });

  $scope.$watch('total', function(newValue, oldValue){

    if(newValue === true){
      if($scope.layerMap.total.length > 0){
        ngProgress.start();
        console.log($scope.layerMap['total']);
        for(var j in $scope.layerMap['total']){
          $scope.polygons[j].visible = true;
        }
        ngProgress.complete();
      }
      else{
        ngProgress.start();
        var params = {
          vendor: 'TOTALPLAY'
        };
      total = getGeoJSON('competencia', 'total', '#380B61', params);
      }
    }
    else{
      if($scope.layerMap.total.length > 0){
        ngProgress.start();
        console.log($scope.layerMap['total']);
        for(var i in $scope.layerMap['total']){
          console.log($scope.polygons[i]);
          $scope.polygons[i].visible = false;
        }
        ngProgress.complete();
      }
    }

    //console.log($scope.layerMap);

  });

  $scope.clearPolygons = function(){
    $scope.polygons = [];
    $scope.ftth = false;
    $scope.ipdslam = false;
    $scope.tba = false;
    ngProgress.complete();
  };

  $scope.clearPolygonsC = function(){
    $scope.polygons = [];
    $scope.cablevision = false;
    $scope.maxcom = false;
    $scope.total = false;
    $scope.axtel = false;
    ngProgress.complete();
  };

  $scope.$watch('quejas', function(newValue, oldValue){

    $scope.polygons = [];

    if(newValue === true){

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

      $scope.request.success(function(data){
        mySocket.on('connect', function(){
      //mySocket.emit('subscribe', 'quejas');
          console.log('Connected');
        });

        mySocket.on('divisiones', function(data){
      //console.log(data);
         for(var k in data){
          $scope.polygons[k].fill.color = getColor(data[k].status);
         }

        });
      });

      $scope.map = {
      center: {
          latitude: 23.54653,
          longitude: -102.788086
      },
      zoom: 5
      };

    }
  });

  $scope.$watch('bajas', function(newValue, oldValue){

    

  });


mySocket.on('connect', function(){
  //mySocket.emit('filtros', )
  var filters = {
    endpoint: 'os'
  };
  mySocket.emit('subscribe', 'quejas');
});

mySocket.on('divisiones', function(data){
  
});
  //console.log(districts);

})

;
