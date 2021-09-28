import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { register } from "../../redux/actions/auth";

function Register() {
  // get user auth state
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  // state for form
  const [formData, setFormData] = useState(initialState);

  // onChange input event
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit the formdata
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
    setFormData(initialState);
  };

  if (isAuthenticated) {
    return <Redirect to="/post" />;
  }

  return (
    <div className="center">
      <div className="card shadow p-4 m-5 bg-body rounded">
        <h4>Register</h4>
        <hr />
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label class="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              class="form-control"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Last Name</label>
            <input
              type="text"
              class="form-control"
              name="lastName"
              value={formData.lastName}
              required
              onChange={handleChange}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
