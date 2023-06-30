import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { theme } from "../../styles/theme";

function MainPackage() {
  const navigate = useNavigate();

  const onToMarsPackage = () => {
    navigate("/product/uSInnvkln98h4oP5yOtj");
  };
  const onToRoundTrip = () => {
    navigate("/product/52Zq0J0MycRKvTkd0C80");
  };
  return (
    <>
      <Category><div/>패키지 특가 상품</Category>
      <Container>
        <Wrapper>
          <Package
            src="/images/PackageBanner1.png"
            alt=""
            onClick={onToMarsPackage}
          />
        </Wrapper>
        <Wrapper>
          <Package
            src="/images/PackageBanner2.png"
            alt=""
            onClick={onToRoundTrip}
          />
        </Wrapper>
      </Container>
    </>
  );
}

const Category = styled.h1`
  display: flex;
  font-weight: bold;
  margin: 6rem 0 2rem;
  font-size: 2.625rem;
  letter-spacing: -2px;
  font-family: 'GmarketSans';
  div{
    width: 8px;
    height: 40px;
    display: flex;
    margin-right: 10px;
    background-color: ${theme.colors.orange.main};
  }
`;
const Container = styled.div`
  display: flex;
  width: 1200px;
  padding-left: 13px;
  padding-right: 13px;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  transition: 0.1s;
  &:hover {
    transform: scale(0.98);
  }
`;

const Package = styled.img`
  display: flex;
  cursor: pointer;
  width: 575px;
  align-items: center;
  border-radius: 1.25rem;
  justify-content: center;
  color: ${theme.colors.orange.main};

`;

export default MainPackage;
