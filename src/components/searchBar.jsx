// src/components/SearchBar.jsx
import React, { useState } from 'react';

function SearchBar({ onSearchSubmit }) {
  const [term, setTerm] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim() === '') {
      setError('Por favor, ingresa un término de búsqueda.');
      return;
    }
    setError(null);
    onSearchSubmit(term);
  };

  return (
    <div className="mt-4 sm:mt-0">
      <form onSubmit={handleSubmit} className="flex rounded-[16px] justify-content items-center">
        <input
          type="text"
          placeholder="Buscar imágenes..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="px-4 py-2 rounded-[16px] border-2 border-black mr-[15px]"
        />
        <button
          type="submit"
          className="bg-black rounded-[16px] h-9 text-white px-4 hover:bg-blue-600 transition-colors duration-200"
        >
          Buscar
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default SearchBar;
