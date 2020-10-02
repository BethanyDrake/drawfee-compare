// Register a new service

const images = ["1a", "1b", "1c"];

const randomElement = array => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

class MatchupService {
  getMatchup = () => {
    return [
      { imageId: randomElement(images) },
      { imageId: randomElement(images) }
    ];
  };
}

export default MatchupService;
