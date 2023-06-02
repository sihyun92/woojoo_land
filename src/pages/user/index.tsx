import { Outlet, useLocation } from "react-router-dom";
import UserNav from "../../components/user/UserNav";
import styled from "styled-components";
import PurchaseListPage from "./PurchaseListPage";

function UserPage() {
  const location = useLocation();

  return (
    <UserContainer>
      <UserNav />
      {location.pathname === "/user" ? <PurchaseListPage /> : <Outlet />}
    </UserContainer>
  );
}

const UserContainer = styled.div`
  display: flex;
`;

export default UserPage;
