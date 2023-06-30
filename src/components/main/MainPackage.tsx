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
      <Category>🌕 패키지 특가 상품</Category>
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

const Package = styled.img`
  display: block;
  border-radius: 1.25rem;
  color: ${theme.colors.orange.main};
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default MainPackage;
