# Working With Controls & Elements | Object List Item

## Adding More Input Fields

Now let's add some more fields to our product items: category, price, quantity and dimentions.

We will use `sap.m.ComboBox` control for the category and `sap.m.Input` control for the others.

We also wrap our inputs in a `sap.m.VBox` control to display them vertically and remove the `sapUiTinyMarginEnd` class from our input since we no longer need it.

```xml
<VBox>
  <Input id="idProductName" placeholder="{i18n>productName}" width="20rem" maxLength="40" />
  <ComboBox id="idCategory" placeholder="{i18n>category}">
    <items>
        <core:Item key="" text="" />
        <core:Item key="1" text="Laptops" />
        <core:Item key="2" text="Printers" />
        <core:Item key="3" text="Accessories" />
        <core:Item key="4" text="Mice" />
        <core:Item key="5" text="Keyboards" />
    </items>
  </ComboBox>
  <Input id="idPrice" placeholder="{i18n>price}" type="Number" width="10rem" />
  <Input id="idQuantity" placeholder="{i18n>quantity}" type="Number" width="10rem" />
  <Input id="idWidth" placeholder="{i18n>width}" type="Number" width="4rem" />
  <Input id="idHeight" placeholder="{i18n>height}" type="Number" width="4rem" />
  <Input id="idDepth" placeholder="{i18n>depth}" type="Number" width="4rem" />
</VBox>
```

Now we need to display these new fields in our list.

## Object List Item

In the previous lesson, we used the `sap.m.StandardListItem` control. Since we need more fields to display now, we need a more complex item control, `sap.m.ObjectListItem`.

As the `number` property of our item, we will display the price of our product.

We then set the `numberUnit` propertry as our currency, which will be hardcoded as EUR for now.

We display the category and the release date as `sap.m.ObjectAttribute` controls in the `attributes` aggregation of our list item.

Lastly we display the availability as an `sap.m.ObjectStatus` control in the `firstStatus` aggregation of our list item.

We want to display different status texts according to the discontinued date. For that we create a private method named <span style="font-family:Courier New, Courier, monospace;">_getAvailabilityText</span> to format the text we want to display as the `text` property, and <span style="font-family:Courier New, Courier, monospace;">_getAvailabilityState</span> to format the `state` property of our object status control.

 > Note that the aggregation `attributes` has a cardinality of *1...n* so the value is an array of `sap.m.ObjectAttribute` objects. Unlike the `firstStatus` aggregation which has a cardinality of *1...1*.
