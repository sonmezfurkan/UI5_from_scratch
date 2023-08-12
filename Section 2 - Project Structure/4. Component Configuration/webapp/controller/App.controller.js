sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'sap/m/MessageToast'],
  function (Controller, MessageToast) {
    'use strict'
    
    return Controller.extend('ui5.product.list.controller.App', {
      onPressCreateNewProduct: function () {
        MessageToast.show('New product created', {
          at: 'center top'
        })
      }
    })
  }
)
