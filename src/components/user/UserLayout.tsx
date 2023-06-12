import styled from "styled-components";

type TChildren = {
  children: React.ReactNode;
};

function UserLayout({ children }: TChildren) {
  return <UserMain>{children}</UserMain>;
}

const UserMain = styled.main`
  width: 100%;
  display: flex;
  margin: 22px 0 0 1rem;
`;

export default UserLayout;
