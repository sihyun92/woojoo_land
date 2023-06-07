import styled, { css } from "styled-components";

interface ITagProps {
  [props: string]: any;
}

function Tag({ ...props }: ITagProps) {
  return <StyledTag {...props} />;
}

const StyledTag = styled.div<{
  inherit?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  border-radius: 1.25rem;
  height: 2.5rem;
  padding: 1rem;
  color: white;
  background: inherit
    ${(props) =>
      props.inherit &&
      css`
      color:inherit
      background: ${(props) => props.theme.colors.white};
    `};
`;

export default Tag;
