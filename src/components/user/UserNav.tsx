import { Link } from "react-router-dom";
import styled from "styled-components";

function UserNav() {
  return (
    <Navigator>
      <NavTitle>마이 페이지</NavTitle>
      <NavContainer>
        <Link to="/user">
          <NavList>
            <ListName>주문 내역</ListName>
          </NavList>
        </Link>
        <Link to="account">
          <NavList>
            <ListName>계좌 관리</ListName>
          </NavList>
        </Link>
        <Link to="like">
          <NavList>
            <ListName>찜한 상품</ListName>
          </NavList>
        </Link>
        <Link to="settings">
          <NavList>
            <ListName>개인 정보 수정</ListName>
          </NavList>
        </Link>
      </NavContainer>
    </Navigator>
  );
}

const Navigator = styled.nav`
  border: 1px solid #000;
`;
const NavTitle = styled.h2``;
const NavContainer = styled.ul``;
const NavList = styled.li``;
const ListName = styled.span``;

export default UserNav;
