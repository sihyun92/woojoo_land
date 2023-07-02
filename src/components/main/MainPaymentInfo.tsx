/* eslint-disable react-hooks/exhaustive-deps */
import { formatDollar } from "../../lib/Function/commonFn";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { ICheckData } from "../../components/common/Header";
import { useNavigate } from "react-router-dom";
import { myAccount } from "../../lib/API/userAPI";
import styled from "styled-components";
import { IBuyItem } from "../../modules/buyItem";

interface IBank {
  id: string; // 계좌 ID
  bankName: string; // 은행 이름
  bankCode: string; // 은행 코드
  accountNumber: string; // 계좌 번호
  balance: number; // 계좌 잔액
}

interface IAccounts {
  totalBalance: number;
  accounts: IBank[];
}

interface IPaymentInfo {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  items: IBuyItem[];
  price: number;
  quantity: number;
  accountId: string;
  onCheck: (accountId: string) => void;
}

function MainPaymentInfo({
  username,
  setUsername,
  items,
  price,
  quantity,
  accountId,
  onCheck,
}: IPaymentInfo) {
  const queryClient = useQueryClient();
  const res = queryClient.getQueryData<ICheckData>("check");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [myAccounts, setMyAccounts] = useState<IAccounts>();
  const title = items.length > 0 ? items[0].title : "";

  // state가 false일시 alert와 함께 login페이지로 리디렉션
  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/auth/login");
    }
  }, [isLoggedIn, navigate]);

  // 유저 인증함수. 유효한 유저가 아니면 state에 false를 반환
  const checkUser = async () => {
    if (typeof res === "string") {
      setIsLoggedIn(false);
    }
  };

  // 주문자 정보
  const getUserInfo = () => {
    if (res) {
      setUsername(res.displayName);
      setUserEmail(res.email);
    }
  };

  // 결제 계좌
  const getUsableAccounts = async () => {
    const res = await myAccount();
    if (res) {
      setMyAccounts(res);
    }
  };

  useEffect(() => {
    checkUser();
    getUserInfo();
    getUsableAccounts();
  }, [accountId]);

  return (
    <PaymentWrapper>
      <hr />

      <PaymentDetail>
        <SubTitle>주문 상품</SubTitle>
        <hr />
        <DetailWrapper>
          <ProductName>
            <span>상품 이름</span>
            {title}
            {quantity > 1 ? ` 등 ${new Set(items).size} 개` : ""}
          </ProductName>

          <ProductPrice>
            <span>총 상품 가격</span>
            {formatDollar(price)}
          </ProductPrice>

          <ProductQty>
            <span>상품 개수</span>
            {`총 ${quantity} 개`}
          </ProductQty>
        </DetailWrapper>
      </PaymentDetail>

      <UserDetail>
        <SubTitle>주문자 정보</SubTitle>
        <hr />
        <DetailWrapper>
          <UserName>
            <span>주문자 명</span>
            {username}
          </UserName>
          <UserMail>
            <span>이메일</span>
            {userEmail}
          </UserMail>
        </DetailWrapper>
      </UserDetail>
      <AccountDetail>
        <SubTitle>결제 수단 선택</SubTitle>
        <hr />
        {myAccounts?.accounts
          ? myAccounts.accounts.map((account: IBank) => {
              return (
                <UsableAccount key={account.id}>
                  <input
                    type="radio"
                    id={account.id}
                    name="account"
                    onChange={() => {
                      onCheck(account.id);
                    }}
                  />
                  <label htmlFor={account.id}>
                    {account.bankName} [{formatDollar(account.balance)}]
                  </label>
                </UsableAccount>
              );
            })
          : ""}
      </AccountDetail>
    </PaymentWrapper>
  );
}

const PaymentWrapper = styled.div`
  width: 800px;
  min-width: 800px;

  > div {
    margin-top: 2rem;
  }
`;

const SubTitle = styled.span`
  font-size: 1.5rem;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 1rem 2rem 1rem;

  > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
`;

const PaymentDetail = styled.div``;
const ProductName = styled.div``;
const ProductPrice = styled.div``;
const ProductQty = styled.div``;
const UserDetail = styled.div``;
const UserName = styled.div``;
const UserMail = styled.div``;
const AccountDetail = styled.div``;

const UsableAccount = styled.li`
  height: 22px;
  width: 254.5px;
  list-style: none;
  margin-bottom: 0.5rem;

  input {
    margin-right: 0.5rem;
  }

  label:hover {
    cursor: pointer;
  }
`;

export default MainPaymentInfo;
