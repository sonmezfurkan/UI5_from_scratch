# Project Structure | XML Views

In this video, we move our UI control from the JS module to its own XML file.

SAPUI5 supports multiple view types (XML, HTML, JavaScript).

We choose XML as this produces the most readable code and is recommended by SAP.

### webapp/view/App.view.xml

We create an XML view file with the root node as _view_.

> View names have to end with \*.view.xml

We set the default namespace `sap.m`.

We define an additional `sap.ui.core.mvc` namespace with alias _mvc_ since we need it for the root _view_ node.

### webapp/index.js

Instead of instantiating the `sap.m.Button` control directly, we create the XML view which contains the button control.

### Official Documentation

For more information, please check the [official documentation on bootstrapping](https://sapui5.hana.ondemand.com/#/topic/a04b0d10fb494d1cb722b9e341b584ba).
