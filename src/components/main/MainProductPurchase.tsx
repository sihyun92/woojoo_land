import { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { formatDollar } from "../../lib/Function/commonFn";
import { IProductDetail } from "../../lib/API/commonAPI";
import MainProductBtn from "./MainProductBtn";
import MainCartBtn from "./MainCartBtn";
import MainBuyBtn from "./MainBuyBtn";

interface IProductPurchase {
  product?: IProductDetail;
  discountedPrice: number;
}

function MainProductPurchase({ product, discountedPrice }: IProductPurchase) {
  let [quantity, setQuantity] = useState<number>(1);

  return (
    <PurchaseWrapper>
      <Quantity>
        <span>구매 수량</span>
        <MainProductBtn quantity={quantity} setQuantity={setQuantity} />
      </Quantity>
      <PriceAll>
        <span>총 상품 금액</span>
        <Price>
          {product?.price ? formatDollar(discountedPrice * quantity) : 0}
        </Price>
      </PriceAll>
      <ButtonWrapper>
        <MainCartBtn quantity={quantity} />
        <MainBuyBtn quantity={quantity} />
      </ButtonWrapper>
    </PurchaseWrapper>
  );
}
const PurchaseWrapper = styled.div``;
const Quantity = styled.div`
  display: flex;
  margin-top: 2rem;
  align-items: center;
  justify-content: space-between;

  > span {
    font-size: 24px;
  }
`;

const ButtonWrapper = styled.div`
  gap: 2rem;
  display: flex;
  margin-top: 2rem;
  justify-content: center;

  > Button {
    width: 170px;
    height: 50px;
    display: flex;
    font-size: 18px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;

    &:first-child {
      cursor: pointer;
      color: ${theme.colors.orange.main};
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.orange.main};
    }
  }
`;

const PriceAll = styled.div`
  display: flex;
  margin-top: 2rem;
  align-items: center;
  justify-content: space-between;

  > span {
    font-size: 24px;
  }
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

export default MainProductPurchase;
