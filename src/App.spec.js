import { createLocalVue, mount, RouterLinkStub } from "@vue/test-utils";
import ElementUI from "element-ui";
import Vuex from "vuex";
import App from "@/App";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(ElementUI);
localVue.use(VueRouter);
const router = new VueRouter();

describe("App.vue", () => {
	let store;
	beforeEach(() => {
		store = new Vuex.Store({
			state: {
				route: {
					name: "home"
				}
			}
		});
	});

	it("Check header menu is link to about page", () => {
		const wrapper = mount(App, {
			localVue,
			router,
			store,
			stubs: {
				RouterLink: RouterLinkStub
			}
		});
		expect(wrapper.find(RouterLinkStub).props().to).toEqual({ name: "about" });
	});

	test("App.vue renders correctly", () => {
		const wrapper = mount(App, {
			localVue,
			store,
			router,
			stubs: {
				RouterLink: RouterLinkStub
			}
		});
		expect(wrapper.element).toMatchSnapshot();
	});
});
