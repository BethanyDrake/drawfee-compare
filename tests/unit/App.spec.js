import { mount } from "@vue/test-utils";
import Vue from "vue";
import App from "@/App.vue";
import VotingPage from "@/VotingPage.vue";
import ResultsPage from "@/ResultsPage.vue";

describe("App", () => {
  describe("initial state", () => {
    it("shows the voting page", () => {
      const app = mount(App);
      expect(app.findComponent(VotingPage).exists()).toBeTruthy();
    });
  });
  describe("When I click view results", () => {
    it("shows the results page", async () => {
      const app = mount(App);
      app.find("#viewResultsButton").trigger("click");
      await Vue.nextTick();
      expect(app.findComponent(ResultsPage).exists()).toBeTruthy();
      expect(app.findComponent(VotingPage).exists()).toBeFalsy();
    });
    describe("When I click back to voting", () => {
      it("shows the voting page again", async () => {
        const app = mount(App);
        app.find("#viewResultsButton").trigger("click");
        await Vue.nextTick();
        expect(app.findComponent(ResultsPage).exists()).toBeTruthy();
        app.find("#backToVotingButton").trigger("click");
        Vue.nextTick();
        expect(app.findComponent(ResultsPage).exists()).toBeFalsy();
        expect(app.findComponent(ResultsPage).exists()).toBeTruthy();
      });
    });
  });
});
