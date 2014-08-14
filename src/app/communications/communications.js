angular.module( 'ngBoilerplate.communications', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'communications', {
    url: '/communications',
    views: {
      "main": {
        controller: 'CommunicationsCtrl',
        templateUrl: 'communications/communications.tpl.html'
      }
    },
    data:{ pageTitle: 'What is It?' }
  });
})

.controller( 'CommunicationsCtrl', function CommunicationsCtrl( $scope ) {
  // This is simple a demo for UI Boostrap.
  $scope.dropdownDemoItems = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];
})

;
