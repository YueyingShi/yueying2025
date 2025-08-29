// components/apps/BubbleMap.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Circle,
  Marker,
} from "react-leaflet";
import L from "leaflet"; // ⬅️ Import Leaflet directly
import { Feature, Geometry } from "geojson";

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

interface StateFeatureProperties {
  name: string;
  key: string;
}

interface StateFeature {
  type: string;
  properties: StateFeatureProperties;
  geometry: {
    type: string;
    coordinates: number[][] | number[][][];
  };
  key: string;
}

// helper to get state centroid (approximate)
function getCentroid(geometry: StateFeature["geometry"]): [number, number] {
  // GeoJSON geometries can be Polygon or MultiPolygon
  const coords =
    geometry.type === "Polygon"
      ? geometry.coordinates[0]
      : geometry.coordinates.flat(1);

  // simple centroid average of coordinates
  const filteredCoords = coords.filter(
    (c): c is number[] => Array.isArray(c) && c.length >= 2
  );
  const latSum = filteredCoords.reduce((sum: number, c) => sum + c[1], 0);
  const lngSum = filteredCoords.reduce((sum: number, c) => sum + c[0], 0);
  const count = coords.length;

  return [latSum / count, lngSum / count];
}

export default function BubbleMap({
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
  const [geoJsonData, setGeoJsonData] = useState<{
    type: "FeatureCollection";
    features: StateFeature[];
  } | null>(null);
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(
    null
  );

  // Fetch geojson for US states once
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
    )
      .then((res) => res.json())
      .then(setGeoJsonData);
  }, []);

  // max radius for bubbles (in meters)
  const maxRadius = 250000;
  const minRadius = 30000;

  // find max votes in the data for scaling
  const maxVotes = Math.max(
    ...Object.values(data?.[year] || {}).map((s) => s.total || 0)
  );

  function formatCompactNumber(num: number): string {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1) + "B";
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + "M";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + "K";
    } else {
      return num.toFixed(1);
    }
  }

  // Inside your map over geoJsonData.features
  const bubbles = geoJsonData?.features.flatMap((feature: StateFeature) => {
    const stateName = feature.properties.name;
    const stateCode = stateNameToCode[stateName];
    const stateData = data?.[year]?.[stateCode];
    if (!stateData) return [];

    const [lat, lng] = getCentroid(feature.geometry);
    if (isNaN(lat) || isNaN(lng)) return [];

    const radius = (stateData.total / maxVotes) * maxRadius + minRadius;
    const color = partyColors[stateData.winner] || partyColors.UNKNOWN;

    const circle = (
      <Circle
        key={`circle-${stateCode}`}
        center={[lat, lng]}
        radius={radius}
        pathOptions={{
          fillColor: color,
          color: "transparent",
          fillOpacity: stateCode === selectedStateCode ? 0.8 : 0.5,
        }}
        eventHandlers={{
          click: () => {
            setSelectedStateCode(stateCode);
            onSelectStateData({
              stateCode,
              stateName,
              stateData,
            });
          },
          mouseover: (e) => {
            e.target.setStyle({ fillOpacity: 0.9 });
          },
          mouseout: (e) => {
            e.target.setStyle({
              fillOpacity: stateCode === selectedStateCode ? 0.8 : 0.5,
            });
          },
        }}
      />
    );

    const label = (
      <Marker
        key={`label-${stateCode}`}
        position={[lat, lng]}
        icon={L.divIcon({
          className: "",
          html: `<div style="
     position: absolute;
     font-weight: normal;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 10px;
      color: #fff;

        pointer-events: none;

    ">${
      stateData.total > 2000000 ? formatCompactNumber(stateData.total) : ""
    }</div>`,
          iconSize: [0, 0],
        })}
      />
    );

    return [circle, label];
  });

  function stateStyle() {
    return {
      fillColor: "#ccc",
      weight: 2,
      color: "#fff", // thin white border
      fillOpacity: 0,
      // no dashArray, no shadow, etc.
    };
  }

  function onEachState(
    feature: Feature<Geometry, StateFeatureProperties>,
    layer: L.Layer
  ) {
    const stateName = feature.properties.name;
    const stateCode = stateNameToCode[stateName];
    layer.on({
      click: () => {
        setSelectedStateCode(stateCode);
        onSelectStateData({
          stateCode,
          stateName: feature.properties.name,
          stateData: data?.[year]?.[stateCode] || null,
        });
      },
      mouseover: (e) => {
        e.target.setStyle({
          fillOpacity: 0.5,
        });
      },
      mouseout: (e) => {
        e.target.setStyle({
          fillOpacity: 0,
        });
      },
    });
  }

  if (!geoJsonData) return <p>Loading map...</p>;

  return (
    <MapContainer
      className="focus:outline-none focus:ring-0"
      center={[37.8, -96]}
      zoom={4}
      scrollWheelZoom={true}
      style={{ height: height || "80vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <GeoJSON
        data={geoJsonData}
        style={stateStyle}
        onEachFeature={onEachState}
      />
      {bubbles}
    </MapContainer>
  );
}
