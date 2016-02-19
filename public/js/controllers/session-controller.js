foodApp.controller("sessionController", ['$scope', 'session', function($scope, session) {
  $scope.user = {};
  initUser(session.getAuth());

  $scope.user.login = function () {
    session.loginWithOAuthPopup(function(authData) {
      initUser(authData);
    }, function(error) {
      console.log("Authentication failed:", error);
      initUser();
    });
  };

  $scope.user.logout = function () {
    session.logout();
    initUser();
  };

  function initUser(authData) {
    var auth = session.getAuth();
    if (authData) {
      $scope.user.isLoggedIn = !!auth;
      $scope.user.authDetails = auth;
      $scope.user.displayName = auth.google.displayName;
    } else {
      session.logout();
      $scope.user.isLoggedIn = false;
      $scope.user.authDetails = {};
    }
  }
}]);
