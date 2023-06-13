import { theme } from "../../styles/theme";
import styled from "styled-components";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineShoppingCart, MdSearch } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { logout } from "../../lib/API/userAPI";
import SubHeader from "./SubHeader";

interface IMainPageProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

function Header({ username, setUsername }: IMainPageProps) {
  const onLogout = async () => {
    await logout();
    localStorage.removeItem("Token");
    localStorage.removeItem("username");
    setUsername("");
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
            <ButtonWrapper>
              <button>
                <IoMdHeartEmpty />
              </button>
              <button>
                <MdOutlineShoppingCart />
              </button>
              <Link to="/user">프로필</Link>
            </ButtonWrapper>
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
  border: none; // 검색바 선 삭제
  border-radius: 0.625rem;
  padding-left: 0.5rem;
  &:focus {
    outline: none;
  }
`;

const User = styled.div`
  display: flex;
  width: 8.25rem;
  flex-direction: column;
  height: 100%;
`;
const Auth = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LogoutBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  height: 1rem;
  padding: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: auto;
  justify-content: space-between;

  > button {
    width: 2.5rem;
    height: 2.5rem;
    background: none;
    border: none;
    cursor: pointer;

    > svg {
      font-size: 1.25rem;
    }
  }
`;

export default Header;
