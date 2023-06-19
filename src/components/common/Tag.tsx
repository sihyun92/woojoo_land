import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
// import { useState } from "react";

interface ITagProps {
  [props: string]: any;
}

function Tag({ ...props }: ITagProps) {
  // const [select, setSelected] = useState(false);
  return <StyledTag {...props} />;
}

const StyledTag = styled.button<{
  inherit?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${theme.colors.white};
  border-radius: 1.25rem;
  height: 2.5rem;
  padding: 1rem 2rem;
  color: ${theme.colors.white};
  background: none;
  cursor: pointer;
  background: inherit
    ${(props) =>
      props.inherit &&
      css`
      color:inherit
      background: ${(props) => props.theme.colors.white};
    `};
  &:active {
    background-color: #ffe500;
    color: #6111b7;
  }
`;

export default Tag;
