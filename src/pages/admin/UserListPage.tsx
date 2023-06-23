import styled from "styled-components";
import AdminTitle from "../../components/admin/AdminTitle";
import AdminUserItem from "../../components/admin/AdminUserItem";
import { theme } from "../../styles/theme";
import { useEffect, useState } from "react";
import { userCheck, UserList } from "../../lib/API/adminAPI";
import AdminUserPaging from "../../components/admin/AdminUserPaging";

function UserListPage() {
  const [products, setProducts] = useState<UserList[]>([]); //리스트에 나타낼 아이템
  const [count, setCount] = useState(0); //아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지. 기본값 '1'
  const [postPerPage] = useState(8); //한 페이지에 보여질 아이템 수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); //현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); //현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState<UserList[]>([]); //현재 페이지에서 보여지는 아이템

  const setPage = (error: any) => {
    setCurrentPage(error);
  };

  useEffect(() => {
    async function fetchList() {
      try {
        const res = await userCheck();
        setProducts(res);
        setCount(res.length); //API로 받은 데이터의 갯수를 아이템의 총 개수 상태로 setCount에 전달
      } catch (error) {
        console.error("UserListPage", error);
      }
    }
    fetchList();
  }, []);

  useEffect(() => {
    setIndexOfLastPost(currentPage * postPerPage); //현재 페이지와 한 페이지에 보여질 아이템 수를 곱하여 결과 값을 setIndexOfLastPost에 넘긴다. -> 마지막 포스트 수는 3
    setIndexOfFirstPost(indexOfLastPost - postPerPage); //indexOfLastPost의 값과 한 페이지에 보여질 아이템 수를 뺀다 그 결과를 setIndexOfFirstPost에 전달 -> 첫번째 포스트는 0
    setCurrentPosts(products.slice(indexOfFirstPost, indexOfLastPost)); //products의 배열을 현재 페이지의 첫번째와 마지막에 인덱스까지 값을 복사, 반환하여 setCurrentPosts에 전달
  }, [currentPage, indexOfLastPost, indexOfFirstPost, postPerPage, products]); //위에 기능이 끝나면 배열 안의 결과들을 한 번 실행

  return (
    <>
      <UserListContainer>
        <AdminTitle>사용자 조회</AdminTitle>
        <UserContainer>
          {currentPosts && currentPosts.length > 0 ? (
            //(위)currentPosts와 products.length가 0보다 크면 실행한다. *모든 배열을 탐색
            //(아래)currentPosts를 map로 반환하여 아래 AdminUserItem의 형식으로 반환
            currentPosts.map((productData: any) => (
              <AdminUserItem
                email={productData.email}
                displayName={productData.displayName}
                profileImg={productData.profileImg}
              />
            ))
          ) : (
            <UserData>유저가 없습니다.</UserData> // 데이터가 없는 상태는 해당 문구를 출력한다.
          )}
        </UserContainer>
        <PageNation>
          <AdminUserPaging page={currentPage} count={count} setPage={setPage} />
        </PageNation>
      </UserListContainer>
    </>
  );
}

const UserListContainer = styled.div`
  flex-direction: column;
  position: relative;
  overflow: hidden;
  margin: 0 30px;
  display: flex;
  height: 90%;
  bottom: 0;
`;

const UserContainer = styled.div`
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(3, 1fr);
  margin-top: 15px;
  flex-wrap: wrap;
  gap: 10px 10px;
  display: grid;
  width: 100%;
`;

const UserData = styled.div`
  color: ${theme.colors.gray[3]};
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: 0 auto;
  display: flex;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
`;

const PageNation = styled.div`
  background-color: ${theme.colors.white};
  justify-content: center;
  align-items: center;
  position: absolute;
  display: flex;
  height: 70px;
  width: 100%;
  bottom: 0;
  right: 0;
  left: 0;
`;

export default UserListPage;
