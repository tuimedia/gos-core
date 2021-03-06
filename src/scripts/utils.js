'use strict';

module.exports = {
  breakpoints: {
      'lap': 450,
      'desk': 768,
      'desk-wide': 1008
  },
  getAllElementsWithAttribute: function(attribute) {
    var matchingElements = [];
    var allElements = document.getElementsByTagName('*');
    for (var i = 0, n = allElements.length; i < n; i++) {
      if (allElements[i].getAttribute(attribute) !== null) {
        // Element exists with attribute. Add to array.
        matchingElements.push(allElements[i]);
      }
    }
    return matchingElements;
  },
  debounce: function(fn, delay) {
    var timer = null;
    return function() {
      var context = this,
          args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    };
  },
  throttle: function(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function() {

      var context = scope || this;

      var now = +new Date(),
          args = arguments;

      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function() {
            last = now;
            fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  },
  screenSize: function() {
    if (window.innerWidth >= this.breakpoints['desk-wide']) {
        return 'desk-wide';
    } else if (window.innerWidth < this.breakpoints['desk-wide'] && window.innerWidth >= this.breakpoints['desk']) {
        return 'desk';
    } else if (window.innerWidth < this.breakpoints['desk'] && window.innerWidth >= this.breakpoints['lap']) {
        return 'lap';
    } else {
        return 'palm';
    }
  }
};
