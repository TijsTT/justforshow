'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, '__esModule', {
  value: true
});
/* 
    Aditional attributes for AnimateFrom:
    -   data-jfs-from-repeat
*/

var AnimateFrom = /*#__PURE__*/function () {
  function AnimateFrom(element) {
    _classCallCheck(this, AnimateFrom);

    this.element = element;
    this._animateFromAttribute = 'data-jfs-from';
    this._animateRepeatAttribute = 'data-jfs-repeat';
    this.classes = this.element.getAttribute(this._animateFromAttribute) ? this.element.getAttribute(this._animateFromAttribute).split(' ') : [];
    this.repeat = typeof this.element.getAttribute(this._animateRepeatAttribute) === "string";
    this.intersected = false;

    this._init();
  }

  _createClass(AnimateFrom, [{
    key: "_init",
    value: function _init() {
      // because we are animating from specified classes, we need to add them now and remove them on intersection
      this._addFromClassesToElement(); // this is for that one guy that actually tries to print a webpage (just why?)


      this._removeFromClassesBeforePrint();
    }
  }, {
    key: "onEnterBottom",
    value: function onEnterBottom() {
      var _this$element$classLi;

      // return if object intersected before, unless repeat is true
      if (this.intersected) return;

      (_this$element$classLi = this.element.classList).remove.apply(_this$element$classLi, _toConsumableArray(this.classes));

      this.intersected = true;
    }
  }, {
    key: "onLeaveBottom",
    value: function onLeaveBottom() {
      var _this$element$classLi2;

      if (!this.repeat) return;

      (_this$element$classLi2 = this.element.classList).add.apply(_this$element$classLi2, _toConsumableArray(this.classes));

      this.intersected = false;
    }
  }, {
    key: "_addFromClassesToElement",
    value: function _addFromClassesToElement() {
      var _this$element$classLi3;

      // Adding these classes would trigger the transition, so we first disable that and enable it again after the classes are added
      this.element.style.transition = "none";

      (_this$element$classLi3 = this.element.classList).add.apply(_this$element$classLi3, _toConsumableArray(this.classes)); // nasty trick to update CSS properties instantly to prevent transition-none properties from still being active


      void this.element.offsetHeight;
      this.element.style.removeProperty('transition');
    }
  }, {
    key: "_removeFromClassesBeforePrint",
    value: function _removeFromClassesBeforePrint() {
      var _this = this;

      window.addEventListener('beforeprint', function () {
        var _this$element$classLi4;

        (_this$element$classLi4 = _this.element.classList).remove.apply(_this$element$classLi4, _toConsumableArray(_this.classes));
      });
    }
  }]);

  return AnimateFrom;
}();

var LazyLoadingImage = /*#__PURE__*/function () {
  function LazyLoadingImage(element) {
    _classCallCheck(this, LazyLoadingImage);

    this.element = element;
    this._lazyloadAttribute = 'data-jfs-lazyload';
    this._lazyloadFromAttribute = 'data-jfs-lazyload-from';
    this.src = this.element.getAttribute(this._lazyloadAttribute);
    this.classes = this.element.getAttribute(this._lazyloadFromAttribute) ? this.element.getAttribute(this._lazyloadFromAttribute).split(' ') : [];

    this._setPlaceholderClasses();
  }

  _createClass(LazyLoadingImage, [{
    key: "onEnterBottom",
    value: function onEnterBottom() {
      var _this2 = this;

      this.element.src = this.src;
      this.element.addEventListener('load', function () {
        _this2.classes.forEach(function (_class) {
          _this2.element.classList.remove(_class);
        });
      });
    }
  }, {
    key: "_setPlaceholderClasses",
    value: function _setPlaceholderClasses() {
      var _this3 = this;

      this.classes.forEach(function (_class) {
        _this3.element.classList.add(_class);
      });
    }
  }]);

  return LazyLoadingImage;
}();
/**
 * The JustForShow object 
 */


