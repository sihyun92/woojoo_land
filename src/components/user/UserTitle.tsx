import styled from "styled-components";

type TChildren = {
  children: React.ReactNode;
};

function UserTitle({ children }: TChildren) {
  return <Title>{children}</Title>;
}

const Title = styled.h2`
  display: block;
  margin-bottom: 10px;
  font-size: 25px;
  font-weight: 700;
`;

export default UserTitle;
