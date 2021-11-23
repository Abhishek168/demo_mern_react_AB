import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DisplayUser = ({ token }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/user", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        const allData = resp.data;
        setUser(allData);
      })
      .catch((err) => {
        console.log("~ err", err);
      });
  }, []);

  const userDeleteHandler = (id) => {
    axios
      .delete(`http://localhost:4000/user/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        const filteredData = user.filter((ele) => ele._id !== id);
        console.log("~ filteredData", filteredData);
        setUser(filteredData);
        console.log("~ resp", resp);
      })
      .catch((err) => {
        console.log("~ err", err);
      });
  };

  return (
    <>
      <h2>ALl user</h2>
      <div className="displayContainer mt-5">
        <h2>Manage Employee</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Index</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {user.map((ele, index) => (
              <tr key={ele._id}>
                <td>{index + 1}</td>
                <td>{ele.firstName}</td>
                <td>{ele.lastName}</td>
                <td>{ele.email}</td>
                <td>{ele.password}</td>
                <div
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Link className="nav-link" to={`/addUser/${ele._id}`}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </Link>
                  <i
                    onClick={() => userDeleteHandler(ele._id)}
                    className="fa fa-trash-o"
                    aria-hidden="true"
                  ></i>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DisplayUser;
