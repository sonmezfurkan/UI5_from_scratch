import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import MessageToast from "sap/m/MessageToast";
// import formatter from "../model/formatter"
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import Context from "sap/ui/model/odata/v4/Context";
import ODataV4Model from "sap/ui/model/odata/v4/ODataModel";

export default class DetailsContoller extends Controller {
  onInit() {
    UIComponent?.getRouterFor(this)
      ?.getRoute("details")
      ?.attachPatternMatched(this._onObjectMatched, this);
  }

  private _onObjectMatched(oEvent: Route$PatternMatchedEvent) {
    const sUserID = (oEvent.getParameter("arguments") as any).userID;

    this.getView()?.bindElement({
      path: "/People(" + sUserID + ")",
    });
  }

  onPressEdit() {
    const sUserId = (this.getView()?.getBindingContext() as any).getProperty(
      "ID"
    );

    UIComponent.getRouterFor(this).navTo("edit", { userID: sUserId }, true);
  }

  onPressSuspend() {
    const oModel = this.getView()?.getModel() as ODataV4Model;
    const oContext = this.getView()?.getBindingContext() as Context;

    const oAction = oModel?.bindContext(
      "TrippinService.suspendPerson(...)",
      oContext
    );

    oAction?.invoke().then(() => {
      MessageToast.show(oAction.getBoundContext().getProperty("value"));

      oContext.refresh();
    });
  }
}
