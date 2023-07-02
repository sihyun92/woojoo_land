import Button from "../common/Button";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { ICheckData } from "../common/Header";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { formatDollar } from "../../lib/Function/commonFn";

export interface IProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  tags: string[];
  thumbnail: string | null;
  photo: string | null;
  isSoldOut: boolean;
  discountRate: number;
}

interface ILikeListProps {
  res: ICheckData | undefined;
  likes: IProduct[];
  carts: IProduct[];
  setLikes: Dispatch<SetStateAction<IProduct[]>>;
  setCarts: Dispatch<SetStateAction<IProduct[]>>;
}

function UserLikeList({
  res,
  likes,
  carts,
  setLikes,
  setCarts,
}: ILikeListProps) {
  const navigate = useNavigate();

  // 찜 목록을 로컬스토리지로 보냄
  const postLike = async (updatedLikes: IProduct[]) => {
    if (res) {
      localStorage.setItem(`like_${res.email}`, JSON.stringify(updatedLikes));
    }
  };

  // 장바구니 목록을 로컬스토리지로 보냄
  const postCart = async (updatedCarts: IProduct[]) => {
    if (res) {
      localStorage.setItem(`cart_${res.email}`, JSON.stringify(updatedCarts));
    }
  };

  // 장바구니로 상품을 전달하는 함수
  const onCart = (
    event: React.MouseEvent<HTMLButtonElement>,
    like: IProduct,
  ) => {
    event.preventDefault();
    const updatedCarts = [...carts, like];
    setCarts(updatedCarts);
    postCart(updatedCarts);
    const confirm = window.confirm(
      "장바구니에 상품을 담았습니다. 장바구니로 이동하시겠습니까?",
    );
    if (confirm) {
      navigate("/cart");
    }
  };

  // 찜한 상품을 삭제하는 함수
  // 선택한 상품을 제외한 다른 찜 목록 상품들로 이루어진 배열을 로컬스토리지로 전달
  const onDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    selectedLike: IProduct,
  ) => {
    event.preventDefault();
    const confirm = window.confirm("찜 목록에서 삭제하시겠습니까?");
    if (confirm) {
      const updatedLikes = likes.filter((like) => like.id !== selectedLike.id);
      setLikes(updatedLikes);
      postLike(updatedLikes);
    }
  };
  return (
    <LikeBox>
      {likes.length ? (
        likes.map((like: IProduct, index) => {
          return (
            <Likelist key={index}>
              <ListInfo>
                <img src={like.thumbnail as string} alt="Thumnail" />
                <ListText>
                  <LikeName>{like.title}</LikeName>
                  <LikePrice>{formatDollar(like.price)}</LikePrice>
                </ListText>
              </ListInfo>
              <Buttons>
                <OnCartButton
                  type="button"
                  onClick={(event) => {
                    onCart(event, like);
                  }}
                >
                  장바구니 담기
                </OnCartButton>
                <DeleteLikeButton
                  minidel
                  type="button"
                  onClick={(event: any) => {
                    onDelete(event, like);
                  }}
                >삭제
                </DeleteLikeButton>
              </Buttons>
            </Likelist>
          );
        })
      ) : (
        <NoLikes>찜한 상품이 없습니다.</NoLikes>
      )}
    </LikeBox>
  );
}

const LikeBox = styled.ul`
  gap: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Likelist = styled.li`
  flex-grow: 1;
  height: 120px;
  display: flex;
  padding: 0 1rem;
  transition: 0.1s;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.colors.gray[7]};
  &:hover {
    transform: scale(0.99);
    background-color: ${theme.colors.gray[2]};
  }
`;

const ListInfo = styled.div`
  gap: 1.2rem;
  display: flex;
  padding: 20px 0;
  height: 130px;
  img {
    border-radius: 5px;
  }
`;

const ListText = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LikeName = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

const LikePrice = styled.span`
  font-size: 1.125rem;
`;

const Buttons = styled.div`
  gap: 10px;
  display: flex;
`;

const OnCartButton = styled.button`
  border: none;
  font-size: 12px;
  transition: 0.1s;
  border-radius: 5px;
  background-color: transparent;
  color: ${theme.colors.orange.main};
  border: 1px solid ${theme.colors.orange.main};
  &:hover {
    cursor: pointer;
    color: ${theme.colors.white};
    background-color: ${theme.colors.orange.main};
    border: 1px solid ${theme.colors.orange.main};
  }
`;

const DeleteLikeButton = styled(Button)`
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const NoLikes = styled.span`
  font-weight: 700;
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.orange.main};
`;
export default UserLikeList;
