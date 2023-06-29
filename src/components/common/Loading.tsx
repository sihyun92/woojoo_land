import { BounceLoader } from "react-spinners";
import styled from "styled-components";
import { theme } from "../../styles/theme";

interface ILoadingProps {
  startLoading: boolean;
  finishLoading: boolean;
}

function Loading() {
  return (
    <Wrapper>
      <BounceLoader size={100} color={theme.colors.white} />
      <span>로딩 중...</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${theme.colors.orange.main};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  span {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
  }
`;

export default Loading;
