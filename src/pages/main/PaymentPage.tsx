/* eslint-disable react-hooks/exhaustive-deps */
// CartPage(장바구니)에서 구매하기 버튼을 누르면 장바구니에 담긴 제품(들)만 렌더링
// ProductPage(상세페이지)에서 구매하기 버튼을 누르면, 해당 상품만 렌더링
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { formatDiscount } from "../../lib/Function/commonFn";
import MainPaymentOrder from "../../components/main/MainPaymentOrder";
import MainPaymentInfo from "../../components/main/MainPaymentInfo";
import { useSelector } from "react-redux";
import { TRootState } from "../../modules";

interface IPaymentProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

function PaymentPage({ username, setUsername }: IPaymentProps) {
  // redux 상태 객체의 buyItem state, cartItem state를 가져옴
  const buyItem = useSelector((state: TRootState) => state.buyItem);
  const cartItem = useSelector((state: TRootState) => state.cartItem);
  const items = buyItem.concat(cartItem); // 두 state를 concat
  const [accountId, setAccountId] = useState("");
  const productIds: string[] = [];

  const quantity = items.reduce(
    (acc, item) => (acc + item.quantity) as number,
    0,
  );

  const price = items.reduce(
    (acc, item) => (acc + item.price * item.quantity) as number,
    0,
  );

  const discountedPrice = items.reduce(
    (acc, item) =>
      acc +
      formatDiscount({ price: item.price, discountRate: item.discountRate }) *
        item.quantity,
    0,
  );

  // 상품의 id값들을 배열에 push
  items.forEach((item) => {
    const quantity = item.quantity;
    productIds.push(...Array.from({ length: quantity }, () => item.productId));
  });

  // 선택한 계좌의 id값을 state에 update하는 click event function
  const onCheck = (accountId: string) => {
    setAccountId(accountId);
  };

  return (
    <>
      <Container>
        <Title>주문서</Title>
        <Wrapper>
          <MainPaymentInfo
            username={username}
            setUsername={setUsername}
            items={items}
            price={price}
            quantity={quantity}
            accountId={accountId}
            onCheck={onCheck}
          />
          <MainPaymentOrder
            price={price}
            productIds={productIds}
            accountId={accountId}
            discountedPrice={discountedPrice}
          />
        </Wrapper>
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

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;

  > hr {
    height: 1px;
    border: 0;
    background: ${theme.colors.gray[4]};
    margin-bottom: 1.5rem;
  }
`;

export default PaymentPage;
