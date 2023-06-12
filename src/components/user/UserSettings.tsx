import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { userUpdate, check } from "../../lib/API/userAPI";
import UserTitle from "./UserTitle";
import GrayInput from "../common/GrayInput";

function Settings() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    getEmail();
  }, []);

  const getEmail = async () => {
    const res = await check();
    setEmail(res.email);
  };

  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const message = await userUpdate(user);
    if (typeof message === "string") {
      setError(message);
    }
  };

  const onChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <SettingsRoute>
      <UserTitle>개인 정보 수정</UserTitle>
      <SettingsForm>
        <ImgTitle>
          <span>프로필 이미지</span>
        </ImgTitle>
        <ImgInput></ImgInput>
        <EmailTitle>
          <span>이메일</span>
        </EmailTitle>
        <EmailViewer>
          <span>{email}</span>
        </EmailViewer>
        <NameTitle>
          <span>닉네임</span>
        </NameTitle>
        <NameInput>
          <GrayInput
            onChange={onChangeForm}
            name="displayName"
            type="text"
            placeholder=""
            fullWidth
          />
        </NameInput>
        <PassWordTitle>
          <span>기존 비밀번호</span>
          <span>새 비밀번호</span>
        </PassWordTitle>
        <PassWordInput>
          <GrayInput
            onChange={onChangeForm}
            name="oldPassword"
            type="password"
            placeholder=""
            fullWidth
          />
          <GrayInput
            onChange={onChangeForm}
            name="newPassword"
            type="password"
            placeholder=""
            fullWidth
          />
        </PassWordInput>

        {/* <div>
          <span>프로필 이미지</span>
        </div> */}
        {error ? error : ""}
        {Object.keys(user).length ? (
          <button type="submit" onClick={onSubmit}>
            저장
          </button>
        ) : (
          ""
        )}
      </SettingsForm>
    </SettingsRoute>
  );
}

const SettingsRoute = styled.div`
  width: 100%;
  flex-direction: column;
`;

const SettingsForm = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 200px 50px 50px 100px;

  // nth child 형태로 만드는게 좋을지
  // 각각 styled-compontents 형태로 만드는게 좋을지
  div {
    display: flex;
    padding: 10px 20px;
    border-bottom: 1px solid;

    :nth-child(1),
    :nth-child(2) {
      border-top: 1px solid;
    }

    :nth-child(2n-1) {
      background-color: #f4f4f4;
    }
  }
`;

const ImgTitle = styled.div``;
const ImgInput = styled.div``;
const EmailTitle = styled.div`
  align-items: center;
`;
const EmailViewer = styled.div`
  display: flex;
  align-items: center;
`;
const NameTitle = styled.div`
  align-items: center;
`;
const NameInput = styled.div``;
const PassWordTitle = styled.div`
  flex-direction: column;
  justify-content: space-around;
`;
const PassWordInput = styled.div`
  flex-direction: column;
  justify-content: space-around;
`;

export default Settings;
