batchable
=========

Handle consecutive function calls at once.

```
npm install batchable --save
```

## Usage

```js
import batchable from 'batchable';

// Batched function is called when current call stack has cleared.
let batchedGreet = batchable((calls) => {
  // calls is an array of arguments objects converted to array.
  let names = calls.map(c => c[0]);
  let last = names.pop();

  console.log(`Hello ${names.join(', ')} and ${last}!`);

  calls.forEach(c => c[1]());
});

function greet(name = 'stranger', callback = () => {}) {
  batchedGreet(name, callback);
};

greet('Tim');
greet('Johnny');
greet('Peter', () => console.log('Peter has been greeted!'));

// -> Hello Tim, Johnny and Peter!
// -> Peter has been greeted!
```
