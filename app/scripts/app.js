'use strict';

/*
 * app.js
 * An example app that uses the angularjs step.
 */

var app = angular.module('testStep', ['angular.step']);

app.run(function($rootScope) {
  $rootScope.testSubmit = function() {
    alert("You clicked submit.");
  };
});
