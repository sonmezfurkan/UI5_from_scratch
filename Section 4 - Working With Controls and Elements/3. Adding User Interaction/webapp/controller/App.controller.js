sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/StandardListItem"
], function(Controller, StandardListItem) {
  "use strict"

  return Controller.extend('ui5.product.list.controller.App', {
    onPressCreateNewProduct() {
      // Get the product name from the input
      const sProductName = this.getView().byId("idProductName").getValue()

      // Add a new item to the list
      this.getView().byId("idProductList").addItem(new StandardListItem({
        title: sProductName
      }))
    },

    onPressDelete(oEvent) {
      const oItem = oEvent.getParameter("listItem")

      // Remove the item from the list
      this.getView().byId("idProductList").removeItem(oItem)
    }
  })
})