import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useEffect, useState } from "react";
import { IOrdalDetailAll, salesHistory } from "../../lib/API/adminAPI";
import HistroyItem from "../../components/admin/AdminHistroyItem";
import Button from "../../components/common/Button";
import AdminTitle from "../../components/admin/AdminTitle";

function HistoryPage() {
  const [lists, setLists] = useState<IOrdalDetailAll[]>([]);
  const [isChanged, setIsChanged] = useState(false);

  const fetchList = async () => {
    const res = await salesHistory();
    setLists(res);
  };

  useEffect(() => {
    fetchList();
  }, [lists, isChanged]);

  return (
    <>
      <HistoryContainer>
        <AdminTitle>전체 거래내역</AdminTitle>
        <CategoryMenuContainer>
          <ItemBox>
            <ID>거래내역 ID</ID>
            <UserName>거래자 이름</UserName>
            <Product>상품명</Product>
            <TotalOrderAmount>총 주문 금액</TotalOrderAmount>
            <TransactionTime>거래 시간</TransactionTime>
          </ItemBox>
          <CancelBtn
            admin
            onClick={() => {
              window.location.reload();
            }}
          >
            새로고침
          </CancelBtn>
        </CategoryMenuContainer>
        <ItemContainer>
          {/* HistroyItem은 개별 아이템 영역, 현재 구매내역이 없어서 리스트 출력 불가 */}
          {lists ? (
            lists
              .sort(
                (a, b) =>
                  new Date(b.timePaid).getTime() -
                  new Date(a.timePaid).getTime(),
              )
              .map((list) => {
                return (
                  <HistroyItem
                    list={list}
                    setIsChanged={setIsChanged}
                    key={list.detailId}
                  />
                );
              })
          ) : (
            <ErrorMessage>거래 내역이 없습니다.</ErrorMessage>
          )}
        </ItemContainer>
      </HistoryContainer>
    </>
  );
}

const HistoryContainer = styled.div`
  margin: 0 30px;
  display: flex;
  flex-direction: column;
`;

// 카테고리 메뉴 스타일 시작
const CategoryMenuContainer = styled.div`
  display: flex;
  width: 100%;
  height: 90px;
  font-size: 18px;
  font-weight: 700;
  align-items: center;
  padding-right: 1px;
`;

const ItemBox = styled.div`
  display: flex;
  width: 100%;
`;

const ID = styled.div`
  border-right: 1px solid ${theme.colors.gray[5]};
  justify-content: center;
  align-items: center;
  display: flex;
  width: 15%;
  height: auto;
`;

const UserName = styled.div`
  border-right: 1px solid ${theme.colors.gray[5]};
  justify-content: center;
  align-items: center;
  display: flex;
  width: 15%;
`;

const Product = styled.div`
  border-right: 1px solid ${theme.colors.gray[5]};
  justify-content: center;
  align-items: center;
  display: flex;
  width: 35%;
`;

const TotalOrderAmount = styled.div`
  border-right: 1px solid ${theme.colors.gray[5]};
  justify-content: center;
  align-items: center;
  display: flex;
  width: 15%;
`;

const TransactionTime = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 20%;
`;

const CancelBtn = styled(Button)`
  margin: auto 26px auto 0;
`;
// 카테고리 메뉴 스타일 끝

const ItemContainer = styled.ul`
  flex-direction: column;
  display: flex;
`;

const ErrorMessage = styled.span`
  color: ${theme.colors.orange.main};
  font-weight: 700;
  font-size: 18px;
`;

export default HistoryPage;
