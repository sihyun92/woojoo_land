import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productDetail, IProductDetail } from "../../lib/API/commonAPI";
import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
import { formatDollar } from "../../lib/Function/commonFn";
import Button from "../../components/common/Button";
import MainProductBtn from "../../components/main/MainProductBtn";
import MainCartBtn from "../../components/main/MainCartBtn";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { check2 } from "../../lib/API/userAPI";
import { IProduct } from "../../lib/API/adminAPI";

function ProductPage() {
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState<IProduct[]>([]);
  const { id } = useParams<{ id: string }>();
  let [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<IProductDetail>();

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

  // 로컬 스토리지로 찜 여부가 포함된 상품 정보를 Post
  const onLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // like toggle
    setLike(!like);

    // item 상세 조회
    const item = await findProduct();

    if (item) {
      postLike(item);
    }
  };

  const findProduct = async () => {
    // 유효한 prdocut일 경우
    if (id) {
      // 단일 제품 상세 조회
      const product: IProduct = await productDetail(id);
      return product;
    }
    return null;
  };

  // 찜 목록을 로컬스토리지로 보냄
  const postLike = async (item: IProduct) => {
    // 인증 확인
    const res = await check2();
    // 일치하는 상품을 get
    const getLikeItems = localStorage.getItem(`like_${res.email}`);

    // 빈 배열 선언
    let likeItems: IProduct[] = [];

    // 기존 찜 목록을 배열로 담음
    if (getLikeItems) {
      likeItems = JSON.parse(getLikeItems);
    }

    if (like === true) {
      // 이미 찜한 상품인 경우, 삭제(filter)
      const updatedLikes = likeItems.filter((value) => value.id !== item.id);
      localStorage.setItem(`like_${res.email}`, JSON.stringify(updatedLikes));
    } else {
      // 찜하지 않은 상품인 경우, 추가(push)
      likeItems.push(item);
      localStorage.setItem(`like_${res.email}`, JSON.stringify(likeItems));
    }
  };

  return (
    <Container>
      <PhotoWrapper>
        <img src="/images/Detailed.png" alt="Detailed" />
      </PhotoWrapper>
      <DetailWrapper>
        <TitleWrapper>
          <Title>{product?.title} 특별분양</Title>
          <LikeButton onClick={onLike} selected={like}>
            {like ? <IoMdHeart /> : <IoMdHeartEmpty />}
          </LikeButton>
        </TitleWrapper>
        <Price>{formatDollar(product?.price)}</Price>
        <Desc>{product?.description}</Desc>
        <hr />
        <PurchaseWrapper>
          <Quantity>
            <span>구매 수량</span>
            <MainProductBtn quantity={quantity} setQuantity={setQuantity} />
          </Quantity>
          <PriceAll>
            <span>총 상품 금액</span>
            <Price>
              {product?.price ? formatDollar(product?.price * quantity) : 0}
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

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
`;

const LikeButton = styled.button<{
  selected: boolean;
}>`
  background: none;
  border: none;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    css`
      color: ${theme.colors.pink};
    `}

  > svg {
    font-size: 3rem;
  }
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
