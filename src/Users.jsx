import React, { useEffect, useState } from "react";
import axiosClient from "./axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "./ContextProvider";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setNotification } = useStateContext();

  const getUsers = () => {
    setIsLoading(true);

    axiosClient
      .get("/users")
      .then(({ data }) => {
        setIsLoading(false);
        console.log(data);
        setUsers(data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const onDeleteClick = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    axiosClient.delete(`/users/${user.id}`).then(() => {
      setNotification("User was successfully deleted.");
      getUsers();
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Users</h1>
        <Link className="btn-add" to="/users/new">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {isLoading && (
            <tbody>
              <tr>
                <td colSpan="5" class="text-center">
                  Loading..
                </td>
              </tr>
            </tbody>
          )}
          {!isLoading && (
            <tbody>
              {users.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.created_at}</td>
                  <td>
                    <Link className="btn-edit" to={"/users/" + item.id}>
                      Edit
                    </Link>
                    &nbsp;
                    <button
                      className="btn-delete"
                      onClick={(ev) => onDeleteClick(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Users;
