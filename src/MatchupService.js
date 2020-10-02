// Register a new service

const images = [
  {
    id: "1a",
    videoTitle: "Artists Draw MORE Disney Characters As Dark Souls Bosses",
    videoUrl: "https://www.youtube.com/watch?v=qHNVzpIWDGw"
  },
  {
    id: "1b",
    videoTitle: "Artists Draw MORE Disney Characters As Dark Souls Bosses",
    videoUrl: "https://www.youtube.com/watch?v=qHNVzpIWDGw"
  },
  {
    id: "1c",
    videoTitle: "Artists Draw MORE Disney Characters As Dark Souls Bosses",
    videoUrl: "https://www.youtube.com/watch?v=qHNVzpIWDGw"
  }
];

const randomElement = array => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

class MatchupService {
  getMatchup = () => {
    return [randomElement(images), randomElement(images)];
  };
}

export default MatchupService;
