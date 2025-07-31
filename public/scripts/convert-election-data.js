const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const inputFilePath = path.join(__dirname, "2004-2020-president.csv");
const outputFilePath = path.join(__dirname, "election-results.json");

const results = {};

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", (row) => {
    const year = row.year;
    const state = row.state_po;
    const office = row.office;
    const party = row.party_simplified?.toUpperCase();
    const votes = parseInt(row.candidatevotes, 10);

    // We only want presidential rows
    if (office !== "US PRESIDENT" || !year || !state || !party || isNaN(votes))
      return;

    if (!results[year]) results[year] = {};
    if (!results[year][state]) {
      results[year][state] = {
        votes: {},
        total: 0,
      };
    }

    const stateData = results[year][state];

    stateData.votes[party] = (stateData.votes[party] || 0) + votes;
    stateData.total += votes;
  })
  .on("end", () => {
    // Determine winner for each state-year
    for (const year in results) {
      for (const state in results[year]) {
        const stateData = results[year][state];
        let maxVotes = 0;
        let winner = "UNKNOWN";

        for (const [party, count] of Object.entries(stateData.votes)) {
          if (count > maxVotes) {
            maxVotes = count;
            winner = party;
          }
        }

        stateData.winner = winner;
      }
    }

    fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2));
    console.log(`✅ Election data saved to ${outputFilePath}`);
  });
