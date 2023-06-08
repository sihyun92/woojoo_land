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
  fullWidth?: boolean;
  login?: boolean;
  register?: boolean;
}>`
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
`;

export default Button;
