var foodApp = angular.module('food', ['firebase', 'ui.bootstrap', 'ngRoute']);

foodApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'views/home.html',
      controller: 'homeController'
    }).
    when('/food', {
      templateUrl: 'views/food.html',
      controller: 'foodController'
    }).
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'foodController'
    }).
    otherwise({
        redirectTo: '/'
      });
}]);

// intercept route changes and check if user is logged in
foodApp.run(['$rootScope', '$location', 'session', '$timeout', function ($rootScope, $location, session, $timeout) {
  $rootScope.$on('$routeChangeStart', function (event) {
    // When user is not logged in and they're not on the home page
    // then redirect the user to the login page
    if (!session.isLoggedIn() && $location.path() !== '/' && $location.path() !== '/login') {
      $timeout(function(){
        console.log('User NOT authenticated - Redirecting to Login');
        event.preventDefault();
        $location.path('/login');
      },1);
    }
  });
}]);
