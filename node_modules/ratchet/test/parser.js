var test = require('tape');
var ratchet = require('../');
var transforms = {
  translate: 'translate(200px,-50px)',
  translateNoUnits: 'translate(200, -50)',
  translate3d: 'translate(300px, 100px, 10px)',
  translateWithRotate: 'rotate(90deg) translate(200px, -50px)',
  translateX: 'translateX(200px)',
  translateXWithRotate: 'rotate(90deg) translateX(200px)',
  translateY: 'translateY(-50px)',
  translateYWithRotate: 'rotate(90deg) translateY(-50px)',
  rotate: 'rotate(175deg)',
  rotateNoUnits: 'rotate(190)',
  scaleSimple: 'scale(0.5)',
  scaleXY: 'scale(0.5, 2)',
  sepTransforms: 'translateX(100.2px) translateY(20px) translateZ(30px) rotateX(-105deg) rotateY(-30deg) rotateZ(180deg) scaleX(1.2) scaleY(0.8) scaleZ(0.4)',
  rotateNoUnitsWithTranslate: 'translateX(3px) rotate(5.72)'
};
    
function parse(input, prop, values) {
  return function(t) {
    var transform;
    var extractedValues;

    t.plan(Object.keys(values).length + 1);
    transform = ratchet(input);
    extractedValues = transform[prop];

    t.ok(extractedValues, 'have extracted values');
    for (var key in values) {
      t.ok(extractedValues[key] == values[key], prop + '-' + key + ': ' + extractedValues[key] + ' == ' + values[key]);
    }
  };
}

test(
  'x, y translate',
  parse(transforms.translate, 'translate', { x: 200, y: -50 })
);

test(
  '3d transform',
  parse(transforms.translate3d, 'translate', { x: 300, y: 100, z: 10 })
);

test(
  'parse on x, y translate with other preceeding properties',
  parse(transforms.translateWithRotate, 'translate', { x: 200, y: -50 })
);

test(
  'single translateX', 
  parse(transforms.translateX, 'translate', { x: 200 })
);

test(
  'single translateX with other preceeding properties',
  parse(transforms.translateXWithRotate, 'translate', { x: 200 })
);

test(
  'parse a single translateY with negative values',
  parse(transforms.translateY, 'translate', { y: -50 })
);

test(
  'parse a single translateY with negative values (when preceeding properties are present)',
  parse(transforms.translateYWithRotate, 'translate', { y: -50 })
);

test(
  'parse simple rotation', 
  parse(transforms.rotate, 'rotate', { z: 175 })
);

test(
  'parse single parameter scaling',
  parse(transforms.scaleSimple, 'scale', { x: 0.5, y: 0.5 })
);

test(
  'parse double parameter scaling',
  parse(transforms.scaleXY, 'scale', { x: 0.5, y: 2 })
);

test(
  'parse a complex separated transform (translate)', 
  parse(transforms.sepTransforms, 'translate', { x: 100.2, y: 20, z: 30 })
);

test(
  'parse a complex separated transform (rotate)', 
  parse(transforms.sepTransforms, 'rotate', { x: -105, y: -30, z: 180 })
);

test(
  'parse a complex separated transform (scale)', 
  parse(transforms.sepTransforms, 'scale', { x: 1.2, y: 0.8, z: 0.4 })
);

test('parse the appropriate units', function(t) {
  var transform;

  t.plan(4);
  t.ok(transform = ratchet(transforms.sepTransforms));
  t.equal(transform.translate.x.units, 'px');
  t.equal(transform.rotate.z.units, 'deg');
  t.equal(transform.scale.x.units, '');
});

test('add the appropriate units when they are not specified (translate)', function(t) {
  var transform;

  t.plan(5);
  t.ok(transform = ratchet(transforms.translateNoUnits));
  t.equal(transform.translate.x.value, 200);
  t.equal(transform.translate.x.units, 'px');
  t.equal(transform.translate.y.value, -50);
  t.equal(transform.translate.y.units, 'px');
});

test('add the appropriate units when they are not specified (rotate)', function(t) {
  var transform;

  t.plan(3);
  t.ok(transform = ratchet(transforms.rotateNoUnits));
  t.equal(transform.rotate.z.value, 190);
  t.equal(transform.rotate.z.units, 'deg');
});

test('add the appropriate units when they are not specified (rotate)', function(t) {
  var transform;

  t.plan(3);
  t.ok(transform = ratchet(transforms.rotateNoUnitsWithTranslate));
  t.equal(transform.rotate.z.value, 5.72);
  t.equal(transform.rotate.z.units, 'deg');
});