"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import stateNameToCode from "@/data/stateNameToCode";

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

export default function ChoroplethMap({
  year,
  onSelectStateData,
  data,
  height,
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
  data: ElectionData | null;
  height?: string;
}) {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(
    null
  );
  const geoJsonRef = useRef<any>(null);

  // Fetch geojson for US states once
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
    )
      .then((res) => res.json())
      .then(setGeoJsonData);
  }, []);

  // Update style of GeoJSON layers when selection changes
  useEffect(() => {
    if (!geoJsonData || !geoJsonRef.current) return;

    geoJsonRef.current.eachLayer((layer: any) => {
      const feature = layer.feature;
      const stateName = feature.properties.name;
      const stateCode = stateNameToCode[stateName];

      layer.off(); // Remove old listeners

      layer.on({
        click: () => {
          setSelectedStateCode(stateCode);
          onSelectStateData({
            stateCode,
            stateName,
            stateData: data?.[year]?.[stateCode] || null,
          });
        },
        mouseover: (e: any) => {
          e.target.setStyle({
            fillOpacity: 0.9,
          });
        },
        mouseout: (e: any) => {
          const isSelected = selectedStateCode === stateCode;
          e.target.setStyle({
            fillOpacity: isSelected ? 1 : 0.6,
          });
        },
      });
    });
  }, [selectedStateCode, geoJsonData, data, year]);

  // Initial style applied to each feature on load
  function stateStyle(feature: any) {
    const stateName = feature.properties.name;
    const stateCode = stateNameToCode[stateName];
    const stateData = data?.[year]?.[stateCode];
    const winnerColor = stateData
      ? partyColors[stateData.winner]
      : partyColors.UNKNOWN;

    return {
      fillColor: winnerColor,
      weight: 1,
      color: "#fff",
      fillOpacity: 0.6,
    };
  }

  if (!geoJsonData) return <p>Loading map...</p>;

  return (
    <MapContainer
      className="focus:outline-none focus:ring-0"
      center={[37.8, -96]}
      zoom={4}
      scrollWheelZoom={true}
      style={{ height: height || "80vh", width: "100%" }}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON ref={geoJsonRef} data={geoJsonData} style={stateStyle} />
    </MapContainer>
  );
}
