// CartPage(장바구니)에서 구매하기 버튼을 누르면 장바구니에 담긴 제품(들)만 렌더링
// ProductPage(상세페이지)에서 구매하기 버튼을 누르면, 해당 상품만 렌더링

import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useSelector } from "react-redux";
import { TRootState } from "../../modules";

function PaymentPage() {
  const buyItem = useSelector((state: TRootState) => state.payment);
  const cartItem = useSelector((state: TRootState) => state.cartItem);

  // 단독 구매 상품이 존재할 때와 그렇지 않을 때 조건화
  const buyItemQty = buyItem.quantity ? buyItem.quantity : 0;
  const cartItemQty = cartItem.length ? cartItem.length : 0;
  const totalQty = buyItemQty || cartItem.length;

  const buyItemTitle = buyItem.title ? buyItem.title : "";
  const cartItemTitle = cartItem[0].title ? cartItem[0].title : "";
  const title = cartItemTitle || buyItemTitle;

  return (
    <>
      <Title>주문서</Title>
      <Container>
        <PaymentWrapper>
          <hr />
          <span>주문상품</span>
          <hr />
          <PaymentDetail>
            <ProductName>
              <span>상품 이름</span>
              {title}
              {totalQty < 1 ? "" : `외 ${totalQty - 1}개`}
            </ProductName>
            <ProductPrice>
              <span>상품 가격</span>
              {buyItem.price}
            </ProductPrice>
            <ProductQty>
              <span>상품 개수</span>
              {buyItem.quantity}
            </ProductQty>
          </PaymentDetail>
          <UserDetail>
            <UserName>
              <span>주문자 명</span>
              {}
            </UserName>
            <UserMail>
              <span>이메일</span>
              {}
            </UserMail>
          </UserDetail>
          <AccountDetail>
            <span>결제 수단 선택</span>
            {}
          </AccountDetail>
        </PaymentWrapper>
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

const PaymentWrapper = styled.div`
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

const PaymentDetail = styled.div``;
const ProductName = styled.div``;
const ProductPrice = styled.div``;
const ProductQty = styled.div``;
const UserDetail = styled.div``;
const UserName = styled.div``;
const UserMail = styled.div``;
const AccountDetail = styled.div``;
export default PaymentPage;
