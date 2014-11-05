angular.module( 'ngBoilerplate.auth', [
  'ui.router',
  'ui.bootstrap',
  'ngCookies'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'auth', {
    url: '/auth',
    views: {
      "main": {
        controller: 'AuthCtrl',
        templateUrl: 'auth/auth.tpl.html'
      }
    },
    data:{ pageTitle: 'Iniciar Sesión' }
  });
  
})

.controller( 'AuthCtrl', function CommunicationsCtrl( $scope, $http, $cookieStore, $location ) {
  // This is simple a demo for UI Boostrap.
	$scope.login = function(){
		console.log('Im here');
		var credentials = {
			user: 'juan',
			password: 'juan'
		};
		
		/*
		
		var request = $http({
			method: 'post',
			url: 'http://187.217.179.36:8091/user/auth',
			params: {
				user: credentials.user,
				password: credentials.password
          }
		
		});
		*/
		//request.success(function(data){
			//$cookies.session = data;
			$cookieStore.put ('layers', false);
			$cookieStore.put ('competition', false);
			$cookieStore.put ('realTime', true);
			$cookieStore.put ('cMap', true);
			$location.path('/intelligence');
			//$urlRouterProvider.otherwise( '/home' );
			//console.log($cookieStore.get('permissions'));
		//	});
		//request.error(function(){
			//alert('Ha habido un problema');
			//});
	};
})

;
