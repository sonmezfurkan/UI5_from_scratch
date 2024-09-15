sap.ui.define(["sap/ui/core/library"], function (CoreLibrary) {
  "use strict";

  var ValueState = CoreLibrary.ValueState;

  return {
    formatDate: function (sDate) {
      if (!sDate) {
        return "";
      }

      var oDate = new Date(sDate);
      return oDate.toDateString();
    },

    formatUserStatusState: function(sValue) {
      switch (sValue) {
        case "A":
          return ValueState.Success;
        case "S":
          return ValueState.Warning;
        case "D":
          return ValueState.Error;
        default:
          return ValueState.None;
      }
    }
  };
});
