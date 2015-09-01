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

  $scope.addGoal = function(file) {
    file.upload = Upload.upload({
      url: 'https://blocgoals.s3.amazonaws.com/',
      method: 'POST',
      headers: {
        'my-header': 'my-header-value'
      },
      fields : {
        key: file.name, // the key to store the file on S3, could be file name or customized
        AWSAccessKeyId: <YOUR AWS AccessKey Id>,
        acl: 'private', // sets the access to the uploaded file in the bucket: private or public
        policy: $scope.policy, // base64-encoded json policy (see article below)
        signature: $scope.signature, // base64-encoded signature based on policy string (see article below)
        "Content-Type": file.type != '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
        filename: file.name // this is needed for Flash polyfill IE8-9
      },
      file: file,
      fileFormDataName: 'file'
    });
    baseGoals.post($scope.newGoal);
    $scope.newGoal = {};
    $scope.newGoal.steps = [{}];
  };

});
