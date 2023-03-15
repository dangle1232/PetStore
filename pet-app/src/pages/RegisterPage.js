import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const navigate = useNavigate();
  const handleChangeUserName = (event) => {
    setUserName(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassWord(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //call api resgister
    const response = await axios.post(
      "http://127.0.0.1:5002/api/auth/register",
      {
        username: username,
        email: email,
        password: password,
      }
    );
    //redicecrt to login
    if (response.status === 200) {
      navigate("/login");
    }
  };
  return (
    <div className="register-page">
      <div className="register-box">
        <div className="register-logo">
          <a href="https://github.com">
            <b>Welcome to</b>PetStore
          </a>
        </div>

        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new membership</p>

            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  placeholder="User name"
                  value={username}
                  onChange={handleChangeUserName}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={handleChangeEmail}
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
                  value={password}
                  onChange={handleChangePassword}
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
                    Register
                  </button>
                </div>
              </div>
            </form>

            <div className="social-auth-links text-center">
              <p>- OR -</p>
              <a
                href="https://vi-vn.facebook.com"
                className="btn btn-block btn-primary"
              >
                <i className="fab fa-facebook mr-2"></i>
                Sign up using Facebook
              </a>
              <a
                href="https://accounts.google.com/AccountChooser/identifier?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&flowName=GlifWebSignIn&flowEntry=AccountChooser"
                className="btn btn-block btn-danger"
              >
                <i className="fab fa-google-plus mr-2"></i>
                Sign up using Google+
              </a>
            </div>

            <Link to="/login" className="text-center">
              I already have a membership
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
