// src/screens/ExploreScreen.jsx
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { getPlaces, PLACE_CATEGORIES } from "../api/places";
import PlaceCard from "../components/PlaceCard";

export default function ExploreScreen() {
  const [places, setPlaces] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPlaces(activeCategory).then(p => {
      setPlaces(p);
      setLoading(false);
    });
  }, [activeCategory]);

  const filtered = places.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(t => t.includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ padding: "0 20px 100px" }}>
      {/* Header */}
      <div style={{ paddingTop: 56, paddingBottom: 16 }}>
        <h1 style={{ margin: "0 0 4px", fontSize: 26, fontWeight: 800, color: "#1a1a2e" }}>
          Explore Florence
        </h1>
        <p style={{ margin: 0, fontSize: 14, color: "#888" }}>
          The best spots, picked for international students
        </p>
      </div>

      {/* Search */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "#f5f5f5", borderRadius: 14, padding: "10px 14px", marginBottom: 16
      }}>
        <Search size={16} color="#aaa" />
        <input
          placeholder="Search places..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ flex: 1, border: "none", background: "none", outline: "none", fontSize: 14, color: "#1a1a2e" }}
        />
      </div>

      {/* Categories */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, marginBottom: 8, scrollbarWidth: "none" }}>
        {PLACE_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              flexShrink: 0, padding: "7px 14px",
              borderRadius: 20, border: "none", cursor: "pointer",
              fontWeight: 600, fontSize: 13, transition: "all 0.2s",
              background: activeCategory === cat.id ? "#6C3CE1" : "#f3f4f6",
              color: activeCategory === cat.id ? "#fff" : "#555"
            }}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
        {loading ? "Loading..." : `${filtered.length} place${filtered.length !== 1 ? "s" : ""} found`}
      </p>

      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#aaa" }}>
          <p style={{ fontSize: 32, marginBottom: 8 }}>🔍</p>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#555" }}>No places found</p>
          <p style={{ fontSize: 13 }}>Try a different category or search term</p>
        </div>
      )}

      {filtered.map(place => (
        <PlaceCard key={place.id} place={place} />
      ))}

      {/* Suggest a place CTA */}
      <div style={{
        background: "linear-gradient(135deg, #6C3CE1, #9b6dff)",
        borderRadius: 16, padding: "18px 20px", marginTop: 8,
        textAlign: "center"
      }}>
        <p style={{ margin: "0 0 4px", color: "#fff", fontWeight: 700, fontSize: 14 }}>
          Know a great spot we're missing?
        </p>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.8)", fontSize: 12 }}>
          Suggestions from students help keep this guide useful for everyone.
        </p>
      </div>
    </div>
  );
}
