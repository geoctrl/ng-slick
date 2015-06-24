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
        this.elementArray = [];
        this.options = options || {};
        this.defaults = {
            animate: this.options.animate === true || this.options.animate === false ? this.options.animate : true,
            duration: this.options.duration || 300
        };

        for (var i = 0; i < this.elements.length; i++) {
            this.init(this.elements[i], this.defaults);
        }
    }

    _createClass(SlickInput, [{
        key: 'init',
        value: function init(element) {

            var parentNode = element.parentNode;
            var container = document.createElement('div');
            var placeholder = document.createElement('div');
            var underline = document.createElement('div');

            container.setAttribute('class', 'slick-component-input-container');
            placeholder.setAttribute('class', 'slick-component-input-placeholder');
            underline.setAttribute('class', 'slick-component-input-underline');

            element.className = element.className + ' slick-component-input';
            placeholder.innerHTML = element.placeholder;

            parentNode.insertBefore(container, element);
            container.appendChild(element);
            container.appendChild(placeholder);
            container.appendChild(underline);

            var elementObject = {
                'input': element,
                'container': container,
                'placeholder': placeholder,
                'placeholderName': element.placeholder,
                'underline': underline
            };

            this.elementArray.push(elementObject);

            if (elementObject.input.value.length != 0) {
                if (this.defaults.animate) {
                    SlickInput.animateEnter(elementObject, this.defaults.duration);
                } else {
                    SlickInput.staticEnter(elementObject);
                }
            }

            element.removeAttribute('placeholder');
            SlickInput.eventListeners(elementObject, this.defaults);
            SlickInput.completed();
        }
    }], [{
        key: 'animateFocus',
        value: function animateFocus(elementObject, duration) {
            Velocity(elementObject.underline, 'stop');
            Velocity(elementObject.underline, {
                right: 0
            }, {
                duration: duration
            });
        }
    }, {
        key: 'animateBlur',
        value: function animateBlur(elementObject, duration) {
            Velocity(elementObject.placeholder, 'stop');
            Velocity(elementObject.placeholder, {
                paddingTop: '12px',
                fontSize: '14px',
                top: '0'
            }, {
                duration: duration
            });
        }
    }, {
        key: 'animateEnter',
        value: function animateEnter(elementObject, duration) {
            Velocity(elementObject.placeholder, 'stop');
            Velocity(elementObject.placeholder, {
                paddingTop: 0,
                fontSize: '10px',
                top: '-2px'
            }, {
                duration: duration
            });
        }
    }, {
        key: 'animateExit',
        value: function animateExit(elementObject, duration) {
            Velocity(elementObject.underline, 'stop');
            Velocity(elementObject.underline, {
                right: '100%'
            }, {
                duration: duration
            });
        }
    }, {
        key: 'staticFocus',
        value: function staticFocus(elementObject) {
            elementObject.underline.style.right = 0;
        }
    }, {
        key: 'staticBlur',
        value: function staticBlur(elementObject) {
            elementObject.placeholder.style.paddingTop = '12px';
            elementObject.placeholder.style.fontSize = '14px';
            elementObject.placeholder.style.top = '0';
        }
    }, {
        key: 'staticEnter',
        value: function staticEnter(elementObject) {
            elementObject.placeholder.style.paddingTop = 0;
            elementObject.placeholder.style.fontSize = '10px';
            elementObject.placeholder.style.top = '-2px';
        }
    }, {
        key: 'staticExit',
        value: function staticExit(elementObject) {
            elementObject.underline.style.right = '100%';
        }
    }, {
        key: 'eventListeners',
        value: function eventListeners(elementObject, defaults) {
            elementObject.input.addEventListener('focus', function () {
                if (defaults.animate) {
                    SlickInput.animateFocus(elementObject, defaults.duration);
                    SlickInput.animateEnter(elementObject, defaults.duration);
                } else {
                    SlickInput.staticFocus(elementObject);
                    SlickInput.staticEnter(elementObject);
                }
            });
            elementObject.input.addEventListener('blur', function () {
                if (defaults.animate) {
                    if (elementObject.input.value.length == 0) {
                        SlickInput.animateBlur(elementObject, defaults.duration);
                    }
                    SlickInput.animateExit(elementObject, defaults.duration);
                } else {
                    if (elementObject.input.value.length == 0) {
                        SlickInput.staticBlur(elementObject);
                    }
                    SlickInput.staticExit(elementObject);
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
