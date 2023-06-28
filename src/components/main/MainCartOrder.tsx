import { useSelector } from "react-redux";
import { formatDollar } from "../../lib/Function/commonFn";
import styled from "styled-components";
import { TRootState } from "../../modules";
import Button from "../common/Button";
import { theme } from "../../styles/theme";
import { useNavigate } from "react-router-dom";

interface IChecked {
  isChecked: boolean;
}

function MainCartOrder({ isChecked }: IChecked) {
  const cartItem = useSelector((state: TRootState) => state.cartItem);
  const orderPrice = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const totalPrice = orderPrice + 3000;
  const navigate = useNavigate();
  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("/payment");
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
            {formatDollar(orderPrice)}
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
          {formatDollar(totalPrice)}
        </TotalPrice>
      </OrderWrapper>
      <ButtonWrapper>
        <Button orange="true" onClick={onClick} disabled={isChecked}>
          주문하기
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
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

export default MainCartOrder;
