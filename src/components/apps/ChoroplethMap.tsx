// ChoroplethMap.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
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

function interpolateColor(percentage: number): string {
  const p = Math.max(0, Math.min(1, percentage));

  // Easing to intensify blue/red at ~70%
  const eased =
    p < 0.5
      ? 0.5 * Math.pow(p * 2, 2) // blue → white
      : 1 - 0.5 * Math.pow((1 - p) * 2, 2); // white → red

  const blue = [76, 111, 255]; // #4c6fff
  const white = [255, 255, 255]; // #ffffff
  const red = [255, 77, 77]; // #ff4d4d

  let r, g, b;

  if (eased < 0.5) {
    const ratio = eased / 0.5;
    r = Math.round(blue[0] + (white[0] - blue[0]) * ratio);
    g = Math.round(blue[1] + (white[1] - blue[1]) * ratio);
    b = Math.round(blue[2] + (white[2] - blue[2]) * ratio);
  } else {
    const ratio = (eased - 0.5) / 0.5;
    r = Math.round(white[0] + (red[0] - white[0]) * ratio);
    g = Math.round(white[1] + (red[1] - white[1]) * ratio);
    b = Math.round(white[2] + (red[2] - white[2]) * ratio);
  }

  return `rgb(${r}, ${g}, ${b})`;
}
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
  const [geoJsonData, setGeoJsonData] =
    useState<GeoJSON.FeatureCollection | null>(null);
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(
    null
  );
  const [geoJsonLayer, setGeoJsonLayer] =
    useState<GeoJSON.FeatureCollection | null>(null);

  const handleGeoJsonRef = useCallback((layer) => {
    if (layer) {
      setGeoJsonLayer(layer);
    }
  }, []);

  // Fetch geojson for US states once
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
    )
      .then((res) => res.json())
      .then(setGeoJsonData);
  }, []);
  // Initial style applied to each feature on load
  function stateStyle(feature) {
    const stateName = feature.properties.name;
    const stateCode = stateNameToCode[stateName];
    const stateData = data?.[year]?.[stateCode];

    let fillColor = "#ccc"; // Default gray for no data

    if (stateData) {
      const repVotes = stateData.votes.REPUBLICAN || 0;
      const demVotes = stateData.votes.DEMOCRAT || 0;
      const total = repVotes + demVotes;

      if (total > 0) {
        const demRatio = demVotes / total; // 1 = all blue, 0 = all red
        fillColor = interpolateColor(1 - demRatio);
      }
    }

    return {
      fillColor,
      color: "#fff", // border
      weight: 1,
      fillOpacity: 0.8,
    };
  }
  // Update style of GeoJSON layers when selection changes
  useEffect(() => {
    if (!geoJsonLayer || !geoJsonData) return;

    geoJsonLayer.eachLayer((layer) => {
      const feature = layer.feature;
      const stateName = feature.properties.name;
      const stateCode = stateNameToCode[stateName];

      const stateData = data?.[year]?.[stateCode];
      let fillColor = "#ccc"; // Default gray for no data

      if (stateData) {
        const repVotes = stateData.votes.REPUBLICAN || 0;
        const demVotes = stateData.votes.DEMOCRAT || 0;
        const total = repVotes + demVotes;

        if (total > 0) {
          const demRatio = demVotes / total; // 1 = all blue, 0 = all red
          fillColor = interpolateColor(1 - demRatio);
        }
      }

      const isSelected = selectedStateCode === stateCode;

      // Reset base style depending on selection
      layer.setStyle({
        fillColor,
        weight: 1,
        color: "#fff",
        fillOpacity: isSelected ? 0.8 : 0.4,
      });

      layer.off(); // Remove previous handlers

      layer.on({
        click: () => {
          setSelectedStateCode(stateCode);
          onSelectStateData({
            stateCode,
            stateName,
            stateData: data?.[year]?.[stateCode] || null,
          });
        },
        mouseover: (e) => {
          e.target.setStyle({
            fillOpacity: 1,
          });
        },
        mouseout: (e) => {
          const isStillSelected = selectedStateCode === stateCode;
          e.target.setStyle({
            fillOpacity: isStillSelected ? 0.8 : 0.4,
          });
        },
      });
    });
  }, [geoJsonLayer, geoJsonData, year, data, selectedStateCode]);

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
      <GeoJSON
        key={year}
        ref={handleGeoJsonRef}
        data={geoJsonData}
        style={stateStyle}
      />
    </MapContainer>
  );
}
