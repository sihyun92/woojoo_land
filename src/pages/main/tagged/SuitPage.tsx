import { useEffect, useState } from "react";
import MainTaggedCard from "../../../components/main/MainTaggedCard";
import { IProduct, productsList } from "../../../lib/API/adminAPI";

function SuitPage() {
  const title = "우주복";
  const [list, setList] = useState<IProduct[]>([]);
  const suitList = list.filter((value) => value.tags?.includes("우주복"));

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

  return <MainTaggedCard title={title} list={suitList}></MainTaggedCard>;
}

export default SuitPage;
