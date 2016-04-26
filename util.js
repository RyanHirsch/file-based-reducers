var fs = require('fs');
var path = require('path');

module.exports = function(fullFilePath, initalState) {

  var scriptName = path.basename(fullFilePath);
  var parentAbsDir = path.dirname(fullFilePath);
  var parentDir = path.dirname(fullFilePath).split(path.sep).slice(-1).join();
  var files = fs.readdirSync(path.dirname(fullFilePath)).filter(function(f) { return f !== scriptName });

  var filename = function(filename) {
    return filename.split('.').slice(0,1);
  }

  var composedObject = files.reduce(function(obj, file) {
    obj[parentDir + '/' + filename(file)] = require(parentAbsDir + '/' + file);
    return obj;
  }, {});


  return function(state, action) {
    if(state === undefined) {
      state = initalState;
    }
    if(composedObject[action.type]) {
      return composedObject[action.type](state, action);
    }
    return state;
  };
}

