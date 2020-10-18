import resultProcesser from "@/ResultProcesser.js";
import MatchupService from "./MatchupService.js";
class ResultsService {
  getResults = () => {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        try {
          const parsedResponse = JSON.parse(this.responseText);
          const top10 = resultProcesser.getTop(
            parsedResponse,
            10,
            new MatchupService()
          );
          resolve(top10);
        } catch {
          reject();
        }
      }
    });

    xhr.open(
      "GET",
      "https://mysterious-brushlands-23515.herokuapp.com/results"
    );
    xhr.setRequestHeader("content-type", "application/json");

    if (
      window.location.origin === "http://localhost:8081" ||
      window.location.origin === "https://drawfee-compare.vercel.app"
    );
    xhr.setRequestHeader("access-control-allow-origin", window.location.origin);
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send();
    return promise;
  };
}
export default ResultsService;
