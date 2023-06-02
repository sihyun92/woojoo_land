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

function Router() {
  const [username, setUsername] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        {/* path name은 임시로 지었습니다 */}
        <Route
          path="/"
          element={<App username={username} setUsername={setUsername} />}
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/auth/login"
          element={<LoginPage setUsername={setUsername} />}
        />
        <Route
          path="/auth/register"
          element={<RegisterPage setUsername={setUsername} />}
        />
        <Route path="/user" element={<UserPage />}>
          <Route path="account" element={<AccountPage />} />
          <Route path="like" element={<LikePage />} />
          <Route path="settings" element={<PersonalSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
