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
  },
  {
    id: "2a",
    videoTitle: "We Redraw Our First Drawfee Drawings",
    videoUrl: "https://www.youtube.com/watch?v=7UhpVwvBUL"
  },
  {
    id: "2b",
    videoTitle: "We Redraw Our First Drawfee Drawings",
    videoUrl: "https://www.youtube.com/watch?v=7UhpVwvBUL"
  },
  {
    id: "2c",
    videoTitle: "We Redraw Our First Drawfee Drawings",
    videoUrl: "https://www.youtube.com/watch?v=7UhpVwvBUL"
  },
  {
    id: "2d",
    videoTitle: "We Redraw Our First Drawfee Drawings",
    videoUrl: "https://www.youtube.com/watch?v=7UhpVwvBUL"
  },
  {
    id: "3a",
    videoTitle: "Professional Artists Redraw Their Childhood Art",
    videoUrl: "https://www.youtube.com/watch?v=dWJjFysLSE8&list"
  },
  {
    id: "3b",
    videoTitle: "Professional Artists Redraw Their Childhood Art",
    videoUrl: "https://www.youtube.com/watch?v=dWJjFysLSE8&list"
  },
  {
    id: "3c",
    videoTitle: "Professional Artists Redraw Their Childhood Art",
    videoUrl: "https://www.youtube.com/watch?v=dWJjFysLSE8&list"
  },
  {
    id: "4a",
    videoTitle: "Artists Draw Gigantamax Pokémon From Memory",
    videoUrl: "https://www.youtube.com/watch?v=5CIeVKO2lCk"
  },
  {
    id: "4b",
    videoTitle: "Artists Draw Gigantamax Pokémon From Memory",
    videoUrl: "https://www.youtube.com/watch?v=5CIeVKO2lCk"
  },
  {
    id: "4c",
    videoTitle: "Artists Draw Gigantamax Pokémon From Memory",
    videoUrl: "https://www.youtube.com/watch?v=5CIeVKO2lCk"
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
