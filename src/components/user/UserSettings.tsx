import { ChangeEvent, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { userUpdate, check } from "../../lib/API/userAPI";
import UserTitle from "./UserTitle";
import GrayInput from "../common/GrayInput";
import Button from "../common/Button";

function Settings() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({
    displayName: "",
    oldPassword: "",
    newPassword: "",
  });
  const [result, setResult] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getEmail();
  }, []);

  // 수정 폼 제출시 마다 result에 '수정'이라는 string이 포함되어 있지 않으면
  // error로 취급하고 아니면 ok로 취급
  // result가 변하고 2.5초 뒤에 result를 초기화해 메시지가 사라지게 처리
  useEffect(() => {
    if (result) {
      /수정/.test(result) ? setIsError(false) : setIsError(true);
    }
    setTimeout(() => {
      setResult("");
    }, 2500);
  }, [result]);

  // email 불러오기
  const getEmail = async () => {
    const res = await check();
    setEmail(res.email);
  };

  // 폼을 제출하면 유저정보를 수정하고 error 여부를 판단한다.
  // 두 비밀번호 input중 하나만 입력한 경우, 에러 메시지 저장
  // 객체가 반환되면 정상 수정 메시지를 result에 저장
  // 에러 메시지가 string으로 반환되므로 string이 반환되면 해당 메시지를 저장
  // isError에 error 여부를 판단하는 boolean을 할당해 스타일 지정
  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const message = await userUpdate(user);

    if (
      (user.oldPassword && !user.newPassword) ||
      (!user.oldPassword && user.newPassword)
    ) {
      setResult("두 개의 비밀번호를 모두 입력해야 합니다.");
      setIsError(true);
    } else {
      if (typeof message === "string") {
        setResult(message);
        setIsError(true);
      } else {
        setResult("정보가 수정되었습니다.");
        setIsError(false);
        setUser({
          displayName: "",
          oldPassword: "",
          newPassword: "",
        });
      }
    }
  };

  // input에 입력한 내용을 state에 저장
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
    <SettingsForm>
      <UserTitle>개인 정보 수정</UserTitle>
      <SettingsBox>
        <ImgTitle>
          <span>프로필 이미지</span>
        </ImgTitle>
        <ImgInput>프로필 이미지 수정 기능 영역</ImgInput>
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
            fullWidth
            type="text"
            name="displayName"
            onChange={onChangeForm}
            value={user.displayName}
            placeholder="변경할 닉네임을 입력하세요"
          />
        </NameInput>
        <PassWordTitle>
          <span>기존 비밀번호</span>
          <span>새 비밀번호</span>
        </PassWordTitle>
        <PassWordInput>
          <GrayInput
            fullWidth
            type="password"
            name="oldPassword"
            value={user.oldPassword}
            onChange={onChangeForm}
            placeholder="기존 비밀번호를 입력하세요"
          />
          <GrayInput
            fullWidth
            type="password"
            name="newPassword"
            value={user.newPassword}
            onChange={onChangeForm}
            placeholder="새 비밀번호를 입력하세요"
          />
        </PassWordInput>
      </SettingsBox>
      <Message error={isError} ok={!isError}>
        {result ? result : ""}
      </Message>
      {Object.keys(user).length ? (
        <SaveButton type="submit" onClick={onSubmit} orange middleWidth>
          저장
        </SaveButton>
      ) : (
        ""
      )}
    </SettingsForm>
  );
}

const SettingsForm = styled.form`
  width: 100%;
  position: relative;
  flex-direction: column;
`;

const SettingsBox = styled.div`
  width: 100%;
  display: grid;
  margin-bottom: 1.25rem;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 240px 80px 80px 150px;

  div {
    display: flex;
    padding: 10px 2rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray[3]};

    input {
      height: 2.5rem;
    }

    :nth-child(1),
    :nth-child(2) {
      border-top: 1px solid ${(props) => props.theme.colors.gray[3]};
    }

    :nth-child(2n-1) {
      font-weight: 700;
      font-size: 1.125rem;
      background-color: ${(props) => props.theme.colors.gray[2]};
    }
  }
`;

const ImgTitle = styled.div`
  span {
    display: block;
    margin-top: 1.25rem;
  }
`;
const ImgInput = styled.div``;
const EmailTitle = styled.div`
  align-items: center;
`;
const EmailViewer = styled.div`
  display: flex;
  font-size: 1.125rem;
  align-items: center;
`;
const NameTitle = styled.div`
  align-items: center;
`;
const NameInput = styled.div`
  display: flex;
  align-items: center;
`;
const PassWordTitle = styled.div`
  flex-direction: column;
  justify-content: space-around;
`;
const PassWordInput = styled.div`
  flex-direction: column;
  justify-content: space-around;
`;

const Message = styled.span<{
  error?: boolean;
  ok?: boolean;
}>`
  ${(props) =>
    props.error &&
    css`
      color: #f00;
      font-weight: 700;
      font-size: 1.125rem;
    `}
  ${(props) =>
    props.ok &&
    css`
      color: #0ba72d;
      font-weight: 700;
      font-size: 1.125rem;
    `}
`;

const SaveButton = styled(Button)`
  right: 0;
  font-weight: 700;
  position: absolute;
  font-size: 1.125rem;
`;

export default Settings;
