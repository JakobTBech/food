foodApp.controller("foodController", ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
  var rootRef = new Firebase("https://fooddb.firebaseio.com/");
  var recipeRef = rootRef.child('recipes');

  $scope.recipe = {name: ''};
  $scope.recipes = $firebaseArray(recipeRef);

  $scope.addRecipe = function (recipe) {
    $scope.recipes.$add(recipe);
    return true;
  };

  $scope.clearInput = function () {
    $scope.recipe.name = '';
  };
}]);
