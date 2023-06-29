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
      if (tags.includes("태양계") || tags.includes("사건의지평선")) {
        return "평당";
      } else if (tags.includes("우주복")) {
        return "한 벌당";
      } else if (tags.includes("우주선")) {
        return "한 대당";
      } else if (tags.includes("우주정거장")) {
        return "시간 당";
      } else {
        return "개당";
      }
    }
  };
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
            <Py>
              {typeof props.tags === "object" ? formatUnit(props.tags) : ""}
            </Py>
            <PriceWrapper>
              <Discount>{props.discountRate}<div>%</div></Discount>
              <Price>{formatDollar(props.price)}</Price>
            </PriceWrapper>
          </Desc>
        </Container>
      </Link>
    </>
  );
}

const Container = styled.div`
  width: 275px;
  transition: 0.1s;
  &:hover{
    transform: scale(0.98);
  }
`;

const Commet = styled.div<{
  selected: boolean;
}>`
  width: 275px;
  height: 275px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: center;
  border-radius: 30px;
  justify-content: center;
  background-color: ${theme.colors.black};

  > svg {
    right: 13px;
    bottom: 12px;
    opacity: 0.3;
    font-size: 24px;
    position: absolute;
    color: ${theme.colors.white};
  }

  > img {
    width: 288px;
  }

  ${(props) =>
    props.selected &&
    css`
      > svg {
        opacity: 1;
        color: ${theme.colors.pink};
      }
    `}
`;

const Desc = styled.div`
  display: flex;
  margin: 0 8px 0 8px;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  margin-top: 10px;
  font-family: 'GmarketSans';
`;

const Py = styled.div`
  font-size: 14px;
  text-align: right;
  margin-top: 4px;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Discount = styled.div`
  display: flex;
  font-size: 2rem;
  align-items: end;
  padding-top: 5px;
  letter-spacing: -3px;
  color: ${theme.colors.orange.main};
  div {
    font-size: 16px;
    font-weight: 700;
    padding-left: 4px;
    padding-bottom: 5px;
  }
`;

const Price = styled.div`
  font-size: 24px;
  margin-top: 4px;
  font-weight: 700;
  letter-spacing: -1px;
`;

export default MainCommet;
