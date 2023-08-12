sap.ui.define(['sap/ui/core/mvc/XMLView'], function (XMLView) {
  'use strict';

  XMLView.create({
    viewName: 'ui5.product.list.view.App'
  }).then(function (oView) {
    oView.placeAt('content');
  });
});
