foodApp.factory('session', ['db', '$firebaseAuth', '$timeout', '$location', function(db, $firebaseAuth, $timeout, $location) {
  // create an instance of the authentication service
  var auth = $firebaseAuth(db.root);

  var isLoggedIn = function () {
    return !!auth.$getAuth();
  };

  var loginWithOAuthPopup = function(successCallback, errorCallback) {
    auth.$authWithOAuthPopup("google")
      .then(successCallback)
      .catch(errorCallback);
  };

  var logout = function() {
    auth.$unauth();

    $timeout(function(){
      $location.path('/login');
    },1);
  };

  return {
    getAuth: auth.$getAuth,
    isLoggedIn: isLoggedIn,
    loginWithOAuthPopup: loginWithOAuthPopup,
    logout: logout
  };
}]);
