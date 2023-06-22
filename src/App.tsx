import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// common
import Header from "./components/common/Header";
// import Footer from "./components/common/Footer";
import Loading from "./components/common/Loading";

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
import CartPage from "./pages/main/CartPage";
import PaymentPage from "./pages/main/PaymentPage";
import AllPage from "./pages/main/tagged/AllPage";
import Solar from "./pages/main/tagged/Solar";
import Andromeda from "./pages/main/tagged/Andromeda";
import SpaceFood from "./pages/main/tagged/SpaceFood";
import SpaceShip from "./pages/main/tagged/SpaceShip";
import SpaceSuit from "./pages/main/tagged/SpaceSuit";
import HorizonZero from "./pages/main/tagged/HorizonZero";

function App() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    localStorage.getItem("username");
  }, []);

  const [selectedTag, setSelectedTag] = useState("");

  const handleTagClick = (tag: string) => {
    setSelectedTag((value) => (value === tag ? "" : tag));
  };

  return (
    <BrowserRouter>
      <Header username={username} setUsername={setUsername} />
      {/* <Loading /> */}
      <Main>
        <Inner>
          <Routes>
            {/* 메인 */}
            <Route
              path="/"
              element={
                selectedTag === "" ? (
                  <MainPage />
                ) : selectedTag === "ALL" ? (
                  <AllPage />
                ) : selectedTag === "#태양계 부동산" ? (
                  <Solar />
                ) : selectedTag === "#안드로메다 부동산" ? (
                  <Andromeda />
                ) : selectedTag === "#우주복" ? (
                  <SpaceSuit />
                ) : selectedTag === "#우주식량" ? (
                  <SpaceFood />
                ) : selectedTag === "#우주선" ? (
                  <SpaceShip />
                ) : (
                  <HorizonZero />
                )
              }
            />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />

            {/* 관리자 페이지 */}
            <Route path="/admin" element={<AdminPage />} />
            {/* 관리자 디자인 테스트 페이지 */}
            <Route path="/admins" element={<AdminPages />}>
              <Route path="products" element={<ProductsPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="userlist" element={<UserListPage />} />
            </Route>
            {/* Auth 페이지 */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
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
  margin: 2rem auto 0;
`;
export default App;
