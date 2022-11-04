import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Searchbar.css";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const campsites = useSelector((state) => Object.values(state.campsite));

  const activeResults = campsites.filter((campsite) => {
    return campsite.name?.toLowerCase().includes(search.toLowerCase());
  });

  const listResults = activeResults.map((campsite) => {
    return (
      <li key={campsite.id} className="search-result-li">
        <Link to={`/campsites/${campsite.id}`}>{campsite.name}</Link>
      </li>
    );
  });
  return (
    <div className="search-bar-container">
      <form className="search-bar-form">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setSearchResults("results-active")}
            onBlur={() => setSearchResults("")}
          />
        </div>
      </form>
      <div className={`search-results ${searchResults}`}>{listResults}</div>
    </div>
  );
};

export default Searchbar;
