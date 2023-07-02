import React from "react";
import styled, { css } from "styled-components";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { theme } from "../../styles/theme";
import { IProductDetail, productDetail } from "../../lib/API/commonAPI";
import { IProductLike } from "../../lib/API/adminAPI";
import { ICheckData } from "../common/Header";

interface IProductTitle {
  product?: IProductDetail;
  isAnimate?: boolean;
  like?: boolean;
  id?: string;
  setLike: (value: boolean) => void;
  setIsAnimate: (value: boolean) => void;
  res?: ICheckData;
}

function MainProductTitle({
  product,
  like,
  setLike,
  isAnimate,
  setIsAnimate,
  id,
  res,
}: IProductTitle) {
  // 로컬 스토리지로 찜 여부가 포함된 상품 정보를 Post
  const onLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setLike(!like); // like 토글
    const item = await findProduct(); // item 상세 조회

    if (item) postLike(item);

    setIsAnimate(true);

    // 0.4초 후에 resolve 함수를 호출하여 Promise를 완료
    await new Promise((resolve) => setTimeout(resolve, 400));

    setIsAnimate(false);
  };

  const findProduct = async () => {
    // 유효한 prdocut일 경우
    if (id) {
      // 단일 제품 상세 조회
      const product: IProductLike = await productDetail(id);
      return { ...product, like: true };
    }
    return null;
  };

  // 찜 목록을 로컬스토리지로 보냄
  const postLike = async (item: IProductLike) => {
    // 인증 확인
    if (res) {
      // 일치하는 상품을 get
      const getLikeItem = localStorage.getItem(`like_${res.email}`);

      // 빈 배열 선언
      let likeItems: IProductLike[] = [];

      // 기존 찜 목록을 배열로 담음
      if (getLikeItem) {
        likeItems = JSON.parse(getLikeItem);
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
    }
  };

  return (
    <TitleWrapper>
      <Title>{product?.title}</Title>
      <LikeButton onClick={onLike} isLiked={like} isAnimate={isAnimate}>
        {like ? <IoMdHeart /> : <IoMdHeartEmpty />}
      </LikeButton>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  font-family: "GmarketSans";
`;

const LikeButton = styled.button<{
  isLiked?: boolean;
  isAnimate?: boolean;
}>`
  background: none;
  border: none;
  cursor: pointer;

  ${(props) =>
    props.isLiked &&
    css`
      color: ${theme.colors.pink};
    `}
  ${(props) =>
    props.isAnimate &&
    css`
      transform: scale(1.2);
      transition: 0.4s;
    `}

  > svg {
    font-size: 3rem;
  }
`;

export default MainProductTitle;
