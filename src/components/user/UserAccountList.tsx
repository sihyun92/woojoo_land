import styled from "styled-components";
import { theme } from "../../styles/theme";
import Button from "../../components/common/Button";
import { accountDisconnect } from "../../lib/API/userAPI";
import { formatDollar } from "../../lib/Function/commonFn";

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
      {accounts.length ? (
        accounts.map((account: IAccount) => {
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
                minidel
                onClick={(event: any) => {
                  delAccount(event, account.id, account.bankName);
                }}
              >
              삭제
              </DelAccount>
            </AccountList>
          );
        })
      ) : (
        <ErrorMessage>연결된 계좌가 없습니다.</ErrorMessage>
      )}
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
  transition: 0.1s;
  padding: 0 1.25rem;
  border-radius: 5px;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.gray[7]};
  &:hover {
    transform: scale(0.99);
    background-color: ${theme.colors.gray[2]};
  }
`;

const AccountWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const BankName = styled.span`
  width: 40%;
  font-weight: 700;
  font-size: 1.125rem;
`;
const AccountNumber = styled.span`
  flex-grow: 1;
  font-size: 16px;
  color: ${(props) => props.theme.colors.orange.main};
`;
const Balance = styled.span`
  font-size: 16px;
`;

const DelAccount = styled(Button)`
  border: none;
  cursor: pointer;
  margin-left: 40px;
`;

const ErrorMessage = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${theme.colors.orange.main};
`;

const AddAccount = styled(Button)`
  font-size: 1rem;
  margin-top: 10px;
  transition: 0.2s;
  align-self: flex-end;

  &:hover {
    background: ${(props) => props.theme.colors.orange.hover};
  }
`;

export default UserAccountList;
