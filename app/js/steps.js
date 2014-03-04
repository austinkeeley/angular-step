/**
 * @ngdoc overview
 * @name angular-step
 *
 * @description
 * An AngularJS way of building clean "wizard" like applications.
 */

angular.module('angular.step', [])

.controller('StepSetController', ['$scope', function($scope) {

  var ctrl = this,
      index = -1, // points to the current step in the steps array
      steps = ctrl.steps = $scope.steps = [];

  $scope.nextEnabled = true;
  $scope.previousEnabled = false;
  $scope.submitEnabled = false;

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
    
    steps[index++].isDisplayed = false;
    steps[index].isDisplayed = true;

    ctrl.setButtons();
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
    steps[index--].isDisplayed = false;
    steps[index].isDisplayed = true;
    ctrl.setButtons();
  }; // $scope.previous

  /*
   * Sets the index
   */
  ctrl.setIndex = function(newIndex) {
    steps[index].isDisplayed = false;
    index = newIndex;
    steps[index].isDisplayed = true;
    ctrl.setButtons();
  };

  $scope.submit = function() {
    $scope.submitAction();
  };
  
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

  /*
   * Sets the correct buttons to be enabled or disabled.
   */
  ctrl.setButtons = function() {
    if (index == steps.length - 1) {
      $scope.nextEnabled = false;
      $scope.previousEnabled = true;
      $scope.submitEnabled = true;
    }
    else if (index === 0) {
      $scope.nextEnabled = true;
      $scope.previousEnabled = false;
      // This does not consider the case that there's one step
    }
    else {
      $scope.nextEnabled = true;
      $scope.previousEnabled = true;
      $scope.submitEnabled = false;
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
      nextText: '@',
      previousText: '@',
      submitText: '@',
      submitAction: '='
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
      return function postLink(scope, elm, attrs, ctrl) {
        ctrl.addStep(scope);
      };
    }
  };
}])

.directive('progressBar', [function() {
  var stepController;
  return {
    require: '^stepset',
    replace: true,
    templateUrl: 'partials/progress_bar.html',
    scope: {
    },
    controller: function($scope) {
      
      /*
       * Jumps to a step
       */
      $scope.jump = function(newIndex) {
        stepController.setIndex(newIndex);
      };

    },
    compile: function(elm, attrs, transclude) {
      return function postLink(scope, elm, attrs, ctrl) {
        stepController = ctrl;
      };
    }
  };

}])

;
