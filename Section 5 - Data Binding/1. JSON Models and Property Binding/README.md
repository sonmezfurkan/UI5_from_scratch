# Data Binding | JSON Models & Property Binding

So far we have implemented the __V__(View) and __C__(Controller) parts of the MVC pattern. Now let's implement the __M__(Model).

## JSON Models

SO far we have been manipulating the UI from the Controller directly, which is not the prefered method for the MVC pattern.

We will now create a JSON Model with the `sap.ui.model.json.JSONModel()` constructor to hold our form input data.

 > Note that the JSON model is a client-side model and intended for small data sets. We will be using OData services as server side data sources later.

Let's first create a folder inside our webapp folder named `model` to hold our model related files, and inside that folder, a file named `models.js`.

```js
sap.ui.define(['sap/ui/model/json/JSONModel'], function (JSONModel) {
  'use strict'

  return {
    createInputModel() {
      return new JSONModel({
        Name: '',
        Category: '',
        Price: '',
        ReleaseDate: null,
        DiscontinuedDate: null,
      })
    }
  }
})
```

Now in our `Component.js` file's `init` method, let's import this JSON model and set it the app controller instance.

```js
// set input model
this.setModel(models.createInputModel(), 'input')
```

 > __Note__
 > Models can be set to any `sap.ui.base.ManagedObject`. So we can set a model to the component as we did here - in which case the model is available through the whole application. We can also set it to the view, or even to a single control. The more specific model overrides more general ones.

## Property Binding

Now we bind the properties of our input controls to our new JSON model. This concept is called `property binding`.

```xml
...
<Input id="idProductName" maxLength="40" value="{input>/Name}" />
...
<ComboBox id="idCategory" selectedKey="{input>/Category}">
...
<Input id="idPrice" type="Number" value="{input>/Price}" />
...
<DatePicker id="idReleaseDate" value="{input>/ReleaseDate}" />
...
<DatePicker id="idDiscontinuedDate" value="{input>/DiscontinuedDate}" />
```

Now our input value properties are bound to our JSON model.

It's also a good time to reset our input form now after the dialog is closed. We will use the `afterClose` event of `sap.m.Dialog` for this purpose.

```xml
<Dialog title="{i18n>createNewItem}" afterClose="onAfterCloseDialog">
```

```js
// Handle dialog close event
onAfterCloseDialog() {
  // Reset input model
  this.getOwnerComponent().setModel(models.createInputModel(), 'input')
},
```