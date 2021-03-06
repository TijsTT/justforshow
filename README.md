# JustForShow
***Note:** this documentation is still under construction. If you have any questions, just open an issue!*

JustForShow is a dependency-free package built using the Intersection Observer API.<br>
It provides some simple hooks to make it easier for you to implement on scroll functionality in your project.

Apart from calling these hooks while scrolling, JustForShow also includes a few built-in modules to make use of them.

Modules which are currently included:
-   `AnimateFrom`: on scroll animation based on CSS classes
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
import { ArrayFindPolyfill } from 'justforshow';
import { JustForShowPolyfills } from 'justforshow';

// If you want the whole experience, you can include all modules like this
import { JustForShow, JustForShowPolyfills } from 'justforshow';
```

Importing the `JustForShow` module will also include the `AnimateFrom` and `LazyLoadingImage` module, as it can't work without these modules. Same goes for `JustForShowPolyfills`, which includes all polyfill modules. Any other module can be imported on its own to reduce file size if you would want to.

## Usage
Most basic usage:
```js
import { JustForShow } from 'justforshow';

// Using the 'animate-from' module as preset for on scroll animations
// for elements with selector '[data-jfs]'
new JustForShow('[data-jfs]', 'animate-from');
```

In the example above, JFS will be watching the elements with the given selector `[data-jfs]`. This first parameter needs to be passed as a string. The callback of those scroll events depends on the second parameter, which hold the options. If the second parameter is a string, then JFS will try to look for an included preset with the given name, e.g `'animate-from'`. Otherwise it expects an object which allows for much more detailed options to be set.

Example of the JFS options:
```js
import { JustForShow } from 'justforshow';

new JustForShow(selector, {
    preset: null,
    syncScrollPosition: true,

    // Intersection observer specific settings
    root: null,
    rootMargin: '0px',
    threshold: 0,

    // Hooks that will be called ...
    onEnterBottom: (element) => {
        // Do something when the element enters the window from the bottom
    },
    onEnterTop: (element) => {
        // Do something when the element enters the window from the top
    },
    onLeaveBottom: (element) => {
        // Do something when the element leaves the window from the bottom
    },
    onLeaveTop: (element) => {
        // Do something when the element leaves the window from the top
    },
});
```

### Example #1
***Case:** you want to log an elements id to the console every time it scrolls into view.*

Example HTML:
```html
<div class="min-h-screen">Some full screen content</div>

<div data-jfs id="just"></div>
<div data-jfs id="for"></div>
<div data-jfs id="show"></div>

<div class="min-h-screen">Some full screen content</div>
```
Initializing JustForShow:
```js
import { JustForShow } from 'justforshow';

new JustForShow('[data-jfs]', {
    onEnterBottom: (element) => {
        console.log(element.id);
    },
    onEnterTop: (element) => {
        console.log(element.id);
    }
})
```

When you now scroll down from top to bottom, your console output will be:
```console
"just"
"for"
"show"
```

Now if you scroll back to the top of the page, the output should look like this:
```console
"just"
"for"
"show"
"show"
"for"
"just"
```

## Options
| Option name | Default value | Description |
| ------------- | ------------- | ------------- |
| preset | `null` | Define a preset to handle all functionality in one place. Out of the box JFS includes an 'animate-from' and a 'lazyload' preset. This preset can be used in combination with the hooks the JFS instance provides. Expected values: `String` (JFS preset name) or `Function` (custom preset). |
| syncScrollPosition | `true` | If this is set to true, it will trigger all animations of elements positioned above or in the current view on page load. Expected values: `Boolean`. |
| root | `null` | Official Intersection Observer API option. Expected values and more info on [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer). |
| rootMargin | `'0px'` | Official Intersection Observer API option. Expected values and more info on [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer) |
| threshold | `0` | Official Intersection Observer API option. Expected values and more info on [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer) |
| onEnterBottom | `null` | This hook is called when the element enters the viewport from the bottom of the screen. The element will be passed as a parameter to the callback function. Expected value: `Function`. |
| onEnterTop | `null` | This hook is called when the element enters the viewport from the top of the screen. The element will be passed as a parameter to the callback function. Expected value: `Function`. |
| onLeaveBottom | `null` | This hook is called when the element leaves the viewport from the bottom of the screen. The element will be passed as a parameter to the callback function. Expected value: `Function`. |
| onLeaveTop | `null` | This hook is called when the element leaves the viewport from the top of the screen. The element will be passed as a parameter to the callback function. Expected value: `Function`. |

## On scroll animations with `AnimateFrom`
`AnimateFrom` is a module that holds functionality to make elements animate on scroll based on the hooks provided by JFS. For this example we'll be using standard [tailwindcss](https://tailwindcss.com) utility classes, as this module was built with the framework in mind. If you don't know what tailwindcss is, I really recommend you check it out. Of course, using any other CSS classes will work fine too!

Let's start with a bit of HTML:
```html
<div class="h-16 bg-black">Please animate me!</div>
```

Now we need to initialize JustForShow:
```js
import { JustForShow } from 'justforshow';

