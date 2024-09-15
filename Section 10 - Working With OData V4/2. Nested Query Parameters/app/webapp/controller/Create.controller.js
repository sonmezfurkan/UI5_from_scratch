sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/UIComponent", "sap/m/MessageToast"],
  function (Controller, UIComponent, MessageToast) {
    "use strict";

    return Controller.extend("odata.v4.demo.trippin.controller.Create", {
      onInit: function () {
        UIComponent.getRouterFor(this)
          .getRoute("create")
          .attachPatternMatched(this._onCreateMatched, this);
      },

      onPressAddTrip: function () {},

      onRemoveTrip: function (oEvent) {},

      onPressSave: function () {},

      onPressCancel: function () {
        UIComponent.getRouterFor(this).navTo("home", {}, true);
      },

      _onCreateMatched: function () {},
    });
  }
);
