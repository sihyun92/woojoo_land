import styled from "styled-components";

type TChildren = {
  children: React.ReactNode;
};

function UserLayout({ children }: TChildren) {
  return <UserMain>{children}</UserMain>;
}

const UserMain = styled.main`
  display: flex;
  width: 100%;
  margin: 35px 0 0 10px;
`;

export default UserLayout;
