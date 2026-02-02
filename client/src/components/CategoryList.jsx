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
    <nav className="category-navigation">
      <div className="nav-header">
        <h2 className="nav-title">
          <span className="title-text">Explorer</span>
          <span className="title-accent">Finitions</span>
        </h2>
        <div className="nav-count-badge">
          <span className="count-number">{categories.length}</span>
        </div>
      </div>

      <div className="nav-divider">
        <div className="divider-line"></div>
      </div>

      <ul className="category-grid">
        {categories.map((cat, index) => (
          <li 
            key={cat.id}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <button
              className={`category-card ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <div className="card-background">
                <div className="card-gradient"></div>
                <div className="card-shine"></div>
              </div>
              <div className="card-content">
                <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="card-title">{cat.name}</h3>
                <div className="card-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
              <div className="card-glow"></div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

