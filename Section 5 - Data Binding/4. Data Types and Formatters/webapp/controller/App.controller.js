sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/Fragment',
    'ui5/product/list/model/models',
    'ui5/product/list/model/formatter',
  ],
  function (Controller, Fragment, models, formatter) {
    'use strict'

    return Controller.extend('ui5.product.list.controller.App', {
      formatter: formatter,

      // Handle add button press
      onPressAddNewProduct() {
        //Load and display the create product dialog
        if (!this._oCreateDialog) {
          Fragment.load({
            id: this.getView().getId(),
            name: 'ui5.product.list.view.fragments.CreateProduct',
            controller: this,
          }).then(oDialog => {
            this._oCreateDialog = oDialog
            this.getView().addDependent(this._oCreateDialog)
            oDialog.open()
          })
        } else {
          this._oCreateDialog.open()
        }
      },

      // Handle close new item dialog
      onCloseCreateNewProduct() {
        this._oCreateDialog.close()
      },

      // Handle save button click inside the create item dialog
      onSaveNewProduct() {
        const oData = this.getView().getModel('input').getData()

        // Add new item to the tasks model
        const oProductModel = this.getView().getModel('product')
        const aItems = oProductModel.getProperty('/items')

        aItems.push(oData)
        oProductModel.setProperty('/items', aItems)

        this._oCreateDialog.close()
      },

      // Handle delete event of the list
      onPressDelete(oEvent) {
        const oModel = this.getView().getModel('product')
        const oItem = oEvent.getParameter('listItem')
        const iIndex = oItem.getBindingContext('product').getPath().split('/').pop()

        oModel.getData().items.splice(iIndex, 1)
        oModel.refresh()
      },

      // Handle dialog close event
      onAfterCloseDialog() {
        // Reset input model
        this.getOwnerComponent().setModel(models.createInputModel(), 'input')
      },
    })
  }
)
