import styled from "styled-components";
import MainList from "../../components/main/MainList";
import MainPackage from "../../components/main/MainPackage";
import SubHeader from "../../components/common/SubHeader";
import Banner from "../../components/main/MainBanner";

function MainPage() {
  return (
    <>
      <SubHeader />
      <Banner />
      <Main>
        <Inner>
          <MainList />
          <MainPackage />
        </Inner>
      </Main>
    </>
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
