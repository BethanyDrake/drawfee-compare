import { mount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App", () => {
  it("displays an image", () => {
    const msg = "new message";
    const app = mount(App, {
      propsData: { msg }
    });

    const image = app.find("img");
    expect(image.html()).toContain("1a.png");
  });
  it("includes a link to the video", () => {
    const msg = "new message";
    const app = mount(App, {
      propsData: { msg }
    });

    const link = app.find("a");

    expect(link.text()).toContain(
      "Artists Draw MORE Disney Characters As Dark Souls Bosses"
    );

    expect(link.html()).toContain(
      "https://www.youtube.com/watch?v=qHNVzpIWDGw"
    );
  });
});
