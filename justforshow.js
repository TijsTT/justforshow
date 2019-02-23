class JFS {

    constructor(customScrollAnimations = []) {

        // console.log('Init just for show ...');

        this.scrollElements = document.querySelectorAll('[data-jfs]');
        this.scrollObjects = this.generateScrollObjects();

        // Here you can add all kinds of animations =)
        this.availableScrollAnimations = [
            {
                name: 'fade-up',
                styleStart: 'opacity: 0; transform: translateY(20px);',
                styleEnd: 'opacity: 1; transform: translateY(0);',
                added: false
            },
            {
                name: 'fade-down',
                styleStart: 'opacity: 0; transform: translateY(-20px);',
                styleEnd: 'opacity: 1; transform: translateY(0);',
                added: false
            },
            {
                name: 'fade-left',
                styleStart: 'opacity: 0; transform: translateX(20px);',
                styleEnd: 'opacity: 1; transform: translateX(0);',
                added: false
            },
            {
                name: 'fade-right',
                styleStart: 'opacity: 0; transform: translateX(-20px);',
                styleEnd: 'opacity: 1; transform: translateX(0);',
                added: false
            }
        ];

        this.availableClickAnimations = [
            {
                name: 'grow',
                style: 'transform: scale(1.1)',
                added: false
            }
        ];

        this.addCustomScrollAnimations(customScrollAnimations);
        
        this.initScrollElements();
        this.initStyles();

        this.watchScroll();
        this.watchWindowResize();
        
    }

    // Animation on click event
    animateClick(element, animationName) {
        console.log(element, animationName);
        for(let i = 0; i < this.availableClickAnimations.length; i++) {
            if(this.availableClickAnimations[i].name === animationName) {
                this.availableClickAnimations[i].added = true;
            }
        }
        console.log(this.availableClickAnimations);
    }

    // Adds the given customScrollAnimations to the available animations array
    addCustomScrollAnimations(customScrollAnimations) {

        if(!customScrollAnimations.constructor === Array) return;

        for(let i = 0; i < customScrollAnimations.length; i++) {
            customScrollAnimations[i].added = false;
        }

        this.availableScrollAnimations = this.availableScrollAnimations.concat(customScrollAnimations);
    }

    // Watches for window resize events and recalculates the offset of each scrollElement
    watchWindowResize() {

        let that = this;

        let resizeTimeout;

        window.onresize = function() {

            clearTimeout(resizeTimeout);

            resizeTimeout = setTimeout(() => {
                for(let i = 0; i < that.scrollObjects.length; i++) {
                    that.scrollObjects[i].offsetTop = that.scrollObjects[i].element.getBoundingClientRect().top + window.scrollY;
                }
            }, 500);
            
        }
        
    }

    // Watches for window scroll events and triggers the animation based on the current scroll position
    watchScroll() {

        let y = window.pageYOffset;

        // This will trigger the animations if the user already scrolled and reloads the page.
        for(let i = 0; i < this.scrollObjects.length; i++) {

            if(this.scrollObjects[i].offsetTop - window.innerHeight + this.scrollObjects[i].animation.offset.start < window.pageYOffset) {
                // Already add inline styling because otherwise the transition won't work
                this.scrollObjects[i].element.style.transition = `all ${this.scrollObjects[i].animation.duration} ${this.scrollObjects[i].animation.easing} ${this.scrollObjects[i].animation.delay}`;
                this.scrollObjects[i].element.classList.add(`jfs-scroll-${this.scrollObjects[i].animation.name}-end`);
                this.scrollObjects[i].animation.triggered = true;
            }

        }

        let that = this;

        window.onscroll = function() {

            if(window.pageYOffset > y) {

                for(let i = 0; i < that.scrollObjects.length; i++) {

                    // If the animation already triggered, don't execute the rest of the function anymore
                    if(that.scrollObjects[i].animation.triggered) continue;
                    
                    if(that.scrollObjects[i].offsetTop - window.innerHeight + that.scrollObjects[i].animation.offset.start < window.pageYOffset) {
                        that.scrollObjects[i].element.style.transition = `all ${that.scrollObjects[i].animation.duration} ${that.scrollObjects[i].animation.easing} ${that.scrollObjects[i].animation.delay}`;
                        that.scrollObjects[i].element.classList.add(`jfs-scroll-${that.scrollObjects[i].animation.name}-end`);
                        that.scrollObjects[i].animation.triggered = true;
                    }

                }

            } else {

                for(let i = 0; i < that.scrollObjects.length; i++) {

                    // If the animation is not triggered atm, don't execute the rest of the function anymore
                    if(!that.scrollObjects[i].animation.triggered) continue;
                    
                    if(!that.scrollObjects[i].animation.rewind) continue;

                    if(!that.scrollObjects[i].animation.animatedrewind) that.scrollObjects[i].element.style.transition = ``;

                    if(that.scrollObjects[i].offsetTop - window.innerHeight - that.scrollObjects[i].animation.offset.end > window.pageYOffset) {
                        that.scrollObjects[i].element.classList.remove(`jfs-scroll-${that.scrollObjects[i].animation.name}-end`);
                        that.scrollObjects[i].animation.triggered = false;
                    }

                }

            }

            y = window.pageYOffset;

        }

    }

    // Bundles all information about scrollElements into scrollObjects so it's easily accessible
    generateScrollObjects() {

        let scrollObjects = [];

        for(let i = 0; i < this.scrollElements.length; i++) {

            let scrollObject = {};

            scrollObject.element = this.scrollElements[i];
            scrollObject.animation = {};
            scrollObject.animation.name = this.scrollElements[i].getAttribute('data-jfs') ? this.scrollElements[i].getAttribute('data-jfs') : "fade-up";
            scrollObject.animation.duration = this.scrollElements[i].getAttribute('data-jfs-duration') ? parseInt(this.scrollElements[i].getAttribute('data-jfs-duration'))/1000 + "s" : "0.6s";
            scrollObject.animation.delay = this.scrollElements[i].getAttribute('data-jfs-delay') ? parseInt(this.scrollElements[i].getAttribute('data-jfs-delay'))/1000 + "s" : "0s";
            scrollObject.animation.offset = {};
            scrollObject.animation.offset.start = this.scrollElements[i].getAttribute('data-jfs-offset-start') ? parseInt(this.scrollElements[i].getAttribute('data-jfs-offset-start')) : 250;
            scrollObject.animation.offset.end = this.scrollElements[i].getAttribute('data-jfs-offset-end') ? parseInt(this.scrollElements[i].getAttribute('data-jfs-offset-end')) : 0;
            scrollObject.animation.easing = this.scrollElements[i].getAttribute('data-jfs-easing') ? this.scrollElements[i].getAttribute('data-jfs-easing') : "ease";
            scrollObject.animation.rewind = (this.scrollElements[i].hasAttribute('data-jfs-rewind') || this.scrollElements[i].hasAttribute('data-jfs-offset-end') || this.scrollElements[i].hasAttribute('data-jfs-animatedrewind'));
            scrollObject.animation.animatedrewind = this.scrollElements[i].hasAttribute('data-jfs-animatedrewind');
            scrollObject.animation.triggered = false;
            scrollObject.offsetTop = this.scrollElements[i].getBoundingClientRect().top + window.scrollY;

            scrollObjects.push(scrollObject);

        }

        return scrollObjects;

    }

    // Initializes all scrollElements so that they are ready to be animated
    initScrollElements() {

        if(!this.scrollObjects) return;

        for(let i = 0; i < this.scrollObjects.length; i++) {

            for(let j = 0; j < this.availableScrollAnimations.length; j++) {

                if(this.availableScrollAnimations[j].name === this.scrollObjects[i].animation.name) {

                    this.scrollObjects[i].element.classList.add(`jfs-scroll-${this.scrollObjects[i].animation.name}-start`);
                    setTimeout(() => {
                        this.scrollObjects[i].element.style.transition = `all ${this.scrollObjects[i].animation.duration} ${this.scrollObjects[i].animation.easing} ${this.scrollObjects[i].animation.delay}`;
                    },10)

                    this.availableScrollAnimations[j].added = true;

                }

            }

        }

    }

    // Adds the necessary classes to a style tag in the documents head
    initStyles() {

        let css = this.generateClasses(),
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';
        style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css));
        head.appendChild(style);

    }

    // Generates the necessary classes in function of the uses data attributes
    generateClasses() {

        let classes = "";

        for(let i = 0; i < this.availableScrollAnimations.length; i++) {

            if(this.availableScrollAnimations[i].added) {

                if(classes !== "") classes += "\n";
                classes += `.jfs-scroll-${this.availableScrollAnimations[i].name}-start { ${this.availableScrollAnimations[i].styleStart} }\n`;
                classes += `.jfs-scroll-${this.availableScrollAnimations[i].name}-end { ${this.availableScrollAnimations[i].styleEnd} }`;

            }
        
        }

        return classes;

    }

}



