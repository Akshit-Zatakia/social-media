import React from "react";

function Login() {
  return (
    <div className="center">
      <div className="card shadow p-4 m-5 bg-body rounded">
        <h4>Login</h4>
        <hr />
        <form>
          <div class="mb-3">
            <label class="form-label">Email address</label>
            <input type="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" required />
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
