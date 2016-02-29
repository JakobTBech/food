foodApp.controller("editFoodController", ['$scope', 'recipe', '$routeParams',
function($scope, recipe, $routeParams) {
  var recipeId = $routeParams.recipeId;
  $scope.recipe = new recipe.Recipe(recipeId);
  $scope.closeAlert = closeAlert;
  $scope.alerts = [];

  function closeAlert(index) {
    $scope.alerts.splice(index, 1);
  }
}]);
