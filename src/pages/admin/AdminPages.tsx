import AdminTemplate from "../../components/admin/AdminTemplate";
import AdminNav from "../../components/admin/AdminNav";
import { Outlet, useLocation } from "react-router-dom";
import { theme } from "../../styles/theme";
import ProductsPage from "./ProductsPage";
import styled from "styled-components";
import AdminHeader from "../../components/admin/AdminHeader";

function AdminPages() {
  const location = useLocation();
  return (
    <AdminTemplate>
      <Sidebar>
        <AdminNav />
      </Sidebar>
      <AdminMain>
        <AdminHeader />
        {location.pathname === "/admins" ? <ProductsPage /> : <Outlet />}
      </AdminMain>
    </AdminTemplate>
  );
}

const Sidebar = styled.div`
  background: linear-gradient(${theme.colors.orange.main}, ${theme.colors.orange.linear});
  background-color: ${theme.colors.orange.main};
  width: 17.8125rem;
  display: flex;
`;

const AdminMain = styled.div`
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
`;

export default AdminPages;
