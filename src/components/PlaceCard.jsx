// src/components/PlaceCard.jsx
import { MapPin, Star } from "lucide-react";

const CATEGORY_COLORS = {
  food:      { bg: "#FFE4E6", text: "#E11D48" },
  aperitivo: { bg: "#FEF3C7", text: "#D97706" },
  nightlife: { bg: "#EDE9FF", text: "#6C3CE1" },
  study:     { bg: "#D1FAE5", text: "#059669" },
  culture:   { bg: "#DBEAFE", text: "#2563EB" },
  parks:     { bg: "#ECFCCB", text: "#4D7C0F" },
  fitness:   { bg: "#FFE8D6", text: "#C2410C" },
};

export default function PlaceCard({ place }) {
  const colors = CATEGORY_COLORS[place.category] || { bg: "#F3F4F6", text: "#6B7280" };

  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <span style={{
          background: colors.bg, color: colors.text,
          fontSize: 11, fontWeight: 600, padding: "3px 10px",
          borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.5px"
        }}>
          {place.category}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Star size={13} fill="#FBBF24" color="#FBBF24" />
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{place.rating}</span>
        </div>
      </div>

      <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, color: "#1a1a2e" }}>
        {place.name}
      </h3>

      <p style={{ margin: "0 0 10px", fontSize: 13, color: "#666", lineHeight: 1.5 }}>
        {place.description}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#888", fontSize: 12 }}>
          <MapPin size={12} />
          <span>{place.area}</span>
        </div>
        <span style={{ color: "#ccc" }}>·</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#6C3CE1" }}>{place.priceLevel}</span>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {place.tags.map(tag => (
          <span key={tag} style={{
            background: "#f5f5f5", color: "#777",
            fontSize: 11, padding: "3px 9px", borderRadius: 10
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
