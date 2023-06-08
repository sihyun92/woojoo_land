import { Outlet, useLocation } from "react-router-dom";
import UserNav from "../../components/user/UserNav";
import styled from "styled-components";
import OrderListPage from "./OrderListPage";

function UserPage() {
  const location = useLocation();

  return (
    <UserContainer>
      <UserNav />
      {location.pathname === "/user" ? <OrderListPage /> : <Outlet />}
    </UserContainer>
  );
}

const UserContainer = styled.div`
  display: flex;
`;

export default UserPage;
