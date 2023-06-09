import styled from "styled-components";
import MainCommet from "../../components/main/MainCommet";

function MainPage() {
  return (
    <Main>
      <Inner>
        <MainCommet />
      </Inner>
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
`;

const Inner = styled.div`
  max-width: 75rem;
  width: 75rem;
  margin: 0 auto;
`;

export default MainPage;
