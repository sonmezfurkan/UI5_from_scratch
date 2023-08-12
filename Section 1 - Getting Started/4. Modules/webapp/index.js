sap.ui.define(['sap/m/Button'], function(Button) {
  'use strict'

  new Button({
    text: 'Create new product',
    press: () => console.log('Hi!')
  }).placeAt('content')
})
