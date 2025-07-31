// app/apps/us-election/page.tsx
"use client";

import React, { useState } from "react";
import ElectionMap from "@/components/apps/ElectionMap"; // adjust the path to where your component lives
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
} from "recharts";

export default function ElectionPage() {
  const [selected, setSelected] = useState<{
    stateCode: string;
    stateName: string;
    stateData: {
      winner: string;
      votes: Record<string, number>;
      total: number;
    } | null;
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

  const chartData =
    selected && selected.stateData
      ? orderedParties
          .filter((party) => party in selected.stateData!.votes)
          .map((party) => ({
            name: party,
            votes: selected.stateData!.votes[party],
          }))
      : [];

  return (
    <main className=" mx-auto mt-16 grid grid-cols-1 md:grid-cols-4  px-16 bg-gray-50">
      {/* control panel */}
      <div className="flex flex-col gap-4 p-6">
        <div>
          <h2 className=" text-xl font-semibold ">People's Votes</h2>
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
            {years.map((y, index) => (
              <span key={y} className="">
                {y}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* map  */}

      <div className="col-span-2">
        <ElectionMap year={year} onSelectStateData={setSelected} />
      </div>

      {/* description */}
      <div className="flex flex-col gap-4 p-6 ">
        {!selected && <p>Select a state to see details.</p>}
        {selected?.stateData && (
          <>
            <div>
              <p>{year}</p>
              <h3 className="text-xl font-semibold mb-2">
                {selected.stateName}
              </h3>
              <div className="flex  items-center ">
                <span className="flex-1 text-gray-400">Winner</span>
                <div
                  className={`w-3 h-3 ${
                    selected.stateData.winner === "DEMOCRAT"
                      ? "bg-blue-500"
                      : "bg-red-500"
                  } rounded-full mr-2`}
                ></div>
                {selected.stateData.winner}
              </div>
              <p className="flex ">
                <span className="flex-1 text-gray-400">Total Votes</span>
                {selected.stateData.total.toLocaleString()}
              </p>
            </div>

            <ResponsiveContainer width="100%" height={200} className="text-xs">
              <BarChart
                layout="vertical"
                data={chartData}
                margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
              >
                <XAxis
                  type="number"
                  tickFormatter={(value) => `${value / 1_000}k`}
                />
                <YAxis dataKey="name" type="category" />
                <ChartTooltip />
                <Bar dataKey="votes">
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={partyColors[entry.name]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {selected && !selected.stateData && (
          <div className="mt-4 p-4 bg-yellow-100 rounded max-w-md mx-auto">
            <p>No data available for {selected.stateName}.</p>
          </div>
        )}
      </div>
    </main>
  );
}
