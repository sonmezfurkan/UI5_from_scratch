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
import Dialog from "sap/m/Dialog";
import XMLView from "sap/ui/core/mvc/XMLView";
import ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";

export default class HomeController extends Controller {
  private _oDialog: Dialog
  private _oView: XMLView

  onInit() {
    this._oView = this.getView() as XMLView
  }

  onSelectFilter(oEvent: IconTabBar$SelectEvent) {
    const sSelectedKey = oEvent.getParameter("key");
    const oTableBinding = this._oView
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
    const oModel = this._oView?.getModel() as ODataModel;

    (oItem?.getBindingContext() as Context).delete();

    oModel.submitBatch(oModel.getUpdateGroupId());
  }

  async onPressShowMostExpensiveTrips() {
    this._oDialog ??= await Fragment.load({
      id: this._oView.getId(),
      name: "odata.v4.demo.trippin.fragments.MostExpensiveTrips",
      controller: this,
    }) as Dialog

    if (this._oView.indexOfDependent(this._oDialog) < 0)
      this._oView.addDependent(this._oDialog);

    this._oDialog.open();
  }

  onPressCloseDialog() {
    this._oDialog.close();
  }

  onPressShowTrips() {
    const oAction = this._oDialog.getObjectBinding() as ODataContextBinding

    oAction.invoke();
  }
}
