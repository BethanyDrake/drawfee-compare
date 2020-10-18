import { mount } from "@vue/test-utils";
import ResultsPage from "@/ResultsPage.vue";
import Vue from "vue";

describe("ResultPage", () => {
  it("displays whatever the resultsService gives it", async () => {
    const resultsService = {
      getResults: () => Promise.resolve([{ hi: "some results" }])
    };
    const page = mount(ResultsPage, {
      propsData: {
        injectedResultsService: resultsService
      }
    });
    await Vue.nextTick();
    expect(page.text()).toContain("some results");
  });
});
