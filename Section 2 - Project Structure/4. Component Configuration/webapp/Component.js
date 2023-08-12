sap.ui.define(['sap/ui/core/UIComponent'], function (UIComponent) {
  'use strict';

  return UIComponent.extend('ui5.product.list.Component', {
    metadata: {
      interfaces: ['sap.ui.core.IAsyncContentCreation'],
      rootView: {
        viewName: 'ui5.product.list.view.App',
        type: 'XML',
        id: 'app'
      }
    }
  });
});
