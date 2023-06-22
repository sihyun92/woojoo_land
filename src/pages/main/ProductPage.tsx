import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productDetail, IProductDetail } from "../../lib/api/commonAPI";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { formatDollar } from "../../lib/Function/commonFn";
import Button from "../../components/common/Button";
import MainProductBtn from "../../components/main/MainProductBtn";
import MainCartBtn from "../../components/main/MainCartBtn";

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProductDetail>();
  let [quantity, setQuantity] = useState<number>(1);

  // 단일 상품 상세 조회
  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await productDetail(id as string);
        setProduct(res);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetail();
  }, [id]);

  // product 타입에 따른 로딩 중 표시
  if (!product) return <div>로딩중입니다!</div>;

  return (
    <Container>
      <PhotoWrapper>
        <img src="/images/Detailed.png" alt="Detailed" />
      </PhotoWrapper>
      <DetailWrapper>
        <Title>{product.title} 특별분양</Title>
        <Price>{formatDollar(product.price)}</Price>
        <Desc>{product.description}</Desc>
        <hr />
        <PurchaseWrapper>
          <Quantity>
            <span>구매 수량</span>
            <MainProductBtn quantity={quantity} setQuantity={setQuantity} />
          </Quantity>
          <PriceAll>
            <span>총 상품 금액</span>
            <Price>
              {product.price ? formatDollar(product.price * quantity) : 0}
            </Price>
          </PriceAll>
          <ButtonWrapper>
            <MainCartBtn quantity={quantity} />
            <Button orange="true">구매하기</Button>
          </ButtonWrapper>
        </PurchaseWrapper>
      </DetailWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const PhotoWrapper = styled.div`
  margin-right: 2rem;
`;

const DetailWrapper = styled.div`
  height: 100%;
  padding: 2rem 1rem;
  border: 1px solid ${theme.colors.gray[5]};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const Desc = styled.div`
  line-height: 1.5rem;
  margin-bottom: 2rem;
  letter-spacing: 1.5%;
  color: ${theme.colors.gray[5]};
  margin-top: 2rem;
`;

const PurchaseWrapper = styled.div``;

const Quantity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  > span {
    font-size: 24px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;

  > Button {
    width: 170px;
    height: 50px;
    font-size: 18px;

    &:first-child {
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.orange.main};
      color: ${theme.colors.orange.main};
      cursor: pointer;
    }
  }
`;

const PriceAll = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  > span {
    font-size: 24px;
  }
`;

export default ProductPage;
