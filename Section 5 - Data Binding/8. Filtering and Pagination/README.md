# Data Binding | Filtering & Pagination

## Filtering
Let's now enable filtering.

This time we create a file named `FilterDialog.fragment.xml` and use the `filterItems` aggregation of the `ViewSettingsDialog`.

```xml
<core:FragmentDefinition xmlns="sap.m"
  xmlns:core="sap.ui.core">
  <ViewSettingsDialog confirm="onConfirmFilter">
    <filterItems>
      <ViewSettingsFilterItem text="{i18n>category}" key="Category">
        <items>
          <ViewSettingsItem key="Category__EQ__0" text="Food" />
          <ViewSettingsItem key="Category__EQ__1" text="Beverages" />
          <ViewSettingsItem key="Category__EQ__2" text="Electronics" />
        </items>
      </ViewSettingsFilterItem>
      <ViewSettingsFilterItem text="{i18n>price}" key="Price">
        <items>
          <ViewSettingsItem key="Price__LT__10" text="Less than €10" />
          <ViewSettingsItem key="Price__BT__10__50" text="Between €10 and €50" />
          <ViewSettingsItem key="Price__GT__50" text="More than €50" />
        </items>
      </ViewSettingsFilterItem>
    </filterItems>
  </ViewSettingsDialog>
</core:FragmentDefinition>
```

And once again, we add a new button in the list header and copy the event handlers for sorting and grouping.

```js
// Handle confirm filter
onConfirmFilter(oEvent) {
  // Get filter items from the event object
  const aFilterItems = oEvent.getParameter('filterItems')

  // Create filters array according to the selected filter items
  const aFilter = []

  aFilterItems.forEach(item => {
    const [sPath, sOperator, sValue1, sValue2] = item.getKey().split('__')
    aFilter.push(new Filter(sPath, sOperator, sValue1, sValue2))
  })

  // Filter list binding
  this.getView()
    .byId('idProductList')
    .getBinding('items')
    .filter(aFilter)
},
```

It is also a good idea to let the user now if the list they are seeing is filtered.

Let's create an information header for our list for this reason and hide it by default.

```xml
<infoToolbar>
  <Toolbar id="idFilterInfoToolbar" visible="false">
      <Text id="idFilterText" />
  </Toolbar>
</infoToolbar>
```

```js
onConfirmFilter(oEvent) {
  ...
  const sFilterString = oEvent.getParameter('filterString')
  ...
  // Show info header if there are any filters
  this.getView().byId('idFilterInfoToolbar').setVisible(aFilter.length > 0)
  this.getView().byId('idFilterText').setText(sFilterString)
```

Now let's set the filter text - whixh we can get from the filter event object - and show this new information header when there is an active filter.

```js
// Show info header if there are any filters
this.getView().byId('idFilterInfoToolbar').setVisible(aFilter.length > 0)
this.getView().byId('idFilterText').setText(sFilterString)
```

## Pagination

When we have too many items, it is a good idea to have a pagination in place.

It makes the list look more compact and simply better. Also rendering too many items takes a long time on the client, so it is also crucial for performance.

We can enable pagination for any list simply by setting the `growing` property to `true`.

We also set the `growingThreshold` to `5` - which is `20` by default - for testing purposes.

```xml
<List
    id="idProductList"
    ...
    items="{product>/items}"
    growing="true"
    growingThreshold="5">
```
