import { ValueState } from "sap/ui/core/library";

export default {
	formatDate(sDate: string): string {
		// Return empty string for empty date
		if (!sDate) {
			return "";
		}

		// Catch invalid dates
		if (Number.isNaN(Date.parse(sDate))) throw new Error(`Invalid date ${sDate}!`);

		// Create new Date object
		const oDate = new Date(sDate);

		// Return formatted date string
		return oDate.toDateString();
	},

	formatUserStatusState(sValue: string): ValueState {
		switch (sValue) {
			case "A": // Active
				return ValueState.Success;
			case "S": // Suspended
				return ValueState.Warning;
			case "D": // Deleted
				return ValueState.Error;
			default:
				return ValueState.None;
		}
	},
};
