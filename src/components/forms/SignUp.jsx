import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../../images/bannerAccount.png";
import { addAccount } from "../../reducer/Slice";
// import { addData } from "../Slice/DataSlice";
export const SignUp = () => {
  // using navigate to navigate other page
  const navigate = useNavigate();
  // useSelecer for using redux state data
  const data = useSelector((state) => state.fetchPost);
  // using usedispatch hook for dispaching action
  const dispatch = useDispatch();
  // ref for input box
  const NameRef = useRef();
  const EmailRef = useRef();
  const PasswordRef = useRef();
  const UserNameRef = useRef();
  const [msg, setMsg] = useState("");
  var arr = [];
  // Sign up button functinality
  const SignUpHandler = () => {
    // validation
    if (NameRef.current.value === "") {
      setMsg("Please write name");
      NameRef.current.focus();
    } else if (EmailRef.current.value === "") {
      setMsg("Please write email");
      EmailRef.current.focus();
    } else if (PasswordRef.current.value === "") {
      setMsg("Please write Password");
      PasswordRef.current.focus();
    } else {
      var obj = {
        name: NameRef.current.value,
        email: EmailRef.current.value,
        password: PasswordRef.current.value,
        userName: UserNameRef.current.value,
        id: Math.random(),
      };
      arr.push(obj);
      // dispaching add data action
      dispatch(addAccount(arr));
      setMsg("Account created succesfully");
      // navigating to login page
      navigate("/Login");
    }
  };
  const closeHandler = () => {
    setMsg("");
  };
  return (
    <div className="Login_container text-center">
      <div className="form">
        <div>
          <div>
            <input
              type="text"
              className="input p-2 mt-3"
              placeholder="Enter your Name"
              ref={NameRef}
            />
          </div>
          <div>
            <input
              type="text"
              className="input p-2 mt-3"
              placeholder="Enter your Email"
              ref={EmailRef}
            />
          </div>
          <div>
            <input
              type="text"
              className="input p-2 mt-3"
              placeholder="Enter your userName"
              ref={UserNameRef}
            />
          </div>
          <div>
            <input
              type="text"
              className="input p-2 mt-3"
              placeholder="Enter your password"
              ref={PasswordRef}
            />
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
          <div class="d-grid gap-2 mt-3">
            <button
              class="btn btn-primary"
              type="button"
              onClick={SignUpHandler}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div>
          <img src={img1} alt="" />
        </div>
      </div>

      <Link to="/" className="mt-3 ">
        Already account
      </Link>
    </div>
  );
};
