var test = require('tape');
var ratchet = require('..');
var tx1 = require('./data/tx1');
var tx2 = require('./data/tx2');
var tx3;

test('add the two transforms', function(t) {
  var tx;

  t.plan(9);
  t.ok(tx = tx1.add(tx2));
  t.ok(tx.translate.x == 140);
  t.ok(tx.translate.y == 200);
  t.ok(tx.translate.z == 0);
  t.equal(tx.translate.x.units, 'px');
  t.equal(tx.translate.y.units, 'px');
  t.equal(tx.translate.z.units, 'px');
  t.ok(tx.scale.x == 1);
  t.ok(tx.scale.y == 0.5);
});

test('add all the transforms', function(t) {
  var tx;

  t.plan(7);
  t.ok(tx = tx1.add(tx2, tx2));
  t.ok(tx.translate.x == 230);
  t.ok(tx.translate.y == 280);
  t.equal(tx.translate.x.units, 'px');
  t.equal(tx.translate.y.units, 'px');
  t.ok(tx.scale.x == 0.5);
  t.ok(tx.scale.y == 0.25);
});