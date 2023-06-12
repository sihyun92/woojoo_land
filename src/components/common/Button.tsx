import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";

interface IButtonProps {
  [rest: string]: any;
}

function Button({ ...rest }: IButtonProps) {
  return <StyledButton {...rest} />;
}

const StyledButton = styled.button<{
  active?: boolean;
  middleWidth?: boolean;
  fullWidth?: boolean;
  login?: boolean;
  register?: boolean;
  orange?: boolean;
}>`
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  background: #707070;
  color: #fff;
  padding: 0.5rem 1rem;
  &:disabled {
    background: #ccc;
    color: #707070;
    cursor: not-allowed;
    opacity: 0.5;
  }
  ${(rest) =>
    rest.active &&
    css`
      padding: 0.5rem 1rem;
      background: #333;
      color: #fff;
    `}
  ${(rest) =>
    rest.middleWidth &&
    css`
      width: 160px;
      height: 2.5rem;
    `}
  ${(rest) =>
    rest.fullWidth &&
    css`
      padding: 0.75rem 0;
      width: 100%;
      font-size: 1.125rem;
    `}
  ${(rest) =>
    rest.login &&
    css`
      background: ${theme.colors.orange.main};
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 700;
    `}
      ${(rest) =>
    rest.register &&
    css`
      background: ${theme.colors.orange.main};
      width: 100%;
    `}
      ${(rest) =>
    rest.orange &&
    css`
      background: ${theme.colors.orange.main};
    `}
`;

export default Button;
