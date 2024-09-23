sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "../model/formatter",
  ],
  function (Controller, UIComponent, MessageToast, MessageBox, formatter) {
    "use strict";

    return Controller.extend("odata.v4.demo.trippin.controller.Edit", {
      formatter: formatter,

      onInit: function () {
        UIComponent.getRouterFor(this)
          .getRoute("edit")
          .attachPatternMatched(this._onObjectMatched, this);
      },

      onPressAddTrip: function () {},

      onRemoveTrip: function (oEvent) {},

      onPressSave: function () {},

      onPressCancel: function () {
        var sUserId = this.getView().getBindingContext().getProperty("ID");

        UIComponent.getRouterFor(this).navTo("details", { userID: sUserId }, true);
      },

      _onObjectMatched: function (oEvent) {
        var sUserID = oEvent.getParameter("arguments").userID;

        this.getView().bindElement({
          path: "/People(" + sUserID + ")"
        });
      },
    });
  }
);
