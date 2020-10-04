import { shallowMount } from "@vue/test-utils";
import ImageToBeCompared from "@/components/ImageToBeCompared.vue";

describe("imageToBeCompared", () => {
  const imageData = {
    id: "mockId1",
    videoTitle: "Some Title",
    videoUrl: "www.some-url.com?v=123"
  };
  it("displays an image", () => {
    const wrapper = shallowMount(ImageToBeCompared, {
      propsData: { imageData }
    });

    const image = wrapper.find("img");
    expect(image.html()).toContain("mockId1.png");
  });
  it("includes a link to the video", () => {
    const app = shallowMount(ImageToBeCompared, {
      propsData: { imageData }
    });

    const link = app.find("a");

    expect(link.text()).toContain("Some Title");

    expect(link.html()).toContain("www.some-url.com?v=123");
  });
});
