import { useEffect, useState } from "react";
import { accountDisconnect, myAccount } from "../../lib/API/userAPI";
import styled from "styled-components";
import UserTitle from "../../components/user/UserTitle";
import UserModal from "../../components/user/UserModal";
import Button from "../../components/common/Button";
import { AiOutlineClose } from "react-icons/ai";
import { formatDollar } from "../../lib/Function/commonFn";

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
                    <BankName>
                      {account.bankName} [ {account.bankCode} ]
                    </BankName>
                    <AccountNumber>{account.accountNumber}</AccountNumber>
                    <Balance>{formatDollar(account.balance)}</Balance>
                  </AccountWrapper>
                  <DelAccount
                    onClick={(event) => {
                      delAccount(event, account.id);
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
      {isModalOpen && (
        <UserModal setIsModalOpen={setIsModalOpen} closeModal={closeModal} />
      )}
    </AccountRoute>
  );
}

const AccountRoute = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

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
  align-self: flex-end;
  transition: 0.5s;
  &:hover {
    background: ${(props) => props.theme.colors.orange.hover};
    color: ${(props) => props.theme.colors.white};
  }
`;

export default AccountPage;
