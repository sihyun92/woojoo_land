import styled, { css } from "styled-components";

interface IButtonProps {
  [props: string]: any;
}

function Button({ ...props }: IButtonProps) {
  return <StyledButton {...props} />;
}

const StyledButton = styled.button<{ auth?: boolean; changeAuth?: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  background: #707070;
  color: #fff;
  ${(props) =>
    props.auth &&
    css`
      padding: 0.5rem 1rem;
      width: 100%;
      font-size: 1.125rem;
    `}
  ${(props) =>
    props.changeAuth &&
    css`
      padding: 0.5rem 1rem;
      background: #333;
      color: #fff;
    `}
`;

export default Button;
