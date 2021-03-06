var Expand;
(function (_Expand) {
    var RESIZE_THROTTLE_MSEC = 1000 / 15;
    var RESIZE_EVENT = 'ng-army-knife:resize';

    function base($window, decideDimensions) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var current = {
                    height: 0,
                    width: 0
                };
                var elementHeightFluff = element.outerHeight(true) - element.height();
                var elementWidthFluff = element.outerWidth(true) - element.width();
                var readjust = _.throttle(function () {
                    var size = decideDimensions(element.parent().height() - elementHeightFluff, element.parent().width() - elementWidthFluff);
                    if (!_.isEqual(current, size)) {
                        current = size;
                        if (element.prop('tagName').toLowerCase() == 'canvas') {
                            var $canvas = element;
                            var canvas = element[0];

                            if (window.devicePixelRatio && window.devicePixelRatio > 1) {
                                $canvas.attr('width', size.width * window.devicePixelRatio);
                                $canvas.attr('height', size.height * window.devicePixelRatio);
                                $canvas.css('width', size.width);
                                $canvas.css('height', size.height);
                            } else {
                                canvas.height = size.height;
                                canvas.width = size.width;
                            }
                        } else {
                            element.height(size.height);
                            element.width(size.width);
                        }
                        element.trigger(RESIZE_EVENT);
                    }
                }, RESIZE_THROTTLE_MSEC);

                setTimeout(readjust, 0);

                scope.$watch(readjust);

                angular.element($window).on('resize', readjust);
                scope.$on('$destroy', function () {
                    angular.element($window).off('resize', readjust);
                });
            }
        };
    }

    function ExpandSquare($window) {
        return base($window, function (parentHeight, parentWidth) {
            var min = Math.min(parentHeight, parentWidth);
            return {
                height: min,
                width: min
            };
        });
    }
    _Expand.ExpandSquare = ExpandSquare;

    function Expand($window) {
        return base($window, function (parentHeight, parentWidth) {
            return {
                height: parentHeight,
                width: parentWidth
            };
        });
    }
    _Expand.Expand = Expand;
})(Expand || (Expand = {}));
var ngArmyKnife = angular.module('ngArmyKnife', []);

ngArmyKnife.directive('ngArmyKnifeExpandSquare', ['$window', Expand.ExpandSquare]);
ngArmyKnife.directive('ngArmyKnifeExpand', ['$window', Expand.Expand]);
