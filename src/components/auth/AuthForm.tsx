import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login, register } from "../../lib/API/userAPI";
import Button from "../common/Button";

// Interface
interface IAuthFormProps {
  type: string;
  setUsername: Dispatch<SetStateAction<any>>;
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

function AuthForm({ type, setUsername }: IAuthFormProps) {
  // 컴포넌트 타입에 따른 제목
  const text = textMap[type];

  // Hooks
  // 입력 / 출력
  const [email, setEmail] = useState("");
  const [displayNameMessage, setDisplayNameMessage] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profileImgBase64, setProfileImgBase64] = useState("");

  // 메시지
  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isDisplayName, setIsDisplayName] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  // 라우팅
  const navigate = useNavigate();

  // Function
  const onLoginChange = (event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onRegisterChange = (event: FormEvent) => {
    const { name, value, files } = event.target as HTMLInputElement;
    if (name === "email") {
      // 이메일 유효성 검사
      const rEmail =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (!rEmail.test(value)) {
        setEmailMessage("이메일 형식으로 적어주세요.");
        setIsEmail(false);
      } else {
        setEmailMessage("");
        setEmail(value);
        setIsEmail(true);
      }
    } else if (name === "password") {
      // 패스워드 유효성 검사
      const rPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      if (!rPassword.test(value)) {
        setPasswordMessage(
          "숫자 + 영문 + 특수문자 조합으로 8자리 이상 입력해주세요.",
        );
        setIsPassword(false);
      } else {
        setPasswordMessage("");
        setPassword(value);
        setIsPassword(true);
      }
    } else if (name === "displayName") {
      // 닉네임 유효성 검사
      if (value.length < 2 || value.length > 5) {
        setDisplayName(value);
        setIsDisplayName(true);
      } else {
        setDisplayNameMessage("2글자 이상 5글자 미만으로 입력해주세요.");
        setIsDisplayName(false);
      }
    } else if (name === "passwordConfirm") {
      // 비밀번호 일치 유효성 검사
      if (password === value) {
        setPasswordConfirmMessage("비밀번호가 일치합니다.");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
        setIsPasswordConfirm(false);
      }
    } else if (name === "profileImgBase64") {
      const file = files as FileList;
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      return new Promise<void>((resolve) => {
        reader.onload = () => {
          setProfileImgBase64(reader.result as string);
          resolve();
        };
      });
    }
  };

  const onRegister = async (event: FormEvent) => {
    event.preventDefault();
    if (email === "" || password === "" || displayName === "") {
      // 입력값이 하나라도 없을 때 메시지 출력
      setRegisterMessage("필수 입력 사항입니다!");
    } else {
      // 입력값이 제대로 들어갔을 때 회원가입 요청
      await register(email, password, displayName, profileImgBase64);
      const username = localStorage.getItem("username");
      setUsername(username || "");
      setEmail("");
      setPassword("");
      setProfileImgBase64("");
      navigate("/");
    }
  };

  const onLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (email === "" || password === "") {
      // 입력값이 하나라도 없을 때 메시지 출력
      setLoginMessage("아이디와 비밀번호를 확인해주세요!");
    } else {
      // 입력값이 제대로 들어갔을 때 로그인 요청
      const username = localStorage.getItem("username");
      await login(email, password).then((response) => {
        if (response === undefined) {
          setLoginMessage("아이디와 비밀번호를 확인해주세요!");
        } else {
          event.preventDefault();
          setUsername(username || "");
          setEmail("");
          setPassword("");
          navigate("/", {
            state: { name: localStorage.getItem("username") },
          });
        }
      });
    }
  };

  // Render
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
              <LoginButton disabled={!email} login>
                로그인
              </LoginButton>
            </LoginForm>
            <LoginError>{loginMessage}</LoginError>
          </>
        )}
        {/* Register */}
        {type === "register" && (
          <>
            <RegisterForm>
              <ProfileImage profileImg={profileImgBase64}>
                {profileImgBase64 ? "" : "프로필 이미지"}
              </ProfileImage>
              <RegisterInputBlock>
                <ImageLabel>프로필 이미지</ImageLabel>
                <ImageMessage className={profileImgBase64 ? "message" : ""}>
                  {profileImgBase64 ? "이미지 업로드 완료" : "선택된 파일 없음"}
                </ImageMessage>
                <UploadButton htmlFor="imageUpload">업로드</UploadButton>
                <ImageUpload
                  multiple
                  type="file"
                  name="profileImgBase64"
                  onChange={onRegisterChange}
                  accept="image/*"
                  id="imageUpload"
                />
              </RegisterInputBlock>
              <RegisterInputBlock>
                <RegisterLabel>닉네임</RegisterLabel>
                <StyledInput
                  autoComplete="displayName"
                  name="displayName"
                  placeholder="닉네임"
                  onChange={onRegisterChange}
                />
              </RegisterInputBlock>
              {isDisplayName && (
                <ErrorMessage>{displayNameMessage}</ErrorMessage>
              )}
              <RegisterInputBlock>
                <RegisterLabel>이메일</RegisterLabel>
                <StyledInput
                  autoComplete="email"
                  name="email"
                  placeholder="이메일"
                  onChange={onRegisterChange}
                />
              </RegisterInputBlock>
              {emailMessage && <ErrorMessage>{emailMessage}</ErrorMessage>}
              <RegisterInputBlock>
                <RegisterLabel>비밀번호</RegisterLabel>
                <StyledInput
                  type="password"
                  autoComplete="new-password"
                  name="password"
                  placeholder="패스워드"
                  onChange={onRegisterChange}
                />
              </RegisterInputBlock>
              {passwordMessage && (
                <ErrorMessage>{passwordMessage}</ErrorMessage>
              )}
              <RegisterInputBlock>
                <RegisterLabel>비밀번호 확인</RegisterLabel>
                <StyledInput
                  type="password"
                  autoComplete="new-password"
                  name="passwordConfirm"
                  placeholder="패스워드 확인"
                  onChange={onRegisterChange}
                />
              </RegisterInputBlock>
              {passwordConfirmMessage && (
                <ErrorMessage
                  className={isPasswordConfirm ? "success" : "failure"}
                >
                  {passwordConfirmMessage}
                </ErrorMessage>
              )}
              <RegisterButton
                type="submit"
                register
                fullWidth
                disabled={
                  !(isEmail && isDisplayName && isPassword && isPasswordConfirm)
                }
              >
                회원가입
              </RegisterButton>
            </RegisterForm>
            <RegisterErrorMessage>{registerMessage}</RegisterErrorMessage>
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

const ProfileImage = styled.div<{ profileImg?: string }>`
  width: 120px;
  height: 120px;
  background: #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: 20px;
  background-image: url(${(props) => props.profileImg});
  background-size: cover;
  background-position: center center;
  border: 1px solid #ccc;
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

const ImageLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
`;

const ImageMessage = styled.span`
  font-size: 12px;
  color: #818181;
  &.message {
    color: #f00;
  }
`;

const ImageUpload = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  cursor: pointer;
  border: 1px solid #ff6214;
  padding: 4px 8px;
  border-radius: 30px;
  font-size: 14px;
  color: #ff6214;
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
