import { config } from "@vue/test-utils";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import Vuex from "vuex";
import ElementUI from "element-ui";
import Home from "@/views/Home";

config.stubs.transition = false;
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(ElementUI);

describe("Home.vue", () => {
	let actions;
	let store;
	beforeEach(() => {
		actions = {
			getCurrentList: jest.fn(),
			getAddItem: jest.fn()
		};

		store = new Vuex.Store({
			state: {
				currentList: []
			},
			actions
		});
	});

	it("should dispatch action when created", () => {
		shallowMount(Home, {
			localVue,
			store
		});
		expect(actions.getCurrentList).toHaveBeenCalled();
	});

	it("dispatches an action new item is created", () => {
		const wrapper = mount(Home, {
			store,
			localVue
		});
		const textInput = wrapper.find('input[type="text"]');
		textInput.setValue("test");
		wrapper.find(".el-button").trigger("click");
		expect(wrapper.vm.title).toBe("test");

		expect(actions.getAddItem).toHaveBeenCalled();
	});

	test("renders correctly", () => {
		const wrapper = mount(Home, {
			localVue,
			store
		});
		expect(wrapper.element).toMatchSnapshot();
	});
});
