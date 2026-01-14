import { ValueState } from "sap/ui/core/library"

export default {
  formatDate(sDate: string) {
    if (!sDate) {
      return "";
    }

    const oDate = new Date(sDate);
    return oDate.toDateString();
  },

  formatUserStatusState(sValue: string): ValueState {
    switch (sValue) {
      case "A":
        return ValueState.Success;
      case "S":
        return ValueState.Warning;
      case "D":
        return ValueState.Error;
      default:
        return ValueState.None;
    }
  }
}
