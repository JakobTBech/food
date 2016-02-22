foodApp.controller("sessionController", ['$scope', 'session', function($scope, session) {
  $scope.user = {};
  initUser();

  $scope.user.login = function () {
    session.loginWithOAuthPopup(function() {
      initUser();
    }, function(error) {
      console.log("Authentication failed:", error);
      initUser();
    });
  };

  $scope.user.logout = function () {
    session.logout();
    initUser();
  };

  function initUser() {
    var auth = session.getAuth();
    if (auth) {
      $scope.user.isLoggedIn = !!auth;
      $scope.user.authDetails = auth;
      $scope.user.profile = session.getUserProfile();
    } else {
      session.logout();
      $scope.user.isLoggedIn = false;
      $scope.user.authDetails = {};
    }
  }
}]);
