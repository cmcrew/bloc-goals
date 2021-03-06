'use strict';

/**
 * @ngdoc function
 * @name blocGoalsAppApp.controller:GoalCtrl
 * @description
 * # GoalCtrl
 * Controller of the blocGoalsAppApp
 */
angular.module('blocGoalsAppApp').controller('GoalCtrl', function($scope, Restangular, $routeParams, Upload) {
  window.restangular = Restangular;
  window.scope = $scope;

  Restangular.setBaseUrl('http://45.55.185.19:3000');
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

  $scope.mainDatePicker = {
    opened: {},
    dateFormat: 'dd-MMMM-yyyy',
    dateFormatShort: 'dd-MM-yy',
    dateOptions: {
      startingDay: 1
    },
    open: function($event, dp) {
      $event.preventDefault();
      $event.stopPropagation();
      Object.keys($scope.mainDatePicker.opened).forEach(function(s){
        $scope.mainDatePicker.opened[s] = false;
      });
      $scope.mainDatePicker.opened[dp] = true;
    } 
  };

  $scope.stepDatePicker = {
    opened: {},
    dateFormat: 'dd-MMMM-yyyy',
    dateFormatShort: 'dd-MM-yy',
    dateOptions: {
      startingDay: 1
    },
    open: function($event, step) {
      $event.preventDefault();
      $event.stopPropagation();
      Object.keys($scope.stepDatePicker.opened).forEach(function(s){
        $scope.stepDatePicker.opened[s] = false;
      });
      $scope.stepDatePicker.opened[step.$$hashKey] = true;
    } 
  };

  $scope.addAnotherStep = function() {
    var newStepNo = $scope.newGoal.steps.length;
    $scope.newGoal.steps.push({});
    $scope.newGoal.steps[newStepNo].due_date = new Date();
  };


  $scope.policy = 'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogImJsb2Nnb2FscyJ9LAogICAgWyJzdGFydHMtd2l0aCIsICIka2V5IiwgIiJdLAogICAgeyJhY2wiOiAicHVibGljLXJlYWQifSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJENvbnRlbnQtVHlwZSIsICIiXSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJGZpbGVuYW1lIiwgIiJdLAogICAgWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsIDAsIDUyNDI4ODAwMF0KICBdCn0=';

  $scope.addGoal = function() {
    Upload.upload({
      url: 'https://s3-us-west-1.amazonaws.com/blocgoals/', //https://s3.amazonaws.com/blocgoals/',
      method: 'POST',
      fields : {
        key: $scope.file.name, 
        AWSAccessKeyId: 'AKIAI57CPD6KZUDVWIDQ',
        acl: 'public-read',
        policy: $scope.policy,
        signature: 'IuUO37JUsw+HVvayHm1IpflYJaw=',
        "Content-Type": $scope.file.type !== '' ? $scope.file.type : 'application/octet-stream', 
        filename: $scope.file.name
      },
      file: $scope.file,
      fileFormDataName: 'file'
    }).then(function(data){
      var key = data.config.fields.key;
      console.log('uploaded ' + key);
    });

    $scope.newGoal.image_url = 'https://s3-us-west-1.amazonaws.com/blocgoals/' + $scope.file.name;
    baseGoals.post($scope.newGoal);
    $scope.newGoal = {};
    $scope.newGoal.steps = [{}];
  };

});
