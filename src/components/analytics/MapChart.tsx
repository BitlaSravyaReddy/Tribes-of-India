import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

interface MapChartProps {
  data: any[];
  labelKey: string;
  valueKeys: string[];
  dataType: string;
}

const STATE_COORDS: Record<string, [number, number]> = {
  "Andhra Pradesh": [15.9129, 79.74],
  "Arunachal Pradesh": [28.218, 94.7278],
  "Assam": [26.2006, 92.9376],
  "Bihar": [25.0961, 85.3131],
  "Chhattisgarh": [21.2787, 81.8661],
  "Goa": [15.2993, 74.124],
  "Gujarat": [22.2587, 71.1924],
  "Haryana": [29.0588, 76.0856],
  "Himachal Pradesh": [31.1048, 77.1734],
  "Jharkhand": [23.6102, 85.2799],
  "Karnataka": [15.3173, 75.7139],
  "Kerala": [10.8505, 76.2711],
  "Madhya Pradesh": [22.9734, 78.6569],
  "Maharashtra": [19.7515, 75.7139],
  "Manipur": [24.6637, 93.9063],
  "Meghalaya": [25.467, 91.3662],
  "Mizoram": [23.1645, 92.9376],
  "Nagaland": [26.1584, 94.5624],
  "Odisha": [20.9517, 85.0985],
  "Punjab": [31.1471, 75.3412],
  "Rajasthan": [27.0238, 74.2179],
  "Sikkim": [27.533, 88.5122],
  "Tamil Nadu": [11.1271, 78.6569],
  "Telangana": [18.1124, 79.0193],
  "Tripura": [23.9408, 91.9882],
  "Uttar Pradesh": [26.8467, 80.9462],
  "Uttarakhand": [30.0668, 79.0193],
  "West Bengal": [22.9868, 87.855],
};

function getPopupContent(item: any, dataType: string) {
  switch (dataType) {
    case "literacy":
      return `<b>${item.state}</b><br/>Avg: ${item.avg?.toFixed(1)}%<br/>Min: ${item.min?.toFixed(1)}%<br/>Max: ${item.max?.toFixed(1)}%`;
    case "population":
      return `<b>${item.state}</b><br/>Population: ${item.population?.toLocaleString()}`;
    case "livelihood":
      return `<b>${item.livelihood}</b><br/>Tribes: ${item.count}`;
    case "employment":
      return `<b>${item.type}</b><br/>Tribes: ${item.count}`;
    case "migration":
      return `<b>${item.trend}</b><br/>Tribes: ${item.count}`;
    case "cultural":
      return `<b>${item.practice}</b><br/>Tribes: ${item.count}`;
    default:
      return "";
  }
}

export default function MapChart({ data, labelKey, valueKeys, dataType }: MapChartProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Promise.all([
        import("leaflet"),
        import("leaflet/dist/images/marker-icon-2x.png"),
        import("leaflet/dist/images/marker-icon.png"),
        import("leaflet/dist/images/marker-shadow.png")
      ]).then(([L, markerIcon2x, markerIcon, markerShadow]) => {
        // @ts-ignore
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: markerIcon2x.default || markerIcon2x,
          iconUrl: markerIcon.default || markerIcon,
          shadowUrl: markerShadow.default || markerShadow,
        });
      });
    }
  }, []);

  if (!data || data.length === 0) return <div>No data available</div>;
  return (
    <div style={{ width: "100%", height: 400 }}>
      <MapContainer key={dataType} center={[22.9734, 78.6569]} zoom={5} style={{ height: 400, width: "100%", borderRadius: 12 }} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {data.map((item, idx) => {
          const coords = STATE_COORDS[item[labelKey]];
          if (!coords) return null;
          return (
            <Marker key={item[labelKey]} position={coords}>
              <Popup>
                <span dangerouslySetInnerHTML={{ __html: getPopupContent(item, dataType) }} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
} 