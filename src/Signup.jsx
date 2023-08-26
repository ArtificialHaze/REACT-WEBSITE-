import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "./axios-client";
import { useStateContext } from "./ContextProvider";

const Signup = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirm: passwordConfirmRef.current.value,
    };

    axiosClient
      .post("/signup", payload)
      .then((data) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const res = err.response;
        if (res && res.status === 422) {
          setErrors(res.data.errors);
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form action="#" onSubmit={onSubmit}>
          <h1 className="title">Sign up for free</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <input ref={nameRef} type="text" placeholder="Full name.." />
          <input ref={emailRef} type="email" placeholder="Email.." />
          <input ref={passwordRef} type="password" placeholder="Password.." />
          <input
            ref={passwordConfirmRef}
            type="password"
            placeholder="Confirmation.."
          />
          <button className="btn btn-block">Signup</button>
          <p className="message">
            Already registered? <Link to={"/login"}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
