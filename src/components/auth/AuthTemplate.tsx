import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function AuthTemplate({ children }: PropsWithChildren) {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="logo-area">
          <Link to="/">우주부동산</Link>
        </div>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
}

const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: 700;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: #fff;
  border-radius: 2px;
`;

export default AuthTemplate;
