import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Users from "./Users";
import Signup from "./Signup";
import NotFound from "./NotFound";
import DefaultLayout from "./DefaultLayout";
import GuestLayout from "./GuestLayout";
import Dashboard from "./Dashboard";
import UserForm from "./UserForm";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Users />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/users/new"
              element={<UserForm key={"userCreate"} />}
            />
            <Route
              path="/users/:id"
              element={<UserForm key={"userUpdate"} />}
            />
          </Route>
          <Route path="/" element={<GuestLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
