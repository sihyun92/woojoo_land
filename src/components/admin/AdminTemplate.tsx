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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    display: flex;
    position: absolute;
    background-color: #fff;
    `

export default AdminTemplate;
