sap.ui.define(
  ["./BaseController"],
  function (BaseController) {
    "use strict";

    return BaseController.extend("ui5.product.list.controller.Edit", {
      onPressSaveProduct() {
        const oModel = this.getView().getModel()

        if (oModel.hasPendingChanges()) {
          oModel.submitChanges({
            success: oData => {
              MessageBox.information("Product has been updated")
              // this.getRouter().navTo("detail", {}, true /* no history */)
              this.getRouter().getTargets().display('targetDetail')
            },
            error: oError => {
              MessageBox.error(oError.message)
              // this.getRouter().navTo("detail", {}, true /* no history */)
              this.getRouter().getTargets().display('targetDetail')
            }
          })
        } else {
          // this.getRouter().navTo("detail", {}, true /* no history */)
          this.getRouter().getTargets().display('targetDetail')
        }
      },

      onPressCancelEditProduct() {
        // this.getRouter().navTo("detail", {}, true /* no history */)
        this.getRouter().getTargets().display('targetDetail')
      }
    });
  }
);
