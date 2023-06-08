import { useEffect, useState } from "react";
import { accountDisconnect, myAccount } from "../../lib/API/userAPI";
import styled from "styled-components";
import UserTitle from "../../components/user/UserTitle";
import AccountModal from "./AccountModal";

interface IBank {
  id: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  balance: number;
}

function AccountPage() {
  useEffect(() => {
    getAccounts();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [accountsInfo, setAccountsInfo] = useState([]);

  const getAccounts = async () => {
    const accountsList = await myAccount();
    setAccountsInfo(accountsList);
    setAccounts(accountsList.accounts);
  };

  //계좌 삭제 버튼 함수
  const delAccount = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.preventDefault();
    accountDisconnect(id, true);
  };

  //계좌 추가 버튼 함수
  const newAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsModalOpen(true);
    // 계좌 추가용 모달 띄우는 기능 추가
    //
  };

  return (
    <AccountRoute>
      <UserTitle>계좌 관리</UserTitle>
      <AccountListBox>
        {accounts
          ? accounts.map((account: IBank) => {
              return (
                <AccountList key={account.id}>
                  <AccountWrapper>
                    <BankName>{account.bankName}</BankName>
                    <AccountNumber>{account.accountNumber}</AccountNumber>
                    <Balance>{account.balance}</Balance>
                  </AccountWrapper>
                  <DelAccount
                    onClick={(event) => {
                      delAccount(event, account.id);
                    }}
                  >
                    x
                  </DelAccount>
                </AccountList>
              );
            })
          : "연결된 계좌가 없습니다"}
      </AccountListBox>
      <AddAccount onClick={newAccount}>계좌 추가</AddAccount>
      {isModalOpen && <AccountModal />}
    </AccountRoute>
  );
}

const AccountRoute = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const AccountListBox = styled.ul`
  display: flex;
  flex-direction: column;
`;

const AccountList = styled.li`
  display: flex;
  align-items: center;
  border: 1px solid;
  padding: 10px 15px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const AccountWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const BankName = styled.span``;
const AccountNumber = styled.span`
  color: #ff6113;
`;
const Balance = styled.span``;

const DelAccount = styled.button`
  margin-left: 40px;
`;
const AddAccount = styled.button`
  width: 10rem;
`;

export default AccountPage;
