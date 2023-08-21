sap.ui.define(["sap/ui/core/UIComponent"], function(UIComponent) {
  "use strict"

  return UIComponent.extend("ui5.product.list.Component", {
    metadata: {
      interface: ["sap.ui.core.IAsyncContentCreation"],
      manifest: "json"
    },

    init: function() {
      // call the init function of the parent
      UIComponent.prototype.init.apply(this, arguments)
    }
  })
})