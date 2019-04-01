import {
	GET_CURRENT_LIST,
	SET_CURRENT_LIST,
	GET_ADD_ITEM,
	GET_DELETE_ITEM,
	GET_EDIT_ITEM,
	SET_ERROR,
	SET_NOTIFICATION
} from "./mutation-types";
import { HTTP } from "./../plugins/axios.js";

const actions = {
	[GET_CURRENT_LIST]: async function({ commit }) {
		let response;
		try {
			response = await HTTP.get("toDoLists");
			commit(SET_CURRENT_LIST, response.data);
		} catch (err) {
			commit(SET_ERROR, err.message);
		}
		return response;
	},
	[GET_DELETE_ITEM]: async function({ commit }, id) {
		let response;
		try {
			response = await HTTP.delete(`toDoLists/${id}`);
		} catch (err) {
			commit(SET_ERROR, err.message);
		}
		return response;
	},
	[GET_ADD_ITEM]: async function({ commit }, data) {
		let response;
		try {
			response = await HTTP.post("toDoLists", data);
			commit(SET_NOTIFICATION, "Item successfully added to your list");
		} catch (err) {
			commit(SET_ERROR, err.message);
		}
		return response;
	},
	[GET_EDIT_ITEM]: async function({ commit }, item) {
		let response;
		try {
			response = await HTTP.patch(`toDoLists/${item.id}`, {
				title: item.title,
				state: item.state
			});
		} catch (err) {
			commit(SET_ERROR, err.message);
		}
		return response;
	}
};

export default actions;
