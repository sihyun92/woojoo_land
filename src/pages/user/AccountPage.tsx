import { useEffect, useState } from "react";
import { accountDisconnect, myAccount } from "../../lib/API/userAPI";
import styled from "styled-components";

interface ResponseValue {
  totalBalance: number; // 사용자 계좌 잔액 총합
  accounts: Bank[]; // 사용자 계좌 정보 목록
}

interface Bank {
  id: string; // 계좌 ID
  bankName: string; // 은행 이름
  bankCode: string; // 은행 코드
  accountNumber: string; // 계좌 번호
  balance: number; // 계좌 잔액
}

function AccountPage() {
  useEffect(() => {
    getAccounts();
  }, []);

  const [accountsInfo, setAccountsInfo] = useState([]);
  const [accounts, setAccounts] = useState([]);

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
    //
    // 계좌 추가용 모달 띄우는 기능 추가
    //
  };

  return (
    <AccountRoute>
      <h2>계좌 관리</h2>
      <AccountListBox>
        {accounts
          ? accounts.map((account: Bank) => {
              return (
                <AccountList key={account.id}>
                  <BankName>{account.bankName}</BankName>
                  <AccountNumber>{account.accountNumber}</AccountNumber>
                  <Balance>{account.balance}</Balance>
                  <button
                    onClick={(event) => {
                      delAccount(event, account.id);
                    }}
                  >
                    x
                  </button>
                </AccountList>
              );
            })
          : "연결된 계좌가 없습니다"}
      </AccountListBox>
      <button onClick={newAccount}>계좌 추가</button>
    </AccountRoute>
  );
}

const AccountRoute = styled.main`
  display: flex;
  flex-direction: column;
`;

const AccountListBox = styled.ul`
  display: flex;
  flex-direction: column;
`;

const AccountList = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid;
`;
const BankName = styled.span``;
const AccountNumber = styled.span``;
const Balance = styled.span``;

export default AccountPage;
