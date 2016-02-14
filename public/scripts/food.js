var dataRef = new Firebase('https://fooddb.firebaseio.com/');
var recipesRef = dataRef.child('recipes');

var $name = $('#recipeName');
var $description = $('#recipeDescription');
var $recipeList = $('#recipeList');

$('input[type="text"]').on('keydown', function (e) {
  if (e.keyCode == 13) {
    console.log('input registered!');
    var name = $name.val();
    var description = $description.val();
    recipesRef.push({name: name, description: description});
    $name.val('');
    $description.val('');
  }
});

recipesRef.on('child_added', function(snapshot) {
  var recipe = snapshot.val();
  displayRecipe(recipe.name, recipe.description);
});

function displayRecipe(name, description) {
  $('<li/>').text(name + ': ' + description).appendTo($recipeList);
}
