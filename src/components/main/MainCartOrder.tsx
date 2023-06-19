import styled from "styled-components";
import { formatDollar } from "../../lib/Function/commonFn";
// import { useState } from "react";

function MainCartOrder() {
  // const [price, setPrice] = useState<number>();
  // const [totalPrice, setTotalPrice] = useState<number>();

  return (
    <Container>
      <PaymentPrice>
        <span className="bold">결제 금액</span>
      </PaymentPrice>
      <hr />
      <Calculator>
        <div>
          <span>주문 금액</span>
        </div>
        <div>
          <span>할인 금액</span>
          $0
        </div>
        <div>
          <span>로켓배송비</span>
          {formatDollar(3000)}
        </div>
      </Calculator>
      <hr />
      <TotalPrice>
        <span className="bold">총 결제 금액</span>
      </TotalPrice>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  .bold {
    font-weight: bold;
  }
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
`;
export default MainCartOrder;
