sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/Fragment",
  "sap/ui/model/Sorter",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/Context",
  "sap/m/MessageBox",
  "ui5/product/list/model/models",
  "ui5/product/list/model/formatter"
], function(Controller, Fragment, Sorter, Filter, FilterOperator, Context, MessageBox, models, formatter) {
  "use strict"

  return Controller.extend('ui5.product.list.controller.Home', {
    formatter: formatter,

    onPressCreateNewProduct() {
      const oPayload = this.getView().getModel("input").getData()

      // Validate input
      if (!this._validate()) return

      // Prepare payload
      oPayload.ID = Date.now().toString().slice(-4)
      delete oPayload.Category
      delete oPayload.Currency

      // Send create request
      this.getView().getModel().create("/Products", oPayload, {
        success: (oData, oResponse) => {
          console.log(oData, oResponse)
          this._oCreateProductDialog.close()
        },
        error: oError => {
          console.log(oError)
          this._oCreateProductDialog.close()
        }
      })
    },

    onItemPress(oEvent) {
      const oRouter = sap.ui.core.UIComponent.getRouterFor(this)

      oRouter.navTo('detail')

      /* MessageBox.show(oEvent.getSource().getBindingContext().getProperty("Description"), {
        title: "Description"
      }) */

      /* const oModel = this.getView().getModel()
      const ID = oEvent.getSource().getBindingContext().getProperty("ID")
      const sPath = oModel.createKey("/Products", {
        ID
      }) */

      /* oModel.read(sPath, {
        success: oData => {
          MessageBox.show(oData.Description, {
            title: "Description"
          })
        }
      }) */

      /* MessageBox.show(oModel.getProperty(`${sPath}/Description`), {
        title: "Description"
      }) */

      /* if (!this._oEditDialog) {
        Fragment.load({
          id: this.getView().getId(),
          name: "ui5.product.list.view.fragments.Edit",
          controller: this,
        }).then(oDialog => {
          this._oEditDialog = oDialog
          this.getView().addDependent(oDialog)
          this._oEditDialog.setBindingContext(new Context(oModel, sPath))
          oDialog.open()
        })
      } else {
        this._oEditDialog.open()
      } */
    },

    onPressCancelEditProduct() {
      this._oEditDialog.close()
    },

    onPressUpdateProduct() {
      // const oView = this.getView()
      const oModel = this.getView().getModel()
      /* const sPath = this._oEditDialog.getBindingContext().getPath()

      const oPayload = {
        Name: oView.byId("idEditProductName").getValue(),
        Price: oView.byId("idEditPrice").getValue(),
        ReleaseDate: oView.byId("idEditReleaseDate").getDateValue(),
        DiscontinuedDate: oView.byId("idEditDiscontinuedDate").getDateValue(),
        Rating: oView.byId("idEditRating").getValue(),
      }

      oModel.update(sPath, oPayload, {
        success: oData => {
          MessageBox.information("Product has been updated")
          this._oEditDialog.close()
        },
        error: () => {
          MessageBox.error("Product could not be updated!")
          this._oEditDialog.close()
        }
      }) */

      if (oModel.hasPendingChanges()) {
        oModel.submitChanges({
          success: oData => {
            MessageBox.information("Product has been updated")
            this._oEditDialog.close()
          },
          error: oError => {
            MessageBox.error(oError.message)
            this._oEditDialog.close()
          }
        })
      } else {
        this._oEditDialog.close()
      }
    },

    onPressDelete(oEvent) {
      const oModel = this.getView().getModel()
      const oItem = oEvent.getParameter("listItem")

      // Create path
      const sPath = oModel.createKey("/Products", {
        ID: oItem.getBindingContext().getProperty("ID")
      })

      // Send delete request
      oModel.remove(sPath, {
        success: () => {},
        error: () => {},
      })
    },

    onPressAddNewProduct() {
      // Load and display the create new product dialog
      if (!this._oCreateProductDialog) {
        this._loadDialog("CreateProduct").then(oDialog => {
          this._oCreateProductDialog = oDialog
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
        this._loadDialog("SortDialog").then(oDialog => {
          this._oSortDialog = oDialog
          oDialog.open()
        })
      } else {
        this._oSortDialog.open()
      }
    },

    onFilterButtonPressed() {
      // Load and display the filter dialog
      if (!this._oFilterDialog) {
        this._loadDialog("FilterDialog").then(oDialog => {
          this._oFilterDialog = oDialog
          oDialog.open()
        })
      } else {
        this._oFilterDialog.open()
      }
    },

    onGroupButtonPressed() {
      // Load and display the group dialog
      if (!this._oGroupDialog) {
        this._loadDialog("GroupDialog").then(oDialog => {
          this._oGroupDialog = oDialog
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
      const aFilterKeys = oEvent.getParameter("filterCompoundKeys")
      const sFilterString = oEvent.getParameter("filterString")

      // Create filters array according to the selected items
      const aFilter = []

      Object.entries(aFilterKeys).forEach(([ sPath, oValues ]) => {
        Object.keys(oValues).forEach(sKey => {
          if (sKey.includes("__")) {
            aFilter.push(new Filter(...sKey.split("__")))
          } else {
            aFilter.push(new Filter(sPath, FilterOperator.EQ, sKey))
          }
        })
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

    onProductsLoaded(oEvent) {
      const sTitle = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("listHeader")

      this.getView().byId("idListTitle").setText(`${sTitle} (${oEvent.getParameter("total")})`)
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
    },

    _loadDialog(sFragmentName) {
      return new Promise((resolve, reject) => {
        Fragment.load({
          id: this.getView().getId(),
          name: `ui5.product.list.view.fragments.${sFragmentName}`,
          controller: this
        }).then(oDialog => {
          this.getView().addDependent(oDialog)
          resolve(oDialog)
        })
      })
    }
  })
})