sap.ui.define(
  [
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/export/Spreadsheet",
    "sap/m/ObjectIdentifier",
    "sap/m/Text",
    "sap/m/ObjectStatus",
    "sap/m/ObjectNumber",
    "sap/m/ColumnListItem",
    "sap/m/ObjectListItem",
    "sap/m/ObjectAttribute",
    "sap/m/StandardListItem",
    "sap/ui/core/Icon",
    "sap/ui/export/library",
    "sap/m/library",
  ],
  function (
    BaseController,
    JSONModel,
    formatter,
    Sorter,
    Filter,
    FilterOperator,
    Spreadsheet,
    ObjectIdentifier,
    Text,
    ObjectStatus,
    ObjectNumber,
    ColumnListItem,
    ObjectListItem,
    ObjectAttribute,
    StandardListItem,
    Icon,
    exportLibrary,
    mobileLibrary
  ) {
    "use strict";

    var EdmType = exportLibrary.EdmType;

    return BaseController.extend("ui5.my.products.controller.Worklist", {
      formatter: formatter,

      /* =========================================================== */
      /* lifecycle methods                                           */
      /* =========================================================== */

      /**
       * Called when the worklist controller is instantiated.
       * @public
       */
      onInit: function () {
        var oViewModel;

        // keeps the search state
        this._aTableSearchState = [];

        // Model used to manipulate control states
        oViewModel = new JSONModel({
          worklistTableTitle:
            this.getResourceBundle().getText("worklistTableTitle"),
          shareSendEmailSubject: this.getResourceBundle().getText(
            "shareSendEmailWorklistSubject"
          ),
          shareSendEmailMessage: this.getResourceBundle().getText(
            "shareSendEmailWorklistMessage",
            [location.href]
          ),
          tableNoDataText: this.getResourceBundle().getText("tableNoDataText"),
        });
        this.setModel(oViewModel, "worklistView");

        // Set icon tab counts
        this._setIconFilterCounts();
      },

      /* =========================================================== */
      /* event handlers                                              */
      /* =========================================================== */

      /**
       * Triggered by the table's 'updateFinished' event: after new table
       * data is available, this handler method updates the table counter.
       * This should only happen if the update was successful, which is
       * why this handler is attached to 'updateFinished' and not to the
       * table's list binding's 'dataReceived' method.
       * @param {sap.ui.base.Event} oEvent the update finished event
       * @public
       */
      onUpdateFinished: function (oEvent) {
        // update the worklist's object counter after the table update
        var sTitle,
          oTable = oEvent.getSource(),
          iTotalItems = oEvent.getParameter("total");
        // only update the counter if the length is final and
        // the table is not empty
        if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
          sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [
            iTotalItems,
          ]);
        } else {
          sTitle = this.getResourceBundle().getText("worklistTableTitle");
        }
        this.getModel("worklistView").setProperty(
          "/worklistTableTitle",
          sTitle
        );
      },

      /**
       * Event handler when a table item gets pressed
       * @param {sap.ui.base.Event} oEvent the table selectionChange event
       * @public
       */
      onPress: function (oEvent) {
        // The source is the list item that got pressed
        this._showObject(oEvent.getSource());
      },

      /**
       * Event handler for navigating back.
       * Navigate back in the browser history
       * @public
       */
      onNavBack: function () {
        // eslint-disable-next-line sap-no-history-manipulation
        history.go(-1);
      },

      onSearch: function (oEvent) {
        if (oEvent.getParameters().refreshButtonPressed) {
          // Search field's 'refresh' button has been pressed.
          // This is visible if you select any main list item.
          // In this case no new search is triggered, we only
          // refresh the list binding.
          this.onRefresh();
        } else {
          var aTableSearchState = [];
          var sQuery = oEvent.getParameter("query");

          if (sQuery && sQuery.length > 0) {
            aTableSearchState = [
              new Filter("ProductName", FilterOperator.Contains, sQuery),
            ];
          }
          this._applySearch(aTableSearchState);
        }
      },

      /**
       * Event handler for refresh event. Keeps filter, sort
       * and group settings and refreshes the list binding.
       * @public
       */
      onRefresh: function () {
        var oTable = this.byId("table");
        oTable.getBinding("items").refresh();
      },

      /**
       * Filter the table items accordingly
       * @param {sap.ui.base.Event} oEvent Event object of the icon tab bar select
       * @public
       */
      onSelectFilter(oEvent) {
        var oBinding = this.getView().byId("table").getBinding("items");
        var sSelectedKey = oEvent.getParameter("key");
        var aFilter = [];

        // Create filters
        switch (sSelectedKey) {
          case "available":
            aFilter.push(new Filter("UnitsInStock", FilterOperator.GE, 20));
            break;
          case "lowOnStock":
            aFilter.push(new Filter("UnitsInStock", FilterOperator.BT, 1, 19));
            break;
          case "unavailable":
            aFilter.push(new Filter("UnitsInStock", FilterOperator.LT, 1));
            break;
          default:
            break;
        }

        oBinding.filter(aFilter);
      },

      /**
       * Exports products data to a spreadsheet
       * @public
       */
      onExport: function () {
        var oTable = this.getView().byId("table");
        var aColumns = this._getCoulumnConfig();
        var oSettings = {
          workbook: {
            columns: aColumns,
          },
          dataSource: oTable.getBinding("items"),
          fileName: "Products.xlsx",
        };

        var oSheet = new Spreadsheet(oSettings);

        oSheet.build().finally(function () {
          oSheet.destroy();
        });
      },

      /* =========================================================== */
      /* internal methods                                            */
      /* =========================================================== */

      /**
       * Convenience method to create export column config
       * @private
       */
      _getCoulumnConfig: function () {
        var aColumns = [];

        aColumns.push({
          label: this.getResourceBundle().getText("productId"),
          property: "ProductID",
          type: EdmType.Number,
        });

        aColumns.push({
          label: this.getResourceBundle().getText("tableNameColumnTitle"),
          property: "ProductName",
          type: EdmType.String,
        });

        aColumns.push({
          label: this.getResourceBundle().getText("category"),
          property: "Category/CategoryName",
          type: EdmType.String,
        });

        aColumns.push({
          label: this.getResourceBundle().getText("supplier"),
          property: "Supplier/CompanyName",
          type: EdmType.String,
        });

        aColumns.push({
          label: this.getResourceBundle().getText("status"),
          property: "Discontinued",
          type: EdmType.Boolean,
          trueValue: this.getResourceBundle().getText("discontinued"),
          falseValue: this.getResourceBundle().getText("inProduction"),
        });

        aColumns.push({
          label: this.getResourceBundle().getText("unitsInStock"),
          property: ["UnitsInStock", "QuantityPerUnit"],
          type: EdmType.String,
          template: "{0} - ({1})",
        });

        return aColumns;
      },

      /**
       * Shows the selected item on the object page
       * @param {sap.m.ObjectListItem} oItem selected Item
       * @private
       */
      _showObject: function (oItem) {
        this.getRouter().navTo("object", {
          objectId: oItem
            .getBindingContext()
            .getPath()
            .substring("/Products".length),
        });
      },

      /**
       * Internal helper method to apply both filter and search state together on the list binding
       * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
       * @private
       */
      _applySearch: function (aTableSearchState) {
        var oTable = this.byId("table"),
          oViewModel = this.getModel("worklistView");
        oTable.getBinding("items").filter(aTableSearchState, "Application");
        // changes the noDataText of the list in case there are no filter results
        if (aTableSearchState.length !== 0) {
          oViewModel.setProperty(
            "/tableNoDataText",
            this.getResourceBundle().getText("worklistNoDataWithSearchText")
          );
        }
      },

      /**
       * Sets filter tab numbers
       * @private
       */
      _setIconFilterCounts: function () {
        var oModel = this.getOwnerComponent().getModel();

        oModel.read("/Products/$count", {
          success: function (iCount) {
            this.getModel("worklistView").setProperty("/countAll", iCount);
          }.bind(this),
        });

        oModel.read("/Products/$count", {
          filters: [new Filter("UnitsInStock", FilterOperator.GE, 20)],
          success: function (iCount) {
            this.getModel("worklistView").setProperty(
              "/countAvailable",
              iCount
            );
          }.bind(this),
        });

        oModel.read("/Products/$count", {
          filters: [new Filter("UnitsInStock", FilterOperator.BT, 1, 19)],
          success: function (iCount) {
            this.getModel("worklistView").setProperty(
              "/countLowOnStock",
              iCount
            );
          }.bind(this),
        });

        oModel.read("/Products/$count", {
          filters: [new Filter("UnitsInStock", FilterOperator.LT, 1)],
          success: function (iCount) {
            this.getModel("worklistView").setProperty(
              "/countUnavailable",
              iCount
            );
          }.bind(this),
        });
      },

      _createListItem: function(sId, oContext) {
        const bDiscontinued = oContext.getProperty("Discontinued")

        if (bDiscontinued) {
          return new StandardListItem(sId, {
            icon: "sap-icon://alert",
            title: "{ProductName}",
            info: "This item is no longer available",
            infoState: "Warning"
          })
        } else {
          return new ObjectListItem(sId, {
            type: mobileLibrary.ListType.Navigation,
            press: this.onPress.bind(this),
            title: "{ProductName}",
            attributes: [
              new ObjectAttribute({
                title: "Category",
                text: "{Category/CategoryName}"
              })
            ],
            firstStatus: new ObjectStatus({
              text: "{= ${Discontinued} ? ${i18n>discontinued} : ${i18n>inProduction}}",
              state: "{= ${Discontinued} ? 'Error' : 'Success'}"
            }),
            number: "{UnitsInStock}",
            numberUnit: "In stock"
          })
        }
      }
    });
  }
);
