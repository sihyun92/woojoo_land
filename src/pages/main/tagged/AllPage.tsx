import { useEffect, useState } from "react";
import MainTaggedCard from "../../../components/main/MainTaggedCard";
import { IProduct, productsList } from "../../../lib/API/adminAPI";

function AllPage() {
  const title = "범우주(All) 상품";
  const [list, setList] = useState<IProduct[]>([]);
  const allList = list.filter((value) => value.tags?.includes("All"));

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

  return <MainTaggedCard title={title} list={allList}></MainTaggedCard>;
}

export default AllPage;
