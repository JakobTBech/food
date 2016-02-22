foodApp.controller("findFoodController", ['$scope', '$firebaseArray', 'db', 'session',
function($scope, $firebaseArray, db, session) {
  // create a synchronized array
  $scope.recipes = $firebaseArray(db.recipes);
}]);
