import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App", () => {
  it("displays an image", () => {
    const msg = "new message";
    const app = shallowMount(App, {
      propsData: { msg }
    });

    const image = app.find("img");
    expect(image.html()).toContain("1a.png");
  });
});
