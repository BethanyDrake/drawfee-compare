class VoteService {
  voteForImage = (winner, loser) => {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    console.log("voting for image: " + winner);
    var body = JSON.stringify({
      winner,
      loser
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        try {
          const parsedResponse = JSON.parse(this.responseText);
          resolve(parsedResponse);
        } catch {
          reject();
        }
      }
    });

    xhr.open("POST", "https://mysterious-brushlands-23515.herokuapp.com/vote");
    xhr.setRequestHeader("content-type", "application/json");

    if (
      window.location.origin === "http://localhost:8081" ||
      window.location.origin === "https://drawfee-compare.vercel.app"
    );
    xhr.setRequestHeader("access-control-allow-origin", window.location.origin);
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(body);
    return promise;
  };
}
export default VoteService;
