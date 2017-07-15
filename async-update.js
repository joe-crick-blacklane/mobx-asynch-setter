const mobx = require('mobx');

module.exports = function asyncUpdate(val) {
  const backingProp = getBackingProp.call(this);
  this[backingProp] = val;
  mobx.Reaction.prototype.runReaction();
};

/**
 * Returns the backing prop for the getter
 * @return {*}
 */
function getBackingProp() {
  return Object.keys(this.$mobx.values).filter(key => key[0] === '_' && key !== '__proto__')[0]
}