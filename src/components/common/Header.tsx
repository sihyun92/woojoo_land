import { theme } from "../../styles/theme";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Header() {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <AuthWrapper>로그인 | 회원가입</AuthWrapper>
        <MainWrapper>
          <Search>Search</Search>
          <ButtonWrapper>하트 장바구니 프로필</ButtonWrapper>
        </MainWrapper>
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
`;

const HeaderWrapper = styled.div`
  max-width: 1200px;
  width: 1200px;
  height: inherit;
  background: gray;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const AuthWrapper = styled.div``;
const MainWrapper = styled.div`
  display: flex;
`;
const Search = styled.div``;
const ButtonWrapper = styled.div``;

export default Header;
