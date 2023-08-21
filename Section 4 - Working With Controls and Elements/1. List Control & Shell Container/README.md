# Working With Controls & Elements | Controls & Shell Container

## Controls

A `control` is the basic building block for UI5.

They are what we see on the screen such as a text, an input, a list etc.

Controls have the following basic features:

| Feature           | Description                                                             |
| ---               | ---                                                                     |
| __Constructor__   | Creates and initializes a new control with the given sId and settings.  |
| __Properties__    | Properties such as *width*, *text*, *icon* etc.                         |
| __Aggregations__  | Named children (e.g: *items*) with a cardinality of 0..1' or '0..n'     |
| __Events__        | Attachable events such as *press*, *selectionChange* etc                |

All controls extend the base class `sap.ui.core.Control` which inherit many features from the base classes they extend. If you are interested, let's take a look at the hierarchy.

<div style="display: flex; flex-direction: column; align-items: center; width: min-content; margin: 1rem 0; border: 1px solid lightgray; border-radius: 2rem; padding: 1rem;">
<span>sap.ui.base.Object</span>
<span>⬇</span>
<span>sap.ui.base.EventProvider</span>
<span>⬇</span>
<span>sap.ui.base.ManagedObject</span>
<span>⬇</span>
<span>sap.ui.core.Element</span>
<span>⬇</span>
<span>sap.ui.core.Control</span>
</div>

### Base Object

We start with the root class `sap.ui.base.Object`, which provides very basic functionalities such as metadata or a destroy method for destructing.

### Event Provider

The base class `sap.ui.base.EventProvider` provides eventing capabilities for objects like attaching or detaching event handlers for events (click, select etc.), which are invoked when events are fired.

### Managed Object

The class `sap.ui.base.ManagedObject` introduces important concepts such as state management. Two of the features it provides are:

 - __Properties__ like *width*, *text* etc,
 - __Aggregations__ which are named children (e.g: *items*) with a cardinality (0..1' or '0..n').

### Elements

`Elements` are the most basic building blocks for UI5, but they cannot render themselves! Only contrtols can do that.

Let's take a combobox as an example. Every selectable item is an element, and it makes no sense to render a selectable item on its own, without a combobox right?

The base class for elements provide features like:

 - __Custom data__: Data in a key value pair structure can be attached to elements.
 - __Drag/drop config__: Elements can set as draggable and define drag-and-drop configuration.
 - __tooltip__: A string to be shown as a tooltip for the element.

### Controls

A `control` is the basic building block for UI5.

They are what we see on the screen such as a text, an input, a list etc.

All controls extend the base class `sap.ui.core.Control` which provies features such as:

 - __Rendering__: Only controls can render themselves and their children.
 - __show/hide__: A control can be hidden from the screen.
 - __busy indicator__: Marks a control visually as 'busy' by displaying a loader on top of the control.
 - __custom style classes__: Controls' styling can be modified with custom *CSS* classes.

Let's take the combobox example again. It renders itself and also its children (items). We can show/hide it, set it as busy, modify the styling with custom CSS and more.

## Shell Container

Now our app is currently full width and that looks horrible on large screens. That's why we use a `Shell` control as container for our app. The shell takes care of visual adaptation of the application to the device’s screen size by introducing a so-called letterbox on large screens.
