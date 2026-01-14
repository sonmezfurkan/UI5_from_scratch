import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import Fragment from "sap/ui/core/Fragment";
import Filter from "sap/ui/model/Filter";
import Operator from "sap/ui/model/FilterOperator";
import type { IconTabBar$SelectEvent } from "sap/m/IconTabBar";
import type ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import type { ListItemBase$PressEvent } from "sap/m/ListItemBase";
import type { ListBase$DeleteEvent } from "sap/m/ListBase";
import type ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";
import type Context from "sap/ui/model/odata/v4/Context";
import type ODataModel from "sap/ui/model/odata/v4/ODataModel";
import type Dialog from "sap/m/Dialog";
import type XMLView from "sap/ui/core/mvc/XMLView";

export default class HomeController extends Controller {
	private _oView: XMLView;
	private _oDialog: Dialog;

	onInit() {
		this._oView = this.getView() as XMLView;

		UIComponent.getRouterFor(this)
			?.getRoute("home")
			?.attachPatternMatched(this._onObjectMatched, this);
	}

	onSelectFilter(oEvent: IconTabBar$SelectEvent) {
		const sSelectedKey = oEvent.getParameter("key");
		const oTableBinding = this._oView
			.byId("table")
			?.getBinding("items") as ODataListBinding;

		switch (sSelectedKey) {
			case "vip":
				oTableBinding?.filter([
					new Filter({
						path: "trips",
						operator: Operator.Any,
						variable: "trip",
						condition: new Filter("trip/budget", Operator.GE, 2000),
					}),
				]);
				break;
			case "regular":
				oTableBinding?.filter([
					new Filter({
						path: "trips",
						operator: Operator.All,
						variable: "trip",
						condition: new Filter("trip/budget", Operator.LT, 2000),
					}),
				]);
				break;
			default:
				oTableBinding?.filter([]);
				break;
		}
	}

	onPress(oEvent: ListItemBase$PressEvent) {
		const oItem = oEvent.getSource();

		UIComponent.getRouterFor(this).navTo("details", {
			userID: oItem?.getBindingContext()?.getProperty("ID"),
		});
	}

	onPressCreate() {
		UIComponent.getRouterFor(this).navTo("create");
	}

	onPressDelete(oEvent: ListBase$DeleteEvent) {
		const oItem = oEvent.getParameter("listItem");
		const oModel = this._oView.getModel() as ODataModel;

		(oItem?.getBindingContext() as Context).delete();

		oModel?.submitBatch(oModel.getUpdateGroupId());
	}

	async onPressShowMostExpensiveTrips(): Promise<void> {
		this._oDialog ??= (await Fragment.load({
			id: this._oView.getId(),
			name: "ui5.trippin.fragments.MostExpensiveTrips",
			controller: this,
		})) as Dialog;

		if (this._oView.indexOfDependent(this?._oDialog) < 0)
			this._oView.addDependent(this._oDialog);

		this._oDialog.open();
	}

	onPressCloseDialog() {
		this._oDialog.close();
	}

	onPressShowTrips() {
		const oAction = this._oView
			.byId("idDialog")
			?.getObjectBinding() as ODataContextBinding;

		oAction.invoke();
	}

	private _onObjectMatched(): void {
		const oTableBinding = this._oView
			.byId("table")
			?.getBinding("items") as ODataListBinding;

		if (oTableBinding) oTableBinding.refresh();
	}
}
