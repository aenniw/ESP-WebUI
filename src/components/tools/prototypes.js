String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};

Array.prototype.last = function() {
  return this[this.length - 1];
};
