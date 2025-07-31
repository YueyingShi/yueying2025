"use client";
import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleOrdinal } from "d3-scale";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

type ElectionData = Record<
  string,
  Record<
    string,
    {
      winner: string;
      votes: Record<string, number>;
      total: number;
    }
  >
>;

const partyColors: Record<string, string> = {
  REPUBLICAN: "#ff4c4c",
  DEMOCRAT: "#4c6fff",
  OTHER: "#888888",
  UNKNOWN: "#ddd",
};

export default function ElectionMap() {
  const [year, setYear] = useState("2020");
  const [data, setData] = useState<ElectionData | null>(null);
  const [tooltipContent, setTooltipContent] = useState("");

  useEffect(() => {
    fetch("/data/election-results.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const years = ["2004", "2008", "2012", "2016", "2020"];

  return (
    <div>
      <h2 className="text-center text-xl font-semibold mb-4">
        U.S. Presidential Election Results: {year}
      </h2>

      <input
        type="range"
        min={0}
        max={years.length - 1}
        value={years.indexOf(year)}
        onChange={(e) => setYear(years[+e.target.value])}
        className="w-full mb-4"
      />

      <ComposableMap
        projection="geoAlbersUsa"
        data-tip=""
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateCode =
                geo.properties.iso_3166_2?.replace("US-", "") || geo.id;
              const stateData = data?.[year]?.[stateCode];
              const fill = stateData
                ? partyColors[stateData.winner] || partyColors.UNKNOWN
                : partyColors.UNKNOWN;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  stroke="#fff"
                  strokeWidth={0.5}
                  onMouseEnter={() => {
                    if (stateData) {
                      const { winner, votes, total } = stateData;
                      setTooltipContent(
                        `${geo.properties.name}: ${winner} (${(
                          (votes[winner] / total) *
                          100
                        ).toFixed(1)}%)`
                      );
                    } else {
                      setTooltipContent(`${geo.properties.name}: No data`);
                    }
                  }}
                  onMouseLeave={() => setTooltipContent("")}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: "#f0a500",
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltipContent && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-md pointer-events-none select-none">
          {tooltipContent}
        </div>
      )}
    </div>
  );
}
