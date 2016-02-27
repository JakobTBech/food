foodApp.controller("editFoodController", ['$scope', '$firebaseObject', 'db', '$routeParams',
function($scope, $firebaseObject, db, $routeParams) {
  // Get recipeId and fetch the recipe in firebase
  var recipeId = $routeParams.recipeId;
  var $recipe = $firebaseObject(db.recipes.child(recipeId));
  // Bind the firebase-recipe to the scope
  $recipe.$bindTo($scope, 'recipe')
    .then(function(data){
      if ($scope.recipe.name.length > 0) {

      } else {
        $scope.alerts.push({ text: 'Opskriften skal have et navn!' });
      }
    })
    .catch(function(error) {
      console.error("Error:", error);
    });

  $scope.ingredient = new Ingredient();
  $scope.removeIngredient = removeIngredient;
  $scope.addIngredient = addIngredient;
  $scope.closeAlert = closeAlert;
  $scope.alerts = [];

  // TODO: Refactor - put in a service to be shared wth other controllers
  function addIngredient($event){
    if ($event.keyCode == 13 && $scope.ingredient.name.length > 0) {
      $scope.recipe.ingredients.push($scope.ingredient);
      $scope.ingredient = new Ingredient();
    }
  }

  function closeAlert(index) {
    $scope.alerts.splice(index, 1);
  }

  // TODO: Refactor - put in a service to be shared wth other controllers
  function removeIngredient(event, index) {
    event.preventDefault();
    $scope.recipe.ingredients.splice(index,1);
  }

  // TODO: Refactor - put in a service to be shared wth other controllers
  function Ingredient() {
    this.name = '';
  }

}]);
