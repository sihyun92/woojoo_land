/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ICheckData } from "../../components/common/Header";
import MainCartList from "../../components/main/MainCartList";
import MainCartOrder from "../../components/main/MainCartOrder";

function CartPage() {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const res = queryClient.getQueryData<ICheckData>("check");

  // 유저 인증
  useEffect(() => {
    checkUser();
  }, []);

  // state가 false일시 alert와 함께 login페이지로 리디렉션
  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/auth/login");
    }
  }, [isLoggedIn, navigate]);

  // 유저 인증함수. 유효한 유저가 아니면 state에 false를 반환
  const checkUser = async () => {
    if (typeof res === "string") {
      setIsLoggedIn(false);
    }
  };
  return (
    <>
      <Title>장바구니</Title>
      <Container>
        <CartWrapper>
          <Line />
          <MainCartList isChecked={isChecked} setIsChecked={setIsChecked} />
        </CartWrapper>
        <PurchaseWrapper>
          <MainCartOrder isChecked={isChecked} />
        </PurchaseWrapper>
      </Container>
    </>
  );
}

const Line = styled.div`
  height: 1px;
  margin-bottom: 1.5rem;
  background-color: ${theme.colors.gray[3]};
`

const Title = styled.div`
  display: flex;
  height: 66px;
  font-size: 36px;
  font-weight: bold;
  align-items: center;
  font-family: 'GmarketSans';
`;

const Container = styled.div`
  display: flex;
`;

const CartWrapper = styled.div`
  width: 800px;
  min-width: 800px;
`;

const PurchaseWrapper = styled.div`
  width: 384px;
  max-width: 384px;
  max-height: 384px;
  margin: 0 0 0 auto;
`;

export default CartPage;
