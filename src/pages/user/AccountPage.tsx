import { useEffect, useState } from "react";
import { accountDisconnect, myAccount } from "../../lib/API/userAPI";
import styled from "styled-components";
import UserTitle from "../../components/user/UserTitle";
import UserModal from "../../components/user/UserModal";
import Button from "../../components/common/Button";

export interface IAccount {
  id: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  balance: number;
}

function AccountPage() {
  // 계좌 목록 최초 렌더링
  useEffect(() => {
    getAccounts();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);

  // 계정 내 연결된 계좌 목록 조회
  const getAccounts = async () => {
    const accountsList = await myAccount();
    setAccounts(accountsList.accounts);
  };

  //계좌 삭제 버튼
  const delAccount = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.preventDefault();
    await accountDisconnect(id, true);
    getAccounts();
  };

  //계좌 추가 버튼
  const newAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  // 모달 종료 후 계좌 목록 재 렌더링
  const closeModal = () => {
    setIsModalOpen(false);
    getAccounts();
  };

  return (
    <AccountRoute>
      <UserTitle>계좌 관리</UserTitle>
      <AccountListBox>
        {accounts
          ? accounts.map((account: IAccount) => {
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
      <AddAccount onClick={newAccount} orange middleWidth>
        계좌 추가
      </AddAccount>
      {isModalOpen && (
        <UserModal setIsModalOpen={setIsModalOpen} closeModal={closeModal} />
      )}
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
const AddAccount = styled(Button)`
  font-weight: 700;
  font-size: 1rem;
`;

export default AccountPage;
