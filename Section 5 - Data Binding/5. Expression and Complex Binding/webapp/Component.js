sap.ui.define(
  ['sap/ui/core/UIComponent', 'sap/ui/model/resource/ResourceModel', 'ui5/product/list/model/models'],
  function (UIComponent, ResourceModel, models) {
    'use strict'

    return UIComponent.extend('ui5.product.list.Component', {
      metadata: {
        interfaces: ['sap.ui.core.IAsyncContentCreation'],
        manifest: 'json',
      },
      init: function () {
        // call the init function of the parent
        UIComponent.prototype.init.apply(this, arguments)

        // set input model
        this.setModel(models.createInputModel(), 'input')
      },
    })
  }
)
