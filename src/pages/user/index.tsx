import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserNav from "../../components/user/UserNav";
import OrderListPage from "./OrderListPage";
import UserLayout from "../../components/user/UserLayout";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ICheckData } from "../../components/common/Header";
import { useQueryClient } from "react-query";

function UserPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true);

  const queryClient = useQueryClient();
  const res = queryClient.getQueryData<ICheckData>("check");

  // 유저 인증
  useEffect(() => {
    checkUser();
  }, []);

  // state가 false일시 alert와 함께 login페이지로 리디렉션
  useEffect(() => {
    if (!isChecked) {
      alert("로그인이 필요합니다.");
      navigate("/auth/login");
    }
  }, [isChecked, navigate]);

  // 유저 인증함수. 유효한 유저가 아니면 state에 false를 반환
  const checkUser = async () => {
    if (typeof res === "string") {
      setIsChecked(false);
    }
  };

  return (
    <>
      {isChecked ? (
        <UserContainer>
          <UserNav />
          <UserLayout>
            {location.pathname === "/user" ? <OrderListPage /> : <Outlet />}
          </UserLayout>
        </UserContainer>
      ) : null}
    </>
  );
}

const UserContainer = styled.div`
  display: flex;
`;

export default UserPage;
