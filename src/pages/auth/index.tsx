import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../../lib/API/authAPI";

// interface
interface IAuthPageProps {
  setUsername: Dispatch<SetStateAction<string>>;
}

// component
function AuthPage({setUsername}: IAuthPageProps) {
  // hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // function
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
    navigate("/");
  };

  // render
  return (
    <AuthContainer>
      <AuthForm onSubmit={onSubmit}>
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
        <button type="submit">로그인</button>
      </AuthForm>
    </AuthContainer>
  );
}

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    padding: 0.5rem 1rem;
  }
`;

export default AuthPage;
