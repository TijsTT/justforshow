class LazyLoadingImage {
    constructor(element) {
        this.element = element;

        this._lazyloadAttribute = 'data-jfs-lazyload';
        this._lazyloadFromAttribute = 'data-jfs-lazyload-from';

        this.src = this.element.getAttribute(this._lazyloadAttribute);
        this.classes = this.element.getAttribute(this._lazyloadFromAttribute) ? this.element.getAttribute(this._lazyloadFromAttribute).split(' ') : [];

        this._setPlaceholderClasses();
    }

    onEnterBottom() {
        this.element.src = this.src;

        this.element.addEventListener('load', () => {
            this.classes.forEach((_class) => {
                this.element.classList.remove(_class);
            })
        })
    }

    _setPlaceholderClasses() {
        this.classes.forEach((_class) => {
            this.element.classList.add(_class);
        })
    }
}

export { LazyLoadingImage };