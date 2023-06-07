import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";

interface IAuthFormProps {
  type: string;
}

interface ITextMap {
  [key: string]: string;
}

const textMap: ITextMap = {
  login: "로그인",
  register: "회원가입",
};

function AuthForm({ type }: IAuthFormProps) {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <Tab>
        <Link to="/auth/login">로그인</Link>
        <Link to="/auth/register">회원가입</Link>
      </Tab>
      <form>
        <StyledInput autoComplete="email" name="email" placeholder="이메일" />
        <StyledInput
          type="password"
          autoComplete="new-password"
          name="password"
          placeholder="패스워드"
        />
        {type === "register" && (
          <StyledInput
            autoComplete="displayName"
            name="displayName"
            placeholder="닉네임"
          />
        )}
        <AuthButton fullWidth>로그인</AuthButton>
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
