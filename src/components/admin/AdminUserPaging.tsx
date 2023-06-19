import Pagination from "react-js-pagination";
import styled from "styled-components";
import { theme } from "../../styles/theme";

interface AdminUserPagingProps {
    page: number;
    count: number;
    setPage: (page: number) => void;
  }

const AdminUserPaging: React.FC<AdminUserPagingProps> = ({page, count, setPage}) => {

  return (
    <PageStyles>
      <Pagination
        activePage={page} //현재 페이지
        itemsCountPerPage={3} //한페이지에 보이는 아이템 개수
        totalItemsCount={count} //아이템 총 개수
        pageRangeDisplayed={3} //페이지네이션에서 보여줄 페이지 범위
        prevPageText={"<"} //이전 텍스트
        nextPageText={">"} //다음 텍스트
        lastPageText={""} //맨 마지막 이동 텍스트
        firstPageText={""} //맨 앞으로 이동 텍스트
        itemClassFirst={"FirstArrow"} //맨 앞으로 이동 텍스트 스타일 적용 클래스명
        itemClassPrev={"PrevArrow"} //맨 이전 이동 텍스트 스타일 적용 클래스명
        itemClassNext={"NextArrow"} //맨 다음 이동 텍스트 스타일 적용 클래스명
        itemClassLast={"ListArrow"} //맨 마지막 이동 텍스트 스타일 적용 클래스명
        activeClass={"active"} //페이지 번호 텍스트 선택 상태 스타일 적용 클래스명
        itemClass={"item"} //번호 페이지 텍스트 스타일 적용 클래스명
        onChange={setPage} //페이지가 바뀌면 핸들링 시켜줄 함수
      />
    </PageStyles>
  );
}

const PageStyles = styled.div`
.pagination{
  margin-bottom: 30px;
  display: flex;
  li {
    margin: 6px;
    display: flex;
    a {
      line-height: 34px;
      display: flex;
    }
  }

  .FirstArrow, .ListArrow {
    display: none;
  }

  .PrevArrow a, .NextArrow a{
    background-color: ${theme.colors.orange.main};
    color: ${theme.colors.white};
    justify-content: center;
    border-radius: 5px;
    display: flex;
    height: 30px;
    width: 30px;
    transition: 0.2s;
    &:hover {
      background-color: ${theme.colors.orange.hover};
    }
  }

  .item {
    justify-content: center;
    display: flex;
    height: 30px;
    width: 30px;
  }

  .active {
    color: ${theme.colors.orange.main};
    justify-content: center;
    border-radius: 5px;
    line-height: 34px;
    display: flex;
    height: 30px;
    width: 30px;
    }
  }
`

export default AdminUserPaging;
