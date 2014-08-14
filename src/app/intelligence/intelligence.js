angular.module( 'ngBoilerplate.intelligence', [
  'ui.router',
  'ui.bootstrap'
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

.controller( 'IntelligenceCtrl', function IntelligenceCtrl( $scope ) {
  // This is simple a demo for UI Boostrap.
  $scope.dropdownDemoItems = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];
})

;
