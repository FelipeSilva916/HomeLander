import "../Navigation/Navigation.css";

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="github">
        <a
          href="https://github.com/FelipeSilva916"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-github"></i> GitHub
        </a>
      </h2>
      <h2 className="linkedIn">
        <a
          href="https://www.linkedin.com/in/felipesilva916/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-linkedin"></i> LinkedIn
        </a>
      </h2>
    </footer>
  );
};

export default Footer;
