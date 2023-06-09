import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme";

function AdminNav() {
  return (
    <AdminNavigator>
      <Link to="products"><Logo>우주부동산 관리자</Logo></Link>
      <AdminNavContainer>
        <Link to="products">
          <Listname>모든 제품 조회</Listname>
        </Link>
        <Link to="history">
          <Listname>전체 거래 내역</Listname>
        </Link>
        <Link to="userlist">
          <Listname>사용자 조회</Listname>
        </Link>
      </AdminNavContainer>
    </AdminNavigator>
  );
}

const AdminNavigator = styled.nav`
  flex-direction: column;
  display: flex;
  width: 100%;
`;

const Logo = styled.div`
  background-color: gray;
`;

const AdminNavContainer = styled.ul`
  color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.white};
`;

const Listname = styled.li`
  height: 52px;
  display: flex;
  padding-left: 14px;
  align-items: center;
  font-size: 20px;
  border-top: 1px solid ${theme.colors.white};
  :hover {
    background-color: #0000001c;
  }
`;

export default AdminNav;
