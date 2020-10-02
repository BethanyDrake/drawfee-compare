import { mount, shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import ImageToBeCompared from "@/components/ImageToBeCompared.vue";
describe("App", () => {
  const matchupService = {
    getMatchup: () => {
      return [{ id: "mockId1" }, { id: "mockId2" }];
    }
  };
  it("displays both images provided by the matchup service", () => {
    const image1 = { id: "1" };
    const image2 = { id: "2" };

    const matchupService = {
      getMatchup: () => {
        return [image1, image2];
      }
    };

    const app = shallowMount(App, {
      propsData: {
        matchupService
      }
    });
    const images = app.findAllComponents(ImageToBeCompared);

    expect(images.length).toEqual(2);
    expect(images.at(0).props("imageData")).toEqual(image1);
    expect(images.at(1).props("imageData")).toEqual(image2);
  });
  it("displays an image", () => {
    const app = mount(App, {
      propsData: { matchupService }
    });

    const image = app.find("img");
    expect(image.html()).toContain("mockId1.png");
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
