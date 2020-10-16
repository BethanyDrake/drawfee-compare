import resultProcesser from "@/ResultProcesser.js";
describe("calculateWinRate", () => {
  describe("empty results", () => {
    it("returns empty", () => {
      const input = [];
      expect(resultProcesser.calculateWinRate(input)).toEqual([]);
    });
  });

  describe("just 2 results", () => {
    it("returns each image with the percenage of matchups they won", () => {
      const input = [
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

      const expectedOutput = [
        {
          imageId: "a",
          score: 0
        },
        {
          imageId: "b",
          score: 0.5
        }
      ];

      const output = resultProcesser.calculateWinRate(input);
      expectedOutput.forEach((expectedOutputEntry, i) => {
        expect(output[i].imageId).toEqual(expectedOutputEntry.imageId);
        expect(output[i].score).toBeCloseTo(expectedOutputEntry.score);
      });
      expect(output.length).toEqual(expectedOutput.length);
    });
  });
});
