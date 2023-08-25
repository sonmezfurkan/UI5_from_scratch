# Data Binding | Two Way Data Binding

In the previous video, we bound our input fields to a JSON Model, so when we update the model, input values are also updated.

We also want the opposite of this behavior, so when we change the input values in the UI, we want the model to be updated automatically.

This is possible via `two way data binding`.

We can set the binding mode of our model with the `setDefaultBindingMode` method of `sap.ui.model.Model` - which `sap.ui.model.json.JSONModel` extends.

```js
return new JSONModel({
  Name: '',
  Category: '',
  Price: '',
  ReleaseDate: null,
  DiscontinuedDate: null,
}).setDefaultBindingMode(BindingMode.TwoWay)
```

 > __Note__
 > This is currently the default value for the binding mode so this can be omitted.

Now to test this, in the `liveChange` event of our product name input, let's log the value input by the user and also the value in our model.

```js
onLiveChangeProductName(oEvent) {
  console.log(oEvent.getParameter('value'))
  console.log(this.getView().getModel('input').getProperty('/productName'))
},
```

We see that the model is updated only when we press enter or tab out of the field.

We would prefer to update the model with every key stroke and to achieve this, we set the `valueLiveUpdate` property of our input to `true`.

```js
<Input id="idProductName" valueLiveUpdate="true" ...
```

Now let's set this property to true for the price input as well and remove the live change event which we implemented for testing.

We don't need this `valueLiveUpdate` property - nor do we have it available - for the combobox. We have to take an action to change the value of these kind of inputs and the model is updated automatically.

Now let's log our model data to the console when we click on Create to see if it works as expected.

Looking good! Now that we have the values, let's get rid of getting the values directly from the controls using IDs.

Now everything works as expected and we are managing all our inputs with a JSON model.
