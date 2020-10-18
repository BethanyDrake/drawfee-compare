const ResultProcesser = {
  calculateWins: function(rawData) {
    const imageIds = [...new Set(rawData.map(matchup => matchup.winner))];
    const scores = imageIds.map(imageId => {
      const relevantData = rawData.filter(
        matchup => matchup.winner === imageId || matchup.loser === imageId
      );

      let wins = 0;
      const defaultMatchup = { voteCount: 0 };
      imageIds.forEach(opponentId => {
        const votesFor = (
          relevantData.find(
            matchup =>
              matchup.winner === imageId && matchup.loser === opponentId
          ) || defaultMatchup
        ).voteCount;

        const votesAgainst = (
          relevantData.find(
            matchup =>
              matchup.loser === imageId && matchup.winner === opponentId
          ) || defaultMatchup
        ).voteCount;
        if (votesFor > votesAgainst) wins++;
      });
      return {
        imageId,
        wins
      };
    });
    scores.sort((a, b) => b.wins - a.wins);
    return scores;
  },

  getTop: function(rawData, n, imageService) {
    const numberOfMatchups =
      new Set(
        rawData
          .map(matchup => matchup.winner)
          .concat(rawData.map(matchup => matchup.loser))
      ).size - 1;

    return this.calculateWins(rawData)
      .slice(0, n)
      .map(entry => {
        const imageData = imageService.getImageData(entry.imageId);
        return {
          ...imageData,
          winRate: entry.wins / numberOfMatchups
        };
      });
  }
};

export default ResultProcesser;
