import styled from "styled-components";
import GreyInput from "../common/GreyInput";
import Button from "../common/Button";
import {
  Dispatch,
  SetStateAction,
  MouseEvent,
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import { accountConnect, accountList } from "../../lib/API/userAPI";
import { AiOutlineClose } from "react-icons/ai";

interface IModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
}

interface IBank {
  name: string;
  code: string;
  digits: number[];
  disabled: boolean;
}

function AccountModal({ setIsModalOpen, closeModal }: IModalProps) {
  const [accountForm, setAccountForm] = useState({
    accountNumber: "",
    phoneNumber: "",
    signature: true,
  });
  const [checkedCode, setCheckedCode] = useState("");
  const [accounts, setAccounts] = useState([]);

  // 사용 가능한 계좌 최초 렌더링
  useEffect(() => {
    getUsableAccounts();
  }, []);

  // 사용 가능한 계좌 목록 조회
  const getUsableAccounts = async () => {
    const res = await accountList();
    setAccounts(res);
  };

  // 폼 제출 없이 모달 종료하는 버튼
  const onClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsModalOpen(false);
  };

  // 은행 체크시 해당 은행코드 전달
  const onCheck = (code: string) => {
    setCheckedCode(code);
  };

  // input에 입력되는 값을 state 객체에 전달
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAccountForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // 폼 제출시 계좌 연결 및 모달 종료
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const props = Object.values(accountForm) as [string, string, boolean];
      await accountConnect(checkedCode, ...props);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalBackground>
      <Modal onSubmit={onSubmit}>
        <ModalClose type="button" onClick={onClose}>
          <AiOutlineClose size="1.2rem" />
        </ModalClose>
        <ModalTitle>계좌 추가</ModalTitle>
        <AccountSelect>
          {accounts
            ? accounts.map((account: IBank) => {
                return (
                  account.disabled || (
                    <UsableAccount key={account.code}>
                      <input
                        type="radio"
                        id={account.code}
                        name="account"
                        onChange={() => {
                          onCheck(account.code);
                        }}
                      />
                      <label htmlFor={account.code}>
                        {account.name} [{account.digits}]
                      </label>
                    </UsableAccount>
                  )
                );
              })
            : ""}
        </AccountSelect>
        <AccountInputs>
          <InputBox>
            <span>은행코드</span>
            <GreyInput
              readonly
              required
              type="text"
              middleWidth
              name="bankCode"
              onChange={onChange}
              value={checkedCode}
              placeholder="은행코드를 선택해주세요"
            />
          </InputBox>
          <InputBox>
            <span>계좌번호</span>
            <GreyInput
              required
              type="text"
              middleWidth
              onChange={onChange}
              name="accountNumber"
              placeholder="계좌번호를 입력해주세요"
            />
          </InputBox>
          <InputBox>
            <span>전화번호</span>
            <GreyInput
              require
              type="text"
              middleWidth
              name="phoneNumber"
              onChange={onChange}
              placeholder="전화번호를 입력해주세요"
            />
          </InputBox>
        </AccountInputs>
        <Notes>
          <li>추가할 은행을 선택하면 은행코드가 입력됩니다.</li>
          <li>계좌번호와 전화번호에는 - 구분없이 입력해주세요.</li>
        </Notes>
        <AddButton type="submit" orange>
          추가하기
        </AddButton>
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

const ModalTitle = styled.h2`
  font-size: 2.25rem;
`;

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

const AccountSelect = styled.ul`
  width: 509px;
  height: 139px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const UsableAccount = styled.li`
  height: 22px;
  width: 254.5px;

  input {
    margin-right: 0.5rem;
  }

  label:hover {
    cursor: pointer;
  }
`;

const AccountInputs = styled.div`
  width: 509px;
  height: 154px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-weight: 700;
    font-size: 1.125rem;
  }
`;

const Notes = styled.ul`
  width: 509px;
  height: 43px;
  display: flex;
  padding: 0.5rem;
  font-size: 0.75rem;
  align-items: start;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.gray[5]};

  li {
    list-style-type: disc;
  }
`;

const AddButton = styled(Button)`
  width: 428px;
  height: 50px;
`;

export default AccountModal;
