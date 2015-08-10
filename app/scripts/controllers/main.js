'use strict';

/**
 * @ngdoc function
 * @name blocGoalsAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blocGoalsAppApp
 */
angular.module('blocGoalsAppApp').controller('MainCtrl', function ($scope, Restangular) {
  Restangular.setBaseUrl('http://127.0.0.1:3000');
  $scope.goals = Restangular.all('goals').getList().$object;
});
