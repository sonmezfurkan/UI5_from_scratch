import JSONModel from "sap/ui/model/json/JSONModel"
import Device from "sap/ui/Device"

export default {
  /**
   * Provides runtime info for the device the UI5 app is running on as JSONModel
   */
  createDeviceModel(): JSONModel {
    const oModel = new JSONModel(Device)
    oModel.setDefaultBindingMode("OneWay")
    return oModel
  },

	async createCountryModel(): Promise<JSONModel> {
		const countries = await $.ajax({ url: "/countries/all?fields=cca2,name" });
		const oModel = new JSONModel(countries);
		oModel.setDefaultBindingMode("OneWay");
		return oModel;
	},
}
