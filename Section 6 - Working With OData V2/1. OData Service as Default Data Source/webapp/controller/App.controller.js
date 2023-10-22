sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/Fragment",
  "sap/ui/model/Sorter",
  "sap/ui/model/Filter",
  "ui5/product/list/model/models",
  "ui5/product/list/model/formatter"
], function(Controller, Fragment, Sorter, Filter, models, formatter) {
  "use strict"

  return Controller.extend('ui5.product.list.controller.App', {
    formatter: formatter,

    onPressCreateNewProduct() {
      const oData = this.getView().getModel("input").getData()

      // Validate input
      if (!this._validate()) return

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
      this.getOwnerComponent().setModel(models.createValidationModel(), "validation")
    },

    onPressCancelNewProduct() {
      this._oCreateProductDialog.close()
    },

    onSortButtonPressed() {
      // Load and display the sort dialog
      if (!this._oSortDialog) {
        Fragment.load({
          id: this.getView().getId(),
          name: "ui5.product.list.view.fragments.SortDialog",
          controller: this
        }).then(oDialog => {
          this._oSortDialog = oDialog
          this.getView().addDependent(oDialog)
          oDialog.open()
        })
      } else {
        this._oSortDialog.open()
      }
    },

    onFilterButtonPressed() {
      // Load and display the filter dialog
      if (!this._oFilterDialog) {
        Fragment.load({
          id: this.getView().getId(),
          name: "ui5.product.list.view.fragments.FilterDialog",
          controller: this
        }).then(oDialog => {
          this._oFilterDialog = oDialog
          this.getView().addDependent(oDialog)
          oDialog.open()
        })
      } else {
        this._oFilterDialog.open()
      }
    },

    onGroupButtonPressed() {
      // Load and display the group dialog
      if (!this._oGroupDialog) {
        Fragment.load({
          id: this.getView().getId(),
          name: "ui5.product.list.view.fragments.GroupDialog",
          controller: this
        }).then(oDialog => {
          this._oGroupDialog = oDialog
          this.getView().addDependent(oDialog)
          oDialog.open()
        })
      } else {
        this._oGroupDialog.open()
      }
    },

    onConfirmSort(oEvent) {
      // Get sort related event parameters
      const oSortItem = oEvent.getParameter("sortItem")
      const bDescending = oEvent.getParameter("sortDescending")

      // If there is a sort item selected, sort the list binding
      this.getView()
        .byId("idProductList")
        .getBinding("items")
        .sort(oSortItem ? [new Sorter(oSortItem.getKey(), bDescending)] : [])
    },

    onConfirmGroup(oEvent) {
      // Get group related event parameters
      const oGroupItem = oEvent.getParameter("groupItem")
      const bDescending = oEvent.getParameter("groupDescending")

      // If there is a grouping item selected, group the list binding
      // Else, group by an empty array to remove any existing grouping
      this.getView()
        .byId("idProductList")
        .getBinding("items")
        .sort(oGroupItem ? [new Sorter(oGroupItem.getKey(), bDescending, true /* vGroup */)] : [])
    },

    onConfirmFilter(oEvent) {
      // Get filter items from the event object
      const aFilterItems = oEvent.getParameter("filterItems")
      const sFilterString = oEvent.getParameter("filterString")

      // Create filters array according to the selected items
      const aFilter = []

      aFilterItems.forEach(item => {
        const [sPath, sOperator, sValue1, sValue2] = item.getKey().split("__")
        aFilter.push(new Filter(sPath, sOperator, sValue1, sValue2))
      })

      // Filter list binding
      this.getView()
        .byId("idProductList")
        .getBinding("items")
        .filter(aFilter)

      // Show info header if there are any filters
      this.getView().byId("idFilterInfoToolbar").setVisible(aFilter.length ? true : false)
      this.getView().byId("idFilterText").setText(sFilterString)
    },

    _validate() {
      const oInput = this.getView().getModel("input").getData()
      const oValidationModel = this.getView().getModel("validation")

      // Check mandatory inputs
      oValidationModel.setProperty("/Name", !!oInput.Name)
      oValidationModel.setProperty("/Category", !!oInput.Category)
      oValidationModel.setProperty("/Price", !!oInput.Price)
      oValidationModel.setProperty("/ReleaseDate", !!oInput.ReleaseDate)

      // Return validation status
      return !Object.values(oValidationModel.getData()).includes(false)
    }
  })
})