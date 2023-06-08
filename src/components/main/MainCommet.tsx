import styled from "styled-components";
import { theme } from "../../styles/theme";
import { IoMdHeartEmpty } from "react-icons/io";

function MainCommet() {
  return (
    <>
      <Title>🪐 신상 행성</Title>
      <Container>
        <Wrapper>
          <Commet>
            <IoMdHeartEmpty />
          </Commet>
        </Wrapper>
        <Wrapper>
          <Commet>
            <IoMdHeartEmpty />
          </Commet>
        </Wrapper>
        <Wrapper>
          <Commet>
            <IoMdHeartEmpty />
          </Commet>
        </Wrapper>
        <Wrapper>
          <Commet>
            <IoMdHeartEmpty />
          </Commet>
        </Wrapper>
      </Container>
    </>
  );
}

const Title = styled.h1`
  font-size: 2.625rem;
  font-weight: bold;
  margin: 2rem 0;
`;
const Container = styled.div`
  display: flex;
  width: 75rem;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  width: 17.8125rem;
  height: 23.5625rem;
  background-color: coral;
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

export default MainCommet;
