var jfs = new JFS([
    {
        name: 'fade-up-inverted',
        styleStart: 'opacity: 1; transform: translateY(0px);',
        styleEnd: 'opacity: 0; transform: translateY(-20px);'
    }
], {
    default: {
        rewind: true,
    }
});

document.querySelector('[data-element-grow]').addEventListener('click', function() {
    jfs.toggleAnimation(document.querySelector('[data-element-grow]'), () => {
        jfs.toggleAnimation(document.querySelector('[data-element-grow]'));
    });
});


