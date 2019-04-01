import { config } from "@vue/test-utils";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import Vuex from "vuex";
import ElementUI from "element-ui";
import ListItem from "@/components/ListItem";

config.stubs.transition = false;
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(ElementUI);

describe("ListItem.vue", () => {
	let actions;
	let store;
	let wrapper;
	beforeEach(() => {
		actions = {
			getCurrentList: jest.fn(),
			getAddItem: jest.fn(),
			getEditItem: jest.fn(),
			getDeleteItem: jest.fn()
		};

		store = new Vuex.Store({
			state: {
				currentList: []
			},
			actions
		});

		wrapper = mount(ListItem, {
			localVue,
			store,
			propsData: {
				itemId: 1,
				itemTitle: "test",
				isDone: false
			}
		});
	});

	it("check props", () => {
		expect(wrapper.vm.itemId).toBe(1);
		expect(wrapper.vm.itemTitle).toBe("test");
		expect(wrapper.vm.isDone).toBe(false);
		wrapper.setProps({ itemId: "1" });
		wrapper.setProps({ itemTitle: 1 });
		wrapper.setProps({ isDone: "" });
		expect(Object.is(wrapper.vm.itemId, 1)).toBe(false);
		expect(Object.is(wrapper.vm.itemTitle, "1")).toBe(false);
		expect(Object.is(wrapper.vm.isDone, false)).toBe(false);
	});

	it("if checkbox dispatch an action", () => {
		wrapper.find(".el-checkbox").trigger("click");
		expect(actions.getEditItem).toHaveBeenCalled();
	});

	it("if delete item dispatch an action", () => {
		wrapper.find(".el-icon-close").trigger("click");
		expect(actions.getDeleteItem).toHaveBeenCalled();
	});

	test("renders correctly", () => {
		expect(wrapper.element).toMatchSnapshot();
	});
});
