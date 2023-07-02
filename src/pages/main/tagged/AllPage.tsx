import { useEffect, useState } from "react";
import MainTaggedCard from "../../../components/main/Card/MainTaggedCard";
import { IProduct, productsList } from "../../../lib/API/adminAPI";

function AllPage() {
  const title = "범우주(All) 상품";
  const [list, setList] = useState<IProduct[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const allList = list.filter((value) => value.tags?.includes("All"));

  useEffect(() => {
    async function fetchList() {
      setIsFetching(true);
      try {
        const res = await productsList();
        setList(res);
        setIsFetching(false);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchList();
  }, []);

  return (
    <MainTaggedCard
      isFetching={isFetching}
      title={title}
      list={allList}
    ></MainTaggedCard>
  );
}

export default AllPage;
