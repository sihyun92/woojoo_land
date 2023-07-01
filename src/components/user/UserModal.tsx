import styled from "styled-components";
import GrayInput from "../common/GrayInput";
import Button from "../common/Button";
import {
  Dispatch,
  SetStateAction,
  MouseEvent,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import { accountConnect, accountList } from "../../lib/API/userAPI";
import { AiOutlineClose } from "react-icons/ai";
import { useQuery } from "react-query";

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
    phoneNumber: "",
    signature: true,
  });
  const [checkedCode, setCheckedCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberBar, setAccountNumberBar] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 1500);
  }, [error]);

  useQuery("accountList", accountList, {
    onSuccess: (res) => {
      setAccounts(res);
    },
  });

  // 폼 제출 없이 모달 종료하는 버튼
  const onClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsModalOpen(false);
  };

  // 은행 체크시 해당 은행코드 전달 및 랜덤 계좌번호 생성
  // 은행 코드의 각 수를 합해 계좌의 자릿수 저장
  // 자릿수의 횟수만큼 랜덤한 한자리 수를 배열에 저장 후 이어붙임
  // 해당 숫자를 은행 코드의 자릿수를 이용해 잘라 배열에 저장 후 하이픈으로 이어붙임
  const onCheck = (code: string, digits: number[]) => {
    let randomNumbers = [];
    let randomNumbersAddBar = [];

    const subDigits = digits.reduce((acc, cur) => {
      return acc + cur;
    });

    for (let i = 0; i < subDigits; i++) {
      randomNumbers.push(Math.floor(Math.random() * 10).toString());
    }

    const randomAccount = randomNumbers.join("");

    for (let i = 0; i < digits.length - 1; i++) {
      if (i === 0) {
        randomNumbersAddBar.push(randomAccount.slice(i, digits[i]));
      }
      randomNumbersAddBar.push(
        randomAccount.slice(digits[i], digits[i] + digits[i + 1]),
      );
    }

    setCheckedCode(code);
    setAccountNumber(randomAccount);
    setAccountNumberBar(randomNumbersAddBar.join("-"));
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
    const props = Object.values(accountForm) as [string, boolean];
    const data = await accountConnect(checkedCode, accountNumber, ...props);
    if (typeof data !== "string") {
      closeModal();
    } else {
      setError(data);
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
                          onCheck(account.code, account.digits);
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
            <GrayInput
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
            <GrayInput
              readonly
              required
              type="text"
              middleWidth
              onChange={onChange}
              value={accountNumberBar}
              name="accountNumber"
              placeholder="은행코드를 선택해주세요"
            />
          </InputBox>
          <InputBox>
            <span>전화번호</span>
            <GrayInput
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
          <li>추가할 은행을 선택하면 은행코드와 계좌번호가 입력됩니다.</li>
          <li>계좌번호와 전화번호에는 - 구분없이 입력해주세요.</li>
        </Notes>
        {error ? <ErrorMessage>{error}</ErrorMessage> : ""}
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
  font-size: 1.125rem;
  transition: 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.orange.hover};
  }
`;

const ErrorMessage = styled.span`
  bottom: 185px;
  font-weight: 700;
  position: absolute;
  color: ${(props) => props.theme.colors.orange.main};
`;

export default AccountModal;
