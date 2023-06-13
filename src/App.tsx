import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// common
import Header from "./components/common/Header";
// import Footer from "./components/common/Footer";

// admin
import AdminPage from "./pages/admin";
import AdminPages from "./pages/admin/AdminPages";
import ProductsPage from "./pages/admin/ProductsPage";
import HistoryPage from "./pages/admin/HistroyPage";
import UserListPage from "./pages/admin/UserListPage";

// auth
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// user
import UserPage from "./pages/user";
import LikePage from "./pages/user/LikePage";
import AccountPage from "./pages/user/AccountPage";
import SettingPage from "./pages/user/SettingPage";

// main
import MainPage from "./pages/main/MainPage";
import ProductPage from "./pages/main/ProductPage";

function App() {
  const [username, setUsername] = useState("");
  return (
    <BrowserRouter>
      <Header username={username} setUsername={setUsername} />
      <Main>
        <Inner>
          <Routes>
            {/* 메인 */}
            <Route path="/" element={<MainPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            {/* 관리자 페이지 */}
            <Route path="/admin" element={<AdminPage />} />
            {/* 관리자 디자인 테스트 페이지 */}
            <Route path="/admins" element={<AdminPages />}>
              <Route path="products" element={<ProductsPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="userlist" element={<UserListPage />} />
            </Route>
            {/* Auth 페이지 */}
            <Route
              path="/auth/login"
              element={<LoginPage setUsername={setUsername} />}
            />
            <Route
              path="/auth/register"
              element={<RegisterPage setUsername={setUsername} />}
            />
            {/* 유저 페이지 */}
            <Route path="/user" element={<UserPage />}>
              <Route path="account" element={<AccountPage />} />
              <Route path="like" element={<LikePage />} />
              <Route path="settings" element={<SettingPage />} />
            </Route>
          </Routes>
        </Inner>
      </Main>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

const Main = styled.main`
  width: 100%;
`;

const Inner = styled.div`
  max-width: 75rem;
  width: 75rem;
  margin: 0 auto;
`;
export default App;
