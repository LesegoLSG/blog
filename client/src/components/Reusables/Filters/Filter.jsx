import React from "react";

const Filters = ({ searchData, handleChange, handleSearchSubmit }) => {
  return (
    <form className="space-y-4" onSubmit={handleSearchSubmit}>
      {/* Search Input */}
      <input
        id="searchTerm"
        type="text"
        placeholder="Search Term"
        value={searchData.searchTerm}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
      />

      {/* Filter Dropdown */}
      <div className="w-full flex md:flex-col justify-center items-center gap-x-2 md:gap-y-4">
        <select
          id="order"
          value={searchData.order}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Order</option>
          <option value="asc">Latest</option>
          <option value="desc">Oldest</option>
        </select>

        {/* Category Dropdown */}
        <select
          id="category"
          value={searchData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Categories</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
          <option value="php">PHP</option>
          <option value="ruby">Ruby</option>
        </select>
      </div>
      <button className="w-full button" type="submit">
        Filter
      </button>
    </form>
  );
};

export default Filters;
