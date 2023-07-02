import { useEffect, useState } from "react";
import styled from "styled-components";
import UserTitle from "../../components/user/UserTitle";
import UserModal from "../../components/user/UserModal";
import { myAccount } from "../../lib/API/userAPI";
import UserAccountList from "../../components/user/UserAccountList";
import SubLoading from "../../components/common/SubLoading";

function AccountPage() {
  // 계좌 목록 최초 렌더링
  useEffect(() => {
    getAccounts();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [accounts, setAccounts] = useState([]);

  // 계정 내 연결된 계좌 목록 조회
  const getAccounts = async () => {
    setIsFetching(true);
    const accountsList = await myAccount();
    setIsFetching(false);
    setAccounts(accountsList.accounts);
  };

  // 모달 종료 후 계좌 목록 재 렌더링
  const closeModal = () => {
    setIsModalOpen(false);
    getAccounts();
  };

  return (
    <AccountRoute>
      <UserTitle>계좌 관리</UserTitle>
      {isFetching ? (
        <SubLoading />
      ) : (
        <UserAccountList
          accounts={accounts}
          getAccounts={getAccounts}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {isModalOpen && (
        <UserModal setIsModalOpen={setIsModalOpen} closeModal={closeModal} />
      )}
    </AccountRoute>
  );
}

const AccountRoute = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
`;

export default AccountPage;
