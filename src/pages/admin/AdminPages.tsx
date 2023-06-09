import AdminTemplate from "../../components/admin/AdminTemplate";
import AdminNav from "../../components/admin/AdminNav";
import { Outlet, useLocation } from "react-router-dom";
import { theme } from "../../styles/theme";
import ProductsPage from "./ProductsPage";
import styled from "styled-components";

function AdminPages() {
  const location = useLocation();
  return (
    <AdminTemplate>
      <Sidebar>
        <AdminNav />
      </Sidebar>
      <AdminMain>
        <AdminHeader>관리자 헤더 영역 : 홈 + 로그아웃</AdminHeader>
        {location.pathname === "/admins" ? <ProductsPage /> : <Outlet />}
      </AdminMain>
    </AdminTemplate>
  );
}

const Sidebar = styled.div`
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

const AdminHeader = styled.div`
  background-color: ${theme.colors.gray[2]};
  height: 4.375rem;
  width: 100%;
`;

export default AdminPages;
