angular.module('StarWarsApp')
	.controller('filmsController', ['$scope', '$http', 'filmFactory', '_', '$cookies', function($scope, $http, filmFactory, _, $cookies){
        
        $scope.crumbs = [
            { url: '#/', name: 'Home' }
        ];
        $scope.pageTitle = 'Films';

        var pageCache = $cookies.get('currentFilmPage');
        if(pageCache){
            $scope.currentPage = pageCache;
        } else {
            $scope.currentPage = 1;
        }

		filmFactory.getAll($scope.currentPage, function(err, films) {
            if(err) {
                return console.log(err);
            }
            $scope.films = films;
            var numberOfPages = filmFactory.getNumberOfPages();
            $scope.pages = _.range(1, numberOfPages+1);
        });

        $scope.getNewPage = function(newPageNumber){
            $cookies.put('currentFilmPage', newPageNumber);
            filmFactory.getAll(newPageNumber, function(err, films) {
                if(err) {
                    return console.log(err);
                }
                $scope.films = films;
                $scope.currentPage = newPageNumber;

            });
        };
         
	}]);