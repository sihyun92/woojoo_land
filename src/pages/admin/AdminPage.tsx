import AdminTemplate from "../../components/admin/AdminTemplate";
import AdminNav from "../../components/admin/AdminNav";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { theme } from "../../styles/theme";
import ProductsPage from "./ProductsPage";
import styled from "styled-components";
import AdminHeader from "../../components/admin/AdminHeader";
import { check } from "../../lib/API/userAPI";
import { useEffect } from "react";

function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const ADMIN_EMAIL = process.env.REACT_APP_EMAIL;
  const ADMIN_NAME = process.env.REACT_APP_DISPLAY_NAME;

  useEffect(() => {
    isAdmin();
  });

  const isAdmin = async () => {
    const res = await check();
    if (!(res.email === ADMIN_EMAIL && res.displayName === ADMIN_NAME)) {
      navigate("/");
      alert("관리자가 아닙니다.");
    }
  };

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
  background: linear-gradient(
    ${theme.colors.orange.main},
    ${theme.colors.orange.linear}
  );
`;

const AdminMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default AdminPage;
