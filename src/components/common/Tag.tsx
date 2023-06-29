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
  height: 2.5rem;
  cursor: pointer;
  font-size: 18px;
  transition: 0.1s;
  background: none;
  align-items: center;
  box-sizing: border-box;
  border-radius: 1.25rem;
  justify-content: center;
  color: ${theme.colors.white};
  padding: 16px 26px 16px 26px;
  border: 1.5px solid ${theme.colors.white};
  &:hover{
    transform: scale(1.04);
    background-color: ${theme.colors.orange.pressed};
    border: 1.5px solid ${theme.colors.orange.pressed};
  }
  ${(props) =>
    props.selected &&
    css`
      background-color: ${props.theme.colors.orange.pressed};
      border: 1.5px solid ${props.theme.colors.orange.pressed};
    `}
`;

export default Tag;
