'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var slickHelpers = {

    debounce: function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function later() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
};;
'use strict';

/**
 * Slick Input
 * @param element
 * @param options
 */

var SlickInput = (function () {
    function SlickInput(target, options) {
        _classCallCheck(this, SlickInput);

        this.target = target;
        this.elements = document.querySelectorAll(target);
        this.elementArray = [];
        this.options = options || {};
        this.defaults = {
            animate: options.animate || true,
            duration: options.duration || 300
        };

        for (var i = 0; i < this.elements.length; i++) {
            this.init(this.elements[i]);
        }
    }

    _createClass(SlickInput, [{
        key: 'init',
        value: function init(element) {
            var container = document.createElement('div');
            container.setAttribute('class', 'slick-input-container');
            document.body.insertBefore(container, element);
            container.appendChild(element);

            this.elementArray.push({
                'input': element,
                'container': container,
                'placeholder': element.placeholder
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {}
    }]);

    return SlickInput;
})();

window.onload = function () {
    var input = new SlickInput('#slick-input', {});
    var inputById = new SlickInput('.slick-input', {});
};

//angular.module('ng-slick-input', [])
//
//
//    .directive('ngSlickInput', function() {
//        return {
//            restrict: 'C',
//            scope: {
//                ngModel: '=',
//                placeholder: '@'
//            },
//            controller: function($scope, $element) {
//
//                var placeholderElement,
//                    defaults = {
//                        placeholder: ''
//                    };
//
//                var init = function() {
//                    if ($scope.placeholder) {
//                        defaults.placeholder = $scope.placeholder;
//                        $element.removeAttr('placeholder');
//                        placeholderElement = angular.element('<div class="ng-slick-input-placeholder">'+defaults.placeholder+'</div>');
//                        $scope.container.append(placeholderElement);
//                    }
//
//                    // if value/ngModel already exists, move placeholder without animation
//                    if ($scope.ngModel) {
//                        if ($scope.ngModel.length) {placeholderElement.css('top', '36px')}
//                    } else {
//                        if ($element.val().length) {placeholderElement.css('top', '36px')}
//                    }
//                };
//
//                // put element inside parent container
//                $scope.container = angular.element('<div class="ng-slick-input-container"></div>');
//                $element.after($scope.container);
//                $scope.container.append($element);
//
//                // fire events for click/focus/blur
//                $scope.container.on('click', function() { $element[0].focus() });
//                $element.on('focus', function() { controlPlaceholder.animateIn() });
//                $element.on('blur', function() {
//                    controlPlaceholder.decide($scope.ngModel ? $scope.ngModel.length : $element.val().length);
//                });
//
//                $scope.$watch('ngModel', function(newVal, oldVal) {
//                    if (newVal!=oldVal) {
//                        controlPlaceholder.decide(newVal.length)
//                    }
//                });
//
//                // control animation
//                var controlPlaceholder = {
//                    decide: ngSlickHelpers.debounce(function(value) {
//                        value ? controlPlaceholder.animateIn() : controlPlaceholder.animateOut();
//                    }, 100),
//
//                    animateIn: function() {
//                        Velocity(placeholderElement, 'stop');
//                        Velocity(placeholderElement, {
//                            top: '36px'
//                        }, {
//                            duration: 500,
//                            easing: 'ease'
//                        })
//                    },
//                    animateOut: function() {
//                        Velocity(placeholderElement, 'stop');
//                        Velocity(placeholderElement, {
//                            top: '0'
//                        }, {
//                            duration: 500,
//                            easing: 'ease'
//                        });
//                    }
//                };
//
//                init();
//
//            }
//        }
//    });
