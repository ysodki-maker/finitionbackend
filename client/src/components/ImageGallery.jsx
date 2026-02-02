import React, { useEffect, useState } from "react";
import api from "../api";
import "./ImageGallery.css";

const url = "https://corecrm.cosinus.ma/uploads/";

export default function ImageGallery({ categoryId }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(null);

  useEffect(() => {
    if (!categoryId) return;

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

  const openImagePopup = (img, index) => {
    setSelectedImage(img);
    setImageIndex(index);
    // eslint-disable-next-line react-hooks/immutability
    document.body.style.overflow = 'hidden';
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
    setImageIndex(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (imageIndex + 1) % images.length 
      : (imageIndex - 1 + images.length) % images.length;
    setImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeImagePopup();
      if (e.key === 'ArrowRight') navigateImage('next');
      if (e.key === 'ArrowLeft') navigateImage('prev');
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, imageIndex]);

  if (!categoryId) {
    return (
      <div className="gallery-empty-state">
        <div className="empty-content">
          <div className="empty-icon-wrapper">
            <div className="empty-icon">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div className="icon-glow"></div>
          </div>
          <h3 className="empty-title">Sélectionnez une collection</h3>
          <p className="empty-description">Choisissez une catégorie dans la barre latérale.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="gallery-loading-state">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loading-text">Chargement de la collection...</p>
      </div>
    );
  }

  return (
    <>
      <section className="gallery-container">
        <div className="gallery-header">
          <div className="header-text">
            <h2 className="gallery-title">Présentation visuelle</h2>
            <p className="gallery-subtitle">Collection d'images</p>
          </div>
          <div className="header-stats">
            <div className="stat-box">
              <span className="stat-value">{images.length}</span>
              <span className="stat-label">Images</span>
            </div>
          </div>
        </div>

        {images.length === 0 ? (
          <div className="gallery-empty-state">
            <div className="empty-content">
              <div className="empty-icon-wrapper">
                <div className="empty-icon">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div className="icon-glow"></div>
              </div>
              <h3 className="empty-title">Aucune image trouvée</h3>
              <p className="empty-description">Cette collection est actuellement vide.</p>
            </div>
          </div>
        ) : (
          <div className="gallery-grid">
            {images.map((img, index) => (
              <article
                key={img.id}
                className="gallery-item"
                style={{ animationDelay: `${index * 0.08}s` }}
                onClick={() => openImagePopup(img, index)}
              >
                <div className="item-wrapper">
                  <div className="item-image-container">
                    <img
                      src={`${url}${categoryId}/${img.filename}`}
                      alt={img.filename}
                      className="item-image"
                      loading="lazy"
                    />
                    <div className="image-overlay">
                      <div className="overlay-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.35-4.35" />
                          <path d="M11 8v6" />
                          <path d="M8 11h6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="item-info">
                    <span className="item-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="item-filename">{img.filename}</span>
                  </div>
                  <div className="item-glow"></div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Premium Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={closeImagePopup}>
          <div className="modal-background">
            <div className="bg-blur"></div>
            <div className="bg-particles">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="modal-particle" style={{
                  // eslint-disable-next-line react-hooks/purity
                  left: `${Math.random() * 100}%`,
                  // eslint-disable-next-line react-hooks/purity
                  top: `${Math.random() * 100}%`,
                  // eslint-disable-next-line react-hooks/purity
                  animationDelay: `${Math.random() * 3}s`
                }}></div>
              ))}
            </div>
          </div>

          <button className="modal-close-btn" onClick={closeImagePopup}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button className="modal-nav-btn modal-prev" onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className="modal-nav-btn modal-next" onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-image-wrapper">
              <img
                src={`${url}${categoryId}/${selectedImage.filename}`}
                alt={selectedImage.filename}
                className="modal-image"
              />
            </div>
            <div className="modal-info-bar">
              <div className="info-left">
                <span className="info-index">{String(imageIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
                <span className="info-filename">{selectedImage.filename}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

