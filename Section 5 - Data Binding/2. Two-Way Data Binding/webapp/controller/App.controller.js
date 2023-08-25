sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/ObjectListItem",
  "sap/m/ObjectAttribute",
  "sap/m/ObjectStatus",
  "sap/ui/core/ValueState",
  "sap/ui/core/Fragment",
  "ui5/product/list/model/models"
], function(Controller, ObjectListItem, ObjectAttribute, ObjectStatus, ValueState, Fragment, models) {
  "use strict"

  return Controller.extend('ui5.product.list.controller.App', {
    onPressCreateNewProduct() {
      const oData = this.getView().getModel("input").getData()

      // Add a new item to the list
      this.getView().byId("idProductList").addItem(new ObjectListItem({
        title: oData.Name,
        number: oData.Price,
        numberUnit: "EUR",
        attributes: [
          new ObjectAttribute({ title: "Category", text: oData.Category }),
          new ObjectAttribute({ title: "Release date", text: oData.ReleaseDate })
        ],
        firstStatus: new ObjectStatus({
          text: this._getAvailabilityText(oData.DiscontinuedDate),
          state: this._getAvailabilityState(oData.DiscontinuedDate)
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

    onAfterCloseDialog() {
      this.getOwnerComponent().setModel(models.createInputModel(), "input")
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