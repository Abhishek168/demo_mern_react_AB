import React, { useState } from "react";
import axios from "axios";
import { toastError, toastSuccess } from "./Toast";
import { useHistory, useParams } from "react-router-dom";

export function FetchAPI({ token }) {
  let { id } = useParams();

  const history = useHistory();

  const userDetails = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState({ ...userDetails });

  const onInputChange = async (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const { firstName, lastName, email, password } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      // Update User
      axios
        .put(`http://localhost:4000/user/${id}`, user, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toastSuccess("User Updated");
        })
        .catch((error) => {
          console.log(error);
          toastError("can not update User");
        });
    }
    // Add User
    axios
      .post(`http://localhost:4000/user`, user, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toastSuccess("User successfully registered");
      })
      .catch((error) => {
        console.log(error);
        toastError("User is not created try again");
      });
    history.push("/displayUser");
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <center>
        <h2>{id ? "Update" : "Add"} User</h2>
        <div style={{ marginTop: "40px" }}>
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              name="firstName"
              onChange={(e) => onInputChange(e)}
              placeholder="Abhishek"
              required
            />
          </label>
          <br />
          <label>
            last Name:
            <input
              type="text"
              value={lastName}
              name="lastName"
              onChange={(e) => onInputChange(e)}
              placeholder="Bhavsar"
            />
          </label>
          <br />
          <label>
            email:
            <input
              type="text"
              value={email}
              name="email"
              onChange={(e) => onInputChange(e)}
              placeholder="abhi@gmail.com"
              required
            />
          </label>
          <br />
          <label>
            password:
            <input
              type="text"
              value={password}
              name="password"
              onChange={(e) => onInputChange(e)}
              placeholder="abhi@123"
              required
            />
          </label>
          <br />
          <br />
          <input class="btn btn-primary" type="submit" value="Submit" />
        </div>
      </center>
    </form>
  );
}
export default FetchAPI;
