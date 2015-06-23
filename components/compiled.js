/**
 * Slick Helper Functions
 * @type {{debounce: Function, hasClass: Function}}
 */

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
    },
    hasClass: function hasClass(element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }
};

/**
 * On component init completion,
 * remove all '.slick-component-hide' classes
 * similar to angular's ng-cloak class
 */
var slickHideListener = function slickHideListener() {
    var slickHideElements = document.querySelectorAll('.slick-component-cloak');
    for (var i = 0; i < slickHideElements.length; i++) {
        slickHideElements[i].classList.remove('slick-component-cloak');
    }
    document.removeEventListener('slickComplete', slickHideListener);
};
document.addEventListener('slickComplete', slickHideListener);
;
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
        this.options = options || {};
        this.defaults = {
            animate: options.animate || true,
            duration: options.duration || 400
        };

        for (var i = 0; i < this.elements.length; i++) {
            SlickInput.init(this.elements[i]);
        }
    }

    _createClass(SlickInput, [{
        key: 'destroy',
        value: function destroy() {}
    }], [{
        key: 'init',
        value: function init(element) {

            var parentNode = element.parentNode;
            var container = document.createElement('div');
            var placeholder = document.createElement('div');

            container.setAttribute('class', 'slick-component-input-container');
            placeholder.setAttribute('class', 'slick-component-input-placeholder');
            element.className = element.className + ' slick-component-input';
            placeholder.innerHTML = element.placeholder;

            parentNode.insertBefore(container, element);
            container.appendChild(element);
            container.appendChild(placeholder);

            var elementObject = {
                'input': element,
                'container': container,
                'placeholder': placeholder,
                'placeholderName': element.placeholder
            };

            if (elementObject.input.value.length != 0) {
                SlickInput.animateFocus(elementObject);
            }

            element.removeAttribute('placeholder');
            SlickInput.eventListeners(elementObject);
            SlickInput.completed(elementObject);
        }
    }, {
        key: 'animateFocus',
        value: function animateFocus(elementObject) {
            Velocity(elementObject.placeholder, 'stop');
            Velocity(elementObject.placeholder, {
                paddingTop: 0,
                fontSize: '10px',
                top: '-2px'
            });
        }
    }, {
        key: 'animateBlur',
        value: function animateBlur(elementObject) {
            Velocity(elementObject.placeholder, 'stop');
            Velocity(elementObject.placeholder, {
                paddingTop: '12px',
                fontSize: '14px',
                top: '0'
            });
        }
    }, {
        key: 'eventListeners',
        value: function eventListeners(elementObject) {
            elementObject.input.addEventListener('focus', function () {
                SlickInput.animateFocus(elementObject);
            });
            elementObject.input.addEventListener('blur', function () {
                if (elementObject.input.value.length == 0) {
                    SlickInput.animateBlur(elementObject);
                }
            });
        }
    }, {
        key: 'completed',
        value: function completed() {
            // remove cloak classes
            var event = new Event('slickComplete');
            document.dispatchEvent(event);
        }
    }]);

    return SlickInput;
})();

window.onload = function () {

    var input = new SlickInput('input', {});
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
