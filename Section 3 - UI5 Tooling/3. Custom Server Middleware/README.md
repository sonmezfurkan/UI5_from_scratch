# UI5 Tooling | Custom Server Middleware

In this video, we will implmenet a middleware in our development server to enable live reload.

## Installing the ui5-middleware-livereload package

We install the [ui5-middleware-livereload](https://github.com/ui5-community/ui5-ecosystem-showcase/tree/main/packages/ui5-middleware-livereload) npm package as a development dependency with the following command:

```shell
npm i ui5-middleware-livereload --save-dev
```

The devDependencies in `package.json` are not recognized by the UI5 tooling, therefore they need to be listed in the `ui5 > dependencies` array.

Thus we add the following part to the package.json file:

```json
"ui5": {
    "dependencies": [
      "ui5-middleware-livereload"
    ]
  }
```

## Configuring UI5 Tooling

In our `ui5.yml` file, we then add our new middleware as a custom middleware to our development server:

```yml
server:
  customMiddleware:
  - name: ui5-middleware-livereload
    afterMiddleware: compression
    configuration:
      debug: true
      extraExts: "xml,json,properties"
      path: "webapp"
```

This way we call our new middleware after the standard *compression* middleware.

For more info on the standard UI5 Tooling middlewares, check [here](https://sap.github.io/ui5-tooling/stable/pages/Server/?404redirect=true).
