var test = require('tape');
var ratchet = require('..');

test('convert a simple x translate', function(t) {
  var transform;

  t.plan(2);
  t.ok(transform = new ratchet.Transform({ translate: { x: 50 }}));
  t.equal(transform.toString(), 'translateX(50px)');
});
    
test('convert a simple x translate (all opts)', function(t) {
  var transform;

  t.plan(2);
  t.ok(transform = new ratchet.Transform({ translate: { x: 50 }}));
  t.equal(transform.toString({ all: true }), 'translateX(50px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1)');
});

test('convert a simple x,y translate', function(t) {
  var transform;

  t.plan(2);
  t.ok(transform = new ratchet.Transform({ translate: { x: 50, y: 80 }}));
  t.equal(transform.toString(), 'translateX(50px) translateY(80px)');
});

test('convert a simple x rotate', function(t) {
  var transform;

  t.plan(2);
  t.ok(transform = new ratchet.Transform({ rotate: { x: 90 }}));
  t.equal(transform.toString(), 'rotateX(90deg)');
});
    
test('convert a simple x scale', function(t) {
  var transform;

  t.plan(2);
  t.ok(transform = new ratchet.Transform({ scale: { x: 2 }}));
  t.equal(transform.toString(), 'scaleX(2)');
});

test('convert a translate + rotate', function(t) {
  var transform;

  t.plan(2);
  t.ok(transform = new ratchet.Transform({ translate: { x: 50 }, rotate: { x: 90 }}));
  t.equal(transform.toString(), 'translateX(50px) rotateX(90deg)');
});

test('convert a translate + scale', function(t) {
  var transform;

  t.plan(2);
  t.ok(transform = new ratchet.Transform({ translate: { x: 50 }, scale: { y: 3.2 }}));
  t.equal(transform.toString(), 'translateX(50px) scaleY(3.2)');
});

test('convert a rotate and scale transform', function(t) {
  var transform;

  t.plan(2);
  t.ok(transform = new ratchet.Transform({ rotate: { x: 80 }, scale: { y: 2.2 }}));
  t.equal(transform.toString(), 'rotateX(80deg) scaleY(2.2)');
});