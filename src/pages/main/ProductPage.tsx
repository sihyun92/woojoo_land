import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productDetail, IProductDetail } from "../../lib/API/commonAPI";
import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
import { formatDollar } from "../../lib/Function/commonFn";
import { IProductLike } from "../../lib/API/adminAPI";
import { useQueryClient } from "react-query";
import { ICheckData } from "../../components/common/Header";
import MainProductTitle from "../../components/main/MainProductTitle";
import MainProductPurchase from "../../components/main/MainProductPurchase";

function ProductPage() {
  const queryClient = useQueryClient();
  const res = queryClient.getQueryData<ICheckData>("check");
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProductDetail>();
  const [like, setLike] = useState<boolean>(false);
  const [isAnimate, setIsAnimate] = useState<boolean>(false);

  const [scrollY, setScrollY] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);
  const [scrollBottom, setScrollBottom] = useState(false);

  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener("scroll", scrollFixed);
    };
    scrollListener();
    return () => {
      window.removeEventListener("scroll", scrollFixed);
    };
  });

  const scrollFixed = () => {
    setScrollY(window.scrollY);
    if (scrollY <= 165) {
      setScrollActive(false);
    } else if (scrollY > 165 && scrollY < 1050) {
      setScrollActive(true);
      setScrollBottom(false);
    } else if (scrollY >= 1050) {
      // setScrollActive(false);
      setScrollBottom(true);
    }
  };

  // 최초 LocalStorage에 접근하여, 찜 목록에 있는 상품의 like 값(true) 지정
  // 단일 상품 상세 조회
  useEffect(() => {
    async function fetchDetail() {
      try {
        const productRes = await productDetail(id as string);
        setProduct(productRes);

        // 인증
        if (res) {
          // localStorage 접근
          const getLikeItem = localStorage.getItem(`like_${res.email}`);

          // parse를 위해 배열 선언
          let likeItems: IProductLike[] = [];

          // 파싱
          if (getLikeItem) {
            likeItems = JSON.parse(getLikeItem);
          }

          // useParams로 지정한 상품의 id값과 동일한 item을 찾아서 변수에 저장
          const item = likeItems.find((item) => item.id === id);

          // 찜 목록에 있다면 item.like(true), 없다면 false 지정
          const like = item ? item.like : false;

          // like state 변경
          setLike(like as boolean);
        }
      } catch (error) {
        console.error(`error: ${error}`);
      }
    }
    fetchDetail();
  }, [id, res]);

  const discountedPrice =
    (product?.price as number) * (1 - (product?.discountRate as number) / 100);

  return (
    <Container>
      <PhotoWrapper>
        <img
          src={product ? product.photo : "/images/Detailed.png"}
          alt="Detailed"
        />
      </PhotoWrapper>
      <AbsoluteWrapper>
        <DetailWrapper scrollActive={scrollActive} scrollBottom={scrollBottom}>
          <MainProductTitle
            product={product}
            isAnimate={isAnimate}
            setIsAnimate={setIsAnimate}
            like={like}
            setLike={setLike}
            id={id}
            res={res}
          />
          <Price>{formatDollar(discountedPrice)}</Price>
          <Desc>{product?.description}</Desc>
          <hr />
          <MainProductPurchase
            product={product}
            discountedPrice={discountedPrice}
          />
        </DetailWrapper>
      </AbsoluteWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const PhotoWrapper = styled.div`
  width: 687px;

  img {
    width: 100%;
  }
`;

const AbsoluteWrapper = styled.div`
  width: 480px;
  right: 0;
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

const DetailWrapper = styled.div<{
  scrollActive: boolean;
  scrollBottom: boolean;
}>`
  width: 480px;
  padding: 2rem;
  transition: all 1s ease-in-out;
  border-radius: 10px;
  border: 1px solid ${theme.colors.gray[5]};
  position: relative;

  ${(props) =>
    props.scrollActive &&
    css`
      top: 40px;
      margin-top: 22vh;
      position: fixed;
    `};

  ${(props) =>
    props.scrollBottom &&
    css`
      top: unset;
      bottom: 0;
      position: absolute;
    `};
`;

export default ProductPage;
