var test = require('tape');
var ratchet = require('..');
var tx1 = require('./data/tx1');
var tx2 = require('./data/tx2');


test('subtract the two transforms', function(t) {
  var tx;

  t.plan(8);
  t.ok(tx = tx1.sub(tx2));
  t.ok(tx.translate);
  t.ok(tx.translate.x == -40);
  t.ok(tx.translate.y == 40);
  t.equal(tx.translate.x.units, 'px');
  t.equal(tx.translate.y.units, 'px');
  t.ok(tx.scale.x == 4);
  t.ok(tx.scale.y == 2);
});

test('subtract two transforms for the original transform', function(t) {
  var tx;

  t.plan(8);
  t.ok(tx = tx1.sub(tx2, tx2));
  t.ok(tx.translate);
  t.ok(tx.translate.x == -130);
  t.ok(tx.translate.y == -40);
  t.equal(tx.translate.x.units, 'px');
  t.equal(tx.translate.y.units, 'px');
  t.ok(tx.scale.x == 8);
  t.ok(tx.scale.y == 4);
});