import { Link } from "react-router-dom";
import styled from "styled-components";
import { BiChevronRight } from "react-icons/bi";

function UserNav() {
  return (
    <Navigator>
      <NavTitle>
        <TitleBar />
        <MyPage>마이페이지</MyPage>
      </NavTitle>
      <NavContainer>
        <Link to="/user">
          <NavList>
            <ListName>주문 내역</ListName>
            <BiChevronRight className="chebronRight" />
          </NavList>
        </Link>
        <Link to="account">
          <NavList>
            <ListName>계좌 관리</ListName>
            <BiChevronRight className="chebronRight" />
          </NavList>
        </Link>
        <Link to="like">
          <NavList>
            <ListName>찜한 상품</ListName>
            <BiChevronRight className="chebronRight" />
          </NavList>
        </Link>
        <Link to="settings">
          <NavList>
            <ListName>개인정보 수정</ListName>
            <BiChevronRight className="chebronRight" />
          </NavList>
        </Link>
      </NavContainer>
    </Navigator>
  );
}

const Navigator = styled.nav`
  display: flex;
  flex-direction: column;
`;
const NavTitle = styled.div`
  display: flex;
  margin: 20px 0;
  align-items: center;
`;
const TitleBar = styled.div`
  width: 5px;
  height: 30px;
  margin-right: 10px;
  background-color: #ff6113;
`;
const MyPage = styled.h2`
  font-size: 30px;
  font-weight: 700;
`;
const NavContainer = styled.ul`
  gap: 1px;
  display: grid;
  grid-template-columns: 250px;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`;
const NavList = styled.li`
  display: flex;
  padding: 8px 10px;
  align-items: center;
  border: 1px solid #333;
  justify-content: space-between;

  .chebronRight {
    font-size: 25px;
  }
`;
const ListName = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

export default UserNav;
