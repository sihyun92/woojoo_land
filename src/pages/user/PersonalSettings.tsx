import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { userUpdate } from "../../lib/API/authAPI";

function PersonalSettings() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

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
      <h2>개인 정보 수정</h2>
      <form>
        <div>
          <span>이름</span>
          <input
            onChange={onChangeForm}
            name="displayName"
            type="text"
            placeholder=""
          />
        </div>
        <div>
          <span>기존 비밀번호</span>
          <input
            onChange={onChangeForm}
            name="oldPassword"
            type="password"
            placeholder=""
          />
        </div>
        <div>
          <span>새 비밀번호</span>
          <input
            onChange={onChangeForm}
            name="newPassword"
            type="password"
            placeholder=""
          />
        </div>
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
      </form>
    </SettingsRoute>
  );
}

const SettingsRoute = styled.main`
  display: flex;
  flex-direction: column;
`;
export default PersonalSettings;
