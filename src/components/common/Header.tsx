// import { Link } from "react-router-dom";
import { theme } from "../../styles/theme";
import styled from "styled-components";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineShoppingCart, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";

function Header() {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <LogoWrapper>우주 부동산</LogoWrapper>
        <SearchWrapper>
          <SearchInput type="text" />
          <MdSearch />
        </SearchWrapper>
        <UserWrapper>
          <AuthWrapper>
            <a href="/auth/login" target="_blank" rel="noopener noreferrer">
              로그인
            </a>
            <span>|</span>
            회원가입
          </AuthWrapper>
          <ButtonWrapper>
            <button>
              <IoMdHeartEmpty />
            </button>
            <button>
              <MdOutlineShoppingCart />
            </button>
            <button>프로필</button>
          </ButtonWrapper>
        </UserWrapper>
      </HeaderWrapper>
    </HeaderContainer>
  );
}
const HeaderContainer = styled.header`
  width: 100%;
  height: 9.375rem;
  background: ${theme.colors.purple};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  max-width: 75rem;
  width: 75rem;
  height: 5rem;
  background: gray;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
`;

const LogoWrapper = styled.div``;
const SearchWrapper = styled.div`
  display: flex;
  position: relative;
  svg {
    font-size: 1.5rem;
    position: absolute;
    right: 0;
    top: calc((3rem - 1.5rem) / 2);
  }
`;

const SearchInput = styled.input`
  width: 26.25rem;
  height: 3rem;
  border: 2px solid #bbb;
  border-radius: 0.625rem;
`;

const UserWrapper = styled.div`
  display: flex;
  width: 8.25rem;
  flex-direction: column;
  height: 100%;
`;
const AuthWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: auto;
  justify-content: space-between;

  > button {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export default Header;
