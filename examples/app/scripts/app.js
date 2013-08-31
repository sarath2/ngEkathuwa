'use strict';

angular.module('ekathuwaApp', ['ngRoute','ngEkathuwa'])
    .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
        .otherwise({
        redirectTo: '/'
    });
});
