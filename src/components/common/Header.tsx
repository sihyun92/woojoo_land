import { theme } from "../../styles/theme";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Tag from "./Tag";

function Header() {
  return (
    <TheHeader>
      <HeaderContainer>
        <AuthWrapper>로그인 | 회원가입</AuthWrapper>
        <MainWrapper>
          <Link to="/">우주부동산</Link>
          <Search>Search</Search>
          <ButtonWrapper>하트 장바구니 프로필</ButtonWrapper>
        </MainWrapper>
        <TagWrapper>
          <Tag inherit>홈</Tag>
          <Tag>#태양계</Tag>
          <Tag>#안드로메다</Tag>
          <Tag>#우주복</Tag>
          <Tag>#우주식량</Tag>
          <Tag>#우주선</Tag>
          <Tag>#블랙홀</Tag>
        </TagWrapper>
      </HeaderContainer>
    </TheHeader>
  );
}
const TheHeader = styled.header`
  width: 100%;
  height: 12.5rem;
  background: ${theme.colors.purple};
  display: flex;
  justify-content: center;
`;

const HeaderContainer = styled.div`
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
const TagWrapper = styled.div`
  display: flex;
`;

export default Header;
