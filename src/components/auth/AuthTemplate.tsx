import { PropsWithChildren } from "react";
import styled from "styled-components";

function AuthTemplate({ children }: PropsWithChildren) {
  return (
    <AuthTemplateBlock>
      <WhiteBox>{children}</WhiteBox>
    </AuthTemplateBlock>
  );
}

const AuthTemplateBlock = styled.div`
  /* position: absolute; */
  left: 0;
  top: 200px;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.025);
  width: 30rem;
  background: #fff;
  border-radius: 2px;
`;

export default AuthTemplate;
