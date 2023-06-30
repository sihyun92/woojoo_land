// CartPage(장바구니)에서 구매하기 버튼을 누르면 장바구니에 담긴 제품(들)만 렌더링
// ProductPage(상세페이지)에서 구매하기 버튼을 누르면, 해당 상품만 렌더링
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useSelector } from "react-redux";
import { TRootState } from "../../modules";
import { formatDollar } from "../../lib/Function/commonFn";
import MainPaymentOrder from "../../components/main/MainPaymentOrder";
import { myAccount } from "../../lib/API/userAPI";
import { useQueryClient } from "react-query";
import { ICheckData } from "../../components/common/Header";
import { useNavigate } from "react-router-dom";

interface IPaymentProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

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

function PaymentPage({ username, setUsername }: IPaymentProps) {
  const queryClient = useQueryClient();
  const res = queryClient.getQueryData<ICheckData>("check");
  const [userEmail, setUserEmail] = useState("");
  const [myAccounts, setMyAccounts] = useState<IAccounts>();
  const [accountId, setAccountId] = useState("");
  const buyItem = useSelector((state: TRootState) => state.payment);
  const cartItem = useSelector((state: TRootState) => state.cartItem);
  const items = buyItem.concat(cartItem);
  const title = items.length > 0 ? items[0].title : "";
  const productId: string[] = [];
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  // 유저 인증
  useEffect(() => {
    checkUser();
  }, []);

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

  const quantity = items.reduce(
    (acc, cur) => (acc + cur.quantity) as number,
    0,
  );

  const price = items.reduce(
    (acc, cur) => (acc + cur.price * cur.quantity) as number,
    0,
  );

  const discountedPrice = items.reduce(
    (acc, item) => acc + item.price * (item.discountRate / 100) * item.quantity,
    0,
  );

  useEffect(() => {
    getUserInfo();
    getUsableAccounts();
  }, [accountId]);

  const getUserInfo = async () => {
    if (res) {
      setUsername(res.displayName);
      setUserEmail(res.email);
    }
  };

  const getUsableAccounts = async () => {
    const res = await myAccount();
    if (res) {
      setMyAccounts(res);
    }
  };

  const onCheck = (accountId: string) => {
    setAccountId(accountId);
  };

  items.forEach((item) => {
    const quantity = item.quantity;
    productId.push(...Array.from({ length: quantity }, () => item.productId));
  });

  return (
    <>
      <Container>
        <Title>주문서</Title>
        <Wrapper>
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
          <MainPaymentOrder
            price={price}
            productId={productId}
            accountId={accountId}
            discountedPrice={discountedPrice}
          />
        </Wrapper>
      </Container>
    </>
  );
}

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 36px;
  font-weight: bold;
  height: 66px;
`;

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;

  > hr {
    height: 1px;
    border: 0;
    background: ${theme.colors.gray[4]};
    margin-bottom: 1.5rem;
  }
`;

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

export default PaymentPage;
