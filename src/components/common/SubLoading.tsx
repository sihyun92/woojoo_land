import styled, { keyframes } from "styled-components";
import { theme } from "../../styles/theme";

function SubLoading() {
  return (
    <StyledSpinner>
      <img src="/images/Loading.png" alt="Loading" />
      <span>로딩중...</span>
    </StyledSpinner>
  );
}

const flyAnimation = keyframes`
  0% {
    transform: translate(-100%, 100%);
  }
  100% {
    transform: translate(100%, -100%);
  }
`;

const StyledSpinner = styled.div`
  width: 100%;
  height: 100%;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    animation: ${flyAnimation} 2s ease-out infinite;
  }

  span {
    font-family: "GmarketSans";
    color: ${theme.colors.orange.main};
    font-size: 1.25rem;
    position: absolute;
    font-weight: 700;
    left: 50%;
    top: 62%;
  }
`;

export default SubLoading;
