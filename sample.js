const mobx = require('mobx');
const { observable, autorun, action } = mobx;
const asyncUpdate = require('./async-update');

function createTest() {
  const Test = observable({
    _test: '',
    get test() {
      setTimeout(action(() => this.asyncUpdate('after')), 700);
      return this._test
    },
    set test(val) {
      this._test = val;
    },
    asyncUpdate
  });
  return Test;
}

const look = createTest();
look.test = 'before';
const disposer = autorun(() => {
  console.log(look.test)
});

