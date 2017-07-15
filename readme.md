# MobX Async Setter

Mixing this function into an `observable` object will allow you to update
encapsulated properties asynchronously---oddly on the `get`. This is
similar to how `CanJS` asynchronous setters work (or used to work)---i.e., setting a value
on `get`. Here is a simple example:

```js
import asyncUpdate from './async-update';

function createTest() {
  const Test = observable({
    _test: '',
    get test() {
      setTimeout(() => this.asyncUpdate('after'), 700);
      return this._test
    },
    set test(val) {
      this._test = val;
    },
    // Mix in asynchUpdate. The function must be mixed in to the observable
    // object for MobX to correctly update.
    asyncUpdate
  });
  return Test;
}

const look = createTest();
look.test = 'before';
const disposer = autorun(() => {
  console.log(look.test)
});
```

In a more realistic example, you might want to perform some form of
asynchronous validation, e.g.:

```js
    get test() {
      axios.get(`/validation/${this._test}`)
        .then(action(result => {
            if(result.error) {
                this.asyncUpdate(result.error)
            }
        }));
      return this._test
    },
```