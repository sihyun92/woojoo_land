import styled from "styled-components";
import { theme } from "../../styles/theme";
import { UserList } from "../../lib/api/adminAPI";

function AdminUserItem(props: UserList) {
  return (
    <ItemContainer>
      <ProfileImg>
        {props.profileImg}
        <img src="/images/AdminUser.png" alt="기본 이미지" />
      </ProfileImg>
      <UserEmail>{props.email}</UserEmail>
      <UserName>{props.displayName}</UserName>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  background-color: ${theme.colors.gray[2]};
  border: 1px solid ${theme.colors.gray[3]};
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
`;

const ProfileImg = styled.div`
  background-color: ${theme.colors.white};
  justify-content: center;
  max-height: 120px;
  display: flex;
  img {
    max-height: 100%;
  }
`;

const UserEmail = styled.div`
  margin: 10px auto 0;
  font-size: 12px;
`;

const UserName = styled.div`
  margin: 8px auto 10px;
  font-weight: 700;
  font-size: 18px;
`;

export default AdminUserItem;
