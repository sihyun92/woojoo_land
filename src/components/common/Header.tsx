// import { Link } from "react-router-dom";
import { theme } from "../../styles/theme";
import styled from "styled-components";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineShoppingCart, MdSearch } from "react-icons/md";

function Header() {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo>우주 부동산</Logo>
        <Search>
          <SearchInput type="text" />
          <MdSearch />
        </Search>
        <User>
          <Auth>
            <a href="/auth/login" target="_blank" rel="noopener noreferrer">
              로그인
            </a>
            <span>|</span>
            <a href="/auth/register" target="_blank" rel="noopener noreferrer">
              회원가입
            </a>
          </Auth>
          <ButtonWrapper>
            <button>
              <IoMdHeartEmpty />
            </button>
            <button>
              <MdOutlineShoppingCart />
            </button>
            <button>프로필</button>
          </ButtonWrapper>
        </User>
      </HeaderWrapper>
    </HeaderContainer>
  );
}
const HeaderContainer = styled.header`
  width: 100%;
  height: 9.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
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

const Logo = styled.div``;
const Search = styled.div`
  display: flex;
  position: relative;
  svg {
    font-size: 1.5rem;
    position: absolute;
    right: 0.5rem;
    top: calc((3rem - 1.5rem) / 2);
    cursor: pointer;
  }
`;

const SearchInput = styled.input`
  width: 26.25rem;
  height: 3rem;
  border: 2px solid #bbb;
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
