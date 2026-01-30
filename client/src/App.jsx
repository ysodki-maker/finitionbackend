import React, { useState, useEffect } from "react";
import CategoryList from "./components/CategoryList";
import ImageGallery from "./components/ImageGallery";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="app">
      {/* Animated Background */}
      <div className="background-container">
        <div 
          className="gradient-orb orb-1"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        ></div>
        <div 
          className="gradient-orb orb-2"
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
          }}
        ></div>
        <div 
          className="gradient-orb orb-3"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`
          }}
        ></div>
        <div className="noise-texture"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              // eslint-disable-next-line react-hooks/purity
              left: `${Math.random() * 100}%`,
              // eslint-disable-next-line react-hooks/purity
              top: `${Math.random() * 100}%`,
              // eslint-disable-next-line react-hooks/purity
              animationDelay: `${Math.random() * 5}s`,
              // eslint-disable-next-line react-hooks/purity
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="brand">
            <div className="brand-icon">
              <div className="icon-inner"></div>
            </div>
            <div className="brand-text">
              <h1 className="brand-title">GALLERY</h1>
              <span className="brand-subtitle">Finitions</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="main-layout">
        <aside className="sidebar">
          <CategoryList 
            onSelectCategory={setSelectedCategory} 
            selectedCategory={selectedCategory} 
          />
        </aside>

        <main className="content-area">
          <ImageGallery categoryId={selectedCategory} />
        </main>
      </div>
    </div>
  );
}

export default App;
