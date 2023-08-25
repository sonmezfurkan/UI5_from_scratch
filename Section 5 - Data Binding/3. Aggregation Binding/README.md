# Data Binding | Aggregation Binding

Just as we can bind properties to models, we can also bind aggregations.

We will now create a JSON model to hold our product list, and bind it to the items aggregation of our list.

But this time instead of creating the model and the data programmatically, we will use a json file as our data source.


First we create a `Products.json` file in the model folder.

Next we create a new model named `product` in the `manifest.json` file.

```json
"product": {
  "type": "sap.ui.model.json.JSONModel",
  "uri": "model/Products.json"
}
```
  
And now instead of setting the model programmatically, we create the model in the descriptor file. This way the model will be instantiated automatically and will be available throughout the whole application.

Now let's bind the `/items` property of our new `product` model to the `items` aggregation of our list.

```xml
<List
  id="idProductList"
  items="{product>/items}"
  ...
```

In the items aggregation of our list, we have to define a `template` that will be used for each item in our list.

We will still be using an `ObjectListItem` as the control for each item.

```xml
<List
    id="idProductList"
    items="{product>/items}"
    ...>
    ...
    <items>
      <ObjectListItem title="{product>Name}" number="{product>Price}" numberUnit="{product>Currency}">
          <attributes>
            <ObjectAttribute title="{i18n>category}" text="{product>Category}" />
            <ObjectAttribute title="{i18n>releaseDate}" text="{product>ReleaseDate}" />
          </attributes>
          <firstStatus>
            <ObjectStatus text="{product>DiscontinuedDate}" />
          </firstStatus>
      </ObjectListItem>
    </items>
</List>
```

The title property of the list item is bound to the `Name` property of an item in the list.

This is achieved by defining a relative path __without a / in the beginning__.

Similarly we bind the other attributes and aggregations but we no longer can format our availability status any more. We will simply display the discontinued date here for now and handle the formatting in the next video.

Since we want to update the list via our new model, we will now add items to our model instead of adding them directly to our list.

```js
onSaveNewProduct() {
  const oData = this.getView().getModel('input').getData()

  // Add new item to the tasks model
  const oProductModel = this.getView().getModel('product')
  const aItems = oProductModel.getProperty('/items')

  aItems.push(oData)
  oProductModel.setProperty('/items', aItems)
  ...
```

When deleting an item, we will remove it from our model.

```js
onPressDelete(oEvent) {
  const oModel = this.getView().getModel('product')
  const oItem = oEvent.getParameter('listItem')
  const iIndex = oItem.getBindingContext('product').getPath().split('/').pop()

  oModel.getData().items.splice(iIndex, 1)
  oModel.refresh()
},
```

We can also remove the no more needed `ObjectListItem`, `ObjectStatus`, `ObjectAttribute` imports from our controller.
