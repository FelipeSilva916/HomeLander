import { NavLink, useHistory } from "react-router-dom";

const HomeButton = () => {
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/");
  };
  return (
    <NavLink exact to="/" onClick={handleClick}>
      <i className="fa-regular fa-campground"></i>{" "}
    </NavLink>
  );
};

export default HomeButton;
