var test = require('tape');
var ratchet = require('..');

function compare(xyz, string) {
  return function(t) {
    t.plan(2);
    t.ok(xyz);
    t.equal(xyz.toString(), string);
  };
}

test(
  'x only value to a string',
  compare(
    new ratchet.XYZ('translate', { x: 50 }),
    'translateX(50px)'
  )
);

test(
  'y only value to a string',
  compare(
    new ratchet.XYZ('translate', { y: 50 }),
    'translateY(50px)'
  )
);

test(
  'z only value to a string',
  compare(
    new ratchet.XYZ('translate', { z: 50 }),
    'translateZ(50px)'
  )
);

test(
  'convert an x and y value to a string',
  compare(
    new ratchet.XYZ('translate', { x: 50, y: 100 }),
    'translateX(50px) translateY(100px)'
  )
);

test(
  'convert an y and z value to a string',
  compare(
    new ratchet.XYZ('translate', { y: 80, z: 30 }),
    'translateY(80px) translateZ(30px)'
  )
);

test(
  'convert an x, y and z value to a string',
  compare(
    new ratchet.XYZ('translate', { x: 50, y: 100, z: 30 }),
    'translateX(50px) translateY(100px) translateZ(30px)'
  )
);