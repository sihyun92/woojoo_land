import styled from "styled-components";
import MainSolarList from "../../components/main/MainSolarList";
import MainPackage from "../../components/main/MainPackage";
import MainShipList from "../../components/main/MainShipList";

function MainPage() {
  return (
    <Container>
      <Main>
        <Inner>
          <MainSolarList />
          <MainPackage />
          <MainShipList />
        </Inner>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 18px;
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
