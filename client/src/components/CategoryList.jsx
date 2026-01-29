import React, { useEffect, useState } from "react";
import api from "../api";
import "./CategoryList.css";

export default function CategoryList({ onSelectCategory, selectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="category-section">
      <div className="section-header">
        <h2 className="section-title">CATEGORIES</h2>
        <div className="title-accent-bar"></div>
      </div>
      
      <div className="category-grid">
        {categories.map((cat, index) => (
          <button
            key={cat.id}
            className={`category-card ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="category-name">{cat.name}</span>
            <div className="category-corner"></div>
          </button>
        ))}
      </div>
    </section>
  );
}