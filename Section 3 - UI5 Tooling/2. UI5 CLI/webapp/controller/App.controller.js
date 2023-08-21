sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function(Controller, MessageToast) {
  "use strict"

  return Controller.extend('ui5.product.list.controller.App', {
    onPressCreateNewProduct: function() {
      var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle()

      MessageToast.show(oBundle.getText("messageProductCreated", ["Macbook Pro"]), {
        at: 'center top'
      })
    }
  })
})