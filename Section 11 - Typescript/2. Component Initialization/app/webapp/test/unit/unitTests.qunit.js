/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"odatav4demo/trippin/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
