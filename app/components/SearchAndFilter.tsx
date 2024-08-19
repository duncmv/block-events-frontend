"use client";
import React, { useState, useEffect } from "react";

const categories = [
  { id: 0, name: "All Categories" },
  { id: 1, name: "Education" },
  { id: 2, name: "Sports" },
  { id: 3, name: "Art" },
  { id: 4, name: "Tech" },
  { id: 5, name: "Business" },
  { id: 6, name: "Music" },
  { id: 7, name: "Health" },
  { id: 8, name: "Lifestyle" },
  { id: 9, name: "Food" },
  { id: 10, name: "Travel" },
];

interface Event {
  _id: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime?: string;
  location: {
    address: string;
    city: string;
    state: string;
    zip_code?: string;
    googleMapsLink?: string;
  media: {
    pictures: string[];
    videos: string[];
  }
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
    }, 300); // Adjust the debounce delay as needed

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory]);

  const handleSearch = () => {
    let filtered: Event[] = events;

    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "All Categories") {
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
    }

    if (searchTerm === "" && selectedCategory === "All Categories") {
      filtered = events;
    }

    setFilteredEvents(filtered);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center m-4 px-4 space-y-4 md:space-y-0 md:space-x-4">
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search events"
        className="w-full md:w-2/3 p-2 border border-gray-400 rounded-lg"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full md:w-1/3 p-2 border border-gray-400 rounded-lg"
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
