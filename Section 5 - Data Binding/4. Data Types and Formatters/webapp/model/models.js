sap.ui.define(
  ['sap/ui/model/json/JSONModel', 'sap/ui/model/BindingMode'],
  function (JSONModel, BindingMode) {
    'use strict'

    return {
      createInputModel() {
        return new JSONModel({
          Name: '',
          Category: '',
          Price: '',
          Currency: 'EUR',
          ReleaseDate: null,
          DiscontinuedDate: null,
        }).setDefaultBindingMode(BindingMode.TwoWay)
      },
    }
  }
)
