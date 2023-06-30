import { formatDollar } from "../../lib/Function/commonFn";
import styled from "styled-components";
import Button from "../common/Button";
import { theme } from "../../styles/theme";
import { check, orderApply } from "../../lib/API/userAPI";
import { useNavigate } from "react-router-dom";

interface IPaymentOrder {
  price: number;
  productId: string[];
  accountId: string;
  discountedPrice: number;
}

function MainPaymentOrder({
  price,
  productId,
  accountId,
  discountedPrice,
}: IPaymentOrder) {
  const navigate = useNavigate(); // 내비게이터
  // 결제 버튼 onClick 이벤트 함수
  const onPayment = async () => {
    // 결제 계좌가 성공적으로 선택되었을 때
    if (accountId) {
      // 제품 구매 신청
      for (let i = 0; i < productId.length; i++) {
        orderApply(productId[i], accountId);
      }
      const confirm = window.confirm(
        "결제가 완료되었습니다. 주문내역으로 이동하시겠습니까?",
      );

      // 확인 버튼 click 여부
      if (confirm) {
        navigate("/user");
      } else {
      }

      const res = await check();
      localStorage.removeItem(`cart_${res.email}`);

      // 최종적으로 결제 후 페이지 리로드
      window.location.reload();
    } else {
      alert("결제 계좌를 선택하세요.");
    }
  };

  return (
    <Container>
      <OrderWrapper>
        <PaymentPrice>
          <span>결제 금액</span>
        </PaymentPrice>
        <hr />
        <Calculator>
          <div>
            <span>주문 금액(A)</span>
            {formatDollar(price)}
          </div>
          <div>
            <span>할인 금액(B)</span>
            <span>{formatDollar(discountedPrice)}</span>
          </div>
          <div>
            <span>로켓배송비(C)</span>
            {price ? <span>{formatDollar(3000)}</span> : ""}
          </div>
        </Calculator>
        <hr />
        <TotalPrice>
          <span>총 결제 금액(A-B+C)</span>

          {price ? (
            <span>{formatDollar(price - discountedPrice + 3000)}</span>
          ) : (
            ""
          )}
        </TotalPrice>
      </OrderWrapper>
      <ButtonWrapper>
        <Button orange="true" onClick={onPayment}>
          결제하기
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 384px;
  max-width: 384px;
  margin: 8px 0px 0px auto;
  max-height: 384px;
`;

const OrderWrapper = styled.div`
  padding: 2rem 1rem;
  border: 1px solid ${theme.colors.gray[3]};
`;

const PaymentPrice = styled.div`
  margin-bottom: 1.5rem;
  > span {
    font-size: 28px;
  }
`;

const Calculator = styled.div`
  gap: 1rem;
  display: flex;
  margin: 2rem 0;
  flex-direction: column;

  > span {
    font-size: 20px;
  }

  > div {
    display: flex;
    justify-content: space-between;
  }
`;

const TotalPrice = styled.div`
  margin-top: 2rem;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  width: 100%;

  > button {
    width: 100%;
    height: 3rem;
    margin-top: 1rem;
  }
`;

export default MainPaymentOrder;
