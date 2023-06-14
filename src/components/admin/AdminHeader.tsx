import styled from "styled-components";
import { theme } from "../../styles/theme";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import Button from "../common/Button";

function AdminHeader() {
  return (
    <AdminNavigator>
      <AdminHeaderContainer>
        <Link to="/">
          <HomeButton>
            <MdHome />
          </HomeButton>
        </Link>
        <LogoutBtn adminlogout>로그아웃</LogoutBtn>
      </AdminHeaderContainer>
    </AdminNavigator>
  );
}
export default AdminHeader;

const AdminNavigator = styled.div`
  background-color: ${theme.colors.gray[2]};
  height: 4.375rem;
  width: 100%;
`;

const HomeButton = styled.button`
  border: 1px solid ${theme.colors.orange.main};
  color: ${theme.colors.orange.main};
  border-radius: 100%;
  margin-right: 14px;
  transition: 0.3s;
  cursor: pointer;
  height: 40px;
  width: 40px;
  svg {
    line-height: 12px;
    font-size: 26px;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
  }
  &:hover {
    border: 1px solid ${theme.colors.orange.main};
    background-color: ${theme.colors.orange.main};
    border-radius: 100%;
    height: 40px;
    width: 40px;
    svg {
      color: ${theme.colors.white};
  }
  }
`;

const LogoutBtn = styled(Button)`
`

const AdminHeaderContainer = styled.div`
  justify-content: right;
  margin-right: 56px;
  margin-top: 14px;
  display: flex;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
`;
