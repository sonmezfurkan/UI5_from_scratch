QUnit.module("Module A")

QUnit.test("Sample test", assert => {
  const value = 1
  assert.strictEqual(value, "1", "We expect the value to be one")
})