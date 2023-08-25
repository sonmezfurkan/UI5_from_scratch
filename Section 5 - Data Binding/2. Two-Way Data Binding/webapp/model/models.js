sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/BindingMode"
], function(JSONModel, BindingMode) {
  return {
    createInputModel() {
      return new JSONModel({
        Name: "",
        Category: "",
        Price: "",
        ReleaseDate: null,
        DiscontinuedDate: null,
      }).setDefaultBindingMode(BindingMode.TwoWay)
    }
  }
})