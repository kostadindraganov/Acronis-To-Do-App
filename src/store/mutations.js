import {
	SET_CURRENT_LIST,
	SET_ERROR,
	SET_NOTIFICATION,
	SET_WARNING
} from "./mutation-types";
import { Notification } from "element-ui";

const mutations = {
	[SET_CURRENT_LIST](state, payload) {
		state.currentList = payload;
	},
	[SET_ERROR](state, payload) {
		Notification.error({
			title: "Error",
			message: payload,
			duration: 2000,
			position: "bottom-right"
		});
	},
	[SET_NOTIFICATION](state, payload) {
		Notification.success({
			title: "Success",
			message: payload,
			duration: 3000,
			position: "bottom-right"
		});
	},
	[SET_WARNING](state, payload) {
		Notification.warning({
			title: "Warning",
			message: payload,
			duration: 3000,
			position: "bottom-right"
		});
	}
};

export default mutations;
