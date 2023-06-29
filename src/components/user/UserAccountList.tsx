import Button from "../../components/common/Button";
import { AiOutlineClose } from "react-icons/ai";
import { formatDollar } from "../../lib/Function/commonFn";
import { accountDisconnect } from "../../lib/API/userAPI";
import styled from "styled-components";

interface IAccount {
  id: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  balance: number;
}

interface IAcocuntListProps {
  accounts: IAccount[];
  getAccounts: () => Promise<void>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserAccountList({
  accounts,
  getAccounts,
  setIsModalOpen,
}: IAcocuntListProps) {
  //계좌 추가 버튼
  const newAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  //계좌 삭제 버튼
  const delAccount = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
    bank: string,
  ) => {
    const delConfirm = window.confirm(`${bank} 계좌를 해지하시겠습니까?`);
    event.preventDefault();
    if (delConfirm) {
      await accountDisconnect(id, true);
      getAccounts();
      alert(`${bank} 계좌가 해지되었습니다.`);
    }
  };

  return (
    <AccountListBox>
      {accounts
        ? accounts.map((account: IAccount) => {
            return (
              <AccountList key={account.id}>
                <AccountWrapper>
                  <BankName>
                    {account.bankName} [ {account.bankCode} ]
                  </BankName>
                  <AccountNumber>{account.accountNumber}</AccountNumber>
                  <Balance>{formatDollar(account.balance)}</Balance>
                </AccountWrapper>
                <DelAccount
                  onClick={(event) => {
                    delAccount(event, account.id, account.bankName);
                  }}
                >
                  <AiOutlineClose size="1.2rem" />
                </DelAccount>
              </AccountList>
            );
          })
        : "연결된 계좌가 없습니다"}
      <AddAccount onClick={newAccount} orange middleWidth>
        계좌 추가
      </AddAccount>
    </AccountListBox>
  );
}

const AccountListBox = styled.ul`
  gap: 5px;
  display: flex;
  flex-direction: column;
`;

const AccountList = styled.li`
  width: 100%;
  height: 70px;
  display: flex;
  padding: 0 1.25rem;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.gray[3]};

  &:hover {
    transform: scale(0.99);
    background-color: ${(props) => props.theme.colors.gray[2]};
  }
`;

const AccountWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const BankName = styled.span`
  width: 40%;
  font-size: 1.125rem;
`;
const AccountNumber = styled.span`
  flex-grow: 1;
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.orange.main};
`;
const Balance = styled.span`
  font-size: 1.125rem;
`;

const DelAccount = styled.button`
  color: ${(props) => props.theme.colors.gray[5]};
  border: none;
  cursor: pointer;
  margin-left: 40px;
  background-color: transparent;
`;
const AddAccount = styled(Button)`
  font-size: 1rem;
  margin-top: 10px;
  font-weight: 700;
  transition: 0.2s;
  align-self: flex-end;

  &:hover {
    background: ${(props) => props.theme.colors.orange.hover};
  }
`;

export default UserAccountList;
