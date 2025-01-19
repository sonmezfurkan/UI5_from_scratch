sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "../model/formatter",
  ],
  function (Controller, UIComponent, MessageToast, formatter) {
    "use strict";

    return Controller.extend("odata.v4.demo.trippin.controller.Details", {
      formatter: formatter,

      onInit: function () {
        UIComponent.getRouterFor(this)
          .getRoute("details")
          .attachPatternMatched(this._onObjectMatched, this);
      },

      onPressEdit: function () {
        var sUserId = this.getView().getBindingContext().getProperty("ID");

        UIComponent.getRouterFor(this).navTo("edit", { userID: sUserId }, true);
      },

      onPressSuspend: function() {
        var oModel = this.getView().getModel();
        var oContext = this.getView().getBindingContext();

        var oAction = oModel.bindContext("TrippinService.suspendPerson(...)", oContext);

        oAction.execute().then(function() {
          MessageToast.show(oAction.getBoundContext().getProperty("value"));

          oContext.refresh();
        }.bind(this));
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
