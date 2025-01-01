sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "../model/formatter",
  ],
  function (Controller, UIComponent, MessageToast, formatter) {
    "use strict";

    return Controller.extend("odata.v4.demo.trippin.controller.Edit", {
      formatter: formatter,

      onInit: function () {
        UIComponent.getRouterFor(this)
          .getRoute("edit")
          .attachPatternMatched(this._onObjectMatched, this);
      },

      onPressAddTrip: function () {
        this.getView()
          .byId("idTripsTable")
          .getBinding("items")
          .create({}, false, true, false);
      },

      onRemoveTrip: function (oEvent) {
        var oItem = oEvent.getParameter("listItem");

        oItem.getBindingContext().delete();
      },

      onPressSave: function () {
        var oModel = this.getView().getModel();

        oModel.submitBatch(oModel.getUpdateGroupId()).then(
          function () {
            if (!this.getOwnerComponent().bError) {
              var oBundle = this.getView().getModel("i18n").getResourceBundle();

              MessageToast.show(oBundle.getText("changesSaved"), {
                closeOnBrowserNavigation: false
              });

              UIComponent.getRouterFor(this).navTo(
                "details",
                {
                  userID: this.getView().getBindingContext().getProperty("ID"),
                },
                true
              );
            }
          }.bind(this)
        );
      },

      onPressCancel: function () {
        var oModel = this.getView().getModel();

        oModel.resetChanges(oModel.getUpdateGroupId());

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
