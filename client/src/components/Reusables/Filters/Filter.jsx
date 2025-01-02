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
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="typescript">TypeScript</option>
          <option value="nodejs">Node.js</option>
          <option value="angular">Angular</option>
          <option value="vuejs">Vue.js</option>
          <option value="flutter">Flutter</option>
          <option value="kotlin">Kotlin</option>
          <option value="swift">Swift</option>
          <option value="docker">Docker</option>
          <option value="kubernetes">Kubernetes</option>
          <option value="data-science">Data Science</option>
          <option value="machine-learning">Machine Learning</option>
          <option value="cloud-computing">Cloud Computing</option>
          <option value="cybersecurity">Cybersecurity</option>
          <option value="blockchain">Blockchain</option>
          <option value="devops">DevOps</option>
          <option value="ui-ux">UI/UX Design</option>
          <option value="graphql">GraphQL</option>
          <option value="django">Django</option>
          <option value="flask">Flask</option>
          <option value="laravel">Laravel</option>
          <option value="aspnet">ASP.NET</option>
          <option value="game-development">Game Development</option>
          <option value="mobile-development">Mobile Development</option>
          <option value="software-testing">Software Testing</option>
          <option value="career-tips">Career Tips</option>
          <option value="open-source">Open Source</option>
          <option value="startup">Startup Culture</option>
          <option value="productivity-tools">Productivity Tools</option>
          <option value="api-development">API Development</option>
          <option value="springboot">Springboot</option>
          <option value="testing-tools">Testing Tools</option>
          <option value="cloud-platforms">Cloud Platforms</option>
          <option value="big-data">Big Data</option>
          <option value="web3">Web3</option>
          <option value="augmented-reality">Augmented Reality</option>
          <option value="virtual-reality">Virtual Reality</option>
          <option value="quantum-computing">Quantum Computing</option>
          <option value="personal-development">Personal Development</option>
        </select>
      </div>
      <button className="w-full button" type="submit">
        Filter
      </button>
    </form>
  );
};

export default Filters;
