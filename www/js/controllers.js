angular.module('moviez.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  // $scope.loginData = {};

  // // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // // Triggered in the login modal to close it
  // $scope.closeLogin = function() {
  //   $scope.modal.hide();
  // };

  // // Open the login modal
  // $scope.login = function() {
  //   $scope.modal.show();
  // };

  // // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   console.log('Doing login', $scope.loginData);

  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };
})

.controller('RecentMoviesCtrl', function($scope) {
  $scope.recent_movies = JSON.parse(localStorage.getItem('recent_movies'));
})

.controller('SearchCtrl', function($scope, $http) {
  $scope.search = {};

  $scope.search = function() {
    console.log($scope.search.title);
    $scope.error = null;
    $scope.movies = [];

    $http.get('http://www.omdbapi.com/?t=' + $scope.search.title + '&plot=long&r=json&t=').
      success(function(data, status, headers, config) {
        if (data.Response == "False") {
          $scope.error = data.Error;
        } else {
          $scope.movies = [data]
          
          //Fetching Recent Movies
          $scope.recent_movies = JSON.parse(localStorage.getItem('recent_movies'));
          if ($scope.recent_movies == null) {
            $scope.recent_movies = [];
          }
          console.log(data);

          //preventing dups
          if (data.Title != $scope.recent_movies[0].Title) {
            //Add Movie to Recent Movies
            $scope.recent_movies.unshift(data);
            localStorage.setItem('recent_movies', JSON.stringify($scope.recent_movies));
          }
        }
      })
  }
});