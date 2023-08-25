# Working With Controls & Elements | XML Fragments & Dialogs

## XML Fragments

Using XML fragments, we can split our UI code into smaller pieces, which improves code readibility and reusability.

### Creating an XML Fragment

We begin by creating a folder named `fragments` inside the view folder and inside that folder, an xml file named `CreateProduct.fragment.xml`.

Then we move our form and button inside the fragment.

Now we can replace the form and the button with a `Fragment` in the App view.

```xml
...
<Page class="sapUiResponsiveContentPadding" title="{i18n>appTitle}">
    <content>
      <core:Fragment fragmentName="ui5.product.list.view.fragments.CreateProduct" />
      <List
          id="idProductList"
          class="sapUiSmallMarginTop listWithSmallerTitle"
          mode="Delete"
          delete="onPressDelete"
          headerText="{i18n>listHeader}" />
    </content>
</Page>
...
```

### Loading & Displaying an XML Fragment

Now let's remove the creation part completely from the App view and instead, display it as a dialog when we want to create a new item.

We begin by wrapping everything in our fragment with a `sap.m.Dialog`.

Then we set the create button as the `beginButton` aggregation of our `Dialog` and create a cancel button as the `endButton`.

Now we need a way to trigger this new dialog. For that, let's create a new button in the header aggregation of our list.

Since setting this aggregation overwrites the `headerText` attribute, we also move it into the header toolbar as a `Title` control.

```xml
...
<List
  id="idProductList"
  class="sapUiSmallMarginTop listWithSmallerTitle"
  mode="Delete"
  delete="onPressDelete">
  <headerToolbar>
    <Toolbar>
        <Title text="{i18n>listHeader}" />
        <ToolbarSpacer />
        <Button icon="sap-icon://add" press="onPressAddNewProduct" />
    </Toolbar>
  </headerToolbar>
</List>
...
```

Now it's time to load and display our new dialog when the plus button is pressed.

```js
onPressAddNewProduct() {
  //Load and display the create item dialog
  Fragment.load({
    id: this.getView().getId(),
    name: 'ui5.product.list.view.fragments.CreateProduct',
    controller: this,
  }).then(oDialog => {
    this._oCreateDialog = oDialog
    this.getView().addDependent(this._oCreateDialog)
    oDialog.open()
  })
}
```

Let's implement the cancel functionality next.

```js
// Handle close new item dialog
onCloseCreateNewProduct() {
  this._oCreateDialog.close()
},
```

Though when we close the dialog and try to open it again, we get a *duplicate ID* error, understandably.

Therefore we have to load the dialog only if it doesn't exist already.

```js
onPressAddNewProduct() {
  //Load and display the create item dialog
  if (!this._oCreateDialog) {
    Fragment.load({
      id: this.getView().getId(),
      name: 'ui5.product.list.view.fragments.CreateItem',
      controller: this,
    }).then(oDialog => {
      this._oCreateDialog = oDialog
      this.getView().addDependent(this._oCreateDialog)
      oDialog.open()
    })
  } else {
    this._oCreateDialog.open()
  }
},
```

Lastly we move the logic to add create a new item to our new `onSaveNewProduct` method.

And we close the dialog once we create the new item.
