var myStudentApp = angular.module('myStudentApp', ['ngRoute', 'ngAnimate']);

myStudentApp.config(['$routeProvider', function($routeProvider){

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'StudentController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactController'
    })
    .when('/contact-success', {
      templateUrl: 'views/contact-success.html',
      controller: 'ContactController'
    })
    .when('/directory', {
      templateUrl: 'views/directory.html',
      controller: 'StudentController'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);

myStudentApp.directive('randomStudent', [function(){

  return {
    restrict: 'E',
    scope: {
      students:'=',
      title:'=',
    },
    templateUrl: 'views/random.html',
    transclude: true,
    replace: true,
    controller: function($scope){
      $scope.random = Math.floor(Math.random() * 6);
    }
  };

}]);

myStudentApp.controller('StudentController', ['$scope', '$http', function($scope, $http){

  $scope.studentRemove = function(student){
    var removedStudent = $scope.students.indexOf(student);
    $scope.students.splice(removedStudent, 1);
  };

  $scope.removeAll = function(){
      $scope.students = [];
  };

    $scope.addStudent = function(){
    var enrolledVar, statusVar;
    if($scope.newStudent.enrolled == 'yes'){
      enrolledVar = true;
    }else{
      enrolledVar = false;
    }

    if($scope.newStudent.balance < 5000){
        statusVar = "green";
    }else if($scope.newStudent.balance > 5001 && $scope.newStudent.balance < 10000){
        statusVar = "yellow";
    }else{
        statusVar = "red";
    }
      $scope.students.push({
      firstName: $scope.newStudent.firstName,
      lastName: $scope.newStudent.lastName,
      studentID: parseInt($scope.newStudent.studentID),
      balance: parseInt($scope.newStudent.balance),
      enrolled: enrolledVar,
      status: statusVar
    });

    $scope.newStudent.firstName = "";
    $scope.newStudent.lastName = "";
    $scope.newStudent.studentID = "";
    $scope.newStudent.balance = "";
    $scope.newStudent.enrolled = "";
  }

$http.get('data/students.json').then(function(response){
  console.log("JSON data successfully passed...")
  var data = response.data;
  var status = response.status;
  var statusText = response.statusText;
  var headers = response.headers;
  var config = response.config;

  console.log("status: " + status + " - " + statusText);
  $scope.students = data;
});

}]);

myStudentApp.controller('ContactController', ['$scope', '$location', function($scope, $location){

  $scope.sendMessage = function(){
    $location.path('contact-success');
  };

}]);
