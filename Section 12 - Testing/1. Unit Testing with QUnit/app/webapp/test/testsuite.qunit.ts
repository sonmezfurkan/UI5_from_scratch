export default {
  name: "QUnit test suite for the Trippin app",
  defaults: {
    page: "ui5://test-resources/ui5/trippin/Test.qunit.html?testsuite={suite}&test={name}",
    loader: {
      paths: {
        "ui5/trippin": "../"
      }
    }
  },
  tests: {
    "unit/unitTests": {
      title: "Unit tests for ui5.trippin"
    }
  }
}