"use client";
import React, { useState, useEffect } from "react";

const categories = [
  { id: 0, name: "All Categories" },
  { id: 1, name: "Music" },
  { id: 2, name: "Sports" },
  { id: 3, name: "Food" },
  { id: 4, name: "Arts" },
];

interface Event {
  id: number;
  title: string;
  startDateTime: Date;
  endDateTime?: Date;
  location: {
    address: string;
    city: string;
    state: string;
    zip_code?: string;
    googleMapsLink?: string;
  };
  category: string;
}

interface SearchAndFilterProps {
  events: Event[];
  setFilteredEvents: Function;
}

const SearchAndFilter = ({
  events,
  setFilteredEvents,
}: SearchAndFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 1000); // Adjust the debounce delay as needed

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory]);

  const handleSearch = () => {
    let filtered: Event[] = events;

    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "All Categories") {
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
    }

    setFilteredEvents(filtered);
  };

  return (
    <div className="flex justify-between m-4 px-4">
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search events"
        className="max-w-700 p-2 mr-4 border border-gray-400 rounded-lg"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="max-w-md p-2 border border-gray-400 rounded-lg"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchAndFilter;
