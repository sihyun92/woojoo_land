import styled, { css } from "styled-components";

interface IButtonProps {
  [props: string]: any;
}

function Button({ ...props }: IButtonProps) {
  return <StyledButton {...props} />;
}

const StyledButton = styled.button<{ active?: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  background: #707070;
  color: #fff;
  padding: 0.5rem 1rem;
  ${(props) =>
    props.active &&
    css`
      padding: 0.5rem 1rem;
      background: #333;
      color: #fff;
    `} 
`;

export default Button;
