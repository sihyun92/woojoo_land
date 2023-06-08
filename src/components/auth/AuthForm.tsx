import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login, register } from "../../lib/API/userAPI";
import Button from "../common/Button";

interface IAuthFormProps {
  type: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

interface ITextMap {
  [key: string]: string;
}

const textMap: ITextMap = {
  login: "로그인",
  register: "회원가입",
};

const PARAMS = {
  login: "/auth/login",
  register: "/auth/register",
};

function AuthForm({ type, setUsername }: IAuthFormProps) {
  const text = textMap[type];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profileImgBase64, setProfileImgBase64] = useState("");
  const navigate = useNavigate();

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

  const onLogin = async (event: FormEvent) => {
    event.preventDefault();
    await login(email, password);
    const username = localStorage.getItem("username");
    setUsername(username || "");
    setEmail("");
    setPassword("");
    navigate("/");
  };

  return (
    <AuthFormBlock>
      <Tab>
        <TabButton to={PARAMS.login}>로그인</TabButton>
        <TabButton to={PARAMS.register}>회원가입</TabButton>
      </Tab>
      <form onSubmit={type === "login" ? onLogin : onRegister}>
        <StyledInput
          autoComplete="email"
          name="email"
          placeholder="이메일"
          onChange={onChange}
        />
        <StyledInput
          type="password"
          autoComplete="new-password"
          name="password"
          placeholder="패스워드"
          onChange={onChange}
        />
        {type === "register" && (
          <StyledInput
            autoComplete="displayName"
            name="displayName"
            placeholder="닉네임"
            onChange={onChange}
          />
        )}
        {type === "login" ? (
          <AuthButton fullWidth>로그인</AuthButton>
        ) : (
          <AuthButton fullWidth>회원가입</AuthButton>
        )}
      </form>
    </AuthFormBlock>
  );
}

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: #333;
    margin-bottom: 1rem;
  }
`;

const Tab = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    padding: 0.5rem 1rem;
    background: #fff;
    width: 100%;
    text-align: center;
    border: 1px solid #ccc;
    &:last-child {
      background: #333;
    }
  }
`;

const TabButton = styled(NavLink)`
  padding: 0.5rem 1rem;
  background: #fff;
  width: 100%;
  text-align: center;
  border: 1px solid #ccc;
  &:last-child {
    background: #333;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  outline: none;
  border: 1px solid #ccc;
  padding-bottom: 0.5rem;
  width: 100%;
  &:focus {
    border: 1px solid #707070;
  }
  & + & {
    margin-top: 1rem;
  }
`;

const AuthButton = styled(Button)`
  margin-top: 1rem;
`;

export default AuthForm;
