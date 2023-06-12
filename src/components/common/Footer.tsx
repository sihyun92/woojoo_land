import { theme } from "../../styles/theme";
import styled from "styled-components";

function Footer() {
  return <Container>Footer</Container>;
}

const Container = styled.footer`
  height: 18.75rem;
  background: ${theme.colors.gray[4]};
  margin-top: 6.25rem;
`;

export default Footer;
