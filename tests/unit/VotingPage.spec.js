import { mount } from "@vue/test-utils";
import VotingPage from "@/VotingPage.vue";
import Vue from "vue";
const waitForElement = async findFunction => {
  let result = findFunction();
  const maxTries = 10;
  let tries = 0;
  while (!result.exists() && tries < maxTries) {
    await Vue.nextTick();
    result = findFunction();
    tries++;
  }
  return result;
};

describe("VotingPage", () => {
  const matchupService = {
    getMatchup: () => {
      return [{ id: "mockId1" }, { id: "mockId2" }];
    }
  };

  it("has two 'vote' buttons", () => {
    const page = mount(VotingPage, {
      propsData: {
        injectedMatchupService: matchupService
      }
    });
    const buttons = page.findAll(".voteButton");
    expect(buttons.length).toEqual(2);
  });
  describe("when I vote for an image", () => {
    it("casts a vote for that image", async () => {
      const voteService = {
        voteForImage: jest.fn()
      };

      const page = mount(VotingPage, {
        propsData: {
          injectedMatchupService: matchupService,
          voteService
        }
      });

      const buttons = page.findAll(".voteButton");
      buttons.at(0).trigger("click");
      await Vue.nextTick();

      expect(voteService.voteForImage).toBeCalledWith("mockId1", "mockId2");
    });

    it("casts a vote for the other image", async () => {
      const voteService = {
        voteForImage: jest.fn()
      };

      const page = mount(VotingPage, {
        propsData: {
          injectedMatchupService: matchupService,
          voteService
        }
      });

      const buttons = page.findAll(".voteButton");
      buttons.at(1).trigger("click");
      await Vue.nextTick();

      expect(voteService.voteForImage).toBeCalledWith("mockId2", "mockId1");
    });

    it("enables the 'next' button", async () => {
      const voteService = {
        voteForImage: async () => {
          await Promise.resolve();
          return { mockId1: 3, mockId2: 5 };
        }
      };
      const page = mount(VotingPage, {
        propsData: {
          injectedMatchupService: matchupService,
          voteService
        }
      });
      expect(page.find("#nextButton").html()).toContain("disabled");

      const buttons = page.findAll(".voteButton");
      buttons.at(0).trigger("click");

      await Vue.nextTick();
      await Vue.nextTick();
      expect(page.find("#nextButton").html()).not.toContain("disabled");
    });
  });
  describe("when I vote for an image then click next", () => {
    let page;
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
      page = mount(VotingPage, {
        propsData: {
          injectedMatchupService: matchupService,
          voteService
        }
      });

      const buttons = page.findAll(".voteButton");
      buttons.at(0).trigger("click");
      await Vue.nextTick();
      await Vue.nextTick();
    });

    it("displays a new set of images", async () => {
      expect(page.find("img").html()).toContain("1.png");
      const nextButton = await waitForElement(() => page.find("#nextButton"));
      nextButton.trigger("click");
      await Vue.nextTick();
      expect(page.find("img").html()).toContain("2.png");
    });
    it("disables the next button again", async () => {
      expect(page.find("#nextButton").html()).not.toContain("disabled");
      page.find("#nextButton").trigger("click");
      await Vue.nextTick();
      expect(page.find("#nextButton").html()).toContain("disabled");
    });
  });

  describe("when voting fails", () => {
    let page;
    beforeEach(async () => {
      const voteService = {
        voteForImage: () => {
          return Promise.reject();
        }
      };
      let matchupServiceCalls = 0;
      const matchupService = {
        getMatchup: () => {
          matchupServiceCalls++;
          return [{ id: matchupServiceCalls }, { id: matchupServiceCalls }];
        }
      };
      page = mount(VotingPage, {
        propsData: {
          injectedMatchupService: matchupService,
          voteService
        }
      });
    });
    it("enables the vote buttons and hides the success spinner", async () => {
      const buttons = page.findAll(".voteButton");
      buttons.at(0).trigger("click");
      await Vue.nextTick();
      expect(buttons.at(0).html()).not.toContain("disabled");
      expect(buttons.at(1).html()).not.toContain("disabled");
      expect(page.find(".loadingSpinner").exists()).toBeFalsy();
    });
  });

  describe("while the vote is being processed", () => {
    let page;
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
      page = mount(VotingPage, {
        propsData: {
          injectedMatchupService: matchupService,
          voteService
        }
      });
    });

    it("disables vote buttons, which don't enable until the next button is pressed", async () => {
      const buttons = page.findAll(".voteButton");
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
      page.find("#nextButton").trigger("click");
      await Vue.nextTick();
      expect(buttons.at(0).html()).not.toContain("disabled");
      expect(buttons.at(1).html()).not.toContain("disabled");
    });
    it("displays a loding spinner", async () => {
      expect(page.find(".loadingSpinner").exists()).toBeFalsy();
      page
        .findAll(".voteButton")
        .at(0)
        .trigger("click");
      await Vue.nextTick();
      expect(page.find(".loadingSpinner").exists()).toBeTruthy();
      finishVoting(voteServiceResult);
      await Vue.nextTick();
      await Vue.nextTick();
      expect(page.find(".loadingSpinner").exists()).toBeFalsy();
    });
  });

  describe("when voting is successful", () => {
    let page;
    beforeEach(async () => {
      const voteService = {
        voteForImage: () => {
          return Promise.resolve({ mockId1: 3, mockId2: 7 });
        }
      };
      page = mount(VotingPage, {
        propsData: {
          injectedMatchupService: matchupService,
          voteService
        }
      });

      const buttons = page.findAll(".voteButton");
      buttons.at(0).trigger("click");
      await Vue.nextTick();
      await Vue.nextTick();
    });

    it("displays the next button", () => {
      expect(page.text()).toContain("Next");
    });
    it("displays the percentage of people that voted for each image", async () => {
      const voteButtons = page.findAll(".voteButton");
      expect(voteButtons.at(0).text()).toContain("30%");
      expect(voteButtons.at(1).text()).toContain("70%");
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

    let page;
    beforeEach(() => {
      page = mount(VotingPage, {
        propsData: {
          injectedMatchupService: matchupService
        }
      });
    });

    it("displays the images", () => {
      const images = page.findAll("img");
      expect(images.at(0).html()).toContain("mockId1.png");
      expect(images.at(1).html()).toContain("mockId2.png");
    });
    it("includes links to the videos", () => {
      const links = page.findAll("a");

      expect(links.at(0).text()).toContain("Title 1");
      expect(links.at(0).html()).toContain("link-1");

      expect(links.at(1).text()).toContain("Title 2");
      expect(links.at(1).html()).toContain("link-2");
    });
  });
});