var JustForShow = /*#__PURE__*/function () {
  function JustForShow(selector, options) {
    _classCallCheck(this, JustForShow);

    this.selector = selector;

    if (!this.selector || typeof this.selector != 'string') {
      console.error('JustForShow: If you don\'t give me an element to observe, what am I even here for? Why are we here anyway?');
      return;
    }

    if (!(this.options = this._setOptions(options))) {
      console.error('JustForShow: The options you defined are not valid or empty. Without valid options my existence is meaningless.');
      return;
    }

    this.preset = this.options.preset;
    this.syncScrollPosition = this.options.syncScrollPosition;
    this.root = this.options.root;
    this.rootMargin = this.options.rootMargin;
    this.threshold = this.options.threshold;
    this.onEnterBottom = this.options.onEnterBottom;
    this.onEnterTop = this.options.onEnterTop;
    this.onLeaveBottom = this.options.onLeaveBottom;
    this.onLeaveTop = this.options.onLeaveTop;
    this.elements = _toConsumableArray(document.querySelectorAll(selector));
    this.instances = this._createInstances();
    this.scrollPosition = this._getScrollPosition();
    this.observer = this._createIntersectionObserver();

    this._init();
  }

  _createClass(JustForShow, [{
    key: "_init",
    value: function _init() {
      this._observeElements();

      if (this.syncScrollPosition) this._syncToCurrentScrollPosition();
    }
  }, {
    key: "_createInstances",
    value: function _createInstances() {
      var _this4 = this;

      var instances = [];
      this.elements.forEach(function (element) {
        instances.push({
          element: element,
          preset: _this4._createPreset(element),
          observating: false
        });
      });
      return instances;
    }
  }, {
    key: "_createPreset",
    value: function _createPreset(element) {
      // if there was no preset given, then we shouldn't try to create this instance
      if (!this.preset) return null;
      return this.preset(element);
    }
  }, {
    key: "_createIntersectionObserver",
    value: function _createIntersectionObserver() {
      return new IntersectionObserver(this._intersectionObserverCallback.bind(this), {
        root: this.options.root,
        rootMargin: this.options.rootMargin,
        threshold: this.options.threshold
      });
    }
  }, {
    key: "_observeElements",
    value: function _observeElements() {
      var _this5 = this;

      this.instances.forEach(function (instance) {
        /* adding a target like this will trigger the observer callback */
        _this5.observer.observe(instance.element);
      });
    }
  }, {
    key: "_onEnterBottom",
    value: function _onEnterBottom(instance) {
      if (typeof this.onEnterBottom == 'function') this.onEnterBottom(instance.element);
      if (this.preset != null && instance.preset.onEnterBottom && typeof instance.preset.onEnterBottom == 'function') instance.preset.onEnterBottom();
    }
  }, {
    key: "_onEnterTop",
    value: function _onEnterTop(instance) {
      if (typeof this.onEnterTop == 'function') this.onEnterTop(instance.element);
      if (this.preset != null && instance.preset.onEnterTop && typeof instance.preset.onEnterTop == 'function') instance.preset.onEnterTop();
    }
  }, {
    key: "_onLeaveBottom",
    value: function _onLeaveBottom(instance) {
      if (typeof this.onLeaveBottom == 'function') this.onLeaveBottom(instance.element);
      if (this.preset != null && instance.preset.onLeaveBottom && typeof instance.preset.onLeaveBottom == 'function') instance.preset.onLeaveBottom();
    }
  }, {
    key: "_onLeaveTop",
    value: function _onLeaveTop(instance) {
      if (typeof this.onLeaveTop == 'function') this.onLeaveTop(instance.element);
      if (this.preset != null && instance.preset.onLeaveTop && typeof instance.preset.onLeaveTop == 'function') instance.preset.onLeaveTop();
    }
  }, {
    key: "_intersectionObserverCallback",
    value: function _intersectionObserverCallback(entries) {
      var _this6 = this;

      entries.forEach(function (entry) {
        var newScrollPosition = _this6._getScrollPosition(),
            instance = _this6.instances.find(function (instance) {
          return instance.element == entry.target;
        });
        /* If this is the first callback for this instance then don't do anything, because this was the initial callback when observing the element started */


        if (!instance.observating) {
          instance.observating = true;
          return;
        }

        if (newScrollPosition >= _this6.scrollPosition && entry.isIntersecting) {
          _this6._onEnterBottom(instance);
        } else if (newScrollPosition < _this6.scrollPosition && entry.isIntersecting) {
          _this6._onEnterTop(instance);
        } else if (newScrollPosition < _this6.scrollPosition && !entry.isIntersecting) {
          _this6._onLeaveBottom(instance);
        } else if (newScrollPosition >= _this6.scrollPosition && !entry.isIntersecting) {
          _this6._onLeaveTop(instance);
        }

        _this6.scrollPosition = newScrollPosition;
      });
    }
  }, {
    key: "_getScrollPosition",
    value: function _getScrollPosition() {
      return window.pageYOffset || document.documentElement.scrollTop;
    } // this method can be called in children of the ScrollObject classes
    // makes sure that elements above the current scroll positions are in sync with the jfs scroll event 
    // needs to be checked on browser compatibility

  }, {
    key: "_syncToCurrentScrollPosition",
    value: function _syncToCurrentScrollPosition() {
      var _this7 = this;

      var currentUserScrollPosition = {
        top: window.pageYOffset,
        bottom: window.pageYOffset + window.innerHeight
      };
      this.instances.forEach(function (instance) {
        var objectScrollPosition = {
          top: instance.element.getBoundingClientRect().top + currentUserScrollPosition.top,
          bottom: instance.element.getBoundingClientRect().bottom + currentUserScrollPosition.top
        };

        if (objectScrollPosition.top < currentUserScrollPosition.bottom) {
          _this7._onEnterBottom(instance);
        }

        if (objectScrollPosition.bottom < currentUserScrollPosition.top) {
          _this7._onLeaveTop(instance);
        }
      });
    }
  }, {
    key: "_setOptions",
    value: function _setOptions(options) {
      /* If options aren't passed as either a string, function or object then setting them will result in a failure anyway */
      if (!(typeof options == 'string' || typeof options == 'function' || _typeof(options) == 'object')) return null;
      /* If options are passed as a string or a function we assume it will be a preset */

      if (typeof options == 'string' || typeof options == 'function') options = {
        preset: options
      };
      return {
        preset: options && options.preset ? this._setPresetOption(options.preset) : null,
        syncScrollPosition: options && options.syncScrollPosition != undefined ? options.syncScrollPosition : true,
        root: options && options.root ? options.root : null,
        rootMargin: options && options.rootMargin ? options.rootMargin : '0px 0px 0px 0px',
        threshold: options && options.threshold ? options.threshold : [0],
        onEnterBottom: options && options.onEnterBottom ? options.onEnterBottom : null,
        onEnterTop: options && options.onEnterTop ? options.onEnterTop : null,
        onLeaveBottom: options && options.onLeaveBottom ? options.onLeaveBottom : null,
        onLeaveTop: options && options.onLeaveTop ? options.onLeaveTop : null
      };
    }
  }, {
    key: "_setPresetOption",
    value: function _setPresetOption(preset) {
      var presetType = null;

      if (typeof preset == 'string') {
        presetType = this._getPresetTypes().find(function (presetType) {
          return presetType.name === preset;
        });
        presetType ? presetType = presetType.create : presetType = null;
      } else if (typeof preset == 'function') {
        presetType = preset;
      }

      if (!presetType) console.error('JustForShow: The preset you defined is invalid. Only listeners defined in JFS options will be fired.');
      return presetType;
    }
  }, {
    key: "_getPresetTypes",
    value: function _getPresetTypes() {
      return [{
        name: 'animate-from',
        create: function create(element) {
          return new AnimateFrom(element);
        }
      }, {
        name: 'lazyload',
        create: function create(element) {
          return new LazyLoadingImage(element);
        }
      }];
    }
  }]);

  return JustForShow;
}();

exports.JustForShow = JustForShow;