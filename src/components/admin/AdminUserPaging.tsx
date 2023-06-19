import Pagination from "react-js-pagination";
import styled from "styled-components";

interface AdminUserPagingProps {
    page: number;
    count: number;
    setPage: (page: number) => void;
  }

const AdminUserPaging: React.FC<AdminUserPagingProps> = ({page, count, setPage}) => {

  return (
    <Paginations
      activePage={page} //현재 페이지
      itemsCountPerPage={3} //한페이지에 보이는 아이템 개수
      totalItemsCount={count} //아이템 총 개수
      pageRangeDisplayed={3} //페이지네이션에서 보여줄 페이지 범위
      prevPageText={"⬅️"} //이전 텍스트
      nextPageText={"➡️"} //다음 텍스트
      onChange={setPage} //페이지가 바뀌면 핸들링 시켜줄 함수
    />
  );
}

const Paginations = styled(Pagination)`
background-color: #284660;
color: #0088ff;
`

export default AdminUserPaging;
