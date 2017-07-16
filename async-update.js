const mobx = require('mobx');

/**
 * Performs an async update on a MobX getter
 * @param val
 */
module.exports = mobx.action(function asyncUpdate(val) {
  const backingProp = getBackingProp.call(this);
  this[backingProp] = val;
  mobx.Reaction.prototype.runReaction();
});

/**
 * Returns the backing prop for the getter
 * @return {*}
 */
function getBackingProp() {
  const values = this.$mobx.values;
  return Object.keys(values).filter(key => instanceOf(values[key], 'ObservableObject')).shift();
}

/**
 * Indicates whether an object is of an instance type
 * @param object
 * @param instance
 * @return {boolean}
 */
function instanceOf(object, instance) {
  return object.toString().indexOf(instance) > -1;
}