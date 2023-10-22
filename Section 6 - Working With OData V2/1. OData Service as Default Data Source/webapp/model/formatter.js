sap.ui.define(["sap/ui/core/ValueState", "sap/m/GroupHeaderListItem"], function(ValueState, GroupHeaderListItem) {
  'use strict'

  return {
    formatAvailabilityText(sValue) {
      const oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle()

      return sValue && new Date(sValue) <= new Date() ? oBundle.getText("unavailable") : oBundle.getText("available")
    },

    formatAvailabilityState(sValue) {
      return sValue && new Date(sValue) <= new Date() ? ValueState.Error : ValueState.Success
    },

    formatCategory(sValue) {
     switch (sValue) {
      case "0":
        return "Food"
      case "1":
        return "Beverages"
      case "2":
        return "Electronics"
      default:
        return "Unknown"
     }
    },

    formatGroupHeader(oGroup) {
     switch (oGroup.key) {
      case "0":
        return new GroupHeaderListItem({ title: "Food" })
      case "1":
        return new GroupHeaderListItem({ title: "Beverages" })
      case "2":
        return new GroupHeaderListItem({ title: "Electronics" })
      default:
        return new GroupHeaderListItem({ title: "Unknown" })
     }
    }
  }
})