import styled from "styled-components";
import { theme } from "../../styles/theme";
import { IoMdHeartEmpty } from "react-icons/io";
import { IProduct } from "../../lib/api/adminAPI";
import { Link } from "react-router-dom";
import { formatDollar } from "../../lib/Function/commonFn";

function MainCommet(props: IProduct) {
  return (
    <>
      <Link to={`/product/${props.id}`}>
        <Container>
          <Commet>
            <img src="/images/Thumbnail.png" alt="Thumbnail" />
            <IoMdHeartEmpty />
          </Commet>
          <Desc>
            <Title>{props.title}</Title>
            <Py>평당</Py>
            <PriceWrapper>
              <Discount>{props.discountRate}%</Discount>
              <Price>{formatDollar(props.price)}</Price>
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

const Commet = styled.div`
  width: 288px;
  height: 288px;
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 1.25rem;
  justify-content: center;
  background-color: ${theme.colors.black};

  > svg {
    right: 0.5rem;
    bottom: 0.5rem;
    position: absolute;
    font-size: 1.25rem;
    color: ${theme.colors.white};
  }
`;

const Desc = styled.div`
  display: flex;
  margin: 0.5rem 1rem 0 0;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 2.5rem;
`;

const Py = styled.div`
  font-size: 1rem;
  text-align: right;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Discount = styled.div`
  font-size: 2rem;
  color: ${theme.colors.orange.main};
`;

const Price = styled.div`
  margin-top: 4px;
  font-size: 2rem;
`;

export default MainCommet;
