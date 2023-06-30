/* eslint-disable react-hooks/exhaustive-deps */
import MainItem from "./MainItem";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { productsList, IProduct } from "../../lib/API/adminAPI";
import Carousel from "../common/Carousel";
import { IProductLike } from "../../lib/API/adminAPI";
import { theme } from "../../styles/theme";
import { useQueryClient } from "react-query";
import { ICheckData } from "../common/Header";

function MainShipList() {
  const queryClient = useQueryClient();
  const res = queryClient.getQueryData<ICheckData>("check");
  // 상품들을 담는 배열 선언
  const [list, setList] = useState<IProduct[]>([]);
  // liked된 item을 담을 배열 선언
  const [likedList, setLikedList] = useState<IProductLike[]>([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        //  모든 제품 조회
        const response: IProduct[] = await productsList();

        // 태양계 상품 조회
        const solarList = response.filter((item) =>
          item.tags?.includes("우주선"),
        );
        setList(solarList);

        // 찜 목록 조회
        if (res) {
          let likedList: IProductLike[] = [];
          const getLikedItem = localStorage.getItem(`like_${res.email}`);

          if (getLikedItem) {
            likedList = JSON.parse(getLikedItem);
          }
          setLikedList(likedList);
        }
      } catch (error) {
        console.error("Failed", error);
      }
    };
    fetchList();
  }, []);

  return (
    <>
      <Category><div/>이달의 우주선 </Category>
      <Container>
        <Carousel slides={4} color={theme.colors.gray[5]}>
          {list.map((item) => {
            const liked = likedList.find((likeItem) => likeItem.id === item.id);
            const like = liked ? liked.like : false;
            return (
              <MainItem
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                discountRate={item.discountRate}
                thumbnail={item.thumbnail}
                tags={item.tags}
                like={like}
              />
            );
          })}
        </Carousel>
      </Container>
    </>
  );
}

const Category = styled.h1`
  margin: 6rem 0 2rem;
  font-size: 2.625rem;
  font-weight: bold;
  letter-spacing: -2px;
  font-family: 'GmarketSans';
  display: flex;
  div{
    background-color: ${theme.colors.orange.main};
    width: 8px;
    height: 40px;
    margin-right: 10px;
    display: flex;
  }
`;

const Container = styled.div`
  display: flex;
  padding-left: 13px;
  margin-bottom: 50px;
  justify-content: center;
  .slick-slider {
    width: 75rem;
  }

  .slick-list {
  }

  .slick-arrow {
    width: 50px;
    height: 50px;
    top: 150px;
  }

  .slick-dots {
    li{
      display: none;
    }
  }

  .slick-prev {
    opacity: 0;
    transition: 0.1s;
    &:hover {
      opacity: 0.4;
    }
  }

  .slick-next {
    opacity: 0;
    transition: 0.1s;
    &:hover {
      opacity: 0.4;
    }
  }
`;

export default MainShipList;
