sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/ObjectListItem",
  "sap/m/ObjectAttribute",
  "sap/m/ObjectStatus",
  "sap/ui/core/ValueState"
], function(Controller, ObjectListItem, ObjectAttribute, ObjectStatus, ValueState) {
  "use strict"

  return Controller.extend('ui5.product.list.controller.App', {
    onPressCreateNewProduct() {
      // Get the product name from the input
      const sProductName = this.getView().byId("idProductName").getValue()
      const oCategory = this.getView().byId("idCategory").getSelectedItem()
      const sPrice = this.getView().byId("idPrice").getValue()
      const sReleaseDate = this.getView().byId("idReleaseDate").getDateValue()
      const sDiscontinuedDate = this.getView().byId("idDiscontinuedDate").getDateValue()

      // Add a new item to the list
      this.getView().byId("idProductList").addItem(new ObjectListItem({
        title: sProductName,
        number: sPrice,
        numberUnit: "EUR",
        attributes: [
          new ObjectAttribute({ title: "Category", text: oCategory.getText() }),
          new ObjectAttribute({ title: "Release date", text: sReleaseDate })
        ],
        firstStatus: new ObjectStatus({
          text: this._getAvailabilityText(sDiscontinuedDate),
          state: this._getAvailabilityState(sDiscontinuedDate)
        })
      }))
    },

    onPressDelete(oEvent) {
      const oItem = oEvent.getParameter("listItem")

      // Remove the item from the list
      this.getView().byId("idProductList").removeItem(oItem)
    },

    _getAvailabilityText(oDate) {
      return oDate > new Date() ? "Available" : "Unavailable"
    },

    _getAvailabilityState(oDate) {
      return oDate > new Date() ? ValueState.Success : ValueState.Error
    }
  })
})