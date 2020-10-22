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
  },
  {
    id: "5a",
    videoTitle: "Artists Play Celebrity Pictionary",
    videoUrl: "https://www.youtube.com/watch?v=qOJXy45REks"
  },
  {
    id: "5b",
    videoTitle: "Artists Play Celebrity Pictionary",
    videoUrl: "https://www.youtube.com/watch?v=qOJXy45REks"
  },
  {
    id: "5c",
    videoTitle: "Artists Play Celebrity Pictionary",
    videoUrl: "https://www.youtube.com/watch?v=qOJXy45REks"
  },
  {
    id: "5d",
    videoTitle: "Artists Play Celebrity Pictionary",
    videoUrl: "https://www.youtube.com/watch?v=qOJXy45REks"
  },
  {
    id: "6a",
    videoTitle: "Artists Draw Personalized Tarot Cards",
    videoUrl: "https://www.youtube.com/watch?v=TRn7zrkmA00"
  },
  {
    id: "6b",
    videoTitle: "Artists Draw Personalized Tarot Cards",
    videoUrl: "https://www.youtube.com/watch?v=TRn7zrkmA00"
  },
  {
    id: "6c",
    videoTitle: "Artists Draw Personalized Tarot Cards",
    videoUrl: "https://www.youtube.com/watch?v=TRn7zrkmA00"
  },
  {
    id: "6d",
    videoTitle: "Artists Draw Personalized Tarot Cards",
    videoUrl: "https://www.youtube.com/watch?v=TRn7zrkmA00"
  },
  {
    id: "7a",
    videoTitle:
      "Artists Draw Even More Bloodborne Bosses (That They've Never Seen)",
    videoUrl: "https://www.youtube.com/watch?v=-5q1yxRni28"
  },
  {
    id: "7b",
    videoTitle:
      "Artists Draw Even More Bloodborne Bosses (That They've Never Seen)",
    videoUrl: "https://www.youtube.com/watch?v=-5q1yxRni28"
  },
  {
    id: "7c",
    videoTitle:
      "Artists Draw Even More Bloodborne Bosses (That They've Never Seen)",
    videoUrl: "https://www.youtube.com/watch?v=-5q1yxRni28"
  },
  {
    id: "8a",
    videoTitle: "30 Minute Speed Draw CHALLENGE",
    videoUrl: "https://www.youtube.com/watch?v=yxmW1XqDrXk"
  },
  {
    id: "8b",
    videoTitle: "30 Minute Speed Draw CHALLENGE",
    videoUrl: "https://www.youtube.com/watch?v=yxmW1XqDrXk"
  },
  {
    id: "8c",
    videoTitle: "30 Minute Speed Draw CHALLENGE",
    videoUrl: "https://www.youtube.com/watch?v=yxmW1XqDrXk"
  },
  {
    id: "8d",
    videoTitle: "30 Minute Speed Draw CHALLENGE",
    videoUrl: "https://www.youtube.com/watch?v=yxmW1XqDrXk"
  },
  {
    id: "9a",
    videoTitle: "Artists Draw Pokémon (Based Only On Their Names)",
    videoUrl: "https://www.youtube.com/watch?v=M9VzE4t2dJk"
  },
  {
    id: "9b",
    videoTitle: "Artists Draw Pokémon (Based Only On Their Names)",
    videoUrl: "https://www.youtube.com/watch?v=M9VzE4t2dJk"
  },
  {
    id: "9c",
    videoTitle: "Artists Draw Pokémon (Based Only On Their Names)",
    videoUrl: "https://www.youtube.com/watch?v=M9VzE4t2dJk"
  },
  {
    id: "9d",
    videoTitle: "Artists Draw Pokémon (Based Only On Their Names)",
    videoUrl: "https://www.youtube.com/watch?v=M9VzE4t2dJk"
  },
  {
    id: "10a",
    videoTitle:
      "Artists Draw EVEN MORE Celebrities (Based Only On Description)",
    videoUrl: "https://www.youtube.com/watch?v=azyBXITLOrY"
  },
  {
    id: "10b",
    videoTitle:
      "Artists Draw EVEN MORE Celebrities (Based Only On Description)",
    videoUrl: "https://www.youtube.com/watch?v=azyBXITLOrY"
  },
  {
    id: "10c",
    videoTitle:
      "Artists Draw EVEN MORE Celebrities (Based Only On Description)",
    videoUrl: "https://www.youtube.com/watch?v=azyBXITLOrY"
  },
  {
    id: "10d",
    videoTitle:
      "Artists Draw EVEN MORE Celebrities (Based Only On Description)",
    videoUrl: "https://www.youtube.com/watch?v=azyBXITLOrY"
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
  getImageData = imageId => {
    return images.find(element => element.id === imageId);
  };
}

export default MatchupService;
