import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../lib/API/authAPI";

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
  );
}

export default MainPage;
