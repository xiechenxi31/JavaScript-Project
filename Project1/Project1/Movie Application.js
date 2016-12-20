var MovieApp = angular.module('MovieApp', ['ngResource', 'ngStorage','ngMessages','ngTouch']);
MovieApp.controller("MovieCtrl", Moviefun);

function Moviefun($scope, $resource, $localStorage) {
    var MovieInfo = $resource("http://api.themoviedb.org/3/search/movie?api_key=1aeb73a2b5e0ef20acf7ce7a38b4fd62&query=:target&year=:yearval");
    var MovieDetail = $resource("http://api.themoviedb.org/3/movie/:movieid?api_key=1aeb73a2b5e0ef20acf7ce7a38b4fd62&append_to_response=credits");
    $scope.indexnum = 0;

    $scope.searchinfo = function () {
        
        $scope.SearchResult = MovieInfo.get({ target: $scope.storage.moviename, yearval: $scope.storage.movieyear }, poster);
        $scope.view = true;
    }

    $scope.storage = $localStorage;

    function poster(response) {
        $scope.postersite = response.results[$scope.indexnum].poster_path;
        $scope.movietitle = response.results[$scope.indexnum].original_title;
        $scope.MovieResult = MovieDetail.get({ movieid: response.results[$scope.indexnum].id }, thetagline);
    }
    function thetagline(response) {
        $scope.tag = response.tagline;
        {
            $scope.directorname = "findit";
            for (i = 0; i < response.credits.crew.length; i++) {
                if (response.credits.crew[i].job == "Director")
                { $scope.directorname = response.credits.crew[i].name; }
            }
        }
        $scope.year = response.release_date;
        $scope.movietime = response.runtime;
        $scope.plotoverview = response.overview;
        {
            if ($scope.plotoverview = " ")
            {
                $scope.theoverview = true;
            }
            else
            {
                $scope.theoverview = false;
            }
        }
        $scope.castmembers = response.credits.cast;
        $scope.thebudget = response.budget/1000000;
        $scope.therevenue = response.revenue / 1000000;
        

    }

    $scope.nextone = function () {
        $scope.indexnum = $scope.indexnum + 1;
        $scope.searchinfo();
    }
    $scope.preone = function () {
        $scope.indexnum = $scope.indexnum - 1;
        $scope.searchinfo();
    }
    $scope.backtosearch = function () {
        $scope.view = false;
        $localStorage.$reset();
        $scope.SearchResult.total_results = 1;//hide the not found movies information when back to search form


        //$scope.moviename = "";
        //$scope.movieyear = "";
    }
    {
    var year = [];
    for (var i = 1900; i < 2017; i++)
    {
        year.push(i);
    }
    $scope.selectyears = year;
    }
    //$scope.selectyears = [2000, 2001, 2002];






}