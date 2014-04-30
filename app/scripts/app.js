'use strict';

/*
 * app.js
 * An example app that uses the angularjs step.
 * TODO: Move this to the html file because it's pretty much connected to that anyway.
 */

var app = angular.module('testStep', ['angular.step']);

app.run(function($rootScope) {
  $rootScope.testSubmit = function() {
    alert("You clicked submit.");
  };
});
