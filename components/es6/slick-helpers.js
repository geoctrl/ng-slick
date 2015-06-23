/**
 * Slick Helper Functions
 * @type {{debounce: Function, hasClass: Function}}
 */

var slickHelpers = {

    debounce: function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    hasClass: function(element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }
};

/**
 * On component init completion,
 * remove all '.slick-component-hide' classes
 * similar to angular's ng-cloak class
 */
var slickHideListener = function() {
    var slickHideElements = document.querySelectorAll('.slick-component-cloak');
    for (var i = 0; i < slickHideElements.length; i++) {
        slickHideElements[i].classList.remove('slick-component-cloak');
    }
    document.removeEventListener('slickComplete', slickHideListener);
};
document.addEventListener('slickComplete', slickHideListener);
