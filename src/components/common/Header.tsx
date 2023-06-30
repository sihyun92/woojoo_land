import { theme } from "../../styles/theme";
import styled from "styled-components";
import { IoMdHeart } from "react-icons/io";
import { MdSearch } from "react-icons/md";
import { HiShoppingCart } from "react-icons/hi";
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
import { useQuery } from "react-query";

interface IMainPageProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  clickedTag: string;
  inputText: string;
  clickTagHandler: (tag: string) => void;
  searchHandler: ChangeEventHandler<HTMLInputElement>;
}

export interface ICheckData {
  email: string;
  displayName: string;
  profileImg: string | null;
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

  // useQuery를 사용해 현제 사용자를 인증. 해당 데이터를 캐싱
  // 비동기 함수가 성공적으로 동작 완료되면 유저명과 프로필 사진을 state로 전달
  // 관리자 권한 부여 여부 판단
  // staleTime으로 캐싱된 데이터의 유효시간을 1000ms로 설정
  const { refetch } = useQuery("check", check, {
    onSuccess: (res) => {
      setUsername(res.displayName);
      setUserImg(res.profileImg);

      res.email === ADMIN_EMAIL && res.displayName === ADMIN_NAME
        ? setIsAdmin(true)
        : setIsAdmin(false);
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, username]);

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
    }, 250);
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
                  <Link to="/user">
                    <h2>{username}</h2>
                  </Link>

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
                <IoMdHeart />
              </Link>
              <Link to="/cart">
                <HiShoppingCart />
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
  display: flex;
  height: 9.375rem;
  align-items: center;
  justify-content: center;
  background-color: #ff6214;
  border-bottom: 1px solid ${theme.colors.gray};
`;

const HeaderWrapper = styled.div`
  width: 75rem;
  height: 5rem;
  display: flex;
  max-width: 75rem;
  position: relative;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  width: 30%;
`;

const Search = styled.div`
  display: flex;
  position: relative;
  transition: 0.1s;
  border-radius: 0.625rem;
  justify-content: center;
  svg {
    right: 0.75rem;
    cursor: pointer;
    position: absolute;
    font-size: 1.75rem;
    font-size: 1.75rem;
    top: calc((3rem - 1.8rem) / 2);
    color: ${theme.colors.orange.main};
  }
  &:hover{
    box-shadow: 0px 3px 10px 3px #00000030;
  }
`;

const SearchInput = styled.input`
  border: none;
  height: 3rem;
  width: 26.25rem;
  padding-left: 1rem;
  border-radius: 0.625rem;
  &:focus {
    outline: none;
    box-shadow: 0px 2px 10px 2px #00000046;
  }
`;

const User = styled.div`
  width: 30%;
  height: 66px;
  display: flex;
  flex-direction: column;
`;

const Auth = styled.div`
  gap: 1.25rem;
  display: flex;
  justify-content: end;
  color: ${theme.colors.white};
  h2 {
    transition: 0.1s;
    &:hover {
      font-weight: 700;
      color: ${theme.colors.orange.pressed};
    }
  }
`;

const AdminLink = styled(Link)`
  width: 76px;
  display: flex;
  font-size: 10px;
  font-weight: 700;
  transition: 0.1s;
  align-items: center;
  border-radius: 1.25rem;
  justify-content: center;
  color: ${theme.colors.orange.main};
  border: 1px solid ${theme.colors.white};
  background-color: ${theme.colors.white};
  &:hover {
    h2 {
      color: ${theme.colors.white};
    }
    color: ${theme.colors.white};
    border: 1px solid ${theme.colors.orange.pressed};
    background-color: ${theme.colors.orange.pressed};
    transform: scale(1.02);
  }
`;

const LogoutBtn = styled.button`
  padding: 0;
  border: none;
  height: 1rem;
  cursor: pointer;
  font-size: 16px;
  background: none;
  transition: 0.1s;
  color: ${theme.colors.white};
  &:hover {
    font-weight: 700;
    color: ${theme.colors.orange.pressed};
  }
`;

const LinkWrapper = styled.div`
  gap: 1rem;
  display: flex;
  margin-top: 1.25rem;
  align-items: center;
  justify-content: end;
  > a {
    margin: auto 0;
    font-size: 30px;
    > svg {
      font-size: 24px;
      transition: 0.1s;
      margin-top: 10px;
      margin-right: 6px;
      color: ${theme.colors.white};
      &:hover{
        transform: scale(1.2);
        color: ${theme.colors.orange.pressed}
      }
    }
  }
`;

const UserImg = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  transition: 0.1s;
  border-radius: 100%;
  background-color: ${theme.colors.white};
  img {
    border-radius: 100%;
  }
  &:hover{
    transform: scale(1.1);
    box-shadow: 0px 2px 6px 2px #00000046;
  }
`;

export default Header;
