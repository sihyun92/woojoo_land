// Tagged-Components의 공용 컴포넌트

import styled from "styled-components";
import { IProduct } from "../../../lib/API/adminAPI";
import { formatDollar } from "../../../lib/Function/commonFn";
import { Link } from "react-router-dom";

interface ISearchedCard {
  list: IProduct[];
}

// 검색 결과 (list)가 있을 때(length > 0)와 없을 때를 구분하여 조건부 출력
function MainSearchedCard({ list }: ISearchedCard) {
  return (
    <Container>
      <Wrapper>
        {list.length > 0 &&
          list.map((item) => (
            <Link to={`/product/${item.id}`}>
              <SearchList key={item.id}>
                <WrapperLeft>
                  <TumbnailImg src={item.thumbnail} alt="Tumbnail" />
                  <ItemTitle>{item.title}</ItemTitle>
                </WrapperLeft>
                <WrapperRight>
                  <span>{formatDollar(item.price)}</span>
                  {item.discountRate !== 0 && (
                    <Discount>{item.discountRate}% 할인중!</Discount>
                  )}
                </WrapperRight>
              </SearchList>
            </Link>
          ))}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  z-index: 2;
  top: 3.3rem;
  position: absolute;
  width: 420px;
  padding: 5px 0px 10px 0px;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 1200px;
  flex-direction: column;
`;

const SearchList = styled.div`
  width: 100%;
  margin: 3px 0;
  padding: 10px;
  display: flex;
  transition: 0.1s;
  align-items: center;
  border-radius: 10px;
  justify-content: space-between;
  box-shadow: 0px 0px 8px 1px #00000035;
  background-color: ${(props) => props.theme.colors.white};
  &:hover {
    background-color: ${(props) => props.theme.colors.gray[2]};
    transform: scale(0.99);
    box-shadow: 0px 0px 4px 0px #00000022;
  }
`;

const WrapperLeft = styled.div`
  display: flex;
  gap: 1.25rem;
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const WrapperRight = styled.div`
  gap: 5px;
  display: flex;
  align-items: end;
  flex-direction: column;
  span:first-child {
    font-size: 18px;
  }
`;

const Discount = styled.span`
  color: ${(props) => props.theme.colors.orange.main};
  font-size: 14px;
`;

const TumbnailImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

// const NoList = styled.div`
//   display: flex;
//   width: 100%;
//   justify-content: center;
//   align-items: center;
//   font-size: 2rem;
//   margin-top: 5rem;
//   flex-direction: column;
// `;

// const Rank = styled.div`
//   margin-top: 2rem;

//   > span {
//     display: inline-block;
//     padding-top: 2rem;
//     border-bottom: 8px solid ${theme.colors.orange.main};
//   }
// `;

export default MainSearchedCard;
