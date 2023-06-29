import MainItem from "./MainItem";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { productsList, IProduct } from "../../lib/API/adminAPI";
import Carousel from "../common/Carousel";
import { IProductLike } from "../../lib/API/adminAPI";
import { check } from "../../lib/API/userAPI";

function MainShipList() {
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
        let likedList: IProductLike[] = [];
        const authResponse = await check();
        const getLikedItem = localStorage.getItem(`like_${authResponse.email}`);

        if (getLikedItem) {
          likedList = JSON.parse(getLikedItem);
        }
        setLikedList(likedList);
      } catch (error) {
        console.error("Failed", error);
      }
    };
    fetchList();
  }, []);

  return (
    <>
      <Category>🚀 이달의 우주선 </Category>
      <Container>
        <Carousel slides={4} color="black">
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
  font-size: 2.625rem;
  font-weight: bold;
  margin: 5rem 0 2rem;
`;

const Container = styled.div`
  display: flex;
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
`;

export default MainShipList;
