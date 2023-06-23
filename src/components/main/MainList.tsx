import MainCommet from "./MainCommet";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { productsList, IProduct } from "../../lib/API/adminAPI";
import Carousel from "../common/Carousel";

function MainList() {
  const [list, setList] = useState<IProduct[]>([]);

  useEffect(() => {
    async function fetchList() {
      try {
        //  모든 제품 조회
        const res = await productsList();
        setList(res);
      } catch (error) {
        console.error("Failed", error);
      }
    }
    if (list.length === 0) {
      fetchList();
    }
  }, [list]);

  return (
    <>
      <Category>🪐 신상 행성 </Category>
      <Container>
        <Carousel>
          {list.map((item) => (
            <MainCommet
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              discountRate={item.discountRate}
              thumbnail={item.thumbnail}
            />
          ))}
        </Carousel>
      </Container>
    </>
  );
}

const Category = styled.h1`
  font-size: 2.625rem;
  font-weight: bold;
  margin: 2rem 0;
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
