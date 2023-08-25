sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/ValueState",
  "sap/ui/core/Fragment",
  "ui5/product/list/model/models"
], function(Controller, ValueState, Fragment, models) {
  "use strict"

  return Controller.extend('ui5.product.list.controller.App', {
    onPressCreateNewProduct() {
      const oData = this.getView().getModel("input").getData()

      // Add a new item to the list
      const oProductModel = this.getView().getModel("product")
      const aItems = oProductModel.getProperty("/items")

      aItems.push(oData)
      oProductModel.setProperty("/items", aItems)

      // Close the dialog
      this._oCreateProductDialog.close()
    },

    onPressDelete(oEvent) {
      const oItem = oEvent.getParameter("listItem")

      // Remove the item from the list
      const oModel = this.getView().getModel("product")
      const iIndex = oItem.getBindingContext("product").getPath().split("/").pop()

      oModel.getData().items.splice(iIndex, 1)
      oModel.refresh()
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