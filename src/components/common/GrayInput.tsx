import styled, { css } from "styled-components";

// 저희 props 대신 rest를 사용하기로 결정했었습니다.
function GrayInput({ ...props }) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input<{
  middleWidth?: boolean;
  fullWidth?: boolean;
}>`
  width: 200px;
  outline: none;
  font-size: 14px;
  padding: 0.5rem;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.gray[2]};
  border: 1px solid ${(props) => props.theme.colors.gray[3]};

  &::placeholder {
    color: ${(props) => props.theme.colors.gray[3]};
  }

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.gray[5]};
  }

  ${(props) =>
    props.middleWidth &&
    css`
      width: 416px;
    `}

  ${(props) =>
    props.fullWidth &&
    css`
      width: 549px;
    `}
`;

export default GrayInput;
