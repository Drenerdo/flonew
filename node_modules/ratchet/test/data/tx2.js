var test = require('tape');
var ratchet = require('../..');
var tx = module.exports = ratchet('translate(90px, 80px) scale(0.5, 0.5)');

test('parse: translate(90px, 80px) scale(0.5, 0.5)', function(t) {
  t.plan(9);
  t.ok(tx);
  t.ok(tx.translate.x == 90);
  t.ok(tx.translate.y == 80);
  t.ok(tx.translate.z == 0);
  t.equal(tx.translate.x.units, 'px');
  t.equal(tx.translate.y.units, 'px');
  t.equal(tx.translate.z.units, 'px');
  t.ok(tx.scale.x == 0.5);
  t.ok(tx.scale.y == 0.5);
});