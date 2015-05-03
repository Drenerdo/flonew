var test = require('tape');
var ratchet = require('../');

test('create xyz values', function(t) {
  var xyz;

  t.plan(8);
  t.ok(xyz = new ratchet.XYZ('test'));
  t.equal(xyz.type, 'test');
  t.ok(xyz.x == 0);
  t.equal(xyz.x.units, 'px');
  t.ok(xyz.y == 0);
  t.equal(xyz.y.units, 'px');
  t.ok(xyz.z == 0);
  t.equal(xyz.z.units, 'px');
});

test('create xyz value (no units)', function(t) {
  var xyz;

  t.plan(8);
  t.ok(xyz = new ratchet.XYZ('test', { units: '' }));
  t.equal(xyz.type, 'test');
  t.ok(xyz.x == 0);
  t.equal(xyz.x.units, '');
  t.ok(xyz.y == 0);
  t.equal(xyz.y.units, '');
  t.ok(xyz.z == 0);
  t.equal(xyz.z.units, '');
});

test('create xyz value (em units)', function(t) {
  var xyz;

  t.plan(8);
  t.ok(xyz = new ratchet.XYZ('test', { units: 'em' }));
  t.equal(xyz.type, 'test');
  t.ok(xyz.x == 0);
  t.equal(xyz.x.units, 'em');
  t.ok(xyz.y == 0);
  t.equal(xyz.y.units, 'em');
  t.ok(xyz.z == 0);
  t.equal(xyz.z.units, 'em');
});

test('create a transform', function(t) {
  var transform;

  t.plan(7);
  t.ok(transform = new ratchet.Transform());
  t.ok(transform.translate instanceof ratchet.XYZ);
  t.equal(transform.translate.type, 'translate');
  t.ok(transform.scale instanceof ratchet.XYZ);
  t.equal(transform.scale.type, 'scale');
  t.ok(transform.rotate instanceof ratchet.XYZ);
  t.equal(transform.rotate.type, 'rotate');
});

test('transform translate initialized with px units', function(t) {
  var transform;

  t.plan(3);
  t.ok(transform = new ratchet.Transform());
  t.equal(transform.translate.x.units, 'px');  
  t.equal(transform.translate.y.units, 'px');  
});

test('transform rotate initialized with deg units', function(t) {
  var transform;

  t.plan(3);
  t.ok(transform = new ratchet.Transform());
  t.equal(transform.rotate.x.units, 'deg');  
  t.equal(transform.rotate.y.units, 'deg');  
});

test('transform scale initialized with empty units', function(t) {
  var transform;

  t.plan(3);
  t.ok(transform = new ratchet.Transform());
  t.equal(transform.scale.x.units, '');  
  t.equal(transform.scale.y.units, '');  
});