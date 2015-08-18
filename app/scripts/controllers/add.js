'use strict';

/**
 * @ngdoc function
 * @name blocGoalsAppApp.controller:AddCtrl
 * @description
 * # AddCtrl
 * Controller of the blocGoalsAppApp
 */
angular.module('blocGoalsAppApp').controller('AddCtrl', function($scope, Restangular) {
  window.restangular = Restangular;
  window.scope = $scope;
  $scope.message = 'This is the Add Goal View';

  Restangular.setBaseUrl('http://127.0.0.1:3000');
  
  // $scope.goal = Restangular.one("goals", $scope.goal_id).get().then(function(goal){
  //   $scope.goal = goal;
  // });
});
