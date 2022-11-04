import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const campsites = useSelector((state) => state.campsites);
};
