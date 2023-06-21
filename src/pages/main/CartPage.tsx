import styled from "styled-components";
import { theme } from "../../styles/theme";
import MainCartList from "../../components/main/MainCartList";
import MainCartOrder from "../../components/main/MainCartOrder";

function CartPage() {
  return (
    <>
      <Title>장바구니</Title>
      <Container>
        <CartWrapper>
          <hr />
          <MainCartList />
        </CartWrapper>
        <PurchaseWrapper>
          <MainCartOrder />
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
    margin-bottom: 1.5rem;
  }
`;

const PurchaseWrapper = styled.div`
  width: 389px;
  min-width: 389px;
  padding: 2rem 1rem;
  border: 1px solid ${theme.colors.gray[3]};
  margin: 8px 0 0 auto;
`;

export default CartPage;
