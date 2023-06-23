import { useEffect, useState } from "react";
import MainTaggedCard from "../../../components/main/MainTaggedCard";
import { IProduct, productsList } from "../../../lib/API/adminAPI";

function StationPage() {
  const title = "우주 정거장";
  const [list, setList] = useState<IProduct[]>([]);
  const stationList = list.filter((value) =>
    value.tags?.includes("우주정거장"),
  );

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

  return <MainTaggedCard title={title} list={stationList}></MainTaggedCard>;
}

export default StationPage;
