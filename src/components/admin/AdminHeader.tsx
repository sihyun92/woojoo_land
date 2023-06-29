import styled from "styled-components";
import { theme } from "../../styles/theme";
import { Link, useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
import Button from "../common/Button";
import { logout } from "../../lib/API/userAPI";

function AdminHeader() {
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    localStorage.removeItem("Token");
    localStorage.removeItem("username");
    localStorage.clear();
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <AdminNavigator>
      <AdminHeaderContainer>
        <Link to="/">
          <HomeButton>
            <MdHome />
          </HomeButton>
        </Link>
        <LogoutBtn adminlogout onClick={onLogout} >로그아웃</LogoutBtn>
      </AdminHeaderContainer>
    </AdminNavigator>
  );
}
export default AdminHeader;

const AdminNavigator = styled.div`
  width: 100%;
  height: 4.375rem;
  background-color: ${theme.colors.gray[2]};
`;

const HomeButton = styled.button`
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: 0.1s;
  margin-right: 14px;
  border-radius: 100%;
  color: ${theme.colors.orange.main};
  border: 1px solid ${theme.colors.orange.main};
  svg {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 26px;
    line-height: 12px;
  }
  &:hover {
    transform: scale(1.1);
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 1px solid ${theme.colors.orange.main};
    background-color: ${theme.colors.orange.main};
    svg {
      color: ${theme.colors.white};
  }
  }
`;

const LogoutBtn = styled(Button)`
`

const AdminHeaderContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  margin-top: 14px;
  margin-right: 56px;
  justify-content: right;
`;
