# Just For Show

A simple and easily customizable onscroll animation library. 
This project is a work in progress. If you have any requests or problems, feel free to contact me.


## Installing

Using npm:

```bash
$ npm install justforshow
```

You can also just copy the justforshow.js in your project. It will work the same way.


## How to use

First, import the JFS class into your project:

```js
import { JFS } from 'justforshow';
```

Second, initiate the JFS class in your own script:

```js
new JFS();
```

After that, you just add the data-jfs attribute to any element to add a simple fade up with default settings.

```html
<p data-jfs>Hello world!</p>
```


## Animation settings

Currently, JFS includes 4 default animations. If you don't set an animation it will default to a fade up. You can choose an animation by its name in the following way:

```html
<p data-jfs="fade-up">Hello world!</p>
<p data-jfs="fade-right">Hello world!</p>
<p data-jfs="fade-down">Hello world!</p>
<p data-jfs="fade-left">Hello world!</p>
```

### Duration

You can change the duration of the animation. If you don't specify this it will default to 600ms.

```html
<p data-jfs data-jfs-duration="400">Hello world!</p>
<p data-jfs data-jfs-duration="800">Hello world!</p>
```

### Delay

You can change the delay of the animation. If you don't specify this it will default to 0ms. 

```html
<p data-jfs data-jfs-delay="200">Hello world!</p>
<p data-jfs data-jfs-delay="400">Hello world!</p>
```

### Rewind

It's also possible to rewind the animation every time you scroll up. If you don't specify this the animation will only trigger once.

```html
<p data-jfs data-jfs-rewind>Hello world!</p>
```

If you would like to have an animated rewind, instead of a hard animation reset, you can add this instead.

```html
<p data-jfs data-jfs-animatedrewind>Hello world!</p>
```

### Easing

The default easing for the animation is just the default ease function. To add your own timing function, you can do it like this.

```html
<p data-jfs data-jfs-easing="ease-in-out">Hello world!</p>
```

### Offset

Finally you can also change the scroll offset of the animated object. On default the starting offset of the animation is 250px.

```html
<p data-jfs data-jfs-offset-start="500">Hello world!</p>
```

In case you want your animation to rewind, it's possible you will need to change the ending offset too. On default this offset is set to 0px so it will trigger when the element is not anymore in the current view.

```html
<p data-jfs data-jfs-offset-end="250">Hello world!</p>
```


## Custom animations

To create an animation, you have to make an animation object like this:

```js
var animation = {
    name: 'animation-name',
    styleStart: 'opacity: 0; transform: scale(0.8);',
    styleEnd: 'opacity: 1; transform: scale(1);',
}
```

Then you need to pass it as an argument to the JFS class when initiating it.
Mind that you have to add an array of animation objects. So add as many animations as you like!

```js
new JFS([animation]);
```

```html
<p data-jfs="animation-name">Hello world!</p>
```


### Done! :)

