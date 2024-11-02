import { Link } from "react-router-dom";
import RoleNav from "./RoleNav";
import logo from "../Image/e_logo.png";

const Header = () => {
  return (
    <div>
      <nav className="navbar  navbar-expand-lg custom-bg text-color">
        <div className="container-fluid text-color">
          <img
            src={logo}
            height="60"
            width="auto"
            className="d-inline-block align-top"
            alt="" />
          <Link to="/" class="navbar-brand">
            <i>
              <b className="text-color-second ms-2">Event Management System</b>
            </i>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <RoleNav />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
