sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/Fragment',
    'sap/ui/model/Sorter',
    'ui5/product/list/model/models',
    'ui5/product/list/model/formatter',
  ],
  function (Controller, Fragment, Sorter, models, formatter) {
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

        // Validate inputs
        if (!this._validate()) return

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
        this.getOwnerComponent().setModel(models.createValidationModel(), 'validation')
      },

      // Handle press sort button press
      onSortButtonPressed() {
        //Load and display the sort dialog
        if (!this._oSortDialog) {
          Fragment.load({
            id: this.getView().getId(),
            name: 'ui5.product.list.view.fragments.SortDialog',
            controller: this,
          }).then(oDialog => {
            this._oSortDialog = oDialog
            this.getView().addDependent(this._oSortDialog)
            oDialog.open()
          })
        } else {
          this._oSortDialog.open()
        }
      },

      // Handle press group button press
      onGroupButtonPressed() {
        //Load and display the group dialog
        if (!this._oGroupDialog) {
          Fragment.load({
            id: this.getView().getId(),
            name: 'ui5.product.list.view.fragments.GroupDialog',
            controller: this,
          }).then(oDialog => {
            this._oGroupDialog = oDialog
            this.getView().addDependent(this._oGroupDialog)
            oDialog.open()
          })
        } else {
          this._oGroupDialog.open()
        }
      },

      // Handle confirm sort
      onConfirmSort(oEvent) {
        // Get sort related event parameters
        const oSortItem = oEvent.getParameter('sortItem')
        const bDescending = oEvent.getParameter('sortDescending')

        // If there is a sort item selected, sort the list binding.
        // Else, sort by empty array to reset any existing sorting.
        this.getView()
          .byId('idProductList')
          .getBinding('items')
          .sort(oSortItem ? [new Sorter(oSortItem.getKey(), bDescending)] : [])
      },

      // Handle confirm group
      onConfirmGroup(oEvent) {
        // Get group related event parameters
        const oGroupItem = oEvent.getParameter('groupItem')
        const bDescending = oEvent.getParameter('groupDescending')

        // If there is a group item selected, sort and group the list binding.
        // Else, sort by empty array to reset any existing grouping.
        this.getView()
          .byId('idProductList')
          .getBinding('items')
          .sort(oGroupItem ? [new Sorter(oGroupItem.getKey(), bDescending, true /* group */)] : [])
      },

      // Validate create inputs
      _validate() {
        const oInput = this.getView().getModel('input').getData()
        const oValidationModel = this.getView().getModel('validation')
      
        // Check mandatory fields
        oValidationModel.setProperty('/Name', !!oInput.Name)
        oValidationModel.setProperty('/Category', !!oInput.Category)
        oValidationModel.setProperty('/Price', !!oInput.Price)
        oValidationModel.setProperty('/ReleaseDate', !!oInput.ReleaseDate)
      
        // Return validation result
        return !Object.values(oValidationModel.getData()).includes(false)
      },
    })
  }
)
