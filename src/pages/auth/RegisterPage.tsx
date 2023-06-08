import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthForm from "../../components/auth/AuthForm";
import AuthTemplate from "../../components/auth/AuthTemplate";
import Button from "../../components/common/Button";
import { register } from "../../lib/API/userAPI";

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
  const onRegisterChange = (event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  const onRegister = async (event: FormEvent) => {
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
    <>
      <AuthContainer>
        <AuthTemplate>
          <AuthForm type="register" />
        </AuthTemplate>
        <AuthTab>
          <Button onClick={() => navigate("/auth/login")}>로그인</Button>
          <Button active onClick={() => navigate("/auth/register")}>
            회원가입
          </Button>
        </AuthTab>
        <AuthFormI onSubmit={onRegister}>
          <input
            type="text"
            required
            value={email}
            placeholder="이메일"
            onChange={onRegisterChange}
            name="email"
          />
          <input
            type="password"
            required
            value={password}
            placeholder="비밀번호"
            onChange={onRegisterChange}
            name="password"
          />
          <input
            type="text"
            required
            value={displayName}
            placeholder="닉네임"
            onChange={onRegisterChange}
            name="displayName"
          />
          <Button auth type="submit">
            회원가입
          </Button>
        </AuthFormI>
      </AuthContainer>
    </>
  );
}

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
`;

const AuthTab = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const AuthFormI = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  input {
    padding: 0.5rem 1rem;
  }
`;

export default RegisterPage;
