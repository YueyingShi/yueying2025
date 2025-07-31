"use client";
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// You'll need to convert topojson to geojson or get geojson separately for Leaflet
// For simplicity, here I'm assuming you have a geojson URL or you convert topojson outside React

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

export default function ElectionMap({
  year,
  onSelectStateData,
}: {
  year: string;
  onSelectStateData: (data: {
    stateCode: string;
    stateName: string;
    stateData: {
      winner: string;
      votes: Record<string, number>;
      total: number;
    } | null;
  }) => void;
}) {
  const [data, setData] = useState<ElectionData | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(
    null
  );

  const stateNameToCode: Record<string, string> = {
    Alabama: "AL",
    Alaska: "AK",
    Arizona: "AZ",
    Arkansas: "AR",
    California: "CA",
    Colorado: "CO",
    Connecticut: "CT",
    Delaware: "DE",
    Florida: "FL",
    Georgia: "GA",
    Hawaii: "HI",
    Idaho: "ID",
    Illinois: "IL",
    Indiana: "IN",
    Iowa: "IA",
    Kansas: "KS",
    Kentucky: "KY",
    Louisiana: "LA",
    Maine: "ME",
    Maryland: "MD",
    Massachusetts: "MA",
    Michigan: "MI",
    Minnesota: "MN",
    Mississippi: "MS",
    Missouri: "MO",
    Montana: "MT",
    Nebraska: "NE",
    Nevada: "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    Ohio: "OH",
    Oklahoma: "OK",
    Oregon: "OR",
    Pennsylvania: "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    Tennessee: "TN",
    Texas: "TX",
    Utah: "UT",
    Vermont: "VT",
    Virginia: "VA",
    Washington: "WA",
    "West Virginia": "WV",
    Wisconsin: "WI",
    Wyoming: "WY",
  };

  // Fetch election data JSON
  useEffect(() => {
    fetch("/data/election-results.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch election data");
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        console.error(err);
        setData(null);
      });
  }, []);

  // Fetch geojson for US states (converted from topojson)
  useEffect(() => {
    // topojson needs to be converted to geojson before usage in leaflet
    // here's an example fetching geojson version of US states:
    fetch(
      "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
    )
      .then((res) => res.json())
      .then(setGeoJsonData);
  }, []);

  // Style function for GeoJSON layer
  function stateStyle(feature: any) {
    const stateName = feature.properties.name;
    const stateCode = stateNameToCode[stateName];
    const stateData = data?.[year]?.[stateCode];
    const winnerColor = stateData
      ? partyColors[stateData.winner]
      : partyColors.UNKNOWN;

    const isSelected = selectedStateCode === stateCode;

    return {
      fillColor: winnerColor,
      weight: 1,
      color: "#fff",
      fillOpacity: isSelected ? 1 : 0.6,
    };
  }
  // When a state is hovered or clicked
  function onEachState(feature: any, layer: any) {
    const stateName = feature.properties.name;
    const stateCode = stateNameToCode[stateName];

    layer.on({
      click: () => {
        setSelectedStateCode(stateCode);
        const stateData = data?.[year]?.[stateCode] ?? null;
        onSelectStateData({ stateCode, stateName, stateData });
      },
    });
  }

  return (
    <MapContainer
      center={[37.8, -96]}
      zoom={4}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geoJsonData && data && (
        <GeoJSON
          key={selectedStateCode || "default"} // re-render on selection
          data={geoJsonData}
          style={stateStyle}
          onEachFeature={onEachState}
        />
      )}
    </MapContainer>
  );
}
