import { ChangeEvent, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { check, userUpdate } from "../../lib/API/userAPI";
import UserTitle from "./UserTitle";
import GrayInput from "../common/GrayInput";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({
    displayName: "",
    profileImgBase64: "",
    oldPassword: "",
    newPassword: "",
  });
  const [result, setResult] = useState("");
  const [isError, setIsError] = useState(false);
  const [originalImg, setOriginalImg] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [imgName, setImgName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getEmailAndImg();
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

  // emailr과 프로필 이미지 불러오기
  const getEmailAndImg = async () => {
    const res = await check();
    setEmail(res.email);
    setOriginalImg(res.profileImg);
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
          profileImgBase64: "",
          oldPassword: "",
          newPassword: "",
        });
        setTimeout(() => navigate("/user"), 1200);
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

  // 사진 파일을 선택하면 해당 이미지를 base64 형태로 읽어 User와 ProfileImg에 전달
  const changeImg = (event: ChangeEvent<HTMLInputElement>) => {
    const { files, name } = event.target;
    const reader = new FileReader();
    for (const file of files as FileList) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProfileImg(reader.result as string);
        setImgName(file.name);
        setUser((prev) => {
          return {
            ...prev,
            [name]: reader.result,
          };
        });
      };
    }
  };

  return (
    <SettingsForm>
      <UserTitle>개인 정보 수정</UserTitle>
      <SettingsBox>
        <ImgTitle>
          <span>프로필 이미지</span>
        </ImgTitle>
        <ImgInput>
          <ImgBox>
            {profileImg ? (
              <img src={profileImg} alt="Profile Img" />
            ) : (
              <img src={originalImg} alt="Profile Img" />
            )}
          </ImgBox>
          <InputBox>
            <input
              id="file"
              type="file"
              onChange={changeImg}
              name="profileImgBase64"
              accept=".jpg, .jpeg, .png, .svg"
            />
            <FileSelect htmlFor="file">파일선택</FileSelect>
            <span>{imgName ? imgName : `선택된 파일 없음`}</span>
          </InputBox>
        </ImgInput>
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

  > div {
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
const ImgInput = styled.div`
  gap: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ImgBox = styled.div`
  width: 8.5rem;
  display: flex;
  height: 8.5rem;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.colors.gray[2]};

  img {
    width: 8rem;
    height: 8rem;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const InputBox = styled.div`
  gap: 1rem;
  display: flex;
  align-items: center;

  input {
    display: none;
  }

  span {
    color: ${(props) => props.theme.colors.gray[5]};
  }
`;

const FileSelect = styled.label`
  width: 90px;
  display: flex;
  height: 1.5rem;
  transition: 0.2s;
  font-size: 0.75rem;
  align-items: center;
  border-radius: 2rem;
  justify-content: center;
  color: ${(props) => props.theme.colors.orange.main};
  border: 1px solid ${(props) => props.theme.colors.orange.main};

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.orange.main};
  }
`;

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
  transition: 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.orange.hover};
  }
`;

export default Settings;
