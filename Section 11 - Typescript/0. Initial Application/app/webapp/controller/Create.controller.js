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

              MessageToast.show(oBundle.getText("userCreated"), {
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
        
        UIComponent.getRouterFor(this).navTo("home", {}, true);
      },

      _onCreateMatched: function () {
        /* var oListBinding = this.getView().getModel().bindList("/People", null, [], [], {
          $$updateGroupId: "update"
        }); */

        var oListBinding = this.getView().getModel().bindList("/People");

        var oContext = oListBinding.create({}, false, false, true);

        this.getView().setBindingContext(oContext);
      },
    });
  }
);
