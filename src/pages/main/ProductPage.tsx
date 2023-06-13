import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productDetail, IProductDetail } from "../../lib/API/commonAPI";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProductDetail>();
  let [quantity, setQuantity] = useState<number>(1);

  // 구매 수량 증가
  const onDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // 구매 수량 감소
  const onIncrease = () => {
    setQuantity(quantity + 1);
  };

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
        <Price>{product.price}$</Price>
        <Desc>{product.description}</Desc>
        <hr />
        <PurchaseWrapper>
          <Quantity>
            <span>구매 수량</span>
            <ButtonWrapper>
              <BiMinusCircle onClick={onDecrease}>-</BiMinusCircle>
              <p>{quantity}</p>
              <BiPlusCircle onClick={onIncrease}>+</BiPlusCircle>
            </ButtonWrapper>
          </Quantity>
        </PurchaseWrapper>
      </DetailWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin-top: 5rem;
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
  margin-bottom: 2rem;
`;

const Desc = styled.div`
  line-height: 1.5rem;
  margin-bottom: 2rem;
  letter-spacing: 1.5%;
  color: ${theme.colors.gray[5]};
`;

const PurchaseWrapper = styled.div``;

const Quantity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;

  > svg {
    font-size: 1.5rem;
    cursor: pointer;
  }
  > p {
    font-size: 1.5rem;
  }
`;

export default ProductPage;
