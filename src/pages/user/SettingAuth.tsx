import { ChangeEvent, FormEvent, useState } from "react";
import GrayInput from "../../components/common/GrayInput";
import UserTitle from "../../components/user/UserTitle";
import { check } from "../../lib/API/userAPI";
import PersonalSettings from "./PersonalSettings";
import styled from "styled-components";

function SettingAuth() {
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  const headers = {
    "content-type": "application/json",
    apikey: "KDT5_nREmPe9B",
    username: "KDT5_TeamAirPod8",
  };

  const getAuth = async (password: string) => {
    const userInfo = await check();
    console.log(userInfo.email);
    const response = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          email: userInfo.email,
          password,
        }),
      },
    );
    const result = await response.json();
    return result;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await getAuth(password);
    typeof res === "string"
      ? setError("정확한 비밀번호가 아닙니다.")
      : setIsChecked(true);
  };

  return (
    <>
      {isChecked ? (
        <PersonalSettings />
      ) : (
        <>
          <UserTitle>개인정보 수정 인증</UserTitle>
          <AuthBox>
            <span>비밀번호를 재확인 합니다</span>
            <form onSubmit={onSubmit}>
              <GrayInput
                value={password}
                onChange={onChange}
                required
                type="password"
              />
              <button type="submit">인증확인</button>
            </form>
            <span>{error ? error : ""}</span>
          </AuthBox>
        </>
      )}
    </>
  );
}

const AuthBox = styled.div``;

export default SettingAuth;
