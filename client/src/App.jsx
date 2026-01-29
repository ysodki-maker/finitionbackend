import React, { useState } from "react";
import CategoryList from "./components/CategoryList";
import ImageGallery from "./components/ImageGallery";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="app">
      <div className="noise-overlay"></div>
      
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <div className="logo-square"></div>
              <div className="logo-square"></div>
              <div className="logo-square"></div>
              <div className="logo-square"></div>
            </div>
            <h1 className="main-title">
              <span className="title-line-1">IMAGE</span>
              <span className="title-line-2">GALLERY</span>
            </h1>
          </div>
          <div className="header-decoration"></div>
        </div>
      </header>

      <main className="main-content">
        <CategoryList 
          onSelectCategory={setSelectedCategory} 
          selectedCategory={selectedCategory} 
        />
        <ImageGallery categoryId={selectedCategory} />
      </main>

      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
}

export default App;