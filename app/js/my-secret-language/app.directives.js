/**
 * My Secret Language Directives
 *
 * @file app.directives.js
 * @author Matt Davis
 */
(function () {
    angular
        .module('msl')
        .directive('myLink', [myLink])
        .directive('myAddNote', [myAddNote])
        .directive('mySubmit', [mySubmit]);

    function myLink() {
        return {
            restrict: 'A',
            scope: {
                myFunction: '&'
            },
            link: function ($scope, element, attrs) {
                element.on("click", function (event) {
                    $scope.$apply(function () {
                        var theParam = attrs.param;
                        $scope.myFunction({myParam: theParam});
                    });
                });
            }
        };
    }

    function myAddNote() {
        return {
            restrict: 'A',
            scope: {
                myFunction: '&'
            },
            link: function ($scope, element, attrs) {
                element.on("click", function (event) {
                    $scope.$apply(function () {
                        var theParam1 = attrs.param1;
                        var theParam2 = attrs.param2;
                        $scope.myFunction({myParam1: theParam1, myParam2: theParam2});
                    });
                });
            }
        };
    }

    function mySubmit() {
         return {
            restrict: 'A',
            scope: {
                myFunction: '&'
            },
            link: function ($scope, element, attrs) {
                element.on("click", function (event) {
                    $scope.$apply(function () {
                        $scope.myFunction();
                    });
                });
            }
        };
    }
})();
