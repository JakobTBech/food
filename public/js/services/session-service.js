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

  var getUserProfile = function() {
    if (isLoggedIn()) {
      var profile = auth.$getAuth().google;
      return {
        id: profile.id,
        displayName: profile.displayName,
        image: profile.profileImageURL
      };
    }
  }

  return {
    getAuth: auth.$getAuth,
    getUserProfile: getUserProfile,
    isLoggedIn: isLoggedIn,
    loginWithOAuthPopup: loginWithOAuthPopup,
    logout: logout
  };
}]);
