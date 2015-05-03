var test = require('tape');
var ratchet = require('..');
var xyz1;
var xyz2;

test('create new translate', function(t) {
  t.plan(1);
  t.ok(xyz1 = new ratchet.XYZ('translate', { x: 50, y: 120 }));
});

test('increase all values by a single numeric value', function(t) {
  var xyz;

  t.plan(7);
  t.ok(xyz = xyz1.add(50));
  t.ok(xyz.x == 100);
  t.ok(xyz.y == 170);
  t.ok(xyz.z == 0);
  t.equal(xyz.x.units, 'px');
  t.equal(xyz.y.units, 'px');
  t.equal(xyz.z.units, 'px');
});

test('increase by composite value', function(t) {
  var xyz;

  t.plan(7);
  t.ok(xyz = xyz1.add({ x: 100, y: 40 }));
  t.ok(xyz.x == 150);
  t.ok(xyz.y == 160);
  t.ok(xyz.z == 0);
  t.equal(xyz.x.units, 'px');
  t.equal(xyz.y.units, 'px');
  t.equal(xyz.z.units, 'px');
});

test('create new rotation', function(t) {
  t.plan(3);
  t.ok(xyz2 = new ratchet.XYZ('rotate', { z: 180, units: 'deg' }));
  t.ok(xyz2.z == 180);
  t.equal(xyz2.z.units, 'deg');
});

test('add two rotations', function(t) {
  var xyz;

  t.plan(3);
  t.ok(xyz = xyz2.add(xyz2));
  t.ok(xyz.z == 360);
  t.equal(xyz.z.units, 'deg'); 
});