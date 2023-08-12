# Getting Started | Modules

In this bideo, we convert our _index.js_ file to a module.

A module is a JavaScript file that can be loaded and executed in a browser.

In SAPUI5, resources are often referred to as modules.

The required modules are loaded asynchronously.

This Asynchronous Module Definition (AMD) syntax allows to clearly separate the module loading from the code execution and greatly improves the performance of the application. The browser can decide when and how the resources are loaded prior to code execution.

### Conventions

- Use sap.ui.define for controllers and all other JavaScript modules to define a global namespace. With the namespace, the object can be addressed throughout the application.
- Use sap.ui.require for asynchronously loading dependencies but without declaring a namespace, for example code that just needs to be executed, but does not need to be called from other code.
- Use the name of the artifact to load for naming the function parameters (without namespace).

For detailed information, please refer to the [official documentation](https://sapui5.hana.ondemand.com/#/topic/91f23a736f4d1014b6dd926db0e91070).
