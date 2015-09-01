'use strict';

/**
 * @ngdoc overview
 * @name blocGoalsAppApp
 * @description
 * # blocGoalsAppApp
 *
 * Main module of the application.
 */
angular.module('blocGoalsAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular',
    'ngFileUpload',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/goals/add', {
        templateUrl: 'views/add.html',
        controller: 'GoalCtrl',
        controllerAs: 'goal'
      })
      .when('/goals/:goal_id', {
        templateUrl: 'views/goal.html',
        controller: 'GoalCtrl',
        controllerAs: 'goal'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
