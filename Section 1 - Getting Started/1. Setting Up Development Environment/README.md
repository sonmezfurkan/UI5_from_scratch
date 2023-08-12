# Getting Started | Setting Up Development Environment

## Nodejs Environment

The Node.js JavaScript runtime is needed for some of the tools involved in developing UI5 applications.

You can install the current LTS version from [here](https://nodejs.org/en/) for your operation system.

## SAPUI5 CLI

We will benefit from [UI5 Tooling](https://sap.github.io/ui5-tooling/stable/) development toolchain, which will provide features such as a development server, builder, custom middlewares etc.

It can be installed globally via the following command:

```shell
npm install --global @ui5/cli
```

Detailed information about UI5 Tooling will come in the dedicated section.

## Code Editor

During the course I will be using the open code Visual Studio Code editor, which you can download from [here](https://code.visualstudio.com/Download).

It is of course fine to use any IDE of your choice, however I do prefer VS Code since it is very powerful and highly configurable.

If you have access to SAP WEBIDE or SAP Business Application Studio, they are also ideal development environments so feel free to use them.

## VS Code Extensions

I will benefit from several VS Code extensions, such as:

<div style="display:grid;grid-template-columns:3rem 1fr;grid-gap:1rem;align-items:center;margin-bottom:1rem;">
<img style="height:3rem;siaply:block;" src="img/SAP Fiori Tools - Extension Pack.png">
<span><a href="https://marketplace.visualstudio.com/items?itemName=SAPSE.sap-ux-fiori-tools-extension-pack" target="_blank">SAP Fiori Tools - Extension Pack</a> for several tools asuch as application wizard, syntax validation and more. We will explore the features as we go.</span>
<img style="height:3rem;siaply:block;" src="img/UI5 Language Assistant.png">
<span><a href="https://marketplace.visualstudio.com/items?itemName=SAPOSS.vscode-ui5-language-assistant" target="_blank">UI5 Language Assistant</a> for code XML completion</span>
<img style="height:3rem;siaply:block;" src="img/Live Server.png">
<span><a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">Live Server</a> for launching a local development server (until we setup SAP's solution UI5 Tooling)</span>
<img style="height:3rem;siaply:block;" src="img/ESLint.png">
<span><a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" target="_blank">ESLint</a> for linting</span>
</div>

## Configuring ESLint

SAP Recommends a set of ESLint rules and in order to configure Eslint, we first install it globally with the command below:

```shell
npm i -g eslint
```

We will then create a `.eslintrc` file at the root directory of our project and populate it according to the [rules recommendation by SAP](https://sapui5.hana.ondemand.com/sdk/#/topic/ccfe35638f1d46e2bbcf06fa60ccc6ef).

We will also set the `es6` option of the `env` attribute to `true` since we will be using ES6 syntax in the course.

```json
"env": {
  "browser": true,
  "es6": true
},
```

Finally we add the `ignorePatterns` option to exclude *.html files and the `lib` directory we will create later on.

```json
"ignorePatterns": [
  "**/*.html",
	"lib/**/*"
]
```

## Browser

UI5 Supports different browsers in different versions depending on the platform that UI5 apps run on.

I will be using [Google Chrome](https://www.google.com/intl/en/chrome/) but if you prefer another web browser, please check [Browser and Platform Support](https://sapui5.hana.ondemand.com/sdk/#/topic/74b59efa0eef48988d3b716bd0ecc933).

### UI5 Inspector

Another useful tool is the [UI5 Inspector](https://chrome.google.com/webstore/detail/ui5-inspector/bebecogbafbighhaildooiibipcnbngo?hl=en) which adds a new tab to Chrome’s integrated DevTools (F12).

It helps with inspecting, analyzing, and debugging UI5-based applications in Chrome.

![UI5 Inspector](./img/UI5%20Inspector.png)
