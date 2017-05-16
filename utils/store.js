const ip = require('ip').address();
module.exports = {
  /**
   * Generate and Id based on one ip number and a timestamp
   * @returns {string} unique id
   */
  generateId: function () {
    return this.getNumberIP() + '-' + new Date().getTime();
  },
  /**
   * Get one ip number
   * @returns {string}
   */
  getNumberIP: function () {
    var index = Math.floor(Math.random() * 4);
    var _t = ip.split('.');
    return _t[index];
  },
  /**
   * Generate an object corresponding to one file in the configuration. Contains
   * an id, a name, a filename and a path
   * @param configurationFile file in the configuration
   */
  createReference: function (configurationFile) {
    return {
      _id: this.generateId(),
      name: configurationFile.name,
      filename: configurationFile.filename,
      path: configurationFile.path,
      filepath: configurationFile.filepath,
      ip: ip
    }
  }
};
