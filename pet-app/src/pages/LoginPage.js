import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

function LoginPage() {
  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const handleChangeInput = (event) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    //call api login
    const response = await axios.post(
      "http://127.0.0.1:5002/api/auth/login",
      userInput
    );
    if (response.status === 200) {
      const accessToken = response.data.accessToken;
      const userLogin = jwtDecode(accessToken);
      console.log(userLogin);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: userLogin,
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="https://github.com">
            <b>Pet</b>Store
          </a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <form onSubmit={handleSubmitLogin()}>
              <div className="input-group mb-3">
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={userInput.email}
                  name="email"
                  onChange={handleChangeInput}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={userInput.password}
                  name="password"
                  onChange={handleChangeInput}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            <div className="social-auth-links text-center mb-3">
              <p>- OR -</p>
              <a
                href="https://github.com"
                className="btn btn-block btn-primary"
              >
                <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
              </a>
              <a href="https://github.com" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2"></i> Sign in using
                Google+
              </a>
            </div>

            <p className="mb-1">
              <a href="https://github.com">I forgot my password</a>
            </p>
            <p className="mb-0">
              <Link to="/register" className="text-center">
                Register a new membership
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
