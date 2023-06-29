import styled from "styled-components";

type TChildren = {
  children: React.ReactNode;
};

function UserTitle({ children }: TChildren) {
  return <Title>{children}</Title>;
}

const Title = styled.h2`
  display: block;
  font-weight: 700;
  font-size: 1.75rem;
  margin-bottom: 1rem;
  padding-bottom: 1.25rem;
  font-family: "GmarketSans";
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[3]};
`;

export default UserTitle;
