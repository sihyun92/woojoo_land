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
  const navigate = useNavigate();

  // 할인 전 가격
  const orderPrice = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // 할인 가격
  const discountedPrice = cartItem.reduce(
    (acc, item) => acc + item.price * (item.discountRate / 100) * item.quantity,
    0,
  );

  // 최종 가격
  const totalPrice = orderPrice + 3000 - discountedPrice;

  // 주문하기 버튼 onClick 함수
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
        <Line />
        <Calculator>
          <div>
            <span>
              주문 금액<AbcItem>A</AbcItem>
            </span>
            {formatDollar(orderPrice)}
          </div>
          <div>
            <span>
              할인 금액<AbcItem>B</AbcItem>
            </span>
            {formatDollar(discountedPrice)}
          </div>
          <div>
            <span>
              로켓배송비<AbcItem>C</AbcItem>
            </span>
            {orderPrice > 0 ? <span>{formatDollar(3000)}</span> : ""}
          </div>
        </Calculator>
        <Line />
        <TotalPrice>
          <span>
            총 결제 금액
            <AbcContainer>
              <div>A</div>
              <span>-</span>
              <div>B</div>
              <span>+</span>
              <div>C</div>
            </AbcContainer>
          </span>
          {orderPrice > 0 ? <span>{formatDollar(totalPrice)}</span> : ""}
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

const AbcContainer = styled.div`
  margin-left: 10px;
  height: 20px;
  display: inline-flex;
  span {
    margin: 0 4px;
    font-size: 16px;
    line-height: 20px;
  }
  div {
    width: 20px;
    height: 20px;
    display: flex;
    color: white;
    font-size: 12px;
    font-weight: 700;
    line-height: 22px;
    border-radius: 50%;
    justify-content: center;
    background-color: ${theme.colors.orange.main};
  }
`;

const Line = styled.div`
  background-color: ${theme.colors.gray[7]};
  height: 1px;
`;

const AbcItem = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  color: white;
  font-size: 10px;
  font-weight: 700;
  margin-left: 10px;
  line-height: 16px;
  border-radius: 50%;
  justify-content: center;
  background-color: ${theme.colors.orange.main};
`;

const Container = styled.div`
  width: 100%;
`;

const OrderWrapper = styled.div`
  padding: 2rem 1rem;
  border-radius: 5px;
  border: 1px solid ${theme.colors.gray[3]};
`;

const PaymentPrice = styled.div`
  margin-bottom: 1.5rem;
  > span {
    font-size: 28px;
    font-weight: 700;
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
    span {
      display: inline-flex;
    }
    span:first-child {
      font-weight: 700;
    }
  }
`;

const TotalPrice = styled.div`
  display: flex;
  font-size: 20px;
  margin-top: 2rem;
  font-weight: 700;
  align-items: center;
  padding-bottom: 10px;
  justify-content: space-between;
  span:last-child {
    padding-top: 10px;
    color: ${theme.colors.orange.main};
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  > button {
    width: 100%;
    height: 3rem;
    font-size: 18px;
    margin-top: 1rem;
    :hover {
      background-color: ${theme.colors.orange.hover};
    }
  }
`;

export default MainCartOrder;
