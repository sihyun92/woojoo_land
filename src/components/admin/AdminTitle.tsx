import styled from "styled-components";
import { theme } from "../../styles/theme";

type AdminChildren = {
    children: React.ReactNode;
}

function AdminTitle({children}:AdminChildren) {
    return(
        <TitleContainer>
          <Title>{children}</Title>
        </TitleContainer>
    )
}

const TitleContainer = styled.div`
  border-bottom: 1px solid ${theme.colors.gray[3]};
  height: 68px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 28px;
  margin-top: 25px;
  font-weight: 700;
  font-family: 'GmarketSans';
`;
export default AdminTitle;