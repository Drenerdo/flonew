/* jshint node: true */
'use strict';

var TransformValue = require('./types/value');

function extractVal(index, expectUnits) {
  return function(match) {
    var units = '';
    
    if (typeof expectUnits == 'undefined' || expectUnits) {
      // get the units
      // default to undefined if an empty string which means the 
      // default units for the XYZ value type will be used
      units = match[index + 1] || undefined;
    }

    // create the transform value
    return new TransformValue(match[index], units);
  };
}

function makeRegex(fnName, params) {
  var regex = fnName + '\\(';
  
  (params || '').split(/\s/).forEach(function(param) {
    regex += matchers[param];
  });
  
  // return the regex
  return new RegExp(regex + '\\)');
}

var matchers = {
  val: '(\\-?[\\d\\.]+)',
  unit: '([^\\s]*)',
  ',': '\\,\\s*'
};

exports.translate = [
  // standard 2d translation
  {
    regex: makeRegex('translate', 'val unit , val unit'),
    x: extractVal(1),
    y: extractVal(3)
  },

  // 2d/3d translation on a specific axis
  {
    regex: makeRegex('translate(X|Y|Z)', 'val unit'),
    extract: function(match, data) {
      data[match[1].toLowerCase()] = extractVal(2)(match);
    },
    multi: true
  },

  // 3d translation as the specific translate3d prop
  {
    regex: makeRegex('translate', 'val unit , val unit , val unit'),
    x: extractVal(1),
    y: extractVal(3),
    z: extractVal(5)
  }
];

exports.rotate = [
  // standard 2d rotation
  {
    regex: makeRegex('rotate', 'val unit'),
    z: extractVal(1)
  },

  // 3d rotations on a specific axis
  {
    regex:  makeRegex('rotate(X|Y|Z)', 'val unit'),
    extract: function(match, data) {
      data[match[1].toLowerCase()] = extractVal(2)(match);
    },
    multi: true
  }
];

exports.scale = [
  // standard 2d scaling (single parameter version)
  {
    regex: makeRegex('scale', 'val'),
    x: extractVal(1, false),
    y: extractVal(1, false)
  },

  // standard 2d scaling (two parameter version)
  {
    regex: makeRegex('scale', 'val , val'),
    x: extractVal(1, false),
    y: extractVal(2, false)
  },

  // 2d/3d translation on a specific axis
  {
    regex: makeRegex('scale(X|Y|Z)', 'val'),
    extract: function(match, data) {
      data[match[1].toLowerCase()] = extractVal(2, false)(match);
    },
    multi: true
  }
];