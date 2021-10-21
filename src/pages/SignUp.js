import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";
export default function SignUp() {
  const { signup } = useShopContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) return alert("passwords do not match");
    signup(email, password);
  };
  return (
    <div className="container">
      <div className="sign-up">
        <h2>Sign up</h2>
        <form onSubmit={submitHandler}>
          <div>
            <h4>Email</h4>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <h4>Password</h4>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <h4>Password Confirm</h4>
            <input
              type="password"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <small
            className="autofill"
            onClick={() => {
              setPassword("123456");
              setPasswordConfirm("123456");
            }}
          >
            Autofill password with "123456"
          </small>
          <button type="submit">Submit</button>
          <div>
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
