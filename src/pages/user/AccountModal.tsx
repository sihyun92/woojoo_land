import styled from "styled-components";

function AccountModal() {
  return (
    <ModalBackground>
      <Modal>
        <ModalTitle>계좌 추가</ModalTitle>
        <AccountSelect />
        <AccountInputs>
          <BankCode>
            <span>은행코드</span>
            <input type="text" placeholder="은행코드를 입력해주세요" />
          </BankCode>
          <AccountNumber>
            <span>계좌번호</span>
            <input type="text" placeholder="계좌번호를 입력해주세요" />
          </AccountNumber>
          <PhoneNumber>
            <span>전화번호</span>
            <input type="text" placeholder="전화번호를 입력해주세요" />
          </PhoneNumber>
        </AccountInputs>
        <p>추가할 은행을 선택하면 은행코드가 입력됩니다.</p>
        <p>계좌번호와 전화번호에는 - 구분없이 입력해주세요.</p>
        <AddButton>추가하기</AddButton>
      </Modal>
    </ModalBackground>
  );
}
const ModalBackground = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  backdrop-filter: brightness(60%);
`;
const Modal = styled.form`
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 550px;
  height: 550px;
  display: flex;
  position: fixed;
  align-items: center;
  border-radius: 20px;
  flex-direction: column;
  background-color: #fff;
  justify-content: space-around;
`;

const ModalTitle = styled.h2`
  font-size: 30px;
  font-weight: 800;
`;
const AccountSelect = styled.div``;
const AccountInputs = styled.div``;
const BankCode = styled.div``;
const AccountNumber = styled.div``;
const PhoneNumber = styled.div``;
const AddButton = styled.button``;

export default AccountModal;
