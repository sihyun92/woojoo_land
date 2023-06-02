import { FormEvent, useState } from "react";
import { login, logout } from "../../lib/API/authAPI";

function AuthPage() {
  // hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onChange = (event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(email, password);
    await login(email, password);
    const username = localStorage.getItem("username");
    setUsername(username || "");
    setEmail("");
    setPassword("");
  };
  const onLogout = async () => {
    await logout();
    localStorage.removeItem("Token");
    localStorage.removeItem("username");
    setUsername("");
  };
  return (
    <>
      <h1>{username}</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          required
          value={email}
          placeholder="email"
          onChange={onChange}
          name="email"
        />
        <input
          type="password"
          required
          value={password}
          placeholder="password"
          onChange={onChange}
          name="password"
        />
        <button type="submit">확인</button>
        <button onClick={onLogout}>로그아웃</button>
      </form>
    </>
  );
}

export default AuthPage;
