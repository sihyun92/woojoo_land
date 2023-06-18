import { Outlet, useLocation } from "react-router-dom";
import UserNav from "../../components/user/UserNav";
import OrderListPage from "./OrderListPage";
import UserLayout from "../../components/user/UserLayout";
import styled from "styled-components";

function UserPage() {
  const location = useLocation();

  return (
    <UserContainer>
      <UserNav />
      <UserLayout>
        {location.pathname === "/user" ? <OrderListPage /> : <Outlet />}
      </UserLayout>
    </UserContainer>
  );
}

const UserContainer = styled.div`
  display: flex;
`;

export default UserPage;
