inspect.macro
=============

Log an expression and the result of that expression to the console

This is a project I put together to learn more about macros and babel plugins. Also, it scratches an itch of mine. Do you ever find yourself writing

```javascript
console.log('string description', <complicated expression>);
```

And then you look at the output, and can't remember precisely what the expression was. You start second-guessing yourself: maybe you *did* swap the order of the parameters?

So you tab back and forth, trying to compare.

Instead, you can write

```javascript
import inspect from 'inspect.macro';

inspect(complicatedExpression(involving.many(parts * and * values)));
```

and your code will be transformed into

```javascript
console.log(
  'complicatedExpression(involving.many(parts * and * values)) →',
  (function () {
    try {
      return complicatedExpression(involving.many(parts * and * values))
    } catch (e) {
      return 'an error occurred: ' + e;
    }
  }()));
```

## Setup

You'll need to set up [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/user.md). After that, all that's needed is to `npm install inspect.macro` and import and use it!

## See also

- This is made possible by [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros)
- [babel-plugin-console](https://github.com/mattphillips/babel-plugin-console) provides `console.scope` function that logs everything in the current scope
- Elixir has a function that does this, which was my inspiration.