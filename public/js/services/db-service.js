foodApp.factory('db', [function() {
  var root = new Firebase('https://fooddb.firebaseio.com/');
  var recipes = root.child('recipes');

  return {
    root: root,
    recipes: recipes
  };
}]);
