sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/formatter",
  ],
  function (Controller, UIComponent, Fragment, Filter, Operator, formatter) {
    "use strict";

    return Controller.extend("odata.v4.demo.trippin.controller.Home", {
      formatter: formatter,

      onInit: function () {},

      onSelectFilter: function (oEvent) {
        var sSelectedKey = oEvent.getParameter("key");

        switch (sSelectedKey) {
          case "all":
          default:
            break;
          case "vip":
            break;
          case "regular":
            break;
        }
      },

      onPress: function (oEvent) {
        var oItem = oEvent.getSource();

        UIComponent.getRouterFor(this).navTo("details", {
          userID: oItem.getBindingContext().getProperty("ID"),
        });
      },

      onPressCreate: function () {
        UIComponent.getRouterFor(this).navTo("create");
      },

      onPressDelete: function (oEvent) {},

      onPressShowMostExpensiveTrips: function() {
        if (!this._oDialog) {
          Fragment.load({
            id: this.getView().getId(),
            name: "odata.v4.demo.trippin.fragments.MostExpensiveTrips",
            controller: this
          }).then(oDialog => {
            this._oDialog = oDialog;
            this.getView().addDependent(oDialog);
            oDialog.open();
          })
        } else {
          this._oDialog.open();
        }
      },

      onPressCloseDialog: function() {
        this._oDialog.close();
      },

      onPressShowTrips: function() {}
    });
  }
);
