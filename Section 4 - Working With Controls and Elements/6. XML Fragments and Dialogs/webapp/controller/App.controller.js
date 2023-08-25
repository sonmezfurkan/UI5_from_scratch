sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/ObjectListItem",
  "sap/m/ObjectAttribute",
  "sap/m/ObjectStatus",
  "sap/ui/core/ValueState",
  "sap/ui/core/Fragment"
], function(Controller, ObjectListItem, ObjectAttribute, ObjectStatus, ValueState, Fragment) {
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

      // Close the dialog
      this._oCreateProductDialog.close()
    },

    onPressDelete(oEvent) {
      const oItem = oEvent.getParameter("listItem")

      // Remove the item from the list
      this.getView().byId("idProductList").removeItem(oItem)
    },

    onPressAddNewProduct() {
      // Load and display the create new product dialog
      if (!this._oCreateProductDialog) {
        Fragment.load({
          id: this.getView().getId(),
          name: "ui5.product.list.view.fragments.CreateProduct",
          controller: this
        }).then(oDialog => {
          this._oCreateProductDialog = oDialog
          this.getView().addDependent(oDialog)
          oDialog.open()
        })
      } else {
        this._oCreateProductDialog.open()
      }
    },

    onPressCancelNewProduct() {
      this._oCreateProductDialog.close()
    },

    _getAvailabilityText(oDate) {
      return oDate > new Date() ? "Available" : "Unavailable"
    },

    _getAvailabilityState(oDate) {
      return oDate > new Date() ? ValueState.Success : ValueState.Error
    }
  })
})