import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { MdKeyboardArrowRight } from "react-icons/md";

function AdminNav() {
  return (
    <AdminNavigator>
      <Link to="dashboard">
        <LogoAdminImg>
          <img src="/images/LogoAdmin.svg" alt="우주부동산 관리자" width={210} />
        </LogoAdminImg>
      </Link>
      <AdminNavContainer>
        <Link to="products">
          <Listname>모든 제품 조회<MdKeyboardArrowRight/></Listname>
        </Link>
        <Link to="history">
          <Listname>전체 거래 내역<MdKeyboardArrowRight/></Listname>
        </Link>
        <Link to="userlist">
          <Listname>사용자 조회<MdKeyboardArrowRight/></Listname>
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

const AdminNavContainer = styled.ul`
  border-bottom: 1px solid ${theme.colors.white};
  color: ${theme.colors.white};
`;

const LogoAdminImg = styled.div`
  justify-content: center;
  padding-right: 8px;
  height: 150px;
  display: flex;
`

const Listname = styled.li`
  border-top: 1px solid ${theme.colors.white};
  justify-content: space-between;
  align-items: center;
  padding-left: 18px;
  transition: 0.1s;
  font-size: 20px;
  display: flex;
  height: 52px;
  svg {
    margin-right: 6px;
    font-size: 30px;
  }
  :hover {
    background-color: #0000001c;
  }
`;

export default AdminNav;
