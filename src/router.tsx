import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AdminPage from "./pages/admin";
import AuthPage from "./pages/auth";
import MainPage from "./pages/main";
import UserPage from "./pages/user";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* path name은 임시로 지었습니다 */}
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
