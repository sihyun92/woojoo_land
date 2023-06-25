import AdminTemplate from "../../components/admin/AdminTemplate";
import AdminNav from "../../components/admin/AdminNav";
import { Outlet, useLocation } from "react-router-dom";
import { theme } from "../../styles/theme";
import ProductsPage from "./ProductsPage";
import styled from "styled-components";
import AdminHeader from "../../components/admin/AdminHeader";

function AdminPage() {
  const location = useLocation();
  return (
    <AdminTemplate>
      <Sidebar>
        <AdminNav />
      </Sidebar>
      <AdminMain>
        <AdminHeader />
        {location.pathname === "/admin" ? <ProductsPage /> : <Outlet />}
      </AdminMain>
    </AdminTemplate>
  );
}

const Sidebar = styled.div`
  display: flex;
  width: 17.8125rem;
  background-color: ${theme.colors.orange.main};
  background: linear-gradient(${theme.colors.orange.main}, ${theme.colors.orange.linear});
`;

const AdminMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default AdminPage;
