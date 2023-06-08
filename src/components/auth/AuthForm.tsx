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
  login: "이메일 로그인",
  register: "회원가입",
};

const PARAMS = {
  login: "/auth/login",
  register: "/auth/register",
};

function AuthForm({ type, setUsername }: IAuthFormProps) {
  const text = textMap[type];

  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profileImgBase64, setProfileImgBase64] = useState("");
  const navigate = useNavigate();

  const onLoginChange = (event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onRegisterChange = (event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    if (name === "email") {
      const rEmail =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (!rEmail.test(value)) {
        setEmailError("이메일 형식으로 적어주세요!");
        setIsEmail(false);
      } else {
        setEmail(value);
        setIsEmail(true);
      }
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
    if (email === "" || password === "") {
      setLoginError("아이디와 비밀번호를 확인해주세요!");
    } else {
      await login(email, password);
      const username = localStorage.getItem("username");
      setUsername(username || "");
      setEmail("");
      setPassword("");
      navigate("/");
    }
  };

  return (
    <AuthFormBlock>
      <Tab>
        {/* NavLink를 Styled-Components로 스타일링 */}
        <TabButton to={PARAMS.login}>로그인</TabButton>
        <TabButton to={PARAMS.register}>회원가입</TabButton>
      </Tab>
      <h3>{text}</h3>
      <StyledForm onSubmit={type === "login" ? onLogin : onRegister}>
        {/* Login */}
        {type === "login" && (
          <>
            <LoginForm>
              <LoginInputWrapper>
                <StyledInput
                  autoComplete="email"
                  name="email"
                  placeholder="이메일 입력"
                  onChange={onLoginChange}
                />
                <StyledInput
                  type="password"
                  autoComplete="new-password"
                  name="password"
                  placeholder="비밀번호 입력"
                  onChange={onLoginChange}
                />
              </LoginInputWrapper>
              <LoginButton login>로그인</LoginButton>
            </LoginForm>
            <span>{loginError}</span>
          </>
        )}
        {/* Register */}
        {type === "register" && (
          <RegisterForm>
            <ProfileImage>프로필 이미지</ProfileImage>
            <RegisterInputBlock>
              <span>닉네임</span>
              <StyledInput
                autoComplete="displayName"
                name="displayName"
                placeholder="닉네임"
                onChange={onRegisterChange}
              />
            </RegisterInputBlock>
            <RegisterInputBlock>
              <span>이메일</span>
              <StyledInput
                autoComplete="email"
                name="email"
                placeholder="이메일"
                onChange={onRegisterChange}
              />
            </RegisterInputBlock>
            <RegisterInputBlock>
              <span>비밀번호</span>
              <StyledInput
                type="password"
                autoComplete="new-password"
                name="password"
                placeholder="패스워드"
                onChange={onRegisterChange}
              />
            </RegisterInputBlock>
            <RegisterInputBlock>
              <span>비밀번호 확인</span>
              <StyledInput
                type="password"
                autoComplete="new-password"
                name="passwordConfirm"
                placeholder="패스워드 확인"
                onChange={onRegisterChange}
              />
            </RegisterInputBlock>
            <RegisterButton register fullWidth>
              회원가입
            </RegisterButton>
          </RegisterForm>
        )}
      </StyledForm>
    </AuthFormBlock>
  );
}

// Style
const AuthFormBlock = styled.div`
  border-radius: 1rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  padding-bottom: 40px;
  h3 {
    padding-top: 30px;
    text-align: center;
    margin: 20px 0;
    font-weight: 700;
    font-size: 1.5rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Tab = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TabButton = styled(NavLink)`
  background: #f4f4f4;
  width: 100%;
  height: 3.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border: none;
  color: #818181;
  &:first-child {
    border-radius: 16px 0 0 0;
  }
  &:last-child {
    border-radius: 0 16px 0 0;
  }
  /* .active라는 클래스이름을 넣어주면 라우팅되면서 active라는 클래스이름이 자동으로 적용 */
  &.active {
    background: #fff;
    font-weight: 700;
    color: #000;
  }
`;

// Login
const LoginForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 80px;
`;

const LoginInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 8px;
`;

const StyledInput = styled.input`
  font-size: 0.875rem;
  outline: none;
  border: 1px solid #ccc;
  padding: 0.5rem;
  width: 200px;
  background: #ccc;
  border-radius: 4px;
  &:focus {
    border: 1px solid #707070;
  }
`;

const LoginButton = styled(Button)`
  height: 100%;
`;

// Register
const RegisterForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  background: #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: 20px;
`;

const RegisterInputBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  span {
    font-size: 0.875rem;
    font-weight: 700;
  }
`;

const RegisterButton = styled(Button)`
  margin-top: 1rem;
`;

export default AuthForm;
