import MainCommet from "./MainCommet";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { productsList, IProduct } from "../../lib/API/adminAPI";

function MainList() {
  const [list, setList] = useState<IProduct[]>([]);

  useEffect(() => {
    async function fetchList() {
      try {
        const res = await productsList();
        setList(res);
      } catch (error) {
        console.error("Failed", error);
      }
    }
    fetchList();
  }, []);

  return (
    <>
      <Category>🪐 신상 땅 </Category>
      <Container>
        {list.map((item) => (
          <MainCommet
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            discountRate={item.discountRate}
          />
        ))}
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
  width: 75rem;
  justify-content: space-between;
`;

export default MainList;
