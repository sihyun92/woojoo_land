import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
import { Link } from "react-router-dom";
import { formatDollar } from "../../lib/Function/commonFn";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IProductLike } from "../../lib/API/adminAPI";

function MainCommet(props: IProductLike) {
  const like = props.like;

  const formatUnit = (tags: string[]) => {
    if (tags) {
      if (tags.includes("태양계") || tags.includes("사건의 지평선")) {
        return "평당";
      } else if (tags.includes("우주복")) {
        return "한 벌당";
      } else if (tags.includes("우주선")) {
        return "한 대당";
      } else if (tags.includes("우주 정거장")) {
        return "시간 당";
      } else {
        return "개당";
      }
    }
  };

  // 할인된 가격 (할인율 존재)
  const discountedPrice =
    props.price * (1 - (props.discountRate as number) / 100);

  // 정가
  const fixedPrice = props.price;

  return (
    <>
      <Link to={`/product/${props.id}`}>
        <Container>
          <Commet selected={like as boolean}>
            <img src={props.thumbnail} alt="Thumbnail" />
            {like ? <IoMdHeart /> : <IoMdHeartEmpty />}
          </Commet>
          <Desc>
            <Title>{props.title}</Title>
            {(props.discountRate as number) > 0 ? (
              <PrevPrice>{formatDollar(props.price)}</PrevPrice>
            ) : (
              ""
            )}

            <PriceWrapper>
              <Discount>{props.discountRate}%</Discount>
              <Price>
                <Py>
                  {typeof props.tags === "object" ? formatUnit(props.tags) : ""}
                </Py>
                {(props.discountRate as number) > 0
                  ? formatDollar(discountedPrice)
                  : formatDollar(fixedPrice)}
              </Price>
            </PriceWrapper>
          </Desc>
        </Container>
      </Link>
    </>
  );
}

const Container = styled.div`
  width: 288px;
`;

const Commet = styled.div<{
  selected: boolean;
}>`
  width: 288px;
  height: 288px;
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 20px;
  justify-content: center;
  background-color: ${theme.colors.black};

  > svg {
    right: 0.5rem;
    bottom: 0.5rem;
    position: absolute;
    font-size: 20px;
    color: ${theme.colors.white};
  }

  > img {
    width: 288px;
    border-radius: 20px;
  }

  ${(props) =>
    props.selected &&
    css`
      > svg {
        color: ${theme.colors.pink};
      }
    `}
`;

const Desc = styled.div`
  display: flex;
  margin: 0.5rem 1rem 0 0;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 2.5rem;
`;

const PrevPrice = styled.div`
  text-decoration: line-through;
  color: ${theme.colors.gray[0]};
  text-align: right;
`;

const Py = styled.div`
  display: flex;
  font-size: 1rem;
  margin-right: 0.5rem;
  align-items: end;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Discount = styled.div`
  display: flex;
  font-size: 2.5rem;
  color: ${theme.colors.orange.main};
  align-items: bottom;
`;

const Price = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
`;

export default MainCommet;
