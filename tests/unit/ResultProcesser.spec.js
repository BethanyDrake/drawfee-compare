import resultProcesser from "@/ResultProcesser.js";
const rawData2 = [
  {
    loser: "a",
    winner: "b",
    voteCount: 4
  },
  {
    loser: "b",
    winner: "a",
    voteCount: 1
  }
];

const rawData3 = [
  {
    loser: "a",
    winner: "b",
    voteCount: 1
  },
  {
    loser: "b",
    winner: "a",
    voteCount: 0
  },
  {
    loser: "a",
    winner: "c",
    voteCount: 1
  },
  {
    loser: "c",
    winner: "a",
    voteCount: 0
  },
  {
    loser: "c",
    winner: "b",
    voteCount: 1
  },
  {
    loser: "b",
    winner: "c",
    voteCount: 0
  }
];

describe("calculateWinRate", () => {
  describe("empty results", () => {
    it("returns empty", () => {
      const input = [];
      expect(resultProcesser.calculateWins(input)).toEqual([]);
    });
  });

  describe("just 2 results", () => {
    it("returns each image with the percenage of matchups they won", () => {
      const input = [...rawData2];
      const expectedOutput = [
        {
          imageId: "b",
          wins: 1
        },
        {
          imageId: "a",
          wins: 0
        }
      ];

      expect(resultProcesser.calculateWins(input)).toEqual(expectedOutput);
    });
  });

  describe("more results", () => {
    it("returns each image with the percenage of matchups they won", () => {
      const input = [...rawData3];

      const expectedOutput = [
        {
          imageId: "b",
          wins: 2
        },
        {
          imageId: "c",
          wins: 1
        },
        {
          imageId: "a",
          wins: 0
        }
      ];

      expect(resultProcesser.calculateWins(input)).toEqual(expectedOutput);
    });
  });
});

describe("getTop", () => {
  const input = [...rawData3];
  const imageService = {
    getImageData: id => {
      return {
        id,
        videoTitle: "Title " + id,
        videoUrl: "url-" + id
      };
    }
  };

  it("returns top 2", () => {});

  it("returns all if you ask for more than it has", () => {
    expect(resultProcesser.getTop(input, 10, imageService)).toEqual([
      {
        id: "b",
        videoTitle: "Title b",
        videoUrl: "url-b",
        winRate: 1.0
      },
      {
        id: "c",
        videoTitle: "Title c",
        videoUrl: "url-c",
        winRate: 0.5
      },
      {
        id: "a",
        videoTitle: "Title a",
        videoUrl: "url-a",
        winRate: 0
      }
    ]);
  });
});
