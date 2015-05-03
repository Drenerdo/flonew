var test = require('tape');
var ratchet = require('../..');
var tx = module.exports = ratchet('translate(50px, 120px) scale(2.0, 1.0)');

test('parse: translate(50px, 120px) scale(2.0, 1.0)', function(t) {
  t.plan(6);
  t.ok(tx);
  t.ok(tx.translate.x == 50);
  t.ok(tx.translate.y == 120);
  t.ok(tx.translate.z == 0);
  t.ok(tx.scale.x == 2);
  t.ok(tx.scale.y == 1);
});