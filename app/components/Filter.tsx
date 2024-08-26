"use client";
import React from "react";

const categories = [
  { id: 0, name: "All Categories" },
  { id: 1, name: "Music" },
  { id: 2, name: "Sports" },
  { id: 3, name: "Food" },
  { id: 4, name: "Arts" },
];

interface FilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <select
      value={selectedCategory}
      onChange={handleCategoryChange}
      className="max-w-md p-2 border border-gray-400 rounded-lg"
    >
      {categories.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default Filter;
