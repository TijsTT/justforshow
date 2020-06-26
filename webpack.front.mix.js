const mix = require('laravel-mix');

mix.js('resources/js/main.js', 'public')
   .sass('resources/scss/main.scss', 'public')

   .options({
        // Our own set of PostCSS plugins.
        postCss: [
            require('tailwindcss')('./tailwind.config.js'),
            require('autoprefixer')({
                overrideBrowserslist: ['last 40 versions'],
            }),
        ],

        autoprefixer: true,

        // Webpack setting to ignore sass loader to follow url() paths
        processCssUrls: false,
    });