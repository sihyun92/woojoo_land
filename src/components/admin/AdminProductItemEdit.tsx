import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";


//모달 창 닫기 기능으로 해당 기능의 부모 모달에 Open을 제어하는 AdminProductItemEdit에 props인 setModalOpen
function AdminProductItemEdit({ setModalOpen }:any) {
  const ModalBoxClose = (event:any) => {
    event.preventDefault();
    setModalOpen(false); // setModalOpen 함수를 호출하여 값을 전달합니다.
  };

  return (
    <ModalEdit>
      <ModalClose type="button" onClick={ModalBoxClose}>
        <AiOutlineClose size="1.2rem" />
      </ModalClose>
      수정 기능 영역
    </ModalEdit>
  );
}

const ModalClose = styled.button`
  top: 1.5rem;
  right: 2rem;
  width: 2rem;
  height: 2rem;
  border: none;
  position: absolute;
  background-color: transparent;
  color: ${(props) => props.theme.colors.gray[5]};
  &:hover {
    cursor: pointer;
  }
`;

const ModalEdit = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 640px;
  height: 660px;
  display: flex;
  position: fixed;
  align-items: center;
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${(props) => props.theme.colors.white};
`;

export default AdminProductItemEdit;
