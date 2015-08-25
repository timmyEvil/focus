/*http://stackoverflow.com/questions/14833326/how-to-set-focus-in-angularjs*/
(function() {
    /**
     * @ngdoc directive
     * @name c.focus.directive:cFocusOn
     * @restrict A
     *
     * @element input
     * @param  {expression}  cFocusOn 變數名稱，為布林值。
     * @description 當cFocusOn 的變數名稱為true時，則focus進入該欄位。
     *
     * @example
       <doc:example module="app" >
         <doc:source>
           <script>
            var app = angular.module('app', ['c.focus']);
            app.controller('Controller', function($scope, $timeout) {
              $scope.inputVal = "test";
              $scope.clickMe = function() {
                $timeout(function(){
                  $scope.focusMe = true;
                },500);
              };
            });
           </script>
           <div ng-controller="Controller">
             <button data-ng-click="clickMe()">focus!</button>
             <input type="text" name="input1" id="input1" ng-model="inputVal" c-focus-on = "focusMe"/>
           </div>
         </doc:source>
       </doc:example>
     */
    var focusOn = angular.module("c.focus", []);
    focusOn.directive('cFocusOn', function() {
        return {
            restrict : 'A',
            link : function(scope, element, attr) {
                scope.$watch(attr.cFocusOn, function(value) {
                    if (value === true) {
                        element.focus();
                        element.select();
                        scope[attr.cFocusOn] = false;
                    }
                });
            }
        };
    });
})();
