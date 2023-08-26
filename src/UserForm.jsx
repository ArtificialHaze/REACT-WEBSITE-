import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "./axios-client";
import { useStateContext } from "./ContextProvider";

const UserForm = () => {
  const { id } = useParams();
  const { setNotification } = useStateContext();

  const navigate = useNavigate();

  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          setNotification("User was successfully updated");
          navigate("/users");
        })
        .catch((err) => {
          console.log(err);
          setErrors(err.data.errors);
        });
    } else {
      axiosClient
        .post(`/users}`, user)
        .then(() => {
          setNotification("User was successfully created");
          navigate("/users");
        })
        .catch((err) => {
          console.log(err);
          setErrors(err.data.errors);
        });
    }
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setIsLoading(false);
          setUser(data);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      {user.id && <h1>Update user: {user.name}</h1>}
      {!user.id && <h1>New user</h1>}
      <div className="card animated fadeInDown">
        {isLoading && <div className="text-center">Loading..</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!isLoading && (
          <form action="#" onSubmit={onSubmit}>
            <input
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
              type="text"
              placeholder="Name.."
            />
            <input
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              type="email"
              placeholder="Email.."
            />
            <input
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Password.."
            />
            <input
              onChange={(e) =>
                setUser({ ...user, password_confirm: e.target.value })
              }
              type="password"
              placeholder="Confirmation.."
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
};

export default UserForm;
