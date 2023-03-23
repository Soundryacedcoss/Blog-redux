import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.webp";
import { Blog } from "./Blog";
export const Navbar = () => {
  let user = JSON.parse(localStorage.getItem("userAccount"));
// Logout handler
  const LogoutHandler = () => {
    localStorage.removeItem("userAccount");
    window.location.reload();
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <img src={logo} alt="" className="rounded-pill logo" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to={"/"}>
                  Home
                </Link>
              </li>
              <li class="nav-item ">
                <Link class="nav-link active mx-3">About</Link>
              </li>
              <li class="nav-item ">
                <Link
                  class="nav-link active"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
            {user !== null ? (
              <>
                Hey , {user.map((val) => val.name)}{" "}
                <button
                  className="btn btn-outline-danger ms-3"
                  onClick={LogoutHandler}
                >
                  Logout
                </button>{" "}
              </>
            ) : (
              <form class="d-flex">
                <Link to={"/SignUp"}>
                  {" "}
                  <button class="btn btn-outline-success" type="submit">
                    Sign Up
                  </button>
                </Link>{" "}
                <Link to={"/Login"}>
                  <button class="btn btn-outline-success mx-3" type="submit">
                    Login
                  </button>
                </Link>
              </form>
            )}
          </div>
        </div>
      </nav>
      <Blog />
    </>
  );
};
