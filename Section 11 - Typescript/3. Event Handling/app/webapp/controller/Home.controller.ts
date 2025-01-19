import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import Fragment from "sap/ui/core/Fragment";
import Filter from "sap/ui/model/Filter";
import Operator from "sap/ui/model/FilterOperator";
import { IconTabBar$SelectEvent } from "sap/m/IconTabBar";
import ListBinding from "sap/ui/model/ListBinding";
import { ListItemBase$PressEvent } from "sap/m/ListItemBase";
import { ListBase$DeleteEvent } from "sap/m/ListBase";
import Context from "sap/ui/model/odata/v4/Context";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
// import formatter from "../model/formatter"

export default class HomeController extends Controller {
  onSelectFilter(oEvent: IconTabBar$SelectEvent) {
    const sSelectedKey = oEvent.getParameter("key");
    const oTableBinding = this.getView()
      ?.byId("table")
      ?.getBinding("items") as ListBinding;

    switch (sSelectedKey) {
      case "all":
      default:
        oTableBinding?.filter([]);
        break;
      case "vip":
        oTableBinding.filter([
          new Filter({
            path: "trips",
            operator: Operator.Any,
            variable: "trip",
            condition: new Filter("trip/budget", Operator.GE, 2000),
          }),
        ]);
        break;
      case "regular":
        oTableBinding.filter([
          new Filter({
            path: "trips",
            operator: Operator.All,
            variable: "trip",
            condition: new Filter("trip/budget", Operator.LT, 2000),
          }),
        ]);
        break;
    }
  }

  onPress(oEvent: ListItemBase$PressEvent) {
    const oItem = oEvent.getSource();

    UIComponent.getRouterFor(this).navTo("details", {
      userID: oItem.getBindingContext()?.getProperty("ID"),
    });
  }

  onPressCreate() {
    UIComponent.getRouterFor(this).navTo("create");
  }

  onPressDelete(oEvent: ListBase$DeleteEvent) {
    const oItem = oEvent.getParameter("listItem");
    const oModel = this.getView()?.getModel() as ODataModel;

    (oItem?.getBindingContext() as Context).delete();

    oModel.submitBatch(oModel.getUpdateGroupId());
  }

  /* onPressShowMostExpensiveTrips() {
    if (!this._oDialog) {
      Fragment.load({
        id: this.getView().getId(),
        name: "odata.v4.demo.trippin.fragments.MostExpensiveTrips",
        controller: this
      }).then(oDialog => {
        this._oDialog = oDialog;
        this.getView().addDependent(oDialog);
        oDialog.open();
      })
    } else {
      this._oDialog.open();
    }
  }

    onPressCloseDialog() {
      this._oDialog.close();
    }

    onPressShowTrips() {
      this.getView().byId("idDialog").getObjectBinding().invoke();
    } */
}
