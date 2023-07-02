import styled, { keyframes } from "styled-components";
import { theme } from "../../styles/theme";

function SubLoading() {
  return (
    <StyledSpinner>
      <Box>
        <img src="/images/LodingAni.png" alt="Loading" />
        <div>로딩 중...</div>
      </Box>
    </StyledSpinner>
  );
}

const flyAnimation = keyframes`
  0% {
    transform: translate(0, 40%);
  }
  100% {
    transform: translate(0, -20%);
  }
`;

const Box = styled.div`
  margin: 180px auto;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    margin: auto;
    animation: ${flyAnimation} 1.5s ease-out infinite;
  }
  div {
    width: 0 auto;
    font-family: "GmarketSans";
    color: ${theme.colors.orange.main};
    font-size: 1.25rem;
    font-weight: 700;
    justify-content: center;
    display: flex;
  }
`

const StyledSpinner = styled.div`
  width: 100%;
  height: 80%;
`;

export default SubLoading;
