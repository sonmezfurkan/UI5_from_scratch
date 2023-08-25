# Data Binding | Data Types & Formatters

We have now implemented a full MVC pattern, but we have several formatting issues with our list items.

First of all, the dates look too long, and the category texts are still missing.

## Data Types

Fortunately, data binding has one more feature for better formatting, which is called data types.

Let's see how it works by formatting the release date.

```xml
<attributes>
  <ObjectAttribute title="{i18n>category}" text="{product>Category}" />
  <ObjectAttribute
      title="{i18n>releaseDate}"
      text="{
        path: 'product>ReleaseDate',
        type: 'sap.ui.model.type.Date',
        formatOptions: {
            source: { pattern: 'yyyy-MM-ddTHH:mm:ss.SSSX' },
            style: 'short'
        }
      }" />
```

Next let's format the price.

```xml
<ObjectListItem
  title="{product>productName}"
  number="{
    parts: [{ path: 'product>price' }, { path: 'product>currency' }],
    type: 'sap.ui.model.type.Currency',
    formatOptions: {
        showMeasure: false
    }
  }"
  numberUnit="{product>Currency}">
```

 > __Info__
 > The binding syntax here with `parts` is called `Composite Binding`.

## Custom Formatters

Now we want to format our availability status, but data types will not cut it. We have to use a custom formatter.

We begin by creating a `formatter.js` file inside our model folder and creating a formatter function named `formatAvailabilityText`.

```js
sap.ui.define(['sap/ui/core/ValueState'], function (ValueState) {
  'use strict'

  return {
    formatAvailabilityText(sValue) {
      const oBundle = this.getOwnerComponent().getModel('i18n').getResourceBundle()

      return sValue && new Date(sValue) <= new Date() ? oBundle.getText('unavailable') : oBundle.getText('available')
    },
  }
})
```

Then we import our new formatter in our App controller and save it as a local property named `formatter` on the controller.

```js
sap.ui.define(
  [
    ...
    'ui5/product/list/model/formatter',
  ],
  function (Controller, ValueState, Fragment, models, formatter) {
    'use strict'

    return Controller.extend('ui5.product.list.controller.App', {
      formatter: formatter,

      // Handle add button press
      onPressAddNewProduct()
      ...
```

Now we can use our new formatter in our XML view.

The custom formatter function is specified with the property `formatter` of the binding syntax.

The dot in front of the formatter name means that the function is looked up in the controller of the current view.

Lastly, we need another custom formatter function for the `state` property of the `ObjectStatus`.

Let's create it in our formatter.js module first,

```js
formatAvailabilityState(sValue) {
  return sValue && new Date(sValue) <= new Date() ? ValueState.Error : ValueState.Success
},
```

And then use it in our view:

```xml
<ObjectStatus
  text="{
    path: 'product>DiscontinuedDate',
    formatter: '.formatter.formatAvailabilityText'
  }"
  state="{
    path: 'product>DiscontinuedDate',
    formatter: '.formatter.formatAvailabilityState'
  }" />
```

Lastly as a clean up, we can now remove the `_getStockStatusText` and `_getStockStatusState` private methods as well as the `sap/ui/core/ValueState` import from the App controller, since we now have formatters in place instead.
