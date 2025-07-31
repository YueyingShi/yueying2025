// app/apps/us-election/page.tsx
"use client";

import React, { useState } from "react";
import ElectionMap from "@/components/apps/ElectionMap"; // adjust the path to where your component lives
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
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

  const years = ["2020", "2016", "2012", "2008", "2004"];
  const [year, setYear] = useState("2020");
  const orderedParties = ["REPUBLICAN", "DEMOCRAT", "LIBERTARIAN", "OTHER"];

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
    <main className="container mx-auto mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 p-4">
      {/* control panel */}
      <div>
        <h2 className=" text-xl font-semibold mb-4">People's Votes</h2>
        <h3>U.S. Presidential Election Results: {year}</h3>
        <input
          type="range"
          min={0}
          max={years.length - 1}
          value={years.indexOf(year)}
          onChange={(e) => setYear(years[+e.target.value])}
          className="w-full mb-4"
        />
      </div>

      {/* map  */}

      <div className="col-span-2">
        <ElectionMap year={year} onSelectStateData={setSelected} />
      </div>

      {/* description */}
      <div>
        {!selected && <p>Select a state to see details.</p>}
        {selected?.stateData && (
          <>
            <h2 className="text-lg font-semibold mb-2">{selected.stateName}</h2>
            <p>Winner: {selected.stateData.winner} </p>
            <p>Total Votes: {selected.stateData.total.toLocaleString()}</p>
            <ResponsiveContainer width="100%" height={200} className="text-xs">
              <BarChart
                layout="vertical"
                data={chartData}
                margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <ChartTooltip />
                <Bar dataKey="votes" fill="#4c6fff" />
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
