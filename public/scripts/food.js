var foodApp = angular.module("food", ["firebase"]);

foodApp.factory('db', [function() {
  var root = new Firebase('https://fooddb.firebaseio.com/');
  var recipes = root.child('recipes');

  return {
    root: root,
    recipes: recipes
  };
}]);

// https://www.firebase.com/docs/web/libraries/angular/quickstart.html#section-authentication
foodApp.factory('session', ['db', function(db) {
  return {
    auth: db.root.getAuth(),
    logout: db.root.unauth,
    authWithOAuthPopup: db.root.authWithOAuthPopup
  };
}]);

foodApp.controller("foodController", function($scope, $firebaseObject, $firebaseArray) {
  var rootRef = new Firebase("https://fooddb.firebaseio.com/");
  var recipeRef = rootRef.child('recipes');

  $scope.recipe = {name: ''};
  $scope.recipes = $firebaseArray(recipeRef);

  $scope.addRecipe = function (recipe) {
    $scope.recipes.$add(recipe);
    return true;
  }

  $scope.clearInput = function () {
    $scope.recipe.name = '';
  }
});

foodApp.controller("sessionController", function($scope, session) {

});

/*
// (function(){
  var $userPanel = $('#userPanel');
  var db = {};
  db.root = new Firebase('https://fooddb.firebaseio.com/');
  db.recipes = db.root.child('recipes');

  validateUser();

  var $name = $('#recipeName');
  var $description = $('#recipeDescription');
  var $recipeList = $('#recipeList');

  $('input[type="text"]').on('keydown', function (e) {
    if (e.keyCode == 13) {
      console.log('input registered!');
      var name = $name.val();
      var description = $description.val();
      db.recipes.push({name: name, description: description});
      $name.val('');
      $description.val('');
    }
  });

  db.recipes.on('child_added', function(snapshot) {
    var recipe = snapshot.val();
    displayRecipe(recipe.name, recipe.description);
  });

  function displayRecipe(name, description) {
    $('<li/>').text(name + ': ' + description).appendTo($recipeList);
  }

  function validateUser() {

    var auth = db.root.getAuth();

    // If not logged in - prompt for login
    // else - update userPanel
    if (auth == null) {
      $userPanel.find('.status').text('Not logged in');
      $userPanel.find('.name').text('');
      $userPanel.find('.logInOut').html('<a class="logIn" href="#">log in</a>');
    } else {
      $userPanel.find('.status').text('Logged in: ');
      $userPanel.find('.name').text(auth.google.displayName);
      $userPanel.find('.logInOut').html('<a class="logOut" href="#">log out</a>');
    }
  }

  function loginWithGooglePopUp() {
    db.root.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        validateUser();
      }
    });
  }

  // event handlers
  $userPanel.on('click', function(e){
    e.preventDefault();
    $this = $(e.target);

    if ($this.hasClass('logIn')) {
      loginWithGooglePopUp();
    } else if ($this.hasClass('logOut')) {
      db.root.unauth();
      validateUser();
    }
  });

// })()
*/
