// Tagged-Components의 공용 컴포넌트

import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { IProduct } from "../../../lib/API/adminAPI";
import MainCommet from "../MainItem";

interface ITaggedCard {
  title: string;
  list: IProduct[];
}

// 검색 결과 (list)가 있을 때(length > 0)와 없을 때를 구분하여 조건부 출력
function MainTaggedCard({ title, list }: ITaggedCard) {
  return (
    <Container>
      <Title>{title}</Title>
      <Wrapper>
        {list.map((item) => (
          <MainCommet
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            discountRate={item.discountRate}
            thumbnail={item.thumbnail}
            tags={item.tags}
          />
        ))}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  color: ${theme.colors.orange.main};
`;

const NoList = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin-top: 5rem;
  flex-direction: column;
`;

const Rank = styled.div`
  margin-top: 2rem;

  > span {
    display: inline-block;
    padding-top: 2rem;
    border-bottom: 8px solid ${theme.colors.orange.main};
  }
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 1200px;
  flex-wrap: wrap;

  > a {
    margin-top: 3.5rem;
    margin-right: 16px;
  }

  > a:nth-child(4n + 0) {
    margin-right: 0;
  }
`;

const NoAnswer = styled.div`
  width: 100%;
  text-align: center;
`;

export default MainTaggedCard;
