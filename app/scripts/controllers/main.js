'use strict';

/**
 * @ngdoc function
 * @name blocGoalsAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blocGoalsAppApp
 */
angular.module('blocGoalsAppApp').controller('MainCtrl', function ($scope, Restangular) {
  Restangular.setBaseUrl('http://45.55.185.19:3000');
  $scope.goals = Restangular.all('goals').getList().$object;
});
