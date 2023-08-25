# Working With Controls & Elements | Adding User Interaction

First of all, we want to handle the `press` event of our button and add a new item to our list when it is pressed.

For that we create a new event handler method in the `App.controller.js` file, in which we get the value of our input and add it to our list.

We also assign IDs to our input and list so we can access them from the controller.

```xml
<Input id="idProductName" ...
<Button press="onPressCreateNewProduct" ...
<List id="idProductList" ...
```

```js
onPressCreateNewProduct() {
  const sProductName = this.getView().byId('idProductName').getValue()

  this.getView()
    .byId('idProductList')
    .addItem(
      new StandardListItem({
        title: sProductName,
      })
    )
},
```

Now we can add items to our list programmatically, but we cannot remove them.

To achieve this, we set the mode of our list to `Delete`, which provides a delete button for every item.

We then of course have to handle the `delete` event of our list, which is triggered when the delete button is pressed.

```js
onPressDelete(oEvent) {
  const oItem = oEvent.getParameter('listItem')

  this.getView().byId('idProductList').removeItem(oItem)
}
```