// app/apps/us-election/page.tsx
"use client";
import dynamic from "next/dynamic";

import React, { useEffect, useState } from "react";
import ChoroplethMap from "@/components/apps/ChoroplethMap"; // adjust path as needed
const BubbleMap = dynamic(() => import("@/components/apps/BubbleMap"), {
  ssr: false,
});
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ElectionPage({ embed = false }: { embed?: boolean }) {
  const [selected, setSelected] = useState<{
    stateCode: string;
    stateName: string;
  } | null>(null);

  const years = ["2004", "2008", "2012", "2016", "2020"];
  const [year, setYear] = useState("2020");

  const orderedParties = ["REPUBLICAN", "DEMOCRAT", "LIBERTARIAN", "OTHER"];
  const partyColors: Record<string, string> = {
    REPUBLICAN: "#ff4d4d", // red
    DEMOCRAT: "#4c6fff", // blue
    LIBERTARIAN: "#fbc531", // gold
    OTHER: "#7f8fa6", // gray
  };

  // Load election data once here
  const [votesData, setVotesData] = useState<Record<
    string,
    Record<
      string,
      {
        winner: string;
        votes: Record<string, number>;
        total: number;
      }
    >
  > | null>(null);

  useEffect(() => {
    fetch("/data/votes.json")
      .then((res) => res.json())
      .then(setVotesData)
      .catch(console.error);
  }, []);

  // Prepare stacked chart data for all years for the selected state
  // chartData = [{ year: "2004", REPUBLICAN: 1000, DEMOCRAT: 2000, ... }, ...]
  let chartData = [];
  if (selected && selected.stateCode && votesData) {
    chartData = years.map((yr) => {
      const stateYearData = votesData[yr]?.[selected.stateCode];
      const votesForYear = stateYearData?.votes || {};
      const obj: Record<string, any> = { year: yr };
      orderedParties.forEach((party) => {
        obj[party] = votesForYear[party] || 0;
      });
      return obj;
    });
  }
  interface LegendProps {
    orderedParties: string[];
    partyColors: Record<string, string>;
  }

  const renderLegend: React.FC = () => {
    return (
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          justifyContent: "center", // center horizontally
          gap: "1rem",
          padding: 0,
          margin: 0,
        }}
      >
        {orderedParties.map((party: string) => (
          <li
            key={party}
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.875rem",
              color: "#333",
              cursor: "default",
            }}
          >
            {/* Color box */}
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                backgroundColor: partyColors[party],
                marginRight: 6,
                borderRadius: 2,
              }}
            />
            {party}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <main
        className={`relative mx-auto ${
          embed ? "pl-2" : "mt-16 pl-16"
        } grid grid-cols-1 md:grid-cols-4 bg-gray-50`}
      >
        {/* control panel */}
        <div className="flex flex-col gap-4 p-6">
          <div>
            <h2 className="text-xl font-semibold">People's Votes</h2>
            <p>U.S. Presidential Election Results</p>
          </div>

          <div className="w-full">
            <input
              type="range"
              min={0}
              max={years.length - 1}
              step={1}
              value={years.indexOf(year)}
              onChange={(e) => setYear(years[+e.target.value])}
              className="w-full mb-2"
            />

            {/* Step Indicators */}
            <div className="relative w-full flex justify-between text-sm text-center">
              {years.map((y) => (
                <span key={y}>{y}</span>
              ))}
            </div>
          </div>
        </div>

        {/* map */}
        <div className="col-span-3">
          <ChoroplethMap
            year={year}
            onSelectStateData={setSelected}
            data={votesData}
          />
          {/* <BubbleMap
            year={year}
            onSelectStateData={setSelected}
            data={votesData}
          /> */}
        </div>

        {/* description */}
        <div className="absolute bottom-6 right-6 bg-white/75 p-6 rounded-xl w-1/4 z-401">
          {!selected && (
            <div className="mt-4 p-4 bg-yellow-100 rounded max-w-md mx-auto">
              <p>Please select a state to see details.</p>
            </div>
          )}
          {selected && selected.stateCode && (
            <>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {selected.stateName}
                </h3>
              </div>

              <ResponsiveContainer
                width="100%"
                height={320}
                className="text-xs"
              >
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  stackOffset="expand"
                >
                  <XAxis dataKey="year" />
                  <YAxis
                    tickFormatter={(val) =>
                      val > 0 ? `${(val * 100).toFixed(0)}%` : ""
                    }
                    domain={[0, 1]}
                    tickCount={6}
                    type="number"
                  />
                  <ChartTooltip
                    formatter={(value: number) => value.toLocaleString()}
                    labelFormatter={(label) => `Year: ${label}`}
                  />
                  <Legend content={renderLegend} />
                  {orderedParties.map((party) => (
                    <Bar
                      key={party}
                      dataKey={party}
                      stackId="votesStack"
                      fill={partyColors[party]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </>
          )}

          {selected && !selected.stateCode && (
            <div className="mt-4 p-4 bg-red-100 rounded max-w-md mx-auto">
              <p>No data available for {selected.stateName}.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
