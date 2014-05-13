/*
 * Unit tests
 */


beforeEach(module('angular.step'));
beforeEach(module('partials'));

describe('Step Holder module', function() {
    
  var elm, $scope;    
    
  function createDirective(elm, $scope, $compile) {
      
  }    
    
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $scope = _$rootScope_.$new();
    var template = '<stepset><step></step></stepset>';
    _$compile_(template)($scope);
    $scope.$digest();
    
  })); 
    
    
  it('Reads div elements as steps', function() {
  });
  
  it('Displays one step at a time', function() {
  });

  it('Shows buttons for moving forward and backward', function() {
  });

  it('Will not go past the maximum number of steps', function() {
      
  });

  it('Will not go past the minimum number of steps', function() {
  });

  it('The last step will change the text of the "Next" button', function() {
  });

  it('The first step will chagne the text of the "Previous" button', function() {
  });

  it('Can use a form element for validation and will disable the final button on an invalid form', function() {
  });
});
