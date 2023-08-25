# Data Binding | Validation

Now one thing we are missing in our app is the validation of the input fields.

In addition to our `input` model, let's create a new `validation` model to keep track of the validation status of our inputs.

```js
createValidationModel() {
  return new JSONModel({
    Name: true,
    Category: true,
    Price: true,
    Currency: true,
    ReleaseDate: true,
    DiscontinuedDate: true,
  }).setDefaultBindingMode(BindingMode.TwoWay)
},
```

And set it to the component and also reset it when we close the dialog.

```js
init: function () {
  ...
  // set input model
  this.setModel(models.createInputModel(), 'input')

  // set validation model
  this.setModel(models.createValidationModel(), 'validation')
},
```

```js
// Handle dialog close event
onAfterCloseDialog() {
  // Reset input model
  this.getOwnerComponent().setModel(models.createInputModel(), 'input')
  this.getOwnerComponent().setModel(models.createValidationModel(), 'validation')
},
```

Now let's bind the `valueState` properties using expression binding of our inputs for validation.

```xml
...
<Input maxLength="40" value="{input>/Name/value}" valueState="{= ${input>/productName/isValid} ? 'None' : 'Error'}" 
...
```

And to notify the user that a field is required, we set the `required` property of the `sap.m.Label` controls that point to mandatory fields.

```xml
...
<Label text="{i18n>productName}" required="{input>/productName/required}" />
...
```

Next, let's create a private method to do the validation.

```js
// Validate create inputs
_validate() {
  const oInput = this.getView().getModel('input').getData()
  const oValidationModel = this.getView().getModel('validation')

  // Check mandatory fields
  oValidationModel.setProperty('/Name', !!oInput.Name)
  oValidationModel.setProperty('/Category', !!oInput.Category)
  oValidationModel.setProperty('/Price', !!oInput.Price)
  oValidationModel.setProperty('/ReleaseDate', !!oInput.ReleaseDate)

  // Return validation result
  return !Object.values(oValidationModel.getData).includes(false)
},
```

Now we can use this method to stop the save process if the validation fails.
 
```js
...
onSaveNewProduct() {
  const oData = this.getView().getModel('input').getData()

  // Validate inputs
  if (!this._validate()) return
...
```
