import styled from "styled-components";
import { theme } from "../../styles/theme";
import { formatDollar } from "../../lib/Function/commonFn";
import MainCartProduct from "../../components/main/MainCartProduct";

function CartPage() {
  return (
    <>
      <Title>
        <span>장바구니</span>
      </Title>

      <Container>
        <CartWrapper>
          <hr />
          <MainCartProduct />
        </CartWrapper>
        <PurchaseWrapper>
          <PaymentPrice>
            <span>결제 금액</span>
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
            <span>총 결제 금액</span>
          </TotalPrice>
        </PurchaseWrapper>
      </Container>
    </>
  );
}

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 36px;
  font-weight: bold;
  height: 66px;
`;
const Container = styled.div`
  display: flex;
`;

const CartWrapper = styled.div`
  width: 800px;
  min-width: 800px;

  > hr {
    height: 1px;
    border: 0;
    background: ${theme.colors.gray[4]};
  }
`;

const PurchaseWrapper = styled.div`
  width: 389px;
  min-width: 389px;
  padding: 2rem 1rem;
  border: 1px solid ${theme.colors.gray[3]};
  margin: 8px 0 0 auto;

  > div > div {
    display: flex;
    justify-content: space-between;
  }

  > div > div > span {
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
`;

const TotalPrice = styled.div`
  margin-top: 2rem;
  font-size: 20px;
`;

export default CartPage;
