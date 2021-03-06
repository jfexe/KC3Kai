QUnit.module('modules > BattlePrediction > modules > Yasen', function () {
  const Yasen = KC3BattlePrediction.battle.phases.yasen;
  const { Side, Role } = KC3BattlePrediction;

  QUnit.module('parseAttackerIndex', {
    beforeEach() { this.subject = Yasen.parseAttackerIndex; },
  }, function () {
    QUnit.test('player attacker', function (assert) {
      assert.deepEqual(this.subject(6), { side: Side.PLAYER, position: 5 });
    });

    QUnit.test('enemy attacker', function (assert) {
      assert.deepEqual(this.subject(7), { side: Side.ENEMY, position: 0 });
    });
  });

  QUnit.module('parseDefenderIndices', {
    beforeEach() { this.subject = Yasen.parseDefenderIndices; },
  }, function () {
    QUnit.test('single attack', function (assert) {
      assert.deepEqual(this.subject([6]), { side: Side.PLAYER, position: 5 });
    });

    QUnit.test('double-attack', function (assert) {
      assert.deepEqual(this.subject([7, 7]), { side: Side.ENEMY, position: 0 });
    });

    QUnit.test('cut-in', function (assert) {
      assert.deepEqual(this.subject([12, -1, -1]), { side: Side.ENEMY, position: 5 });
    });

    QUnit.test('bad indices', function (assert) {
      const indices = [1, 2];
      try {
        this.subject(indices);
        assert.notOk(true, 'no exception');
      } catch (result) {
        assert.equal(result.message, 'Unknown target indices format');
        assert.equal(result.data.indices, indices);
      }
    });
  });

  QUnit.module('parseDamage', {
    beforeEach() { this.subject = Yasen.parseDamage; },
  }, function () {
    QUnit.test('single attack', function (assert) {
      assert.equal(this.subject([5]), 5);
    });

    QUnit.test('double-attack', function (assert) {
      assert.equal(this.subject([54, 24]), 78);
    });

    QUnit.test('cut-in', function (assert) {
      assert.equal(this.subject([181, -1, -1]), 181);
    });
  });
});
