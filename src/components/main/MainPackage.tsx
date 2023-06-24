import styled from "styled-components";
import { theme } from "../../styles/theme";

function MainPackage() {
  return (
    <>
      <Category>🌕 패키지 특가 상품</Category>
      <Container>
        <Wrapper>
          <Package>이주 패키지 🛸</Package>
        </Wrapper>
        <Wrapper>
          <Package>왕복권 🚀</Package>
        </Wrapper>
      </Container>
    </>
  );
}

const Category = styled.h1`
  font-size: 2.625rem;
  font-weight: bold;
  margin: 5rem 0 2rem;
`;
const Container = styled.div`
  display: flex;
  width: 1200px;
  justify-content: space-between;
`;
const Wrapper = styled.div``;

const Package = styled.div`
  position: relative;
  display: flex;
  width: 592px;
  height: 285px;
  background-color: ${theme.colors.black};
  border-radius: 1.25rem;
  color: ${theme.colors.orange.main};
  font-size: 3rem;
  align-items: center;
  justify-content: center;

  > svg {
    position: absolute;
    font-size: 1.25rem;
    color: ${theme.colors.white};
    right: 0.5rem;
    bottom: 0.5rem;
  }
`;

export default MainPackage;
