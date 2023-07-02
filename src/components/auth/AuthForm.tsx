import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login, register } from "../../lib/API/userAPI";
import Button from "../common/Button";
import Loading from "../common/Loading";
import { theme } from "../../styles/theme";

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
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profileImgBase64, setProfileImgBase64] = useState("");

  // 메시지
  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성
  const [isDisplayName, setIsDisplayName] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

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
      } else {
        setEmailMessage("");
        setEmail(value);
      }
    } else if (name === "password") {
      // 패스워드 유효성 검사
      const rPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      if (!rPassword.test(value)) {
        setPasswordMessage(
          "숫자 + 영문 + 특수문자 조합으로 8자리 이상 입력해주세요.",
        );
      } else {
        setPasswordMessage("");
        setPassword(value);
      }
    } else if (name === "displayName") {
      // 닉네임 유효성 검사
      if (value.length <= 2 || value.length > 5) {
        setDisplayName(value);
        setIsDisplayName(true);
      } else if (value.length < 1 || value.length > 6) {
        setDisplayNameMessage("2글자 이상 5글자 미만으로 입력해주세요.");
        setIsDisplayName(false);
      }
    } else if (name === "passwordConfirm") {
      // 비밀번호 일치 유효성 검사
      if (password === value) {
        setPasswordConfirm(value);
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
      setLoading(true);
      await register(email, password, displayName, profileImgBase64).then(
        (response) => {
          if (typeof response === "string") {
            setRegisterMessage("이미 계정이 있습니다!");
            console.log(response);
          } else {
            const username = localStorage.getItem("username");
            setUsername(username || "");
            setEmail("");
            setPassword("");
            setProfileImgBase64("");
            setPasswordConfirm("");
            navigate("/");
          }
        },
      );
    }
    setTimeout(() => setLoading(false), 5000);
  };

  const onLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (email === "" || password === "") {
      // 입력값이 하나라도 없을 때 메시지 출력
      setLoginMessage("아이디와 비밀번호를 확인해주세요!");
    } else {
      // 입력값이 제대로 들어갔을 때 로그인 요청
      setLoading(true);
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
    setTimeout(() => setLoading(false), 5000);
  };

  // Render
  return (
    <>
      {loading && <Loading />}
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
                  {profileImgBase64 ? "" : <ProfileImgs><img src="/images/AdminUser.png" alt="기본 이미지" /></ProfileImgs>}
                </ProfileImage>
                <RegisterInputBlock>
                  <ImageLabel>프로필 이미지</ImageLabel>
                  <ImageMessage className={profileImgBase64 ? "message" : ""}>
                    {profileImgBase64
                      ? "이미지 업로드 완료"
                      : "선택된 파일 없음"}
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
                  disabled={!passwordConfirm}
                >
                  회원가입
                </RegisterButton>
              </RegisterForm>
              <RegisterErrorMessage>{registerMessage}</RegisterErrorMessage>
            </>
          )}
        </StyledForm>
      </AuthFormBlock>
    </>
  );
}

// Style
const AuthFormBlock = styled.div`
  border-radius: 1rem;
  padding-bottom: 40px;
  border: 1px solid ${theme.colors.gray[3]};
  h3 {
    padding-top: 30px;
    text-align: center;
    margin: 20px 0;
    font-weight: 700;
    font-size: 1.5rem;
    font-family: 'GmarketSans';
  }
`;

const ProfileImgs = styled.div`
  background-color: ${theme.colors.white};
  justify-content: center;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  border-radius: 100%;
  img {
    border-radius: 100%;
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
  width: 100%;
  border: none;
  display: flex;
  color: #b7b7b7;
  height: 3.125rem;
  align-items: center;
  background: ${theme.colors.gray[2]};
  justify-content: center;
  /* border: 1px solid #ccc; */
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
  outline: none;
  width: 200px;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  background: ${theme.colors.gray[2]};
  border: 1px solid ${theme.colors.gray[3]};
  &:focus {
    border: 1px solid #707070;
  }
  &::placeholder {
    color: ${theme.colors.gray[3]};
  }
`;

const LoginError = styled.span`
  color: #f00;
  font-weight: 700;
  margin-top: 1.25rem;
`;

const ErrorMessage = styled.span`
  color: #f00;
  font-size: 12px;
  font-weight: 700;
  align-self: flex-end;
  &.success {
    color: #229bff;
  }
  &.failure {
    color: #f00;
  }
`;

const LoginButton = styled(Button)`
  height: 100%;
  width: 90px;
  font-weight: 400;
`;

// Register
const RegisterForm = styled.div`
  gap: 10px;
  display: flex;
  width: 330px;
  flex-direction: column;
`;

const ProfileImage = styled.div<{ profileImg?: string }>`
  width: 120px;
  height: 120px;
  display: flex;
  align-self: center;
  background: #ccc;
  border-radius: 50%;
  align-items: center;
  margin-bottom: 20px;
  margin-bottom: 36px;
  background-size: cover;
  justify-content: center;
  border: 1px solid #ccc;
  background-position: center center;
  background-image: url(${(props) => props.profileImg});
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
  &::after {
    content: "*";
    margin: 0 4px;
    color: ${theme.colors.orange.main};
    font-size: 14px;
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
    color: ${theme.colors.orange.main};
  }
`;

const ImageUpload = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  width: 60px;
  height: 26px;
  display: flex;
  cursor: pointer;
  font-size: 13px;
  transition: 0.3s;
  line-height: 24px;
  border-radius: 20px;
  justify-content: center;
  color: ${theme.colors.orange.main};
  border: 1px solid ${theme.colors.orange.main};
  &:hover {
    color: ${theme.colors.white};
    background-color: ${theme.colors.orange.main};
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
