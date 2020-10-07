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

    xhr.open("POST", "http://localhost:8082/vote");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader(
      "access-control-allow-origin",
      "http://localhost:8081"
    );
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(body);
    return promise;
  };
}
export default VoteService;
