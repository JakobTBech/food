foodApp.factory('recipe', ['db', '$firebaseArray', '$firebaseObject', 'session',
function(db, $firebaseArray, $firebaseObject, session) {
  var recipes = $firebaseArray(db.recipes);

  function Recipe(recipeId) {
    var recipe = this;

    if (recipeId) {
      recipe = $firebaseObject(db.recipes.child(recipeId));
    } else {
      recipe.name = '';
      recipe.description = '';
      recipe.ingredients = [];
      recipe.created = null;
      recipe.createdBy = '';
    }

    // hidden ($) properties (are not saved in DB)
    recipe.$ingredient = new Ingredient();
    recipe.$addIngredient = function(){
      if (recipe.$ingredient.name.length > 0) {
        recipe.ingredients.push(recipe.$ingredient);
        recipe.$ingredient = new Ingredient();
        return true;
      }
    };
    recipe.$removeIngredient = function(index) {
      recipe.ingredients.splice(index,1);
      return true;
    };
    recipe.$insert = function() {
      if (recipe.name.length > 0) {
        recipe.createdBy = session.getUserProfile();
        recipe.created = (new Date()).toISOString();
        recipes.$add(recipe);
      } else {
        throw new Error('Opskriften skal have et navn!');
      }
    };

    return recipe;
  }

  function Ingredient() {
    this.name = '';
    this.unit = '';
    this.amount = 0;
  }

  return {
    Recipe: Recipe,
    allRecipes: recipes,
  };
}]);
