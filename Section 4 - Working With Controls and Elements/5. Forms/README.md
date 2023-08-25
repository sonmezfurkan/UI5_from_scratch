# Working With Controls & Elements | Forms

In the previous video, we added more input fields for our new products. However, the input fields look very cumbersome and ugly.

## Creating a Simple Form

Now let's create a `sap.ui.layout.form.SimpleForm` control for a better UI. For that, we first have to define a new namespace for `sap.ui.layout.form`.

A new `sap.m.Label` control starts a new row in the form.

```xml
<form:content>
  <Label text="{i18n>productName}" />
  <Input id="idProductName" maxLength="40" />
...
```

We also remove the placeholders since we now have labels.

## Adjusting the Form Grid

As you can see, the labels and inputs in our form are not aligned. For that, we need to set the `editable` property of our form to `true`.

Now we can see that the input fields are way too long on large screens.

Fortunately we can set empty spans for forms for different screen sizes.

The default screen size breakpoints are as follows:

|    S    |    M    |    L    |    XL   |
|   ---   |   ---   |   ---   |    --   |
|    -    |  600px  | 1024px  | 1440px  |

And they can be modified by the `breakpointM`, `breakpointL`and `breakpointXL` properties of the form.

Let's now set the empty spans for all sizes.

```xml
<form:SimpleForm
  layout="ResponsiveGridLayout"
  editable="true"
  emptySpanM="0"
  emptySpanL="6"
  emptySpanXL="6">
  ...
```

We can also change the spans of the labels similarly:

```xml
<form:SimpleForm
  layout="ResponsiveGridLayout"
  editable="true"
  labelSpanS="12"
  labelSpanM="3"
  labelSpanL="3"
  labelSpanXL="3"
  ...
```

## Multiple Inputs Per Line

All controls that follow a `Label` will be assigned to the row that started with the last label.

So let's put the currency input next to the price.

```xml
<Label text="{i18n>price}" />
<Input id="idPrice" type="Number" />
<Input value="EUR" enabled="false" />
```

## Multiple Columns

Now seeing as we have a lot of empty space in the large and screens, we can divide our form into two columns.

For that, we first have to split our form into two groups. And to start a new group, we have to use a `sap.ui.core.Title` or a `sap.m.Toolbar` control.

After that, we split our form into two columnds for the L and XL sizes with the following properties:

```xml
<form:SimpleForm
  ...
  columnsL="2"
  columnsXL="2"
  ...
```

This looks better, but now we need to adjust the empty span for the large size, since the inputs look small with this configuration.

```xml
<form:SimpleForm
  layout="ResponsiveGridLayout"
  editable="true"
  emptySpanM="0"
  emptySpanL="1"
  ...
```

## Layout Data Aggregation

We can also specify how many columns a single control should take up using the `layoutData` aggregation.

Let's do that to make our currency input smaller.

```xml
<Input value="EUR" enabled="false">
    <layoutData>
      <l:GridData span="XL1 L2 M3 S12"  />
    </layoutData>
</Input>
```

We now leave our form and inputs to implement more advanced concepts later.
