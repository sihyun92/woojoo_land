import { formatDollar } from "../../lib/Function/commonFn";
import styled from "styled-components";

function MainCartOrder() {
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
        </div>
        <div>
          <span>로켓배송비</span>
          <span>{formatDollar(3000)}</span>
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
