import { useEffect, useState } from "react";
import MainTaggedCard from "../../../components/main/Card/MainTaggedCard";
import { IProduct, productsList } from "../../../lib/API/adminAPI";

function SolarPage() {
  const title = "태양계 상품";
  const [list, setList] = useState<IProduct[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const solarList = list.filter((value) => value.tags?.includes("태양계"));

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
      list={solarList}
    ></MainTaggedCard>
  );
}

export default SolarPage;
