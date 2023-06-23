import { ChangeEvent, FormEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login, register } from "../../lib/API/userAPI";
import Button from "../common/Button";

// Interface
interface IAuthFormProps {
  type: string;
  // setUsername: Dispatch<SetStateAction<string>>;
  onSubmit: (event: ChangeEvent<HTMLFormElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  form: {
    email: string;
    password: string;
    passwordConfirm?: string;
    displayName?: string;
    profileImgBase64?: string;
  };
}

interface ITextMap {
  [key: string]: string;
}

// Constant / Variable
const textMap: ITextMap = {
  // 로그인 / 회원가입에 따른 제목
  login: "이메일 로그인",
  register: "회원가입",
};

const PARAMS = {
  // URL 파리미터 End-Point
  login: "/auth/login",
  register: "/auth/register",
};

function AuthForm({ type, form, onChange, onSubmit }: IAuthFormProps) {
  // 컴포넌트 타입에 따른 제목
  const text = textMap[type];
  // // 라우팅
  const navigate = useNavigate();

  // Render
  return (
    <AuthFormBlock>
      <Tab>
        {/* NavLink를 Styled-Components로 스타일링 */}
        <TabButton to={PARAMS.login}>로그인</TabButton>
        <TabButton to={PARAMS.register}>회원가입</TabButton>
      </Tab>
      <h3>{text}</h3>
      <StyledForm onSubmit={onSubmit}>
        {/* Login */}
        {type === "login" && (
          <>
            <LoginForm>
              <LoginInputWrapper>
                <StyledInput
                  autoComplete="email"
                  name="email"
                  placeholder="이메일 입력"
                  onChange={onChange}
                  value={form.email}
                />
                <StyledInput
                  type="password"
                  autoComplete="new-password"
                  name="password"
                  placeholder="비밀번호 입력"
                  onChange={onChange}
                  value={form.password}
                />
              </LoginInputWrapper>
              <LoginButton login>로그인</LoginButton>
            </LoginForm>
            {/* <LoginError>{loginMessage}</LoginError> */}
          </>
        )}
        {/* Register */}
        {type === "register" && (
          <>
            <RegisterForm>
              <ProfileImage>프로필 이미지</ProfileImage>
              <RegisterInputBlock>
                <RegisterLabel>닉네임</RegisterLabel>
                <StyledInput
                  autoComplete="displayName"
                  name="displayName"
                  placeholder="닉네임"
                  onChange={onChange}
                  value={form.displayName}
                />
              </RegisterInputBlock>
              {/* {isDisplayName && (
                <ErrorMessage>{displayNameMessage}</ErrorMessage>
              )} */}
              <RegisterInputBlock>
                <RegisterLabel>이메일</RegisterLabel>
                <StyledInput
                  autoComplete="email"
                  name="email"
                  placeholder="이메일"
                  onChange={onChange}
                  value={form.email}
                />
              </RegisterInputBlock>
              {/* {emailMessage && <ErrorMessage>{emailMessage}</ErrorMessage>} */}
              <RegisterInputBlock>
                <RegisterLabel>비밀번호</RegisterLabel>
                <StyledInput
                  type="password"
                  autoComplete="new-password"
                  name="password"
                  placeholder="패스워드"
                  onChange={onChange}
                  value={form.password}
                />
              </RegisterInputBlock>
              {/* {passwordMessage && (
                <ErrorMessage>{passwordMessage}</ErrorMessage>
              )} */}
              <RegisterInputBlock>
                <RegisterLabel>비밀번호 확인</RegisterLabel>
                <StyledInput
                  type="password"
                  autoComplete="new-password"
                  name="passwordConfirm"
                  placeholder="패스워드 확인"
                  onChange={onChange}
                  value={form.passwordConfirm}
                />
              </RegisterInputBlock>
              {/* {passwordConfirmMessage && (
                <ErrorMessage
                  className={isPasswordConfirm ? "success" : "failure"}
                >
                  {passwordConfirmMessage}
                </ErrorMessage>
              )} */}
              <RegisterButton
                type="submit"
                register
                fullWidth
                // disabled={
                //   !(isEmail && isDisplayName && isPassword && isPasswordConfirm)
                // }
              >
                회원가입
              </RegisterButton>
            </RegisterForm>
            {/* <RegisterErrorMessage>{registerMessage}</RegisterErrorMessage> */}
          </>
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

const LoginError = styled.span`
  color: #f00;
  font-weight: 700;
  margin-top: 1.25rem;
`;

const ErrorMessage = styled.span`
  color: #f00;
  font-weight: 700;
  font-size: 12px;
  align-self: flex-end;
  &.success {
    color: #00f;
  }
  &.failure {
    color: #f00;
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
`;

const RegisterLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  &::before {
    content: "*";
    margin-right: 4px;
    color: #f00;
    font-size: 18px;
  }
`;

const RegisterButton = styled(Button)`
  margin-top: 1rem;
`;

const RegisterErrorMessage = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #f00;
  margin-top: 1rem;
`;

export default AuthForm;
