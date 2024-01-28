sap.ui.define([
	"sap/ui/test/Opa5"
], function(Opa5) {
	"use strict";

	return Opa5.extend("ui5.my.products.test.integration.pages.Common", {


		theUnitNumbersShouldHaveTwoDecimals : function (sControlType, sViewName, sSuccessMsg, sErrMsg) {
			var rTwoDecimalPlaces =  /^-?\d+\.\d{2}$/;

			return this.waitFor({
				controlType : sControlType,
				viewName : sViewName,
				success : function (aNumberControls) {
					Opa5.assert.ok(aNumberControls.every(function(oNumberControl){
							return rTwoDecimalPlaces.test(oNumberControl.getNumber());
						}),
						sSuccessMsg);
				},
				errorMessage : sErrMsg
			});
		}

	});

});
