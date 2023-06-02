import { FormEvent, useState } from "react";

function UserPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const headers = {
    "content-type": "application/json",
    apikey: "KDT5_nREmPe9B",
    username: "KDT5_TeamAirPod8",
  };

  //로그인 함수
  async function Login() {
    const res = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );
    const result = await res.json();
    setUserName(result.user.displayName);
    console.log(result.user.displayName);
    console.log(result.accessToken);
    localStorage.setItem("Token", result.accessToken);
  }

  //로그아웃 함수
  async function LogOut() {
    const res = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout",
      {
        method: "POST",
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      },
    );
    setUserName("");
  }

  async function handleLogOut() {
    await LogOut();
    localStorage.removeItem("Token");
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(email, password);
    await Login();
    setEmail("");
    setPassword("");
  }

  function onChange(event: FormEvent) {
    const { name, value } = event.target as HTMLInputElement;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }
  return (
    <>
      <h2>UserPage - 사용자 관련 페이지 입니다!</h2>
      {userName ? <h2>{userName}님 반갑습니다</h2> : ""}
      <form onSubmit={onSubmit}>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="email"
        />
        <input
          required
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="password"
        />
        <button type="submit">확인</button>
      </form>
      <button onClick={handleLogOut}>로그아웃</button>
    </>
  );
}

export default UserPage;
