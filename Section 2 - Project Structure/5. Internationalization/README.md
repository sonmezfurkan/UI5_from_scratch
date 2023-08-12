# Project Structure | Internationalization

In this video, we move the texts we use in our UI to a separate file.

This way we have all the texts in a centralized place and we can create different files for different languages.

## Creating **i18n.properties** file

We create a folder named `i18n` inside the webapp folder and inside the i18n folder, we create a `i18n.properties` file.

The file consists of key - value pairs for every text.

## Setting the resource model

Translatable texts are set as a special resource model.

For that model to be available to the whole application, we set it to the component itself.

## Accessing the resource model in XML views

To access a property of the resource model in an XML view, we add the model name - which is i18n in this case - followed by a > sign and wrap the whole thing between curly braces.

```xml
<Button text="{i18n>buttonTextCreate}" />
```

## Accessing the resource model in controllers

We first get the i18n model and get the resource bundle from it via the `getResourceBundle` method.

```js
var oBundle = this.getOwnerComponent().getModel('i18n').getResourceBundle();
```

We can then access a value in the bundle via the `getText` method of the resource bundle.

```js
oBundle.getText('messageProductCreated');
```

## Passing variables to the resource bundle

We can set placeholders into our i18n file using curly braces.

```properties
messageProductCreated=New product {0} created
```

We can then pass an array of values to the `getText` method to replace the placeholders.

```js
oBundle.getText('messageProductCreated', ['MacBook Pro'])
```

Placeholders are zero based indexes wrapped by curly braces which correspond to the index of the elements in the values array.

## Conventions
 - The resource model for internationalization is called the i18n model.
 - The default filename is i18n.properties
 - Resource bundle keys are written in (lower) camelCase.
 - Resource bundle values can contain parameters like {0}, {1}, {2} etc.
 - Use Unicode escape sequences for special characters.
