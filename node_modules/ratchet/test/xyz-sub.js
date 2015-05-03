var test = require('tape');
var ratchet = require('..');
var xyz1;

test('init xyz', function(t) {
  t.plan(1);
  t.ok(xyz1 = new ratchet.XYZ('translate', { x: 50, y: 120 }));
});

test('decrease all values by a single numeric value', function(t) {
  var xyz;

  t.plan(7);
  t.ok(xyz = xyz1.sub(10));
  t.ok(xyz.x == 40);
  t.ok(xyz.y == 110);
  t.ok(xyz.z == 0);
  t.equal(xyz.x.units, 'px');
  t.equal(xyz.y.units, 'px');
  t.equal(xyz.z.units, 'px');
});

test('decrease by a composite value', function(t) {
  var xyz;

  t.plan(7);
  t.ok(xyz = xyz1.sub({ x: 20, y: 40 }));
  t.ok(xyz.x == 30);
  t.ok(xyz.y == 80);
  t.ok(xyz.z == 0);
  t.equal(xyz.x.units, 'px');
  t.equal(xyz.y.units, 'px');
  t.equal(xyz.z.units, 'px');
});