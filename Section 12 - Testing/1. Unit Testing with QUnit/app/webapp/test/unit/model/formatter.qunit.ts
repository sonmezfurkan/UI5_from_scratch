import formatter from "ui5/trippin/model/formatter";
import { ValueState } from "sap/ui/core/library";

QUnit.module("Formatter");

QUnit.test("Should format user status state correctly", (assert) => {
  assert.strictEqual(
    formatter.formatUserStatusState("A"),
    ValueState.Success,
    "Active state is correct"
  );
  assert.strictEqual(
    formatter.formatUserStatusState("S"),
    ValueState.Warning,
    "Suspended state is correct"
  );
  assert.strictEqual(
    formatter.formatUserStatusState("D"),
    ValueState.Error,
    "Deleted state is correct"
  );
  assert.strictEqual(
    formatter.formatUserStatusState(""),
    ValueState.None,
    "Default state is correct"
  );
});

QUnit.test("Should format date correctly", (assert) => {
  assert.strictEqual(
    formatter.formatDate(""),
    "",
    "Formats empty date correctly"
  );
  assert.throws(
    () => formatter.formatDate("2018-24-24"),
    new Error("Invalid date 2018-24-24!"),
    "Catches invalid dates"
  );
});
