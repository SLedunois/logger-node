module.exports =  {
  store: {},
  add: function (o) {
    if (!o.hasOwnProperty('_id')) return false;
    return this.store[o._id] = o;
  },
  get: function (id) {
    return this.store[id];
  },
  getAll: function () {
    var res = [];
    for (var key in this.store) {
      res.push(this.store[key]);
    }
    return res;
  }
};
