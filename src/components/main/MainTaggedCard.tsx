// Tagged-Components의 공용 컴포넌트

import styled from "styled-components";
import { theme } from "../../styles/theme";
import { IProduct } from "../../lib/API/adminAPI";
import MainCommet from "./MainCommet";

interface ITaggedCard {
  title: string;
  list: IProduct[];
}

function MainTaggedCard({ title, list }: ITaggedCard) {
  return (
    <Container>
      <Title>{list.length > 0 ? title : `👽 ${title}가 없습니다.`}</Title>
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
