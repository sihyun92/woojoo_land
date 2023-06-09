import styled from "styled-components";
import { theme } from "../../styles/theme";
import { IoMdHeartEmpty } from "react-icons/io";
import { IProduct } from "../../lib/API/adminAPI";

function MainCommet(props: IProduct) {
  return (
    <>
      <Container>
        <Commet>
          <IoMdHeartEmpty />
        </Commet>
        <Desc>
          <Title>{props.title}</Title>
          <Py>평당</Py>
          <PriceWrapper>
            <Discount>{props.discountRate}%</Discount>
            <Price>{props.price}$</Price>
          </PriceWrapper>
        </Desc>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 17.8125rem;
  height: 23.5625rem;
`;

const Commet = styled.div`
  position: relative;
  width: 17.8125rem;
  height: 285px;
  background-color: ${theme.colors.black};
  border-radius: 1.25rem;

  > svg {
    position: absolute;
    font-size: 1.25rem;
    color: ${theme.colors.white};
    right: 0.5rem;
    bottom: 0.5rem;
  }
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;

const Title = styled.div`
  font-size: 2.5rem;
`;

const Py = styled.div`
  text-align: right;
  font-size: 1rem;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Discount = styled.div`
  font-size: 1.5rem;
`;

const Price = styled.div`
  font-size: 1.5rem;
  margin-top: 4px;
`;

export default MainCommet;
