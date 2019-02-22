'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.JFS = function () {
    function _class() {
        var customScrollAnimations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, _class);

        // console.log('Init just for show ...');

        this.scrollElements = document.querySelectorAll('[data-jfs]');
        this.scrollObjects = this.generateScrollObjects();

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

        this.addCustomScrollAnimations(customScrollAnimations);

        this.initScrollElements();
        this.initStyles();

        this.watchScroll();
        this.watchWindowResize();
    }

    // Adds the given customScrollAnimations to the available animations array


    _createClass(_class, [{
        key: 'addCustomScrollAnimations',
        value: function addCustomScrollAnimations(customScrollAnimations) {

            if (!customScrollAnimations.constructor === Array) return;

            for (var i = 0; i < customScrollAnimations.length; i++) {
                customScrollAnimations[i].added = false;
            }

            this.availableScrollAnimations = this.availableScrollAnimations.concat(customScrollAnimations);
        }

        // Watches for window resize events and recalculates the offset of each scrollElement

    }, {
        key: 'watchWindowResize',
        value: function watchWindowResize() {

            var that = this;

            var resizeTimeout = void 0;

            window.onresize = function () {

                clearTimeout(resizeTimeout);

                resizeTimeout = setTimeout(function () {
                    for (var i = 0; i < that.scrollObjects.length; i++) {
                        that.scrollObjects[i].offsetTop = that.scrollObjects[i].element.getBoundingClientRect().top + window.scrollY;
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

            for (var i = 0; i < this.scrollElements.length; i++) {

                var scrollObject = {};

                scrollObject.element = this.scrollElements[i];
                scrollObject.animation = {};
                scrollObject.animation.name = this.scrollElements[i].getAttribute('data-jfs') ? this.scrollElements[i].getAttribute('data-jfs') : "fade-up";
                scrollObject.animation.duration = this.scrollElements[i].getAttribute('data-jfs-duration') ? parseInt(this.scrollElements[i].getAttribute('data-jfs-duration')) / 1000 + "s" : "0.6s";
                scrollObject.animation.delay = this.scrollElements[i].getAttribute('data-jfs-delay') ? parseInt(this.scrollElements[i].getAttribute('data-jfs-delay')) / 1000 + "s" : "0s";
                scrollObject.animation.offset = {};
                scrollObject.animation.offset.start = this.scrollElements[i].getAttribute('data-jfs-offset-start') ? parseInt(this.scrollElements[i].getAttribute('data-jfs-offset-start')) : 250;
                scrollObject.animation.offset.end = this.scrollElements[i].getAttribute('data-jfs-offset-end') ? parseInt(this.scrollElements[i].getAttribute('data-jfs-offset-end')) : 0;
                scrollObject.animation.easing = this.scrollElements[i].getAttribute('data-jfs-easing') ? this.scrollElements[i].getAttribute('data-jfs-easing') : "ease";
                scrollObject.animation.rewind = this.scrollElements[i].hasAttribute('data-jfs-rewind') || this.scrollElements[i].hasAttribute('data-jfs-offset-end') || this.scrollElements[i].hasAttribute('data-jfs-animatedrewind');
                scrollObject.animation.animatedrewind = this.scrollElements[i].hasAttribute('data-jfs-animatedrewind');
                scrollObject.animation.triggered = false;
                scrollObject.offsetTop = this.scrollElements[i].getBoundingClientRect().top + window.scrollY;

                scrollObjects.push(scrollObject);
            }

            return scrollObjects;
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

        // Adds the necessary classes to a style tag in the documents head

    }, {
        key: 'initStyles',
        value: function initStyles() {

            var css = this.generateClasses(),
                head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');

            style.type = 'text/css';
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

            return classes;
        }
    }]);

    return _class;
}();