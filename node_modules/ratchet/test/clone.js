var test = require('tape');
var ratchet = require('../');
var tx1;

test('parse an initial translation', function(t) {
  t.plan(6);

  tx1 = ratchet('translate(50px, 120px) scale(2.0, 1.0)');

  t.ok(tx1.translate, 'have translate');
  t.ok(tx1.translate.x == 50, 'translate.x == 50');
  t.ok(tx1.translate.y == 120, 'translate.y == 120');
  t.ok(tx1.translate.z == 0, 'translate.z == 0');
  t.ok(tx1.scale.x == 2, 'scale.x == 2');
  t.ok(tx1.scale.y == 1, 'scale.y == 1');
});

test('clone a transform', function(t) {
  var tx;

  t.plan(6);
  tx = tx1.clone();

  t.ok(tx.translate, 'have translate');
  t.ok(tx.translate.x == 50, 'translate.x == 50');
  t.ok(tx.translate.y == 120, 'translate.y == 120');
  t.ok(tx.translate.z == 0, 'translate.z == 0');
  t.ok(tx.scale.x == 2, 'scale.x == 2');
  t.ok(tx.scale.y == 1, 'scale.y == 1');
});