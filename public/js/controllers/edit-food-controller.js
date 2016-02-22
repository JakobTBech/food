foodApp.controller("editFoodController", ['$scope', '$firebaseObject', 'db', '$routeParams',
function($scope, $firebaseObject, db, $routeParams) {
  var recipeId = $routeParams.recipeId;
  var $recipe = $firebaseObject(db.recipes.child(recipeId));

  $scope.alerts = [];
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.setNewIngredient = setNewIngredient;

  $scope.setNewIngredient();

  // create a synchronized array
  $recipe.$bindTo($scope, 'recipe')
    .then(function(data){
      if ($scope.recipe.name.length > 0) {
      
      } else {
        $scope.alerts.push({ text: 'Opskriften skal have et navn!' })
      }
    })
    .catch(function(error) {
      console.error("Error:", error);
    });

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
