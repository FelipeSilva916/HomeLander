import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage__container">
      <div className="homepage__contents">
        <h2 className="homepage-title">
          <i
            className="fa-duotone fa-campground"
            style="--fa-primary-color: orangered;"
          ></i>
          ️ Welcome to HomeLander!
        </h2>
        <p>Find your next adventure!</p>
      </div>
    </div>
  );
};
export default Homepage;
