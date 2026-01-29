import React, { useEffect, useState } from "react";
import api from "../api";
import "./ImageGallery.css";

const url = "http://localhost:3000/uploads/";

export default function ImageGallery({ categoryId }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    api.get(`/images?category=${categoryId}`)
      .then(res => {
        setImages(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [categoryId]);

  if (!categoryId) {
    return (
      <div className="gallery-empty-state">
        <div className="empty-box">
          <div className="empty-icon">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
          <h3 className="empty-title">SELECT A CATEGORY</h3>
          <p className="empty-text">Choose a category above to view images</p>
          <div className="empty-decoration"></div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="gallery-loading-state">
        <div className="loading-box">
          <div className="loading-spinner">
            <div className="spinner-square"></div>
            <div className="spinner-square"></div>
            <div className="spinner-square"></div>
            <div className="spinner-square"></div>
          </div>
          <p className="loading-text">LOADING...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <h2 className="gallery-title">IMAGES</h2>
        <div className="image-counter">
          <span className="counter-number">{images.length}</span>
          <span className="counter-label">ITEMS</span>
        </div>
      </div>

      <div className="gallery-grid">
        {images.map((img, index) => (
          <div
            key={img.id}
            className="gallery-card"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="image-container">
              <img
                src={`${url}${categoryId}/${img.filename}`}
                alt={img.filename}
                className="gallery-img"
                loading="lazy"
              />
              <div className="image-overlay">
                <span className="image-label">{img.filename}</span>
              </div>
            </div>
            <div className="card-accent"></div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="gallery-empty-state">
          <div className="empty-box">
            <div className="empty-icon">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
            <h3 className="empty-title">NO IMAGES FOUND</h3>
            <p className="empty-text">This category is empty</p>
            <div className="empty-decoration"></div>
          </div>
        </div>
      )}
    </section>
  );
}