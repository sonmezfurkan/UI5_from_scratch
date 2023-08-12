# Project Structure | Component Configuration

In this video, we encapsulate our application in a `Component`, which will be the new entry point to our application instead of the _index.html_ file.

By doing so, we achieve two things:

1. Our app becomes reusable since components are independent and reusable,
2. Our app can be used in more flexible environments than our static index.html page, such as in a surrounding container like the SAP Fiori launchpad.

## Creating **Component.js** file

We start by creating a `Component.js` file in our webapp folder.

Inside this file we extend the base class `sap.ui.core.UIComponent` and configure our application.

We setup our application configuration in the `metadata` section of the Component.js file.

App view is set as the root view of our app. Now the view will be displayed by the component instead of the index.js file.

## Adjusting the index.js file

Instead of creating and displaying the xml view, we now create a component container that instantiates the view for us according to the component configuration.

## Conventions

- The component has to be named Component.js.
- Together with all UI assets of the app, the component is located in the webapp folder.
- The index.html file is located in the webapp folder as well.
