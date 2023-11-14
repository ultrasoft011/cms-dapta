// SearchBar.js
import React from "react";

const SearchBar = ({ searchTerm, onChange }) => (
  <input
    type="text"
    placeholder="Buscar programa..."
    value={searchTerm}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default SearchBar;
