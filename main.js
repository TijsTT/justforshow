var jfs = new JFS([
    {
        name: 'fade-up-inverted',
        styleStart: 'opacity: 1; transform: translateY(0px);',
        styleEnd: 'opacity: 0; transform: translateY(-20px);'
    }
]);

document.getElementById('clicktest').onclick = function() {
    jfs.toggleAnimation(this);
}

