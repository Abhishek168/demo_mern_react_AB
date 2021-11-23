import { useState } from "react";
import axios from "axios";
import { toastError, toastSuccess } from "../Toast";
import { useHistory } from "react-router-dom";

const Login = () => {
  const userDetails = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState({ ...userDetails });

  const history = useHistory();

  const onInputChange = async (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const { email, password } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:4000/login`, { ...user })
      .then((res) => {
        localStorage.setItem("tokenValue", res.data);
        history.push("/");
        return toastSuccess("Login successfully");
      })
      .catch((error) => {
        console.log(error);
        toastError("Incorrect id password");
      });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e)} className="form-1">
          <h1>Login</h1>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => onInputChange(e)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onInputChange(e)}
            required
          />
          {/* <span>Forgot Password</span> */}
          <button>Login</button>

          <p>Or SignUp Using</p>
          <div className="icons">
            <a href="https://www.facebook.com/" target="blank">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/" target="blank">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://mail.google.com/" target="blank">
              <i className="fab fa-google"></i>
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
