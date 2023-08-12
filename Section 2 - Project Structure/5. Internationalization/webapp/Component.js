sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/model/resource/ResourceModel"], function(UIComponent, ResourceModel) {
  "use strict"

  return UIComponent.extend("ui5.product.list.Component", {
    metadata: {
      interface: ["sap.ui.core.IAsyncContentCreation"],
      rootView: {
        viewName: "ui5.product.list.view.App",
        type: "XML",
        id: "app"
      }
    },

    init: function() {
      // call the init function of the parent
      UIComponent.prototype.init.apply(this, arguments)

      // set resource model
      var i18nModel = new ResourceModel({
        bundleName: "ui5.product.list.i18n.i18n"
      })

      this.setModel(i18nModel, "i18n")
    }
  })
})