import { useEffect, useState } from "react";
import MainTaggedCard from "../../../components/main/MainTaggedCard";
import { IProduct, productsList } from "../../../lib/API/adminAPI";

function ShipPage() {
  const title = "우주선";
  const [list, setList] = useState<IProduct[]>([]);
  const shipList = list.filter((value) => value.tags?.includes("우주선"));

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

  return <MainTaggedCard title={title} list={shipList}></MainTaggedCard>;
}

export default ShipPage;
