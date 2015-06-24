'use strict';

/**
 * Slick Input
 * @param element
 * @param options
 */
class SlickInput {

    constructor(target, options) {
        this.target = target;
        this.elements = document.querySelectorAll(target);
        this.elementArray = [];
        this.options = options || {};
        this.defaults = {
            animate: this.options.animate===true||this.options.animate===false?this.options.animate:true,
            duration: this.options.duration || 300
        };

        for (var i=0; i<this.elements.length; i++) {
            this.init(this.elements[i], this.defaults);
        }
    };

    init(element) {

        var parentNode = element.parentNode;
        var container = document.createElement('div');
        var placeholder = document.createElement('div');
        var underline = document.createElement('div');

        container.setAttribute('class', 'slick-component-input-container');
        placeholder.setAttribute('class', 'slick-component-input-placeholder');
        underline.setAttribute('class', 'slick-component-input-underline');

        element.className = element.className + " slick-component-input";
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
    };

    static animateFocus(elementObject, duration) {
        Velocity(elementObject.underline, 'stop');
        Velocity(elementObject.underline, {
            right: 0
        }, {
            duration: duration
        })
    };

    static animateBlur(elementObject, duration) {
        Velocity(elementObject.placeholder, 'stop');
        Velocity(elementObject.placeholder, {
            paddingTop: '12px',
            fontSize: '14px',
            top: '0'
        }, {
            duration: duration
        });
    }

    static animateEnter(elementObject, duration) {
        Velocity(elementObject.placeholder, 'stop');
        Velocity(elementObject.placeholder, {
            paddingTop: 0,
            fontSize: '10px',
            top: '-2px'
        }, {
            duration: duration
        });
    }

    static animateExit(elementObject, duration) {
        Velocity(elementObject.underline, 'stop');
        Velocity(elementObject.underline, {
            right: '100%'
        }, {
            duration: duration
        })
    }

    static staticFocus(elementObject) {
        elementObject.underline.style.right = 0;
    }

    static staticBlur(elementObject) {
        elementObject.placeholder.style.paddingTop = '12px';
        elementObject.placeholder.style.fontSize = '14px';
        elementObject.placeholder.style.top = '0';
    }

    static staticEnter(elementObject) {
        elementObject.placeholder.style.paddingTop = 0;
        elementObject.placeholder.style.fontSize = '10px';
        elementObject.placeholder.style.top = '-2px';
    }

    static staticExit(elementObject) {
        elementObject.underline.style.right = '100%';
    }

    static eventListeners(elementObject, defaults) {
        elementObject.input.addEventListener('focus', function() {
            if (defaults.animate) {
                SlickInput.animateFocus(elementObject, defaults.duration);
                SlickInput.animateEnter(elementObject, defaults.duration);
            } else {
                SlickInput.staticFocus(elementObject);
                SlickInput.staticEnter(elementObject);
            }
        });
        elementObject.input.addEventListener('blur', function() {
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
    };

    static completed() {
        // remove cloak classes
        var event = new Event('slickComplete');
        document.dispatchEvent(event);
    }
}