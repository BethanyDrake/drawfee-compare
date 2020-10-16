const ResultProcesser = {
  calculateWinRate: rawData => {
    const imageIds = [...new Set(rawData.map(matchup => matchup.winner))];
    console.log(imageIds);
    const scores = imageIds.map(imageId => {
      const relevantData = rawData.filter(
        matchup => matchup.winner === imageId || matchup.loser === imageId
      );

      let wins = 0;
      let losses = 0;
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
        else losses++;
      });
      return {
        imageId,
        score: wins / (wins + losses)
      };
    });
    scores.sort((a, b) => a.score - b.score);

    return scores;
  }
};

export default ResultProcesser;
