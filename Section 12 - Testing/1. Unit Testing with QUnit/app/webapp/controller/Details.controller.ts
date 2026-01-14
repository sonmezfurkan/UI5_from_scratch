import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import MessageToast from "sap/m/MessageToast";
import type { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import type Context from "sap/ui/model/odata/v4/Context";
import type ODataModel from "sap/ui/model/odata/v4/ODataModel";

type PatternMatchedEventParameters = {
	userID: string;
};

export default class DetailsController extends Controller {
	onInit(): void {
		UIComponent.getRouterFor(this)
			?.getRoute("details")
			?.attachPatternMatched(this._onObjectMatched, this);
	}

	private _onObjectMatched(oEvent: Route$PatternMatchedEvent): void {
		const sUserID = (
			oEvent.getParameter("arguments") as PatternMatchedEventParameters
		).userID;

		this.getView()?.bindElement({
			path: `/People(${sUserID})`,
		});
	}

	onPressEdit() {
		const sUserId = this.getView()?.getBindingContext()?.getProperty("ID");

		UIComponent.getRouterFor(this).navTo("edit", { userID: sUserId }, true);
	}

	async onPressSuspend() {
		const oModel = this.getView()?.getModel() as ODataModel;
		const oContext = this.getView()?.getBindingContext() as Context;

		const oAction = oModel?.bindContext(
			"TrippinService.suspendPerson(...)",
			oContext,
		);

		await oAction.invoke();

		MessageToast.show(oAction.getBoundContext().getProperty("value"));

		oContext.refresh();
	}
}
