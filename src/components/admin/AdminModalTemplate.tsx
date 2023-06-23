import styled from "styled-components";
import { PropsWithChildren } from "react";

function AdminModalTemplate({children}: PropsWithChildren) {
    return (
        <ModalBackground>
            {children}
        </ModalBackground>
    )
}

const ModalBackground = styled.div`
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  backdrop-filter: brightness(60%);
`

export default AdminModalTemplate;