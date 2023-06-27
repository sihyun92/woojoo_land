import { theme } from "../../styles/theme";
import styled from "styled-components";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineShoppingCart, MdSearch } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { check, logout } from "../../lib/API/userAPI";
import SubHeader from "./SubHeader";
import MainSearched from "../main/MainSearched";

interface IMainPageProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  clickedTag: string;
  inputText: string;
  clickTagHandler: (tag: string) => void;
  searchHandler: ChangeEventHandler<HTMLInputElement>;
}

function Header({
  username,
  setUsername,
  clickedTag,
  inputText,
  clickTagHandler,
  searchHandler,
}: IMainPageProps) {
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const ADMIN_EMAIL = process.env.REACT_APP_EMAIL;
  const ADMIN_NAME = process.env.REACT_APP_DISPLAY_NAME;
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    getUserInfo();
  });

  const getUserInfo = async () => {
    const res = await check();
    setUsername(res.displayName);
    setUserImg(res.profileImg);

    res.email === ADMIN_EMAIL && res.displayName === ADMIN_NAME
      ? setIsAdmin(true)
      : setIsAdmin(false);
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
      return (
        <SubHeader clickedTag={clickedTag} clickTagHandler={clickTagHandler} />
      );
    } else {
      return null;
    }
  };

  // input에 Focus가 해제되면 isFocused에 false를 80ms뒤에 전달
  const handleInputBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 150);
  };

  // input에 Focus가 되면 isFocused에 true를 전달
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderWrapper>
          <Logo to="/">
            <img src="/images/Logo.svg" alt="우주부동산" width={250} />
          </Logo>
          <Search>
            <SearchInput
              type="text"
              value={inputText}
              onChange={searchHandler}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
            ></SearchInput>
            <MdSearch />
            {inputText.length > 0 && isFocused && (
              <MainSearched inputText={inputText} />
            )}
          </Search>
          <User>
            <Auth>
              {isAdmin && (
                <AdminLink to="/admin">
                  <h2>관리자 페이지</h2>
                </AdminLink>
              )}
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
              <Link to="/user/like">
                <IoMdHeartEmpty />
              </Link>
              <Link to="/cart">
                <MdOutlineShoppingCart />
              </Link>
              <Link to="/user">
                <UserImg>
                  {userImg ? (
                    <img src={userImg} alt="프로필" />
                  ) : (
                    <img src="/images/User.png" alt="프로필" />
                  )}
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

const Logo = styled(Link)`
  width: 30%;
`;

const Search = styled.div`
  display: flex;
  position: relative;
  justify-content: center;

  svg {
    color: ${theme.colors.orange.main};
    font-size: 1.75rem;
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
  border: none; // 검색바 선 삭제
  border-radius: 0.625rem;
  padding-left: 1rem;
  &:focus {
    outline: none;
  }
`;

const User = styled.div`
  flex-direction: column;
  display: flex;
  width: 30%;
  height: 66px;
`;
const Auth = styled.div`
  justify-content: end;
  color: ${theme.colors.white};
  display: flex;
  gap: 1.25rem;
`;

const AdminLink = styled(Link)`
  display: flex;
  width: 100px;
  height: 1.25rem;
  font-size: 11px;
  transition: 0.2s;
  align-items: center;
  border-radius: 1.25rem;
  justify-content: center;
  color: ${(props) => props.theme.colors.orange.main};
  background-color: ${(props) => props.theme.colors.white};

  &:hover {
    color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.orange.main};
  }
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
  gap: 1rem;
  justify-content: end;
  margin-top: 1.25rem;
  display: flex;
  align-items: center;

  > a {
    font-size: 30px;
    margin: auto 0;

    > svg {
      color: ${theme.colors.white};
      font-size: 24px;
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
