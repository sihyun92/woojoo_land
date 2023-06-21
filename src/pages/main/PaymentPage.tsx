import styled from "styled-components";
import { theme } from "../../styles/theme";

function PaymentPage() {
  return (
    <>
      <Title>주문서</Title>
      {/* <Container>
        <PaymentWrapper>
          <hr />
          <span>주문상품</span>
          <hr />
          <PaymentDetail>
            <ProductName>
              <span>상품 이름</span>
              {}외 {}
            </ProductName>
            <ProductPrice>
              <span>상품 가격</span>
              {}
            </ProductPrice>
            <ProductQty>
              <span>상품 개수</span>
              {}
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
      </Container> */}
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

// const Container = styled.div`
//   display: flex;
// `;

// const PaymentWrapper = styled.div`
//   width: 800px;
//   min-width: 800px;

//   > hr {
//     height: 1px;
//     border: 0;
//     background: ${theme.colors.gray[4]};
//     margin-bottom: 1.5rem;
//   }
// `;

// const PurchaseWrapper = styled.div`
//   width: 389px;
//   min-width: 389px;
//   padding: 2rem 1rem;
//   border: 1px solid ${theme.colors.gray[3]};
//   margin: 8px 0 0 auto;
// `;

export default PaymentPage;
