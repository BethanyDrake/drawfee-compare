import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import ImageToBeCompared from "@/components/ImageToBeCompared.vue";
describe("App", () => {
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
});
