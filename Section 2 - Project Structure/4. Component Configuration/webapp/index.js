sap.ui.define(
  ['sap/ui/core/ComponentContainer'],
  function (ComponentContainer) {
    'use strict';

    new ComponentContainer({
      name: 'ui5.product.list',
      settings: {
        id: 'ui5.product.list'
      },
      async: true
    }).placeAt('content');
  }
);
