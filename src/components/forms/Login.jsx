import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
// import "./Login.css";
import "./Login.css";
import img1 from "../../images/bannerAccount.png";
export const Login = () => {
  // ref for input box
  const PasswordRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  // login button function
  const LoginHandler = () => {
    // TAking users account data from local storage
    var Allaccount = JSON.parse(localStorage.getItem("userAccount"));
    console.log(Allaccount);
    // validation
    if (emailRef.current.value === "") {
      setMsg("Please enter your email");
      emailRef.current.focus();
    } else if (PasswordRef.current.value === "") {
      setMsg("Please enter your password");
      PasswordRef.current.focus();
    } else {
      if (Allaccount === null) {
        alert("Please create account");
        navigate('/SignUp')
      } else {
        Allaccount.forEach((element) => {
          console.log(element.email);
          if (
            element.email === emailRef.current.value &&
            element.password === PasswordRef.current.value
          ) {
            navigate("/");
            localStorage.setItem("CurrentUser", JSON.stringify(element));
          } else if (
            element.email !== emailRef.current.value &&
            element.password !== PasswordRef.current.value
          ) {
            setMsg("credential Not matched!");
          }
        });
      }
    }
  };
  const closeHandler = () => {
    setMsg("");
  };
  console.log(msg);
  return (
    <div className="login text-center">
      <div className="Login_container">
        <div className="form">
          <div className="login_form">
            <div>
              <input
                type="text"
                className="input p-2 mt-3"
                placeholder="Enter your Email"
                ref={emailRef}
              />
            </div>
            <div>
              <input
                type="password"
                className="input p-2 mt-3"
                placeholder="Enter your Password"
                ref={PasswordRef}
              />
            </div>
            <div class="d-grid gap-2 mt-3">
              <button
                class="btn btn-primary"
                type="button"
                onClick={LoginHandler}
              >
                Login
              </button>
            </div>
          </div>
          <div>
            <img src={img1} alt="" />
          </div>
        </div>
        <div style={{ marginTop: "5%" }}>
          <span>
            don't have an account? <Link to={"/SignUp"}>create here</Link>
          </span>
        </div>
        {msg === "" ? (
          ""
        ) : (
          <div
            class="alert alert-warning alert-dismissible fade show mt-3"
            role="alert"
          >
            {msg}
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={closeHandler}
            ></button>
          </div>
        )}
      </div>
    </div>
  );
};
