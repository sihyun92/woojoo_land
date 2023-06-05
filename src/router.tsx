import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AdminPage from "./pages/admin";

// auth
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// user
import UserPage from "./pages/user";
import LikePage from "./pages/user/LikePage";
import AccountPage from "./pages/user/AccountPage";
import PersonalSettings from "./pages/user/PersonalSettings";
import Layout from "./components/common/Layout";

function Router() {
  const [username, setUsername] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        {/* path name은 임시로 지었습니다 */}
        <Route
          path="/"
          element={
            <Layout>
              <App username={username} setUsername={setUsername} />
            </Layout>
          }
        />
        <Route
          path="/admin"
          element={
            <Layout>
              <AdminPage />
            </Layout>
          }
        />
        <Route
          path="/auth/login"
          element={<LoginPage setUsername={setUsername} />}
        />
        <Route
          path="/auth/register"
          element={<RegisterPage setUsername={setUsername} />}
        />
        <Route
          path="/user"
          element={
            <Layout>
              <UserPage />
            </Layout>
          }
        >
          <Route path="account" element={<AccountPage />} />
          <Route path="like" element={<LikePage />} />
          <Route path="settings" element={<PersonalSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
