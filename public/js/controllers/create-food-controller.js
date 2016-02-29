foodApp.controller("createFoodController", ['$scope', 'recipe', function($scope, recipe) {
  $scope.closeAlert = closeAlert;
  $scope.addRecipeAndReset = addRecipeAndReset;
  $scope.recipe = new recipe.Recipe();
  $scope.recipes = recipe.allRecipes; // creates a synchronized firebase array
  $scope.alerts = [];

  function addRecipeAndReset(){
    $scope.recipe.$insert();
    $scope.recipe = new recipe.Recipe();
  }

  function closeAlert(index) {
    $scope.alerts.splice(index, 1);
  }

}]);
