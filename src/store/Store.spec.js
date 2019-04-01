import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import store from "./index";
import {
	GET_CURRENT_LIST,
	GET_ADD_ITEM,
	GET_DELETE_ITEM,
	GET_EDIT_ITEM
} from "./mutation-types";

describe("actions", () => {
	let setDataMock;
	let id;

	it("GET_ADD_ITEM", () => {
		return store.dispatch(GET_ADD_ITEM, { title: "test" }).then(res => {
			id = res.data.id;
			expect(res.data).toHaveProperty("title", "test");
		});
	});
	it("GET_EDIT_ITEM", () => {
		const newItem = { id: id, title: "test", state: true };
		return store.dispatch(GET_EDIT_ITEM, newItem).then(res => {
			id = res.data.id;
			expect(res.data).toHaveProperty("title", "test");
		});
	});

	it("GET_CURRENT_LIST ", () => {
		return store
			.dispatch(GET_CURRENT_LIST)
			.then(() =>
				expect(store.state.currentList[id - 1]).toHaveProperty("state", true)
			);
	});

	it("GET_DELETE_ITEM", () => {
		return store.dispatch(GET_DELETE_ITEM, id).then(res => {
			let hasItem = store.state.currentList.indexOf(
				store.state.currentList[id]
			);
			expect(hasItem).toBe(-1);
		});
	});
});
