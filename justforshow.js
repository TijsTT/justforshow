;(function() { 

    console.log('Init just for show ...');

    class JFS {

        constructor() {

            this.scrollElements = document.querySelectorAll('[data-jfs-scroll]');

            this.availableScrollAnimations = [
                {
                    name: 'fade-up',
                    keyframes: '@keyframes fadeUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }',
                    style: 'opacity: 0; transform: translateY(20px); animation-name: fadeUp; animation-duration: 0.4s; animation-fill-mode: forwards; animation-play-state: paused;',
                    added: false
                },
                {
                    name: 'fade-down',
                    keyframes: '@keyframes fadeDown { 0% { transform: translateY(-20px); } 100% { transform: translateY(0); } }',
                    style: 'transform: translateY(-20px); animation-name: fadeDown; animation-duration: 0.4s; animation-fill-mode: forwards; animation-play-state: paused;',
                    added: false
                }
            ];
            
            this.initScrollElements();

            this.initStyles();

            let scrollElementsHeight = this.getScrollElementHeights();
            let y = window.pageYOffset;

            window.onscroll = function() {

                if(window.pageYOffset > y) {
                    for(let i = 0; i < scrollElementsHeight.length; i++) {
                        if(scrollElementsHeight[i].height - window.innerHeight + 200 < window.pageYOffset) {
                            scrollElementsHeight[i].element.classList.add('jfs-scroll-play');
                        }
                    }
                }

            }
            
        }

        getScrollElementHeights() {
            
            let heights = [];
            
            for(let i = 0; i < this.scrollElements.length; i++) {
                heights.push({
                    height: this.scrollElements[i].offsetTop, 
                    element: this.scrollElements[i],
                    animated: false
                });
            }

            return heights;

        }

        initScrollElements() {

            if(!this.scrollElements) return;

            for(let i = 0; i < this.scrollElements.length; i++) {

                let animationName = this.scrollElements[i].getAttribute('data-jfs-scroll');

                for(let j = 0; j < this.availableScrollAnimations.length; j++) {

                    if(this.availableScrollAnimations[j].name === animationName) {

                        this.scrollElements[i].classList.add(`jfs-scroll-${animationName}`);

                        this.availableScrollAnimations[j].added = true;

                    }

                }

            }

        }

        initStyles() {

            let css = this.generateClasses(),
                head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');

            style.type = 'text/css';
            style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css));
            head.appendChild(style);

        }

        generateClasses() {

            let classes = "";

            for(let i = 0; i < this.availableScrollAnimations.length; i++) {

                if(this.availableScrollAnimations[i].added) {

                    if(classes !== "") classes += "\n";
                    classes += this.availableScrollAnimations[i].keyframes + "\n";
                    classes += `.jfs-scroll-${this.availableScrollAnimations[i].name} { ${this.availableScrollAnimations[i].style} }`;

                }
            
            }
            
            classes += ".jfs-scroll-play { animation-play-state: running ;}"

            return classes;

        }

    }

    new JFS();  



})();