foodApp.controller("foodController", ['$scope', '$firebaseArray', 'db', 'session',
function($scope, $firebaseArray, db, session) {
  $scope.setNewRecipe = setNewRecipe;
  $scope.setNewIngredient = setNewIngredient;

  $scope.setNewRecipe();
  $scope.setNewIngredient();

  // create a synchronized array
  $scope.recipes = $firebaseArray(db.recipes);

  $scope.addRecipe = function() {
    $scope.recipes.$add($scope.recipe);
  };

  function setNewRecipe() {
    $scope.recipe = {
      name: '',
      description: '',
      ingredients: []
    };
  }

  function setNewIngredient() {
    $scope.ingredient = {
      name: ''
    };
  }
}]);
