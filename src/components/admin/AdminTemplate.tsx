import { PropsWithChildren } from "react";
import styled from "styled-components";

function AdminTemplate({children}: PropsWithChildren) {
  return(
    <AdminContainer>
        {children}
    </AdminContainer>
  );
}

//관리자 페이지 배경 페이지 상단에 위치하여 화면 표시
const AdminContainer = styled.div`
    background-color: #fff;
    position: absolute;
    display: flex;
    height: 100vh;
    width: 100vw;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
`

export default AdminTemplate;
