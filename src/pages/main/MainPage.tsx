import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../lib/API/userAPI";
import styled from "styled-components";
import MainCommet from "../../components/main/MainCommet";

interface IMainPageProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

function MainPage({ username, setUsername }: IMainPageProps) {
  const onLogout = async () => {
    await logout();
    localStorage.removeItem("Token");
    localStorage.removeItem("username");
    setUsername("");
  };
  return (
    <Main>
      <Inner>
        <MainCommet />
        <div>
          <h1>MainPage</h1>
          {username ? (
            <>
              <h2>{username}</h2>
              <button onClick={onLogout}>로그아웃</button>
            </>
          ) : (
            <Link to="/auth/login">로그인</Link>
          )}
        </div>
      </Inner>
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
`;

const Inner = styled.div`
  max-width: 75rem;
  width: 75rem;
  margin: 0 auto;
`;

export default MainPage;
