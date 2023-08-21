# UI5 Tooling | Installation and Configuration

In this video, we install and configure `UI5 Tooling` CLI to benefit from a better development environment.

UI5 Tooling will provide us with features such as a development server, builder, custom middlewares etc.

## Installation

First we initialize npm with the following command:

```shell
npm init -y
```

We then install UI5 Tooling CLI both globally and locally with the commands below:

```shell
npm i --global @ui5/cli   # install globally
npm i --save-dev @ui5/cli # install locally as a dev dependency
```

## Configuration

### Creating ui5.yml file

We generate the ui5.yaml file with the following command:

```shell
ui5 init
```

In the file, following properties are generated:

 - __specVersion__: Specification version for the tooling, each versions adds new features. (Backward compatible)
 - __type__: one of `application` | `library` | `theme-library` | `module`
 - __metadata__
   - __name__: A unique name for the project, should follow a namespace scheme (my.first.project)

### Setting the framework and dependencies

We add the following lines to the `ui5.yml` file:

```yml
framework:
  name: SAPUI5
  version: "1.107.1"
  libraries:
    - name: sap.m
    - name: sap.ui.core
    - name: themelib_sap_horizon
      optional: true
```

Thus we set the framework as `SAPUI5` (the other option is `OpenUI5`) and the version as `1.107.1`.

We also add the `sap.m` and the `sap.ui.core` libraries as dependencies, and the `themelib_sap_horizon` as an optional dependency.

For detailed information about the configuration, please check out [the official documentation](https://sap.github.io/ui5-tooling/stable/pages/Configuration/),

## Starting the Development Server

We start the dev server with the command `ui5 serve`.

A couple of useful parameters we can pass to the command are:

| Option        | Description                                        |
| ---           | ---                                                |
| -p, --port    | Port to bind on (default for HTTP: 8080)           |
| -o, --open    | Opens web server root directory in default browser |
