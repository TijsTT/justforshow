# Just For Show

A simple and easily customizable animation library.

## Installing

Using npm:

```bash
$ npm install justforshow
```

## How to use

First, import the JFS class into your project:

```js
import { JFS } from 'justforshow';
```

Then just initiate the JFS class in your own script:

```js
new JFS();
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

