import { theme } from "../../styles/theme";
import styled from "styled-components";

function Footer() {
  return (
    <Container>
      <div>Footer 영역</div>
    </Container>
  );
}

const Container = styled.footer`
  height: 300px;
  background: ${theme.colors.gray[4]};
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Footer;
