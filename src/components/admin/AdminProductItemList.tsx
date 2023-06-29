import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { productsList } from "../../lib/API/adminAPI";
import AdminTitle from "../../components/admin/AdminTitle";
import AdminUserPaging from "../../components/admin/AdminUserPaging";
import AdminProductItem from "../../components/admin/AdminProductItem";
import AdminModalTemplate from "../../components/admin/AdminModalTemplate";
import AdminProductItemAdd from "../../components/admin/AdminProductItemAdd";
import Loading from "../common/Loading";

function AdminProductItemList() {
  const [postPerPage] = useState(6); //한 페이지에 보여질 아이템 수
  const [count, setCount] = useState(0); //아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지. 기본값 '1'
  const [products, setProducts] = useState<IProduct[]>([]); //리스트에 나타낼 아이템
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); //현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); //현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState<IProduct[]>([]); //현재 페이지에서 보여지는 아이템

  //모달 상태 기본값 false다 true로 바뀌면 modalOpen의 값이되며 이 값은 return문의 AdminModal 컴포넌트 요청에 사용된다.
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  //모달 요청 setModalOpen()에 true 값을 보낸다.
  const addModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setModalOpen(true);
  };

  const ModalClose = () => {
    // setModalOpen(false) 또는 다른 원하는 동작을 수행합니다.
    setModalOpen(false);
  };

  const setPage = (error: any) => {
    setCurrentPage(error);
  };

  //새로고침 기능
  const [refresh, setRefresh] = useState(false)
  function onclick () {
    setRefresh(!refresh)
  }

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
  }

  //추가하기 완료시 리스트 랜더링
  useEffect(() => {
    async function fetchList() {
      setLoading(true)
      try {
        const itemlist = await productsList();
        setProducts(itemlist);
        setCount(itemlist.length); //API로 받은 데이터의 갯수를 아이템의 총 개수 상태로 setCount에 전달
        setLoading(false)
      } catch (error) {
        console.error("UserListPage", error);
      }
    }
    fetchList();
  }, [modalOpen, refresh]);

  useEffect(() => {
    setIndexOfLastPost(currentPage * postPerPage); //현재 페이지와 한 페이지에 보여질 아이템 수를 곱하여 결과 값을 setIndexOfLastPost에 넘긴다. -> 마지막 포스트 수는 3
    setIndexOfFirstPost(indexOfLastPost - postPerPage); //indexOfLastPost의 값과 한 페이지에 보여질 아이템 수를 뺀다 그 결과를 setIndexOfFirstPost에 전달 -> 첫번째 포스트는 0
    setCurrentPosts(products.slice(indexOfFirstPost, indexOfLastPost)); //products의 배열을 현재 페이지의 첫번째와 마지막에 인덱스까지 값을 복사, 반환하여 setCurrentPosts에 전달
  }, [currentPage, indexOfLastPost, indexOfFirstPost, postPerPage, products]); //위에 기능이 끝나면 배열 안의 결과들을 한 번 실행

  return (
    <AdminOrderContainer>
      {loading ? <Loading /> : null}
      <AdminTitle>모든 제품 조회</AdminTitle>
      <CategoryMenuContainer>
        <ItemBox>
          <Thumbnail>상품이미지</Thumbnail>
          <Title>상품명</Title>
          <ProductId>제품ID</ProductId>
          <Price>제품 가격</Price>
          <Tags>태그</Tags>
          <IsSoldOut>재고</IsSoldOut>
          <DiscountRate>할인율</DiscountRate>
        </ItemBox>
        <AddBtn onClick={addModal} admin>
          추가하기
        </AddBtn>
        {modalOpen && (
          <AdminModalTemplate>
            <AdminProductItemAdd setModalOpen={ModalClose} />
          </AdminModalTemplate>
        )}
      </CategoryMenuContainer>
      <ItemContainer>
        {currentPosts && currentPosts.length > 0 ? (
          currentPosts.map((productData: any) => (
            <AdminProductItem
              onclick={onclick}
              thumbnail={productData.thumbnail}
              title={productData.title}
              id={productData.id}
              price={productData.price}
              tags={productData.tags}
              discountRate={productData.discountRate}
              isSoldOut={productData.isSoldOut}
              description={productData.description}
              photo={productData.photo}
            />
          ))
        ) : (
          <UserData>제품이 없습니다.</UserData> //데이터가 없는 상태는 해당 문구를 출력한다.
        )}
      </ItemContainer>
      <PageNation>
        <AdminUserPaging page={currentPage} count={count} setPage={setPage} />
      </PageNation>
    </AdminOrderContainer>
  );
}

const ItemContainer = styled.div`
  gap: 10px 0;
  width: 100%;
  display: grid;
  flex-wrap: wrap;
  overflow: auto;
  -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none !important;
    }
  max-height: 500px;
  grid-template-rows: repeat(0, 6fr);
  grid-template-columns: repeat(0, 1fr);
`;

const UserData = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  margin: 0 auto;
  position: absolute;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray[3]};
`;

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

const AdminOrderContainer = styled.div`
  bottom: 0;
  height: 90%;
  display: flex;
  margin: 0 30px;
  overflow: hidden;
  position: relative;
  flex-direction: column;
`;

const CategoryMenuContainer = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  font-size: 18px;
  font-weight: 700;
  padding-right: 1px;
  align-items: center;
`;

const ItemBox = styled.div`
  width: 100%;
  display: flex;
`;

const Thumbnail = styled.div`
  width: 15%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${theme.colors.gray[5]};
`;

const Title = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${theme.colors.gray[5]};
`;

const ProductId = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${theme.colors.gray[5]};
`;

const Price = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${theme.colors.gray[5]};
`;

const Tags = styled.div`
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${theme.colors.gray[5]};
`;

const IsSoldOut = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${theme.colors.gray[5]};
`;

const DiscountRate = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddBtn = styled(Button)`
  margin: auto 26px auto 0;
`;

export default AdminProductItemList;
