
module Expand {

    var RESIZE_THROTTLE_MSEC = 1000 / 5;
    var RESIZE_EVENT = 'ng-army-knife:resize';

    interface R {
        height: number;
        width: number;
    }

    function base($window: ng.IWindowService, decideDimensions: (parentHeight, parentWidth) => R): ng.IDirective {
        return {
            restrict: 'A',
            link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                var current = {
                    height: 0,
                    width: 0
                };
                var readjust = _.throttle(() => {
                    var size = decideDimensions(element.parent().height(), element.parent().width());
                    if (!_.isEqual(current, size)) {
                        current = size;
                        if (element.prop('tagName').toLowerCase() == 'canvas') {
                            var canvas = <HTMLCanvasElement> element[0];
                            canvas.height = size.height;
                            canvas.width = size.width;
                        } else {
                            element.height(size.height);
                            element.width(size.width);
                        }
                        element.trigger(RESIZE_EVENT);
                    }
                }, RESIZE_THROTTLE_MSEC);
                // run at every $digest cycle
                scope.$watch(readjust);
                // run when window resized, this uses jquery since angular does not provide support for this directly
                angular.element($window).on('resize', readjust);
                scope.$on('$destroy', () => {
                    // remember to remove listener also
                    angular.element($window).off('resize', readjust);
                });
            }
        };
    }

    // TODO: do unittest for this
    export function ExpandSquare($window: ng.IWindowService): ng.IDirective {
        return base($window, (parentHeight, parentWidth) => {
            var min = Math.min(parentHeight, parentWidth);
            return {
                height: min,
                width: min
            }
        });
    }

    export function Expand($window: ng.IWindowService): ng.IDirective {
        return base($window, (parentHeight, parentWidth) => {
            return {
                height: parentHeight,
                width: parentWidth
            }
        });
    }
}
