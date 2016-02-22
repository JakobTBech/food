foodApp.controller("createFoodController", ['$scope', '$firebaseArray', 'db',
function($scope, $firebaseArray, db) {
  $scope.alerts = [];
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.setNewRecipe = setNewRecipe;
  $scope.setNewIngredient = setNewIngredient;

  $scope.setNewRecipe();
  $scope.setNewIngredient();

  // create a synchronized array
  $scope.recipes = $firebaseArray(db.recipes);

  $scope.addRecipe = function() {
    if ($scope.recipe.name.length > 0) {
      $scope.recipe.createdBy = $scope.user.profile;
      $scope.recipe.created = (new Date()).toISOString();
      $scope.recipes.$add($scope.recipe);
    } else {
      $scope.alerts.push({ text: 'Opskriften skal have et navn!' })
    }
  };

  function setNewRecipe() {
    $scope.recipe = {
      name: '',
      description: '',
      ingredients: [],
      created: null,
      createdBy: ''
    };
  }

  function setNewIngredient() {
    $scope.ingredient = {
      name: ''
    };
  }

  $scope.removeIngredient = function(event, index) {
    event.preventDefault();
    $scope.recipe.ingredients.splice(index,1);
  }

}]);
