// app/apps/us-election/page.tsx
"use client";
import dynamic from "next/dynamic";

import React, { useEffect, useState } from "react";

const ChoroplethMap = dynamic(() => import("@/components/apps/ChoroplethMap"), {
  ssr: false,
});
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
  const [year, setYear] = useState(years[years.length - 1]);
  const mapCharts = ["ChoroplethMap", "BubbleMap"];
  const [mapChart, setMapChart] = useState(mapCharts[0]);

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
      <ul className="flex list-none text-xs justify-center items-center space-x-4 mb-2">
        {orderedParties.map((party: string) => (
          <li key={party} className="flex items-center cursor-pointer ">
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
        className={`relative mx-auto grid grid-cols-1 w-full md:grid-cols-4 ${
          embed ? "pl-2  " : "mt-16 pl-16 "
        }  bg-gray-50 font-sans border border-gray-300 rounded `}
      >
        {/* control panel */}
        <div className="flex flex-col gap-8 p-6">
          <div>
            <h2 className="text-xl font-semibold">People's Votes</h2>
            <p>U.S. Presidential Election Results</p>
          </div>
          {/* range selector */}
          <div className="w-full">
            <label className="block  text-sm font-medium text-gray-400">
              Select Year
            </label>
            <input
              type="range"
              min={2004}
              max={2020}
              step={4}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full appearance-none h-2 bg-gray-200 rounded-lg outline-none slider-thumb mb-2"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                  ((parseInt(year) - 2004) / (2020 - 2004)) * 100
                }%, #e5e7eb ${
                  ((parseInt(year) - 2004) / (2020 - 2004)) * 100
                }%, #e5e7eb 100%)`,
              }}
            />

            {/* Step Indicators */}
            <div className="relative flex justify-between text-xs text-gray-600">
              {years.map((y, idx) => (
                <span
                  key={y}
                  className={`w-8 text-center ${
                    y === year ? "text-blue-600 font-bold" : ""
                  }`}
                >
                  {y}
                </span>
              ))}
            </div>
          </div>
          {/* range selector */}
          <div className="relative w-full">
            <label className="block mb-2 text-sm font-medium text-gray-400">
              Select Map Type
            </label>
            <div className="relative">
              <select
                value={mapChart}
                onChange={(e) => setMapChart(e.target.value)}
                className="w-full appearance-none text-sm px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {mapCharts.map((chart) => (
                  <option key={chart} value={chart}>
                    {chart}
                  </option>
                ))}
              </select>
              {/* Custom chevron icon */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* map */}
        <div className="col-span-3">
          {mapChart === "BubbleMap" && (
            <BubbleMap
              year={year}
              onSelectStateData={setSelected}
              data={votesData}
              height={embed ? "60vh" : "80vh"}
            />
          )}
          {mapChart === "ChoroplethMap" && (
            <ChoroplethMap
              year={year}
              onSelectStateData={setSelected}
              data={votesData}
              height={embed ? "60vh" : "80vh"}
            />
          )}
        </div>

        {/* description */}
        <div
          className={`absolute ${
            embed
              ? "bottom-2 right-2 p-3 text-xs w-1/3 rounded"
              : "bottom-6 right-6 p-6 w-1/4 rounded-xl "
          } bg-white/75  z-500`}
        >
          {!selected && (
            <div className="mt-4 p-4 bg-yellow-100 rounded max-w-md mx-auto">
              <p>Please select a state to see details.</p>
            </div>
          )}
          {selected && selected.stateCode && (
            <>
              <div>
                <h4 className="text-lg font-semibold mb-2">
                  {selected.stateName}
                </h4>
              </div>

              <ResponsiveContainer
                width="100%"
                height={embed ? 200 : 320}
                className="text-xs"
              >
                <BarChart
                  data={chartData}
                  margin={
                    embed
                      ? { top: 0, right: 0, left: 0, bottom: 0 }
                      : { top: 20, right: 30, left: 20, bottom: 20 }
                  }
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
