import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import GrayInput from "../common/GrayInput";
import UserTitle from "./UserTitle";
import styled from "styled-components";
import Button from "../common/Button";
import { useQueryClient } from "react-query";
import { ICheckData } from "../common/Header";

interface ISettingProps {
  setIsChecked: Dispatch<SetStateAction<boolean>>;
}

function SettingAuth({ setIsChecked }: ISettingProps) {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  // input 값을 state에 저장
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  // API header
  const headers = {
    "content-type": "application/json",
    apikey: "KDT5_nREmPe9B",
    username: "KDT5_TeamAirPod8",
  };

  const queryClient = useQueryClient();
  const res = queryClient.getQueryData<ICheckData>("check");

  // login API를 변형해 비밀번호 인증용 함수로 구현
  // 로그인 인증 함수인 check를 사용해 현재 로그인 된 토큰에서 email 정보를 추출
  // 로그인용 엔드포인트에 추출한 email을 전달하고 비밀번호는 사용자가 직접 입력
  const getAuth = async (password: string) => {
    if (res) {
      const response = await fetch(
        "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            email: res.email,
            password,
          }),
        },
      );
      const result = await response.json();
      return result;
    }
  };

  // 폼 제출시 비밀번호 인증 함수 동작
  // 기존 로그인 API 인증 실패시 문자열이 반환되므로 이를 이용해 인증 통과 여부 결정
  // 인증 통과시 상위 컴포넌트로 true값을 전달해 렌더링 할 컴포넌트 변경
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await getAuth(password);
    typeof res === "string"
      ? setError("잘못된 비밀번호입니다!")
      : setIsChecked(true);
    setPassword("");
  };

  return (
    <>
      <SettingRoute>
        <UserTitle>개인정보 수정 인증</UserTitle>
        <SubTitle>비밀번호를 재확인 합니다</SubTitle>
        <Form onSubmit={onSubmit}>
          <SettingInput
            required
            type="password"
            value={password}
            onChange={onChange}
            placeholder="비밀번호를 입력해주세요"
          />
          <AuthButton orange middleWidth type="submit">
            인증확인
          </AuthButton>
        </Form>
        <ErrorMessage>{error ? error : ""}</ErrorMessage>
      </SettingRoute>
    </>
  );
}

const SettingRoute = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.span`
  display: block;
  font-size: 1.125rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const SettingInput = styled(GrayInput)`
  width: 717px;
  height: 2.5rem;
  margin-right: 1rem;
`;

const AuthButton = styled(Button)`
  font-weight: 700;
  transition: 0.5s;
  font-size: 1.125rem;
  transition: 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.orange.hover};
  }
`;

const ErrorMessage = styled.span`
  color: #f00;
  display: block;
  font-weight: 700;
  margin-top: 1.25rem;
`;

export default SettingAuth;
