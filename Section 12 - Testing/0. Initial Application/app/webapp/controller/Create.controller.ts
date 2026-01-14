import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import MessageToast from "sap/m/MessageToast";
import type ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import type { ListBase$DeleteEvent } from "sap/m/ListBase";
import type Context from "sap/ui/model/odata/v4/Context";
import type ODataModel from "sap/ui/model/odata/v4/ODataModel";
import type Component from "ui5/trippin/Component";
import type ResourceModel from "sap/ui/model/resource/ResourceModel";
import type ResourceBundle from "sap/base/i18n/ResourceBundle";

export default class CreateController extends Controller {
	onInit(): void {
		UIComponent.getRouterFor(this)
			?.getRoute("create")
			?.attachPatternMatched(this._onCreateMatched, this);
	}

	onPressAddTrip() {
		const binding = this.getView()
			?.byId("idTripsTable")
			?.getBinding("items") as ODataListBinding;

		binding.create({}, false, true, false);
	}

	onRemoveTrip(oEvent: ListBase$DeleteEvent) {
		const oItem = oEvent.getParameter("listItem");

		(oItem?.getBindingContext() as Context).delete();
	}

	async onPressSave() {
		const oModel = this.getView()?.getModel() as ODataModel;

		await oModel.submitBatch(oModel.getUpdateGroupId());

		if (!(this?.getOwnerComponent() as Component).bError) {
			const oBundle = (
				this.getView()?.getModel("i18n") as ResourceModel
			).getResourceBundle() as ResourceBundle;

			MessageToast.show(oBundle?.getText("userCreated") as string, {
				closeOnBrowserNavigation: false,
			});

			UIComponent.getRouterFor(this).navTo(
				"details",
				{
					userID: this.getView()?.getBindingContext()?.getProperty("ID"),
				},
				true,
			);
		}
	}

	onPressCancel() {
		const oModel = this.getView()?.getModel() as ODataModel;

		oModel.resetChanges(oModel.getUpdateGroupId());

		UIComponent.getRouterFor(this).navTo("home", {}, true);
	}

	private _onCreateMatched() {
		const oListBinding = this.getView()
			?.getModel()
			?.bindList("/People") as ODataListBinding;

		const oContext = oListBinding.create({}, false, false, true);

		this.getView()?.setBindingContext(oContext);
	}
}
