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
  margin: 17px 0;
  align-items: center;
`;

const TitleBar = styled.div`
  width: 5px;
  height: 2.25rem;
  margin-right: 10px;
  background-color: ${(props) => props.theme.colors.orange.main};
`;

const MyPage = styled.h2`
  font-weight: 700;
  font-size: 2.25rem;
`;

const NavContainer = styled.ul`
  display: grid;
  grid-template-columns: 285px;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  border-top: 1px solid ${(props) => props.theme.colors.gray[3]};
  border-left: 1px solid ${(props) => props.theme.colors.gray[3]};
  border-right: 1px solid ${(props) => props.theme.colors.gray[3]};
`;

const NavList = styled.li`
  display: flex;
  padding: 13px 10px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[3]};

  .chebronRight {
    font-size: 1.5rem;
  }
`;

const ListName = styled.span`
  font-weight: 700;
  font-size: 1.25rem;
`;

export default UserNav;
