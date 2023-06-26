import { useEffect, useState } from "react";
import MainTaggedCard from "../../../components/main/Card/MainTaggedCard";
import { IProduct, productsList } from "../../../lib/API/adminAPI";

function HorizonPage() {
  const title = "사건의 지평선";
  const [list, setList] = useState<IProduct[]>([]);
  const horizonList = list.filter((value) =>
    value.tags?.includes("사건의지평선"),
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

  return <MainTaggedCard title={title} list={horizonList}></MainTaggedCard>;
}

export default HorizonPage;
