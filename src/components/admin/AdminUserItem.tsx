import styled from "styled-components";
import { theme } from "../../styles/theme";

function AdminUserItem() {
  return (
    <ItemContainer>
      <ProfileImg>
        <img src="/images/AdminUser.png" alt="기본 이미지" />
      </ProfileImg>
      <UserEmail>dicepted@gmail.com</UserEmail>
      <UserName>개발중독자</UserName>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  background-color: ${theme.colors.gray[2]};
  border: 1px solid ${theme.colors.gray[3]};
  flex-direction: column;
  border-radius: 20px;
  margin-top: 15px;
  overflow: hidden;
  display: flex;
  height: 225px;
  width: 180px;
  margin-left: 19px;
`;
const ProfileImg = styled.div`
  height: 162px;
  img {
    width: 100%;
  }
`;
const UserEmail = styled.div`
  margin: 10px auto 0;
  font-size: 12px;
`;
const UserName = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin: 8px auto 0;
`;

export default AdminUserItem;
