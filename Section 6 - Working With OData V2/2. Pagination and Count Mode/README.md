# Working With OData | Pagination & Count Mode

## Pagination

We had already implemented pagination for our list by setting the `growing` property to `true`.

Now let's see what effect that makes on the OData calls.

As we can see, there are two url parameters used for pagination:

 - `$top` specifies how many records will be retrieved.
 - `$skip` specifies how many records will be skipped.

## Count

It is also possible to get the number of records we get back from the OData service, using the `$count` parameter.

We can manipulate this behavior via the `defaultCountMode` property of our model settings.

| Count Mode        | Behavior                                                                            |
| ---               | ---                                                                                 |
| Request (default) | Count is retrieved by sending a separate $count request before requesting data.     |
| Inline            | Count is retrieved with data requests if no count has been determined yet.          |
| InlineRepeat      | Count is retrieved with every data request.                                         |
| None              | Count is not requested                                                              |

Now let's add the number of records to our list header.

For that we will use the `updateFinished` event of the list base control.

```xml
<List
    id="idProductList"
    items="{/Products}"
    updateFinished="onProductsLoaded"
```

But before implementing the event handler, let's assign an ID to the list title so we can access it from the controller.

```xml
 <Title id="idListTitle" text="{i18n>listHeader}" />
```

Now from the event object, we can get the `total` parameter and append it to the list title inside parentheses.

```js
// Handle update finished event of the product list
onProductsLoaded(oEvent) {
  const sListTitle = this.getView().getModel('i18n').getResourceBundle().getText('listHeader')
  this.getView().byId('idListTitle').setText(`${sListTitle} (${oEvent.getParameter('total')})`)
},
```
