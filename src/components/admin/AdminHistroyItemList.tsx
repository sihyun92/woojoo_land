import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useEffect, useState } from "react";
import { IOrdalDetailAll, salesHistory } from "../../lib/API/adminAPI";
import HistroyItem from "../../components/admin/AdminHistroyItem";
import Button from "../../components/common/Button";
import AdminTitle from "../../components/admin/AdminTitle";
import SubLoading from "../../components/common/SubLoading";
import AdminUserPaging from "./AdminUserPaging";

function AdminHistroyItemList() {
  const [postPerPage] = useState(6); //한 페이지에 보여질 아이템 수
  const [count, setCount] = useState(0); //아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지. 기본값 '1'
  const [products, setProducts] = useState<IProduct[]>([]); //리스트에 나타낼 아이템
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); //현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); //현재 페이지의 첫번째 아이템 인덱스
  const [lists, setLists] = useState<IProduct[]>([]); //현재 페이지에서 보여지는 아이템

  const setPage = (error: any) => {
    setCurrentPage(error);
  };

  interface IProduct {
    id: string;
    title: string;
    price: number;
    description: string;
    tags: string[];
    thumbnail: string | null;
    photo: string | null;
    isSoldOut: boolean;
    discountRate: number;
    timePaid: any;
    list: IOrdalDetailAll;
    detailId: any;
  }

  useEffect(() => {
    setIndexOfLastPost(currentPage * postPerPage); //현재 페이지와 한 페이지에 보여질 아이템 수를 곱하여 결과 값을 setIndexOfLastPost에 넘긴다. -> 마지막 포스트 수는 3
    setIndexOfFirstPost(indexOfLastPost - postPerPage); //indexOfLastPost의 값과 한 페이지에 보여질 아이템 수를 뺀다 그 결과를 setIndexOfFirstPost에 전달 -> 첫번째 포스트는 0
    setLists(products.slice(indexOfFirstPost, indexOfLastPost)); //products의 배열을 현재 페이지의 첫번째와 마지막에 인덱스까지 값을 복사, 반환하여 setCurrentPosts에 전달
  }, [currentPage, indexOfLastPost, indexOfFirstPost, postPerPage, products]); //위에 기능이 끝나면 배열 안의 결과들을 한 번 실행

  // const [lists, setLists] = useState<IOrdalDetailAll[]>([]);
  const [isChanged, setIsChanged] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const fetchList = async () => {
    setIsFetching(true);
    const res = await salesHistory();
    setIsFetching(false);
    // setLists(res);
    setCount(res.length);
    setProducts(res);
  };

  useEffect(() => {
    fetchList();
  }, [isChanged]);

  return (
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
        <BtnBox>
          <CancelBtn
            admin
            onClick={() => {
              window.location.reload();
            }}
          >
            새로고침
          </CancelBtn>
        </BtnBox>
      </CategoryMenuContainer>
      {isFetching ? (
        <SubLoading />
      ) : (
        <ItemContainer>
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
      )}
      <PageNation>
        <AdminUserPaging page={currentPage} count={count} setPage={setPage} />
      </PageNation>
    </HistoryContainer>
  );
}
const PageNation = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 70px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.white};
`;

const HistoryContainer = styled.div`
  margin: 0 30px;
  height: 90%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

// 카테고리 메뉴 스타일 시작
const CategoryMenuContainer = styled.div`
  align-items: center;
  padding-right: 1px;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  height: 90px;
  width: 100%;
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
  width: 13%;
`;

const Product = styled.div`
  border-right: 1px solid ${theme.colors.gray[5]};
  justify-content: center;
  align-items: center;
  display: flex;
  width: 31%;
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
  width: 19%;
`;

const BtnBox = styled.div`
  display: flex;
  min-width: 258px;
  margin: auto 0px auto 0;
  justify-content: end;
`;


const CancelBtn = styled(Button)`
  margin: auto 26px auto 0;
  width: 123px;
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

export default AdminHistroyItemList;
