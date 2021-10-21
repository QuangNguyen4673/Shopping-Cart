import { useState } from "react";
import { Link } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useShopContext();
  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
    console.log("submit");
  };
  return (
    <div className="container">
      <div className="login">
        <h2>Login</h2>
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
          <button type="submit">Submit</button>
          <div>
            Need an account? <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
