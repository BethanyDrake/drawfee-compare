class VoteService {
  voteForImage = (winner, loser) => {
    let resolve;
    const promise = new Promise(res => {
      resolve = res;
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
        console.log("response!");
        console.log(this.responseText);
        resolve(JSON.parse(this.responseText));
      }
    });

    xhr.open("POST", "http://54.206.79.197:8082/vote");
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
