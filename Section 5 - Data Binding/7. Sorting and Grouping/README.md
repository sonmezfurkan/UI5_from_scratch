# Data Binding | Sorting & Grouping

## Sorting
Let's now enable sorting for our product list. For that, we will use the `sap.m.ViewSettingsDialog` control.

We first create `SortDialog.fragment.xml` file to hold our sort items.

```xml
<core:FragmentDefinition xmlns="sap.m"
  xmlns:core="sap.ui.core">
  <ViewSettingsDialog>
    <sortItems>
      <ViewSettingsItem text="{i18n>name}" key="Name" />
      <ViewSettingsItem text="{i18n>price}" key="Price" />
      <ViewSettingsItem text="{i18n>releaseDate}" key="ReleaseDate" />
    </sortItems>
  </ViewSettingsDialog>
</core:FragmentDefinition>
```

Then we add a new button in the list header toolbar to open the new view settings dialog for sorting.

```xml
<Toolbar>
      <Title text="{i18n>listHeader}" />
      <ToolbarSpacer />
      <Button icon="sap-icon://sort" press="onSortButtonPressed" />
      <Button icon="sap-icon://add" press="onPressAddNewProduct" />
  </Toolbar>
</headerToolbar>
```

Now let's handle the `onSortButtonPressed` event and load & dislpay our sort dialog,

And handle the `confirm` event of our view settings dialog.

```xml
<ViewSettingsDialog confirm="onConfirmSort">
```

```js
// Handle confirm sort
onConfirmSort(oEvent) {
  // Get sort related event parameters
  const oSortItem = oEvent.getParameter('sortItem')
  const bDescending = oEvent.getParameter('sortDescending')

  // If there is a sort item selected, sort the list binding.
  // Else, sort by empty array to reset any existing sorting.
  this.getView()
    .byId('idProductList')
    .getBinding('items')
    .sort(oSortItem ? [new Sorter(oSortItem.getKey(), bDescending)] : [])
},
```

## Grouping

To enable grouping, let's a new view settings dialog fragment named `GroupDialog.fragment.xml`.

This time we will use the `groupItems` aggregation instead of the `sortItems`.

```xml
<core:FragmentDefinition xmlns="sap.m"
  xmlns:core="sap.ui.core">
  <ViewSettingsDialog confirm="onConfirmGroup">
    <groupItems>
      <ViewSettingsItem text="{i18n>category}" key="Category" />
    </groupItems>
  </ViewSettingsDialog>
</core:FragmentDefinition>
```

We add a new header button for grouping and copy the functions we created for the sort dialog.

Grouping is achieved by just providing an additional `vGroup` parameter to the `Sorter` object.

But we just see the key values of the categories. Fortunately, there is a binding property to help us, `groupHeaderFactory`.

but first, let's format the category attribute in our items.

```js
// Format category
formatCategory(sValue) {
  switch (sValue) {
    case '0':
      return 'Food'
    case '1':
      return 'Beverages'
    case '2':
      return 'Electronics'
    default:
      return 'Unknown'
  }
},
```

```xml
<ObjectAttribute
  title="{i18n>category}"
  text="{
    path: 'product>Category',
    formatter: 'formatter.formatCategory'
  }" />
```

Now let's implement our group header factory function.

```xml
<List
  id="idProductList"
  ...
  items="{
    path: 'product>/items',
    groupHeaderFactory: '.formatter.formatGroupHeader'   
  }">
```

```js
// Format list group header
formatGroupHeader(oGroup) {
  switch (oGroup.key) {
    case '0':
      return new GroupHeaderListItem({ title: 'Food' })
    case '1':
      return new GroupHeaderListItem({ title: 'Beverages' })
    case '2':
      return new GroupHeaderListItem({ title: 'Electronics' })
    default:
      return new GroupHeaderListItem({ title: 'Unknown' })
  }
}
```

