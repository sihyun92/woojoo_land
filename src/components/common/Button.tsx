import styled, { css } from "styled-components";

interface IButtonProps {
  [props: string]: any;
}

function Button({ ...props }: IButtonProps) {
  return <StyledButton {...props} />;
}

const StyledButton = styled.button<{ active?: boolean; fullWidth?: boolean }>`
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
  ${(props) =>
    props.fullWidth &&
    css`
      padding: 0.75rem 0;
      width: 100%;
      font-size: 1.125rem;
    `}
`;

export default Button;
