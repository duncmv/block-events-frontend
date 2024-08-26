"use client";
import React, { useState, useEffect } from "react";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, setSearchTerm }) => {
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      type="search"
      value={searchTerm}
      onChange={handleSearchInputChange}
      placeholder="Search events"
      className="w-full p-2 mr-4 border border-gray-400 rounded-lg sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl"
    />
  );
};

export default Search;
