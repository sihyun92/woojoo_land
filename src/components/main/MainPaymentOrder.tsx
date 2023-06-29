import { formatDollar } from "../../lib/Function/commonFn";
import styled from "styled-components";
import Button from "../common/Button";
import { theme } from "../../styles/theme";
import { orderApply } from "../../lib/API/userAPI";
import { useNavigate } from "react-router-dom";

interface IPaymentOrder {
  price: number;
  productId: string[];
  accountId: string;
}

function MainPaymentOrder({ price, productId, accountId }: IPaymentOrder) {
  const navigator = useNavigate();
  const onPayment = () => {
    for (let i = 0; i < productId.length; i++) {
      orderApply(productId[i], accountId);
    }
    navigator("/user");
    alert("Completed");
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
            <span>주문 금액</span>
            {formatDollar(price)}
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
          {formatDollar(price + 3000)}
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
