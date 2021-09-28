import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { login } from "../../redux/actions/auth";

function Login() {
  // get user auth state
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const initialState = {
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
    dispatch(login(formData));
    setFormData(initialState);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="center">
      <div className="card shadow p-4 m-5 bg-body rounded">
        <h4>Login</h4>
        <hr />
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              required
              onChange={handleChange}
              value={formData.email}
              name="email"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              required
              onChange={handleChange}
              value={formData.password}
              name="password"
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
