import { mount, shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import Vue from "vue";
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

  it("has two 'vote' buttons", () => {
    const app = mount(App, {
      propsData: {
        matchupService
      }
    });
    const buttons = app.findAll("button");
    expect(buttons.length).toEqual(2);
  });
  describe("when I vote for an image", () => {
    it("displays how many votes that image has", async () => {
      const app = mount(App, {
        propsData: {
          matchupService
        }
      });
      const buttons = app.findAll("button");

      buttons.at(0).trigger("click");
      await Vue.nextTick();
      expect(app.text()).toContain("mockId1 has 1 votes");

      buttons.at(1).trigger("click");
      await Vue.nextTick();
      expect(app.text()).toContain("mockId2 has 1 votes");
    });
  });
});
