/**
 * @ngdoc overview
 * @name angular-step
 *
 * @description
 * An AngularJS way of building clean "wizard" like applications.
 */


// As a sidenote, I've used the angular-ui bootstrap module as
// a model for how to write this.
angular.module('angular.step', [])

.controller('StepSetController', ['$scope', function($scope) {
  var ctrl = this,
      index = -1, // points to the current step in the steps array
      steps = ctrl.steps = $scope.steps = [];

  /*
   * Moves to the next step
   */
  $scope.next = function() {
    if (steps.length === 0) {
      console.debug('No steps provided.');
      return;
    }

    // If we're at the last step, then stay there.
    if (index == steps.length-1) {
      console.debug('At last step.');
      return;
    }
    else {
      steps[index].isDisplayed = false;
      index++;
      steps[index].isDisplayed = true;
    }
  }; // $scope.next

  /*
   * Moves to the previous step
   */
  $scope.previous = function() {
    if (steps.length === 0) {
      console.debug('No steps provided.');
      return;
    }

    if (index === 0) {
      console.debug('At first step');
      return;
    }
    else {
      steps[index].isDisplayed = false;
      index--;
      steps[index].isDisplayed = true;
    }
  }; // $scope.previous

  /*
   * Adds a step to the end of the step list and
   * sets the index to 0 if it's the first step added.
   */
  ctrl.addStep = function(obj) {
    ctrl.steps.push(obj);
    if (index == -1) {
      index = 0;
      steps[0].isDisplayed = true;
    }
  };

}])

/**
 * @ngdoc directive
 * @name stepset
 * @restrict EA TODO: This may or may not be correct.
 *
 * @description
 * Stepset is the outer container for a set of ordered steps.
 * @example
 * TODO: Put example here.
 */
.directive('stepset', function() {
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
    },
    controller: 'StepSetController',
    templateUrl: 'partials/stepset.html',
    link: function(scope, element, attrs) {
      // TODO put link related things here.
    }
  };
})


/**
 * @ngdoc directive
 * @name step
 * @restrict EA TODO: this may or may not be correct
 *
 * @description
 * A Step is a single item that is displayed in the step set.
 * @example
 * TODO: put example here.
 */
.directive('step', ['$parse', function($parse) {
  var d = this;
  return {
    require: '^stepset',
    restrict: 'EA', // TODO: see above
    replace: true,
    templateUrl: 'partials/step.html',
    transclude: true,
    scope: {
      title: '@',
      description: '@'
    },
    controller: function($scope) {
      // Determines if it should be displayed.  The stepset directive
      // controller needs to make sure only one shows up at a time.
      $scope.isDisplayed = false;
    },
    compile: function(elm, attrs, transclude) {
      console.log("in compile");
      return function postLink(scope, elm, attrs, ctrl) {
        console.log(ctrl);
        ctrl.addStep(scope);
      
      };
    }
  };
}])

;
