import { mount } from "@vue/test-utils";
import ResultsPage from "@/ResultsPage.vue";
import Vue from "vue";

describe("ResultPage", () => {
  it("displays whatever the resultsService gives it", async () => {
    const results = [
      {
        id: "a1",
        videoTitle: "Title A",
        videoUrl: "www.a.com",
        winRate: 0.6153846153846154
      },
      {
        id: "b2",
        videoTitle: "Title B",
        videoUrl: "www.b.com",
        winRate: 0.46153846153846156
      },
      {
        id: "c3",
        videoTitle: "Title C",
        videoUrl: "www.c.com",
        winRate: 0.3
      }
    ];
    const resultsService = {
      getResults: () => Promise.resolve(results)
    };
    const page = mount(ResultsPage, {
      propsData: {
        injectedResultsService: resultsService
      }
    });
    await Vue.nextTick();
    const images = page.findAll("img");
    expect(images.at(0).html()).toContain("a1.png");
    expect(images.at(1).html()).toContain("b2.png");
    expect(images.at(2).html()).toContain("c3.png");

    const links = page.findAll("a");
    expect(links.at(0).html()).toContain("www.a.com");
    expect(links.at(1).html()).toContain("www.b.com");
    expect(links.at(2).html()).toContain("www.c.com");

    expect(links.at(0).text()).toContain("Title A");
    expect(links.at(1).text()).toContain("Title B");
    expect(links.at(2).text()).toContain("Title C");
  });
});
