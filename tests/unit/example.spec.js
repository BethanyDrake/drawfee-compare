import { mount, shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import Vue from "vue";
describe("App", () => {
  const matchupService = {
    getMatchup: () => {
      return [{ id: "mockId1" }, { id: "mockId2" }];
    }
  };

  it("has two 'vote' buttons", () => {
    const app = mount(App, {
      propsData: {
        injectedMatchupService: matchupService
      }
    });
    const buttons = app.findAll("button");
    expect(buttons.length).toEqual(2);
  });
  describe("when I vote for an image", () => {
    it("casts a vote for that image", async () => {
      const voteService = {
        voteForImage: jest.fn()
      };

      const app = mount(App, {
        propsData: {
          injectedMatchupService: matchupService,
          voteService
        }
      });

      const buttons = app.findAll("button");
      buttons.at(0).trigger("click");
      await Vue.nextTick();

      expect(voteService.voteForImage).toBeCalledWith("mockId1", "mockId2");
    });

    it("casts a vote for the other image", async () => {
      const voteService = {
        voteForImage: jest.fn()
      };

      const app = mount(App, {
        propsData: {
          injectedMatchupService: matchupService,
          voteService
        }
      });

      const buttons = app.findAll("button");
      buttons.at(1).trigger("click");
      await Vue.nextTick();

      expect(voteService.voteForImage).toBeCalledWith("mockId2", "mockId1");
    });

    it("displays how many votes each image has", async () => {
      const voteService = {
        voteForImage: async () => {
          await Promise.resolve();
          return { mockId1: 3, mockId2: 5 };
        }
      };
      const app = mount(App, {
        propsData: {
          injectedMatchupService: matchupService,
          voteService
        }
      });

      const buttons = app.findAll("button");
      buttons.at(0).trigger("click");
      await Vue.nextTick();
      await Vue.nextTick();

      expect(app.text()).toContain("mockId1 has 3 votes");
      expect(app.text()).toContain("mockId2 has 5 votes");
    });

    it("displays the 'next' button", async () => {
      const voteService = {
        voteForImage: async () => {
          await Promise.resolve();
          return { mockId1: 3, mockId2: 5 };
        }
      };
      const app = mount(App, {
        propsData: {
          injectedMatchupService: matchupService,
          voteService
        }
      });
      expect(app.text()).not.toContain("Next");

      const buttons = app.findAll("button");
      buttons.at(0).trigger("click");

      await Vue.nextTick();
      await Vue.nextTick();
      expect(app.text()).toContain("Next");
    });
  });
  describe("when I vote for an image then click next", () => {
    let app;
    beforeEach(async () => {
      const voteService = {
        voteForImage: async () => {
          await Promise.resolve();
          return { mockId1: 3, mockId2: 5 };
        }
      };
      let matchupServiceCalls = 0;
      const matchupService = {
        getMatchup: () => {
          matchupServiceCalls++;
          return [{ id: matchupServiceCalls }, { id: matchupServiceCalls }];
        }
      };
      app = mount(App, {
        propsData: {
          injectedMatchupService: matchupService,
          voteService
        }
      });
      expect(app.text()).not.toContain("Next");

      const buttons = app.findAll("button");
      buttons.at(0).trigger("click");
      await Vue.nextTick();
      await Vue.nextTick();
    });

    it("displays a new set of images", async () => {
      expect(app.find("img").html()).toContain("1.png");
      app
        .findAll("button")
        .at(2)
        .trigger("click");
      await Vue.nextTick();
      expect(app.find("img").html()).toContain("2.png");
    });
    it("hides the next button again", async () => {
      expect(app.text()).toContain("Next");
      app
        .findAll("button")
        .at(2)
        .trigger("click");
      await Vue.nextTick();
      expect(app.text()).not.toContain("Next");
    });
    it("hides the results again", async () => {
      expect(app.text()).toContain("votes");
      app
        .findAll("button")
        .at(2)
        .trigger("click");
      await Vue.nextTick();
      expect(app.text()).not.toContain("votes");
    });
  });

  describe("while the vote is being processed", () => {
    let app;
    let finishVoting;
    const voteServiceResult = { mockId1: 3, mockId2: 5 };
    beforeEach(async () => {
      const voteService = {
        voteForImage: async () => {
          const promise = new Promise(resolve => {
            finishVoting = resolve;
          });
          return promise;
        }
      };
      let matchupServiceCalls = 0;
      const matchupService = {
        getMatchup: () => {
          matchupServiceCalls++;
          return [{ id: matchupServiceCalls }, { id: matchupServiceCalls }];
        }
      };
      app = mount(App, {
        propsData: {
          injectedMatchupService: matchupService,
          voteService
        }
      });
    });

    it("disables vote buttons, which don't enable until the next button is pressed", async () => {
      const buttons = app.findAll("button");
      expect(buttons.at(0).html()).not.toContain("disabled");
      expect(buttons.at(1).html()).not.toContain("disabled");
      buttons.at(0).trigger("click");
      await Vue.nextTick();
      expect(buttons.at(0).html()).toContain("disabled");
      expect(buttons.at(1).html()).toContain("disabled");
      finishVoting(voteServiceResult);
      await Vue.nextTick();
      await Vue.nextTick();
      expect(buttons.at(0).html()).toContain("disabled");
      expect(buttons.at(1).html()).toContain("disabled");
      app
        .findAll("button")
        .at(2)
        .trigger("click");
      await Vue.nextTick();
      expect(buttons.at(0).html()).not.toContain("disabled");
      expect(buttons.at(1).html()).not.toContain("disabled");
    });
    it("displays a loding spinner", async () => {
      expect(app.find(".loadingSpinner").exists()).toBeFalsy();
      app
        .findAll("button")
        .at(0)
        .trigger("click");
      await Vue.nextTick();
      expect(app.find(".loadingSpinner").exists()).toBeTruthy();
      finishVoting(voteServiceResult);
      await Vue.nextTick();
      await Vue.nextTick();
      expect(app.find(".loadingSpinner").exists()).toBeFalsy();
    });
  });

  describe("Image details", () => {
    const matchupService = {
      getMatchup: () => {
        return [
          { id: "mockId1", videoTitle: "Title 1", videoUrl: "link-1" },
          { id: "mockId2", videoTitle: "Title 2", videoUrl: "link-2" }
        ];
      }
    };

    let app;
    beforeEach(() => {
      app = mount(App, {
        propsData: {
          injectedMatchupService: matchupService
        }
      });
    });

    it("displays the images", () => {
      const images = app.findAll("img");
      expect(images.at(0).html()).toContain("mockId1.png");
      expect(images.at(1).html()).toContain("mockId2.png");
    });
    it("includes links to the videos", () => {
      const links = app.findAll("a");

      expect(links.at(0).text()).toContain("Title 1");
      expect(links.at(0).html()).toContain("link-1");

      expect(links.at(1).text()).toContain("Title 2");
      expect(links.at(1).html()).toContain("link-2");
    });
  });
});
