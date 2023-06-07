import styled, { css } from "styled-components";

interface IButtonProps {
  [rest: string]: any;
}

function Button({ ...rest }: IButtonProps) {
  return <StyledButton {...rest} />;
}

const StyledButton = styled.button<{ active?: boolean; fullWidth?: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  background: #707070;
  color: #fff;
  padding: 0.5rem 1rem;
  ${(rest) =>
    rest.active &&
    css`
      padding: 0.5rem 1rem;
      background: #333;
      color: #fff;
    `}
  ${(rest) =>
    rest.fullWidth &&
    css`
      padding: 0.75rem 0;
      width: 100%;
      font-size: 1.125rem;
    `}
`;

export default Button;
