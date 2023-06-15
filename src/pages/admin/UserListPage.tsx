import styled from "styled-components";
import AdminTitle from "../../components/admin/AdminTitle";
import AdminUserItem from "../../components/admin/AdminUserItem";

function UserListPage() {
  return (
    <>
      <UserListContainer>
        <AdminTitle>사용자 조회</AdminTitle>
        <UserContainer>
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
          <AdminUserItem />
        </UserContainer>
      </UserListContainer>
    </>
  );
}

const UserListContainer = styled.div`
  flex-direction: column;
  margin: 0 30px;
  display: flex;
`;
const UserContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
  
`;

export default UserListPage;
