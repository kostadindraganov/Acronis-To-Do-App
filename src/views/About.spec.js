import { createLocalVue, mount } from "@vue/test-utils";
import ElementUI from "element-ui";
import About from "@/views/About";

const localVue = createLocalVue();
localVue.use(ElementUI);

describe("About.vue", () => {
	test("renders correctly", () => {
		const wrapper = mount(About, {
			localVue
		});
		expect(wrapper.element).toMatchSnapshot();
	});
});
