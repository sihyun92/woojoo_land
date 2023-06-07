import { PropsWithChildren } from "react";
import styled from "styled-components";
import Header from "./Header";

function Layout({ children }: PropsWithChildren) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}

const Container = styled.div``;

export default Layout;
