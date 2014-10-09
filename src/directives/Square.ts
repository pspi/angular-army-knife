
module Square {

    // limit redraws when for example resizing window
    var MAX_RESIZE_FREQUENCY_MSEC = 1000 / 10;

    // TODO: do unittest for this
    export function Directive($window: ng.IWindowService): ng.IDirective {
        return {
            restrict: 'A',
            link: (scope, element, attrs) => {
                var current;
                var readjust = _.throttle(() => {
                    var size = Math.min(element.parent().height(), element.parent().width());
                    if (current != size) {
                        current = size;
                        element.height(size);
                        element.width(size);
                    }
                }, MAX_RESIZE_FREQUENCY_MSEC);
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
}
