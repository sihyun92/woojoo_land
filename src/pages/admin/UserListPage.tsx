import styled from "styled-components";
import { theme } from "../../styles/theme";

function UserListPage() {
  return (
    <>
      <UserListContainer>
        <TitleContainer>
          <Title>사용자 조회</Title>
        </TitleContainer>
      </UserListContainer>
    </>
  );
}

const UserListContainer = styled.div`
  margin: 0 30px;
  display: flex;
`;

const TitleContainer = styled.div`
  border-bottom: 1px solid ${theme.colors.gray[3]};
  height: 68px;
  width: 100%;
`;

const Title = styled.div`
  font-weight: 700;
  margin-top: 25px;
  font-size: 28px;
`;

export default UserListPage;
