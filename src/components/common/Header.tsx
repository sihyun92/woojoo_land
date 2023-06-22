import { theme } from "../../styles/theme";
import styled from "styled-components";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineShoppingCart, MdSearch } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { logout, check } from "../../lib/api/userAPI";
import SubHeader from "./SubHeader";

interface IMainPageProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

function Header({ username, setUsername }: IMainPageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  });

  const getUserInfo = async () => {
    const res = await check();
    setUsername(res.displayName);
  };

  const onLogout = async () => {
    await logout();
    localStorage.removeItem("Token");
    localStorage.removeItem("username");
    localStorage.clear();
    setUsername("");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  // MainPage에서만 SubHeader 컴포넌트 출력
  const location = useLocation();

  const getSubHeader = () => {
    if (location.pathname === "/") {
      return <SubHeader />;
    } else {
      return null;
    }
  };

  return (
    <>
      <HeaderContainer>
        <HeaderWrapper>
          <Link to="/">
            <img src="/images/Logo.svg" alt="우주부동산" width={250} />
          </Link>
          <Search>
            <SearchInput type="text" />
            <MdSearch />
          </Search>
          <User>
            <Auth>
              {username ? (
                <>
                  <h2>{username}</h2>
                  <span>|</span>
                  <LogoutBtn onClick={onLogout}>로그아웃</LogoutBtn>
                </>
              ) : (
                <>
                  <Link to="/auth/login">로그인</Link>
                  <span>|</span>
                  <Link to="/auth/register">회원가입</Link>
                </>
              )}
            </Auth>
            <LinkWrapper>
              <Link to="/like">
                <IoMdHeartEmpty />
              </Link>
              <Link to="/cart">
                <MdOutlineShoppingCart />
              </Link>
              <Link to="/user">
                <UserImg>
                  <img src="/images/User.png" alt="프로필" />
                </UserImg>
              </Link>
            </LinkWrapper>
          </User>
        </HeaderWrapper>
      </HeaderContainer>
      {getSubHeader()}
    </>
  );
}
const HeaderContainer = styled.header`
  width: 100%;
  height: 9.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff6214;
  border-bottom: 1px solid ${theme.colors.gray};
`;

const HeaderWrapper = styled.div`
  max-width: 75rem;
  width: 75rem;
  height: 5rem;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
`;

const Search = styled.div`
  display: flex;
  position: relative;
  margin-right: 3.75rem;
  svg {
    color: ${theme.colors.orange.main};
    font-size: 1.75rem;
    position: absolute;
    right: 0.75rem;
    top: calc((3rem - 1.8rem) / 2);
    cursor: pointer;
  }
`;

const SearchInput = styled.input`
  width: 26.25rem;
  height: 3rem;
  border: none; // 검색바 선 제거
  border-radius: 0.625rem;
  padding-left: 0.5rem;
  &:focus {
    outline: none;
  }
`;

const User = styled.div`
  flex-direction: column;
  display: flex;
  width: 8.25rem;
  height: 66px;
`;
const Auth = styled.div`
  justify-content: space-between;
  color: ${theme.colors.white};
  display: flex;
`;

const LogoutBtn = styled.button`
  color: ${theme.colors.white};
  background: none;
  cursor: pointer;
  border: none;
  height: 1rem;
  padding: 0;
`;

const LinkWrapper = styled.div`
  justify-content: space-between;
  margin-top: auto;
  display: flex;
  align-items: center;

  > a {
    font-size: 30px;
    margin: auto 0;

    > svg {
      color: ${theme.colors.white};
      font-size: 24px;
      margin-top: 8px;
    }
  }
`;

const UserImg = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 100%;
  display: flex;
  height: 40px;
  width: 40px;

  img {
    border-radius: 100%;
  }
`;

export default Header;
