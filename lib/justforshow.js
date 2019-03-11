'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.JFS = function () {
    function _class() {
        var customAnimations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, _class);

        this.defaultValues = this.generateDefaults(options);

        this.scrollElements = document.querySelectorAll('[data-jfs]');
        this.eventElements = document.querySelectorAll('[data-jfs-event]');

        this.scrollObjects = this.generateScrollObjects();
        this.eventObjects = this.generateEventObjects();

        // Here you can add all kinds of animations =)
        this.availableScrollAnimations = [{
            name: 'fade-up',
            styleStart: 'opacity: 0; transform: translateY(20px);',
            styleEnd: 'opacity: 1; transform: translateY(0);',
            added: false
        }, {
            name: 'fade-down',
            styleStart: 'opacity: 0; transform: translateY(-20px);',
            styleEnd: 'opacity: 1; transform: translateY(0);',
            added: false
        }, {
            name: 'fade-left',
            styleStart: 'opacity: 0; transform: translateX(20px);',
            styleEnd: 'opacity: 1; transform: translateX(0);',
            added: false
        }, {
            name: 'fade-right',
            styleStart: 'opacity: 0; transform: translateX(-20px);',
            styleEnd: 'opacity: 1; transform: translateX(0);',
            added: false
        }];

        this.availableEventAnimations = [{
            name: 'grow',
            style: 'transform: scale(1.2)',
            added: false
        }];

        this.addCustomAnimations(customAnimations);

        this.initScrollElements();
        this.initEventElements();

        this.initStyles();

        this.watchScroll();
        this.watchWindowResize();
    }

    _createClass(_class, [{
        key: 'generateDefaults',
        value: function generateDefaults(options) {

            options = options || {};
            options.default = options.default || {};
            options.default.offset = options.default.offset || {};

            var defaultValues = {
                name: options.default.name || 'fade-up',
                duration: options.default.duration ? parseInt(options.default.duration) / 1000 + "s" : "0.6s",
                delay: options.default.delay ? parseInt(options.default.delay) / 1000 + "s" : "0s",
                offset: {
                    start: options.default.offset.start || 250,
                    end: options.default.offset.end || 0
                },
                easing: options.default.easing || 'ease',
                rewind: options.default.rewind || false,
                animatedrewind: options.default.animatedrewind || false
            };

            return defaultValues;
        }

        // Animation on click event

    }, {
        key: 'toggleAnimation',
        value: function toggleAnimation(element) {

            var isEventElement = false;

            for (var i = 0; i < this.eventObjects.length; i++) {

                if (this.eventObjects[i].element === element) {

                    if (this.eventObjects[i].animation.triggered) {
                        this.eventObjects[i].element.classList.remove('jfs-event-' + this.eventObjects[i].animation.name);
                        this.eventObjects[i].animation.triggered = false;
                    } else {
                        this.eventObjects[i].element.style.transition = this.eventObjects[i].animation.duration + ' all ' + this.eventObjects[i].animation.easing;
                        this.eventObjects[i].element.style.transitionDelay = this.eventObjects[i].animation.delay;
                        this.eventObjects[i].element.classList.add('jfs-event-' + this.eventObjects[i].animation.name);
                        this.eventObjects[i].animation.triggered = true;
                    }

                    isEventElement = true;

                    break;
                }
            }

            if (!isEventElement) console.log('An element needs a data-jfs-event attribute for it to be animatable by JFS.');
        }

        // Adds the given customScrollAnimations to the available animations array

    }, {
        key: 'addCustomAnimations',
        value: function addCustomAnimations(customAnimations) {

            if (!customAnimations.constructor === Array) return;

            var scrollAnimations = [];
            var eventAnimations = [];

            for (var i = 0; i < customAnimations.length; i++) {
                customAnimations[i].added = false;
                customAnimations[i].styleStart ? scrollAnimations.push(customAnimations[i]) : eventAnimations.push(customAnimations[i]);
            }

            this.availableScrollAnimations = this.availableScrollAnimations.concat(scrollAnimations);
            this.availableEventAnimations = this.availableEventAnimations.concat(eventAnimations);
        }

        // Watches for window resize events and recalculates the offset of each scrollElement

    }, {
        key: 'watchWindowResize',
        value: function watchWindowResize() {

            var that = this;

            var resizeTimeout = void 0;

            window.onresize = function () {

                clearTimeout(resizeTimeout);

                var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

                resizeTimeout = setTimeout(function () {
                    for (var i = 0; i < that.scrollObjects.length; i++) {

                        that.scrollObjects[i].offsetTop = that.scrollObjects[i].element.getBoundingClientRect().top + window.pageYOffset;

                        that.scrollObjects[i].animation.offset.start = that.scrollObjects[i].element.getAttribute('data-jfs-offset-start') ? parseInt(that.scrollObjects[i].element.getAttribute('data-jfs-offset-start')) : that.defaultValues.offset.start;
                        that.scrollObjects[i].animation.offset.start = that.scrollObjects[i].animation.offset.start * (h / 1065);

                        that.scrollObjects[i].animation.offset.end = that.scrollObjects[i].element.getAttribute('data-jfs-offset-end') ? parseInt(that.scrollObjects[i].element.getAttribute('data-jfs-offset-end')) : that.defaultValues.offset.end;
                        that.scrollObjects[i].animation.offset.end = that.scrollObjects[i].animation.offset.end * (h / 1065);
                    }
                }, 500);
            };
        }

        // Watches for window scroll events and triggers the animation based on the current scroll position

    }, {
        key: 'watchScroll',
        value: function watchScroll() {

            var y = window.pageYOffset;

            // This will trigger the animations if the user already scrolled and reloads the page.
            for (var i = 0; i < this.scrollObjects.length; i++) {

                if (this.scrollObjects[i].offsetTop - window.innerHeight + this.scrollObjects[i].animation.offset.start < window.pageYOffset) {
                    // Already add inline styling because otherwise the transition won't work
                    this.scrollObjects[i].element.style.transition = 'all ' + this.scrollObjects[i].animation.duration + ' ' + this.scrollObjects[i].animation.easing + ' ' + this.scrollObjects[i].animation.delay;
                    this.scrollObjects[i].element.classList.add('jfs-scroll-' + this.scrollObjects[i].animation.name + '-end');
                    this.scrollObjects[i].animation.triggered = true;
                }
            }

            var that = this;

            window.onscroll = function () {

                if (window.pageYOffset > y) {

                    for (var _i = 0; _i < that.scrollObjects.length; _i++) {

                        // If the animation already triggered, don't execute the rest of the function anymore
                        if (that.scrollObjects[_i].animation.triggered) continue;

                        if (that.scrollObjects[_i].offsetTop - window.innerHeight + that.scrollObjects[_i].animation.offset.start < window.pageYOffset) {
                            that.scrollObjects[_i].element.style.transition = 'all ' + that.scrollObjects[_i].animation.duration + ' ' + that.scrollObjects[_i].animation.easing + ' ' + that.scrollObjects[_i].animation.delay;
                            that.scrollObjects[_i].element.classList.add('jfs-scroll-' + that.scrollObjects[_i].animation.name + '-end');
                            that.scrollObjects[_i].animation.triggered = true;
                        }
                    }
                } else {

                    for (var _i2 = 0; _i2 < that.scrollObjects.length; _i2++) {

                        // If the animation is not triggered atm, don't execute the rest of the function anymore
                        if (!that.scrollObjects[_i2].animation.triggered) continue;

                        if (!that.scrollObjects[_i2].animation.rewind) continue;

                        if (!that.scrollObjects[_i2].animation.animatedrewind) that.scrollObjects[_i2].element.style.transition = '';

                        if (that.scrollObjects[_i2].offsetTop - window.innerHeight - that.scrollObjects[_i2].animation.offset.end > window.pageYOffset) {
                            that.scrollObjects[_i2].element.classList.remove('jfs-scroll-' + that.scrollObjects[_i2].animation.name + '-end');
                            that.scrollObjects[_i2].animation.triggered = false;
                        }
                    }
                }

                y = window.pageYOffset;
            };
        }

        // Bundles all information about scrollElements into scrollObjects so it's easily accessible

    }, {
        key: 'generateScrollObjects',
        value: function generateScrollObjects() {

            var scrollObjects = [];

            var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            for (var i = 0; i < this.scrollElements.length; i++) {

                var scrollObject = {};

                scrollObject.element = this.scrollElements[i];
                scrollObject.animation = {};
                scrollObject.animation.name = this.scrollElements[i].getAttribute('data-jfs') ? this.scrollElements[i].getAttribute('data-jfs') : this.defaultValues.name;
                scrollObject.animation.duration = this.scrollElements[i].getAttribute('data-jfs-duration') ? parseInt(this.scrollElements[i].getAttribute('data-jfs-duration')) / 1000 + "s" : this.defaultValues.duration;
                scrollObject.animation.delay = this.scrollElements[i].getAttribute('data-jfs-delay') ? parseInt(this.scrollElements[i].getAttribute('data-jfs-delay')) / 1000 + "s" : this.defaultValues.delay;
                scrollObject.animation.offset = {};
                scrollObject.animation.offset.start = this.scrollElements[i].getAttribute('data-jfs-offset-start') ? parseInt(this.scrollElements[i].getAttribute('data-jfs-offset-start')) * (h / 1065) : this.defaultValues.offset.start * (h / 1065);
                scrollObject.animation.offset.end = this.scrollElements[i].getAttribute('data-jfs-offset-end') ? parseInt(this.scrollElements[i].getAttribute('data-jfs-offset-end')) * (h / 1065) : this.defaultValues.offset.end * (h / 1065);
                scrollObject.animation.easing = this.scrollElements[i].getAttribute('data-jfs-easing') ? this.scrollElements[i].getAttribute('data-jfs-easing') : this.defaultValues.easing;
                scrollObject.animation.rewind = this.scrollElements[i].hasAttribute('data-jfs-rewind') || this.scrollElements[i].hasAttribute('data-jfs-offset-end') || this.scrollElements[i].hasAttribute('data-jfs-animatedrewind') || this.defaultValues.animatedrewind || this.defaultValues.rewind;
                scrollObject.animation.animatedrewind = this.scrollElements[i].hasAttribute('data-jfs-animatedrewind') || this.defaultValues.animatedrewind;
                scrollObject.animation.triggered = false;
                scrollObject.offsetTop = this.scrollElements[i].getBoundingClientRect().top + window.pageYOffset;

                scrollObjects.push(scrollObject);
            }

            return scrollObjects;
        }

        // Bundles all information about scrollElements into scrollObjects so it's easily accessible

    }, {
        key: 'generateEventObjects',
        value: function generateEventObjects() {

            var eventObjects = [];

            for (var i = 0; i < this.eventElements.length; i++) {

                var eventObject = {};

                eventObject.element = this.eventElements[i];
                eventObject.animation = {};
                eventObject.animation.name = this.eventElements[i].getAttribute('data-jfs-event') ? this.eventElements[i].getAttribute('data-jfs-event') : "grow";
                eventObject.animation.duration = this.eventElements[i].getAttribute('data-jfs-duration') ? parseInt(this.eventElements[i].getAttribute('data-jfs-duration')) / 1000 + "s" : "0.6s";
                eventObject.animation.delay = this.eventElements[i].getAttribute('data-jfs-delay') ? parseInt(this.eventElements[i].getAttribute('data-jfs-delay')) / 1000 + "s" : "0s";
                eventObject.animation.easing = this.eventElements[i].getAttribute('data-jfs-easing') ? this.eventElements[i].getAttribute('data-jfs-easing') : "ease";
                eventObject.animation.triggered = false;

                eventObjects.push(eventObject);
            }

            return eventObjects;
        }

        // Initializes all scrollElements so that they are ready to be animated

    }, {
        key: 'initScrollElements',
        value: function initScrollElements() {
            var _this = this;

            if (!this.scrollObjects) return;

            var _loop = function _loop(i) {

                for (var j = 0; j < _this.availableScrollAnimations.length; j++) {

                    if (_this.availableScrollAnimations[j].name === _this.scrollObjects[i].animation.name) {

                        _this.scrollObjects[i].element.classList.add('jfs-scroll-' + _this.scrollObjects[i].animation.name + '-start');
                        setTimeout(function () {
                            _this.scrollObjects[i].element.style.transition = 'all ' + _this.scrollObjects[i].animation.duration + ' ' + _this.scrollObjects[i].animation.easing + ' ' + _this.scrollObjects[i].animation.delay;
                        }, 10);

                        _this.availableScrollAnimations[j].added = true;
                    }
                }
            };

            for (var i = 0; i < this.scrollObjects.length; i++) {
                _loop(i);
            }
        }

        // Initializes all scrollElements so that they are ready to be animated

    }, {
        key: 'initEventElements',
        value: function initEventElements() {

            if (!this.eventObjects) return;

            for (var i = 0; i < this.eventObjects.length; i++) {

                for (var j = 0; j < this.availableEventAnimations.length; j++) {

                    if (this.availableEventAnimations[j].name === this.eventObjects[i].animation.name) {

                        this.availableEventAnimations[j].added = true;
                    }
                }
            }
        }

        // Adds the necessary classes to a style tag in the documents head

    }, {
        key: 'initStyles',
        value: function initStyles() {

            var css = this.generateClasses(),
                head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');

            style.type = 'text/css';
            style.id = 'jfs-styling';
            style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css));
            head.appendChild(style);
        }

        // Generates the necessary classes in function of the uses data attributes

    }, {
        key: 'generateClasses',
        value: function generateClasses() {

            var classes = "";

            for (var i = 0; i < this.availableScrollAnimations.length; i++) {

                if (this.availableScrollAnimations[i].added) {

                    if (classes !== "") classes += "\n";
                    classes += '.jfs-scroll-' + this.availableScrollAnimations[i].name + '-start { ' + this.availableScrollAnimations[i].styleStart + ' }\n';
                    classes += '.jfs-scroll-' + this.availableScrollAnimations[i].name + '-end { ' + this.availableScrollAnimations[i].styleEnd + ' }';
                }
            }

            for (var _i3 = 0; _i3 < this.availableEventAnimations.length; _i3++) {

                if (this.availableEventAnimations[_i3].added) {

                    if (classes !== "") classes += "\n";
                    classes += '.jfs-event-' + this.availableEventAnimations[_i3].name + ' { ' + this.availableEventAnimations[_i3].style + ' }';
                }
            }

            return classes;
        }
    }]);

    return _class;
}();