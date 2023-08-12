# Getting Started | Bootstrapping

In this video we talk about bootstrapping, how it is done and configured.

We load the UI5 library in our html file log a message to the developer console once it is ready for use.

## What is bootstraping?

Before we can use the UI5 library, first we have to load and initilize it. This process is called **bootstrapping**.

UI5 Can be loaded from the same server where the app resides (i.e. SAP BTP), or it can be loaded from a different server like CDN.

## Bootstrap Attributes

| Attribute                   | Description                                                                                                                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`                       | Tells the browser from where to load the SAPUI5 core library – it initializes the SAPUI5 runtime and loads additional resources, such as the libraries specified in the `data-sap-ui-libs` attribute. |
| `data-sap-ui-theme`         | We choose `sap_horizon` as our default theme from the [available themes](https://experience.sap.com/fiori-design-web/theming/).                                                                       |
| `data-sap-ui-libs`          | We specify the required UI library sap.m containing the UI controls we want to use.                                                                                                                   |
| `data-sap-ui-compatVersion` | We define the compatibility version as edge to make use of the most recent functionality of SAPUI5.                                                                                                   |
| `data-sap-ui-async`         | We configure the process of _bootstrapping_ to run asynchronously. This means that the SAPUI5 resources can be loaded simultaneously in the background for performance reasons.                       |
| `data-sap-ui-onInit`        | We define the module to be loaded once the UI5 runtime is ready. This is more secure than writing Javascript code directly inside your HTML file.                                                     |
| `data-sap-ui-resourceroots` | We tell SAPUI5 that resources in the _ui5.product.list_ namespace are located in the same folder as index.html.                                                                                       |

For more information, please check the [official documentation on bootstrapping](https://sapui5.hana.ondemand.com/#/topic/a04b0d10fb494d1cb722b9e341b584ba).
