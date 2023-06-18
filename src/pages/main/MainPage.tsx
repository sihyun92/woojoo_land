import styled from "styled-components";
import MainList from "../../components/main/MainList";
import MainPackage from "../../components/main/MainPackage";
import Banner from "../../components/main/MainBanner";

function MainPage() {
  return (
    <Container>
      <Banner />
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
  margin-top: -2rem;
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
