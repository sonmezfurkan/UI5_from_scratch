sap.ui.define(["sap/ui/core/ValueState"], function (ValueState) {
    "use strict";

    return {

        /**
         * Rounds the number unit value to 2 digits
         * @public
         * @param {string} sValue the number string to be rounded
         * @returns {string} sValue with 2 digits rounded
         */
        numberUnit : function (sValue) {
            if (!sValue) {
                return "";
            }
            return parseFloat(sValue).toFixed(2);
        },

        /**
         * Determines value state according to the stock quantity
         * @public
         * @param {string} sValue the number string to be rounded
         * @returns {sap.ui.core.ValueState} Value state
         */
        formatStockStatus : function (sValue) {
            switch (true) {
                case sValue >= 20:
                    return ValueState.Success;
                case sValue < 20 && sValue > 0:
                    return ValueState.Warning;
                case sValue <= 0:
                    return ValueState.Error;
                default:
                    break;
            }
        }

    };

});