new JustForShow('[data-jfs]', 'animate-from');
```

For JustForShow to create hooks for this element, we need to make sure the chosen selector corresponds with the element we want to animate. This selector can be anything to identify the element, in this case `data-jfs`:
```html
<div data-jfs class="h-16 bg-black transition duration-300">Please animate me!</div>
```

On initialization, `AnimateFrom` will add one or more chosen classes to the element. While scrolling the page, whenever the `onEnterBottom` hook is called for this element, the callback will remove all the defined classes from the element. Combined with - for example - CSS transitions, you can create on scroll animations.

Here is how we define the classes from which the element will animate:
```html
<div data-jfs data-jfs-from="bg-grey-500" class="h-16 bg-black transition duration-300">Please animate me!</div>
```

Et voila! Now, whenever we scroll the element in view, its color will change from grey to black. Very fancy! 😎

***Why does it work this way?**<br>
By first adding classes and later removing them on scroll, your base styling is completely independent from the workings of your JavaScript. If for any reason JavaScript doesn't work on the page - which would obviously never ever happen in your project - it won't leave elements hanging, waiting for JavaScript to animate it to the state it needs to be. They will still have the expected styling, just without those slick animations.*

`AnimateFrom` also comes with the possibility to repeat animations every time the user scrolls over them. This can be done by setting another attribute `data-jfs-from-repeat` to the element like this:
```html
<div data-jfs data-jfs-from="bg-grey-500" data-jfs-repeat class="h-16 bg-black transition duration-300">Please animate me!</div>
```

## Loading images on scroll with `LazyLoadingImage`
`LazyLoadingImage` is a module that loads images only when they are scrolled into view. This comes in very handy when you want to minimize the page load time. Setting it up is very easy:
```html
<img data-jfs-lazyload src="/justforshow.png" alt="JustForShow is awesome" width="1600" height="900">
```
```js
import { JustForShow } from 'justforshow';

// Notice how using the module specific selector here perfectly does the job!
new JustForShow('[data-jfs-lazyload]', 'lazyload');
```

That's all. It just works ... ✨

At the moment, `LazyLoadingImage` only works with `img` tags. In the future `background-image` and others will be supported too.

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

For JustForShow to be fully functional in IE, you will also need a polyfill for `array.prototype.find`. For your convenience this is also available to import:
```js
import { JustForShow, ArrayFindPolyfill } from 'justforshow';

ArrayFindPolyfill();

new JustForShow('[data-jfs]', 'animate-from');
```

Finally, for people that don't care about file size and just want it to work everywhere, you can use `JustForShowPolyfills'. This method bundles all polyfills together:
```js
import { JustForShow, JustForShowPolyfills } from 'justforshow';

JustForShowPolyfills();

new JustForShow('[data-jfs]', 'animate-from');
```
