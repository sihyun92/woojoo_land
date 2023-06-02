import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { register } from "../../lib/API/authAPI";

// interface
interface IRegisterPageProps {
  setUsername: Dispatch<SetStateAction<string>>;
}

// component
function RegisterPage({ setUsername }: IRegisterPageProps) {
  // hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profileImgBase64, setProfileImgBase64] = useState("");
  const navigate = useNavigate();

  // function
  const onChange = (event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(email, password);
    await register(email, password, displayName, profileImgBase64);
    const username = localStorage.getItem("username");
    setUsername(username || "");
    setEmail("");
    setPassword("");
    setProfileImgBase64("");
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
          placeholder="이메일"
          onChange={onChange}
          name="email"
        />
        <input
          type="password"
          required
          value={password}
          placeholder="비밀번호"
          onChange={onChange}
          name="password"
        />
        <input
          type="text"
          required
          value={displayName}
          placeholder="닉네임"
          onChange={onChange}
          name="displayName"
        />
        <button type="submit">회원가입</button>
      </AuthForm>
      <button onClick={() => navigate("/auth/login")}>로그인</button>
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

export default RegisterPage;
