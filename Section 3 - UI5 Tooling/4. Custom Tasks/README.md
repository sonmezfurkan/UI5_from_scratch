# UI5 Tooling | Custom Tasks

In this lesson, we will implmenet a custom UI5 tooling task which will transpile our next generation JavaScript code using [Babel](https://babeljs.io/).

## Installing Required Packages

For the Babel transpile, we need some packages as development dependencies.

```shell
npm i @babel/core @babel/plugin-proposal-object-rest-spread @babel/plugin-transform-destructuring @babel/plugin-transform-spread @babel/preset-env --save-dev
```

## Creating a Custom Task

To hold our custom task code, we create a new file `lib/tasks/transpile-babel.js`.

Inside the [file](lib/tasks/transpile-babel.js) we transpile our *.js files using Babel.

## Configuring New Custom Task

In our `ui5.yml` file , we add a new custom task by adding the following lines:

```yml
builder:
  customTasks:
    - name: transpile-babel
      beforeTask: generateComponentPreload
```

We then configure our new task by adding the following lines to our `ui5.yml` file

```yml
---
# Babel task configuration
specVersion: '2.6'
kind: extension
type: task
metadata:
  name: transpile-babel
task:
  path: lib/tasks/transpile-babel.js
```
