import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AdminPage from "./pages/admin";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UserPage from "./pages/user";

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
        <Route path="/auth/login" element={<LoginPage setUsername={setUsername} />} />
        <Route path="/auth/register" element={<RegisterPage setUsername={setUsername} />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
