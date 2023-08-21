# Working With Controls & Elements | Styling Controls

There are two main options for applying custom CSS styles to UI5 applications; using predefined CSS classes and using custom CSS files.

## Using Predefined CSS Classes

SAPUI5 Provides several predefined CSS classes for margins and paddings. In this lesson we will use them to make our UI look a bit better.

You can check all available classes [here](https://help.sap.com/doc/saphelp_nw75/7.5.5/en-US/77/7168ffe8324873973151dae2356d1c/frameset.htm) along with detailed information.

### Margin Classes

UI5 Provides four types of margin classes:

 - Full margins, which completely surround your control
 - Single-sided margins
 - Two-sided margins
 - Responsive margins, which adapt to the available screen width

For example, here are the single sided margin classes

<div style="font-family:Courier New, Courier, monospace;display:grid;grid-template-columns:repeat(4, 1fr);margin-bottom:1rem;">
<span>sapUiTinyMarginTop</span>
<span>sapUiTinyMarginBottom</span>
<span>sapUiTinyMarginBegin</span>
<span>sapUiTinyMarginEnd</span>
<span>sapUiSmallMarginTop</span>
<span>sapUiSmallMarginBottom</span>
<span>sapUiSmallMarginBegin</span>
<span>sapUiSmallMarginEnd</span>
<span>sapUiMediumMarginTop</span>
<span>sapUiMediumMarginBottom</span>
<span>sapUiMediumMarginBegin</span>
<span>sapUiMediumMarginEnd</span>
<span>sapUiLargeMarginTop</span>
<span>sapUiLargeMarginBottom</span>
<span>sapUiLargeMarginBegin</span>
<span>sapUiLargeMarginEnd</span>
</div>

To separate our input from our button, we add a single sided margin class to our input.

```xml
<Input class="sapUiTinyMarginEnd" ...
```

And to our list to separate it from the input and the button above.

```xml
<List class="sapUiSmallMarginTop" ...
```

### Container Content Padding Classes

Another type of predefined classes provided by UI5 is content padding classes for containers.

<div style="font-family:Courier New, Courier, monospace;display:flex;flex-direction:column;margin-bottom:1rem;">
<span>sapUiNoContentPadding</span>
<span>sapUiContentPadding</span>
<span>sapUiResponsiveContentPadding</span>
</div>

Not all controls can support the content padding classes.

The ones that support are:

<div style="font-family:Courier New, Courier, monospace;display:flex;flex-direction:column;margin-bottom:1rem;">
<span>sap.m.Dialog</span>
<span>sap.m.IconTabBar</span>
<span>sap.m.Popover</span>
<span>sap.m.Page</span>
<span>sap.m.List</span>
<span>sap.m.Table</span>
<span>sap.m.Carousel</span>
<span>sap.m.Panel</span>
<span>sap.m.ScrollContainer</span>
<span>sap.ui.layout.HorizontalLayout</span>
<span>sap.ui.layout.VerticalLayout</span>
</div>

For our `Page` component, we use the <span style="font-family:Courier New, Courier, monospace;">sapUiResponsiveContentPadding</span> class.

```xml
<Page class="sapUiResponsiveContentPadding" ...
```

## Using Custom CSS File

We start by creating a folder named `css`, which will contain our new CSS file `style.css`.

In our new `style.css` file, we create a custom class `.listWithSmallerTitle` combined with a custom namespace class `.myProductsApp`.
This makes sure that the styles will only be applied on controls that are used within our app.

```css
.myProductsApp .listWithSmallerTitle > header {
  font-size: 1rem;
}
```

Next, we add our new CSS file as a resource in the `manifest.json` file.

```json
"resources": {
  "css": [
    {
      "uri": "css/style.css"
    }
  ]
}
```

And lastly we add our new class `.listWithSmallerTitle` to our list, and `.myProductsApp` to our `App` component.
