# Project Structure | Descriptor File

In this video, we export our application metadata from the `Component.js` file to a new `manifest.json` file.

This will help us to separate the application coding from the configuration settings.

## Creating manifest.json file

In the webapp folder, we create a new file named `manifest.json`.

We specify the following values:

 - ___version__: Version of the descriptor file which corresponds to the UI5 version we are using.
 - __sap.app__
   - __id__: The namespace of our application (Maximum 70 characters).
   - __type__: One of `application`, `component`, `library` or `card`. In our case, it is `application`.
   - __i18n__: Path to the resource bundle file.
   - __title__: Title of our application.
   - __description__: Description of our application.
   - __applicationVersion__: Version of our application specified by us.
 - __sap.ui__
   - __technology__: The UI technology we use, `UI5` in our case.
   - __deviceTypes__: Devices that are supported by the app: desktop, tablet, phone (all true by default)
 - __sap.ui5__
   - __rootView__: Initial view to be loaded by the component.
   - __dependencies__: UI Libraries that our app needs to run.
   - __contentDensities__: Supported [content densities](https://sapui5.hana.ondemand.com/#/topic/e54f729da8e3405fae5e4fe8ae7784c1.html) (`Cozy`, `Compact` and `Condensed`).
   - __models__: Models that will be instantiated when the app starts. Here we define the local resource bundle.

## Creating translatable texts for the app title and description

We add two new properties to our resource bundle files for the app title description.

```diff
+appTitle=Products
+appDescription=A simple product list with UI5
```

## Updating index.html file

In our index.html file, we update the `data-sap-ui-oninit` attribute as `module:sap/ui/core/ComponentSupport`. This way, our component will be instantiated by UI5 automatically, instead of programmatically in the [index.js](./webapp/index.html#L18) file.

```diff
-data-sap-ui-onInit="module:ui5/product/list/index"
+data-sap-ui-onInit="module:sap/ui/core/ComponentSupport"
```

For that to work, UI5 will look for an html `div` element with the attribute `data-sap-ui-component` and insert our component in there.

The attribute `data-name` is also mandatory for the div and must contain the namespace of our application.

Attributes `data-id` and `data-settings` are optional but nice to have for debugging purposes, since they provide more readable global IDs.

```html
<body
    class="sapUiBody"
    id="content">
    <div data-sap-ui-component data-name="ui5.product.list" data-id="container" data-settings='{"id" : "ui5demo"}'></div>
  </body>
```

## Updating Component.js file

In the component's metadata section, we now replace the rootView property with the property key manifest and the value json. This way the app configuration will be loaded from the new `manifest.json` file instead.

We can also remove the resource bundle model since it is declared inside th edescriptor file now.

## Removing index.js file

We can now remove the `index.js` file since we no longer need it.

## Conventions
 - The descriptor file is named manifest.json and located in the webapp folder.
 - Use translatable strings for the title and the description of the app.