# JustForShow
*Note: this documentation is still under construction. If you have any questions, just open an issue!*

JustForShow is a dependency-free package built using the Intersection Observer API.<br>
It provides event listeners to make it easier for you to implement on scroll functionality.

Apart from these on scroll event listeners, JustForShow also includes a few built-in modules to make use of them. 

Modules which are currently included:
-   `AnimateFrom`: on scroll animation based on CSS classes (works great with tailwindcss)
-   `LazyLoadingImage`: on scroll image lazyloading

## Installation
Install via NPM:
```shell
$ npm install justforshow
```

## Importing
This package has a modular build. This means you can import every module on its own like this:
```js
// Individual modules
import { JustForShow } from 'justforshow';
import { AnimateFrom } from 'justforshow';
import { LazyLoadingImage } from 'justforshow';
import { IntersectionObserverPolyfill } from 'justforshow';

// If you want the whole experience, you can include all modules like this
import { JustForShow, IntersectionObserverPolyfill } from 'justforshow';
```

Importing the JustForShow module will also include the `AnimateFrom` and `LazyLoadingImage` module, as it can't work without these modules. Any other module can be imported on its own to reduce filesize if you would want to.

## Usage
Most basic usage:
```js
import { JustForShow } from 'justforshow';

// Using the 'animate-from' module as preset for on scroll animations 
// for elements with selector '[data-jfs]'
new JustForShow('[data-jfs]', 'animate-from');
```

In the example above, JFS will be watching for scroll events of the elements with the given selector `'[data-jfs]'`. This needs to be passed as a string as the first parameter. The callback of those scroll events depends on the second parameter, which hold the options. If a string is passed, then JFS will try to look for an included preset with the given name, e.g `'animate-from'`. Otherwise it expects an object which allows for much more detailed options to be set.

Example of the JFS options, which are all set to their default values:
```js
import { JustForShow } from 'justforshow';

new JustForShow(selector, {
    preset: null, // string or custom preset
    syncScrollPosition: true, // boolean

    // Intersection observer specific settings
    root: null, // DOM element
    rootMargin: '0px 0px 0px 0px', // string
    threshold: [0], // array

    // The event listeners
    onEnterBottom: (element) => { /* do something */ }, // function
    onEnterTop: (element) => { /* do something */ }, // function
    onLeaveBottom: (element) => { /* do something */ }, // function
    onLeaveTop: (element) => { /* do something */ }, // function
});
```

### On scroll animations with `AnimateFrom`
`AnimateFrom` is a module that holds functionality to make elements animate on scroll based on the JFS event listeners. For this example I'll be using standard [tailwindcss](https://tailwindcss.com) utility classes, as this module was built with the framework in mind. If you don't know what tailwindcss is, I really recommend you check it out. Of course, using any other CSS classes will work fine too!

Let's start with a bit of HTML:
```html
<body>
    <!-- Fullscreen element so we can see the on scroll animation magic -->
    <div class="h-screen"></div>

    <!-- Element to be animated -->
    <div class="h-16 bg-black">Hello world!</div>
</body>
```

Now you need to initialize JustForShow:
```js
import { JustForShow } from 'justforshow';

new JustForShow('[data-jfs]', 'animate-from');

// Or an equal initialization with the option object:
// new JustForShow('[data-jfs]', {
//    preset: 'animate-from'
// });
```

For JustForShow to create event listeners for this element, we need to make sure the chosen selector corresponds with the element:
```diff
<body>
    <!-- Fullscreen element so we can see the on scroll animation magic -->
    <div class="h-screen"></div>

    <!-- Element to be animated -->
-    <div class="h-16 bg-black">Hello world!</div>
+    <div data-jfs class="h-16 bg-black transition duration-300">Hello world!</div>
</body>
```

`AnimateFrom` will trigger animations on scroll based on the JFS event listeners. Whenever the `onEnterBottom` event triggers, the callback will add any chosen CSS classes to the element. But how do you define those classes? Like this:
```diff
<body>
    <!-- Fullscreen element so we can see the on scroll animation magic -->
    <div class="h-screen"></div>

    <!-- Element to be animated -->
-    <div data-jfs class="h-16 bg-black transition duration-300">Hello world!</div>
+    <div data-jfs data-jfs-from="bg-grey-500" class="h-16 bg-black transition duration-300">Hello world!</div>
</body>
```

Et voila! If you now scroll the element in view, its color will change from black to grey. Very fancy 😎

## Browser support
The IntersectionObserver API is relatively new. Despite that it's supported by all major browser, except for IE. That's why this package also includes [this intersection observer polyfill](https://www.npmjs.com/package/intersection-observer). Props to them! 

Polyfill usage:
```js
import { JustForShow, IntersectionObserverPolyfill } from 'justforshow';

// First call the polyfill
IntersectionObserverPolyfill();

// Then do your JustForShow magic
new JustForShow('[data-jfs]', 'animate-from');
```