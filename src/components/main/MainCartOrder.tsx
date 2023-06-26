import { useDispatch, useSelector } from "react-redux";
import { formatDollar } from "../../lib/Function/commonFn";
import styled from "styled-components";
import { TRootState } from "../../modules";

function MainCartOrder() {
  const cartItem = useSelector((state: TRootState) => state.cartItem);
  return (
    <Container>
      <PaymentPrice>
        <span>결제 금액</span>
      </PaymentPrice>
      <hr />
      <Calculator>
        <div>
          <span>주문 금액</span>
          {formatDollar(cartItem.reduce((acc, item) => acc + item.price, 0))}
        </div>
        <div>
          <span>할인 금액</span>
        </div>
        <div>
          <span>로켓배송비</span>
          <span>{formatDollar(3000)}</span>
        </div>
      </Calculator>
      <hr />
      <TotalPrice>
        <span>총 결제 금액</span>
        {formatDollar(
          cartItem.reduce((acc, item) => acc + item.price, 0) + 3000,
        )}
      </TotalPrice>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
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

export default MainCartOrder;
