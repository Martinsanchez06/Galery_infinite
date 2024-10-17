// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import ImageList from './components/imageList';
import SearchBar from './components/searchBar';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);

  const handleSearchSubmit = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerHeight = headerRef.current.getBoundingClientRect().height;
        const scrollTop = window.scrollY;

        if (scrollTop > headerHeight + 10) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App pt-2">
      <header
        ref={headerRef}
        className={`bg-[#fff] backdrop-blur-md mb-2 rounded-[42px] w-[89vw] py-5 px-5 sm:px-10 flex flex-col sm:flex-row justify-between items-center m-auto`}
      >
        <h1 className="text-black font-medium text-lg sm:text-xl md:text-xl lg:text-2xl">
          Galería de Imágenes de Unsplash
        </h1>
        <SearchBar onSearchSubmit={handleSearchSubmit} />
      </header>
      {/* Agregar un espacio para compensar el header fijo */}
      {isSticky && <div style={{ height: headerRef.current?.offsetHeight }}></div>}
      <ImageList searchTerm={searchTerm} />
    </div>
  );
}

export default App;
