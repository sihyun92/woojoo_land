import { useState } from "react";
import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";

interface ITagProps {
  [props: string]: any;
}

function Tag({ ...props }: ITagProps) {
  const [isSelected, setSelected] = useState<boolean>(false);

  // Tag 토글화
  const handleClick = () => {
    setSelected((prevState) => !prevState);
  };

  return (
    <StyledTag
      type="button"
      selected={isSelected}
      onClick={handleClick}
      {...props}
    />
  );
}

const StyledTag = styled.button<{
  selected: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid ${theme.colors.white};
  border-radius: 1.25rem;
  height: 2.5rem;
  padding: 1rem 2rem;
  color: ${theme.colors.white};
  background: none;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    css`
      background-color: ${props.theme.colors.orange.pressed};
      border: none;
    `}
`;

export default Tag;
