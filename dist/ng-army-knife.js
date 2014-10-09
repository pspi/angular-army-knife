var Square;
(function (Square) {
    var MAX_RESIZE_FREQUENCY_MSEC = 1000 / 10;

    function Directive($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var current;
                var readjust = _.throttle(function () {
                    var size = Math.min(element.parent().height(), element.parent().width());
                    if (current != size) {
                        current = size;
                        element.height(size);
                        element.width(size);
                    }
                }, MAX_RESIZE_FREQUENCY_MSEC);

                scope.$watch(readjust);

                angular.element($window).on('resize', readjust);
                scope.$on('$destroy', function () {
                    angular.element($window).off('resize', readjust);
                });
            }
        };
    }
    Square.Directive = Directive;
})(Square || (Square = {}));
var ngArmyKnife = angular.module('ngArmyKnife');

ngArmyKnife.directive('ngArmyKnifeSquare', ['$window', Square.Directive]);
