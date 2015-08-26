'use strict';

/**
 * @ngdoc function
 * @name blocGoalsAppApp.controller:GoalCtrl
 * @description
 * # GoalCtrl
 * Controller of the blocGoalsAppApp
 */
angular.module('blocGoalsAppApp').controller('GoalCtrl', function($scope, Restangular, $routeParams) {
  window.restangular = Restangular;
  window.scope = $scope;

  Restangular.setBaseUrl('http://127.0.0.1:3000');
  $scope.goal_id = $routeParams.goal_id;
  
  $scope.goal = Restangular.one("goals", $scope.goal_id).get().then(function(goal){
    $scope.goal = goal;
    $scope.steps = goal.steps;
  });

  var baseGoals = Restangular.all('goals.json');
  $scope.newGoal = {};
  $scope.newGoal.steps = [{}];

  $scope.today = function() {
    $scope.newGoal.due_date = new Date();
    $scope.newGoal.steps[0].due_date = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.newGoal.due_date = null;
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.calendar = {
    opened: {},
    dateFormat: 'dd-MMMM-yyyy',
    dateFormatShort: 'dd-MM-yy',
    dateOptions: {
      startingDay: 1
    },
    open: function($event, datepicker) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.calendar.opened[datepicker] = true;
    } 
  };

  $scope.addAnotherStep = function() {
    var newStepNo = $scope.newGoal.steps.length;
    console.log(newStepNo);
    $scope.newGoal.steps.push({});
    $scope.newGoal.steps[newStepNo].due_date = new Date();
  };

  $scope.addGoal = function() {
    baseGoals.post($scope.newGoal);
    $scope.newGoal = {};
    $scope.newGoal.steps = [{}];
  };

});
