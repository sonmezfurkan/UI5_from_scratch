# Data Binding | Expression & Complex Binding

Say we want to highlight the prices which are above 20 Euros for some reason 🤷🏻‍♂️.

We cannot use the predefined SAPUI5 data types but creating a custom formatter also seems like overkill for a simple comparasion.

That's where `expression binding` comes in, which is perfect for simple comparasions/calculations.

## Expression Binding

Let's set the `numberState` property of our object list item using `expression binding.

```xml
<ObjectListItem numberState="{= ${product>Price} > 20 ? 'Warning' : 'None' }"
```

The syntax for expression binding starts with an equal sign between curly braces.

Inside these braces we can do simple comparasions/calculations.

As you can see, a model binding inside an expression binding has to be escaped with the $ sign.

For detailed information on expression binding, please check here.

## Complex Binding

Now let's also add dimentions to some our products and display it as a new attribute.

We can do that easily because we don't have to just bind a single value to a property. We can also combine texts and binding pattern for more complex bindings.

```xml
<ObjectAttribute text="{product>Width} x {product>Height} x {product>Depth} cm" />
```

 > __Note__
 > To enable complex binding, we can either use `data-sap-ui-compatVersion="edge"` or `data-sap-ui-bindingSyntax="complex"` in the script. By setting the "edge" compatibility mode, the complex binding syntax is automatically enabled. The edge mode automatically enables compatibility features that otherwise would have to be enabled manually. For more information, see [Compatibility Version Information](https://sapui5.hana.ondemand.com/#/topic/9feb96da02c2429bb1afcf6534d77c79.html).

Since the dimentions are not available for all products, we can once again make use of expression binding to set the `visible` property of our `ObjectAttribute` and hide it for empty dimentions.

```xml
<ObjectAttribute
  visible="{= !!${product>Width} &amp;&amp; !!${product>Height} &amp;&amp; !!${product>Depth}}"
  text="{product>Width} x {product>Height} x {product>Depth} cm" />
```

As you can see, some special characters need to be escaped in XML. Like the `&` here is escaped with `&amp;`.
