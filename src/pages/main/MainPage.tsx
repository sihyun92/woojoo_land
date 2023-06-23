import styled from "styled-components";
import MainList from "../../components/main/MainList";
import MainPackage from "../../components/main/MainPackage";

function MainPage() {
  return (
    <Container>
      <Main>
        <Inner>
          <MainList />
          <MainPackage />
        </Inner>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 2rem;
`;
const Main = styled.main`
  width: 100%;
`;

const Inner = styled.div`
  max-width: 75rem;
  width: 75rem;
  margin: 0 auto;
`;

export default MainPage;
