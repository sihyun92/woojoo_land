import { useState, useEffect } from "react";
import { IProduct, productsList } from "../../lib/API/adminAPI";
import MainSearchedCard from "./Card/MainSearchedCard";

interface ISearched {
  inputText: string;
}

function MainSearched({ inputText }: ISearched) {
  const title = "검색 결과";
  const [list, setList] = useState<IProduct[]>([]);

  // 검색값과 item의 title을 비교
  const searchedTitle = list.filter((item) => item.title?.includes(inputText));

  // 검색값과 item의 tag를 비교
  const searchedTag = list.filter((item) => item.tags?.includes(inputText));

  // 두 검색 조건을 concat
  const searchedList = searchedTag.concat(searchedTitle);

  useEffect(() => {
    async function fetchList() {
      try {
        const res = await productsList();
        setList(res);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchList();
  }, []);
  return <MainSearchedCard title={title} list={searchedList} />;
}

export default MainSearched;
