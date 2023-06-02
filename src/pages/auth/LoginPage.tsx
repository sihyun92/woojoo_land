import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/common/Button";
import { login } from "../../lib/API/authAPI";

// interface
interface ILoginPageProps {
  setUsername: Dispatch<SetStateAction<string>>;
}

// component
function LoginPage({ setUsername }: ILoginPageProps) {
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
      <AuthTab>
        <Button active onClick={() => navigate("/auth/login")}>
          로그인
        </Button>
        <Button onClick={() => navigate("/auth/register")}>회원가입</Button>
      </AuthTab>
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
          placeholder="패스워드"
          onChange={onChange}
          name="password"
        />
        <Button auth type="submit">
          로그인
        </Button>
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

const AuthTab = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  input {
    padding: 0.5rem 1rem;
  }
`;

export default LoginPage;
