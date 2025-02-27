import React from "react";
import "./Login.css";
import { UserContext } from "../../App";

export default function Login() {
  const { setUser } = React.useContext(UserContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);

  function handleLogin(e) {
    e.preventDefault();
    if (email === "" || password === "") {
      setError(true);
      setErrorMessage("Please enter all fields");
      return;
    }
    const accounts = JSON.parse(localStorage.getItem("accounts") || []);
    const foundAccount = accounts.filter(
      (account) => account.email === email && account.password === password
    );
    if (foundAccount.length > 0) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        window.location.href = "/items";
        setUser(foundAccount[0]);
      }, 2000);
      return;
    }
    setError(true);
    setErrorMessage("No user found with that email and password");
  }

  return (
    <div>
      <h1>Login Page</h1>
      <div>
        {error && <h2>{errorMessage}</h2>}
        {success && <h2>Success</h2>}
      </div>
      <form>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button onClick={handleLogin} type="submit">
          Submit
        </button>
      </form>

      <div>
        <a href="/signup">Sign Up</a>
        <a href="/reset">Reset Password</a>
        <a href="/items">Continue as Guest</a>
      </div>
    </div>
  );
}
