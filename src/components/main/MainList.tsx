import MainItem from "./MainItem";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { productsList, IProduct } from "../../lib/API/adminAPI";
import Carousel from "../common/Carousel";
import { IProductLike } from "../../lib/API/adminAPI";
import { check } from "../../lib/API/userAPI";

function MainList() {
  const [list, setList] = useState<IProduct[]>([]);
  const [likeItems, setLikeItems] = useState<IProductLike[]>([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        //  모든 제품 조회
        const res = await productsList();
        setList(res);

        // 찜 목록 조회
        const AuthRes = await check();
        const getLikeItem = localStorage.getItem(`like_${AuthRes.email}`);
        let likeItems: IProductLike[] = [];

        if (getLikeItem) {
          likeItems = JSON.parse(getLikeItem);
        }
        setLikeItems(likeItems);
      } catch (error) {
        console.error("Failed", error);
      }
    };
    fetchList();
  }, []);

  return (
    <>
      <Category>🪐 신상 행성 </Category>
      <Container>
        <Carousel>
          {list.map((item) => {
            const liked = likeItems.find((likeItem) => likeItem.id === item.id);
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
  margin-bottom: 2rem;
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

export default MainList;
