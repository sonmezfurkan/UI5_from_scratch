sap.ui.define(
  ["./BaseController"],
  function (BaseController) {
    "use strict";

    return BaseController.extend("ui5.product.list.controller.Detail", {
      onPressEdit() {
        // this.getRouter().navTo("edit", {}, true /* no history */)
        this.getRouter().getTargets().display('targetEdit')
      }
    });
  }
);
