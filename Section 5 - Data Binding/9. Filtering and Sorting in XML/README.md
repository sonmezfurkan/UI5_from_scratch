# Data Binding | Filtering & Sorting in XML Views

## Filtering in XML Views

We can set filters direactly in an XML view using the list binding syntax.

Let's add a new field to our products data, `Inactive`.

Now let's add a filter in our App view to filter out the inactive products.

```xml
<List
  id="idProductList"
  items="{
    path: 'product>/items',
    groupHeaderFactory: '.formatter.formatGroupHeader',
    filters: [{
        path: 'Inactive',
        operator: 'NE',
        value1: true
    }]
  }"
```

## Sorting in XML Views

Similarly, we can implement sorting in XML views as well.

Let's sort our product list by product name by default.

```xml
<List
  id="idProductList"
  items="{
    path: 'product>/items',
    groupHeaderFactory: '.formatter.formatGroupHeader',
    filters: [{
        path: 'Inactive',
        operator: 'NE',
        value1: true
    }],
    sorter: [{
        path: 'Name',
        descending: false
    }]
  }"
```

 > __Note__
 > Now the filters and sorts we apply from the view settings dialogs override the ones we defined in our XML view. We can counter that by adding those filters and sorters every time the view settings dialog is confirmed, but we will skip that and leave the data binding topic for now to come back to it later.
