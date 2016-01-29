angular.module('StarWarsApp')
	.controller('characterController', ['$scope', '$http', 'characterFactory', '$routeParams', function($scope, $http, characterFactory, $routeParams){
        var id = $routeParams.id;

		characterFactory.getById(id, function(err, person) {
            if(err) {
                return console.log(err);
            }
            $scope.person = person;
            console.log($scope.person);
            $scope.crumbs = [
            	{ url: '#/', name: 'Home' },
            	{ url: '#/characters', name: 'Characters' }
            ];
            $scope.pageTitle = $scope.person.name;
        });    
	}]);